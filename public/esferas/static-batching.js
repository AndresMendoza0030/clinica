/** Runtime-only static batching. Geometry is baked into the rotatable root's
 * coordinates while material objects, UV/color data and shadow states survive.
 * Transparent, photographic, animated and shader-driven objects stay separate.
 */
export function batchStaticMeshes(THREE, root, { minCount = 3 } = {}) {
  if (!root?.isObject3D) throw new TypeError('A scene root is required.');
  minCount = Math.max(3, Math.floor(minCount));
  root.updateWorldMatrix(true, true);
  const inverseRoot = root.matrixWorld.clone().invert();
  const groups = new Map();
  const skipCounts = {};
  const skip = reason => { skipCounts[reason] = (skipCounts[reason] || 0) + 1; };
  const isArtwork = (object, material) =>
    object.userData?.originalArtwork || object.userData?.originalArt ||
    material.userData?.originalArtwork || material.userData?.originalArt ||
    (material.isMeshBasicMaterial && material.map) ||
    /original.*(?:artwork|sign)|photograph/i.test(object.name + ' ' + material.name);
  function stats() {
    const result = { meshes: 0, estimatedDrawCalls: 0, triangles: 0, shadowDrawCalls: 0, shadowTriangles: 0 };
    root.traverse(object => {
      if (!object.isMesh || !object.visible) return;
      const materials = Array.isArray(object.material) ? object.material : [object.material];
      if (!materials.some(m => m?.visible !== false)) return;
      const calls = Array.isArray(object.material) ? object.geometry.groups.filter(g => materials[g.materialIndex]?.visible !== false).length : 1;
      const triangles = (object.geometry.index?.count ?? object.geometry.attributes.position.count) / 3 * (object.isInstancedMesh ? object.count : 1);
      result.meshes++; result.estimatedDrawCalls += calls; result.triangles += triangles;
      if (object.castShadow) { result.shadowDrawCalls += calls; result.shadowTriangles += triangles; }
    });
    return result;
  }
  const before = stats();
  root.traverse(object => {
    if (!object.isMesh) return;
    if (object.isInstancedMesh || object.isSkinnedMesh) { skip('instancedOrSkinned'); return; }
    if (object.children.length) { skip('hasChildren'); return; }
    if (object.userData?.staticBatch === false || object.userData?.staticBatchMerged) { skip('optOut'); return; }
    for (let ancestor = object; ancestor && ancestor !== root; ancestor = ancestor.parent) {
      if (!ancestor.visible) { skip('hidden'); return; }
    }
    const material = object.material, geometry = object.geometry;
    if (!material || Array.isArray(material)) { skip('multipleMaterials'); return; }
    if (!material.visible || material.transparent || material.isShaderMaterial) { skip('transparentOrShader'); return; }
    if (isArtwork(object, material)) { skip('artwork'); return; }
    if (object.customDepthMaterial || object.customDistanceMaterial ||
        Object.hasOwn(object, 'onBeforeRender') || Object.hasOwn(object, 'onAfterRender') ||
        Object.hasOwn(object, 'onBeforeShadow') || Object.hasOwn(object, 'onAfterShadow')) { skip('customRenderHook'); return; }
    const attributes = Object.keys(geometry.attributes).sort();
    if (!geometry.attributes.position || attributes.some(name => geometry.attributes[name].isInterleavedBufferAttribute) ||
        Object.values(geometry.morphAttributes).some(list => list.length)) { skip('dynamicAttributes'); return; }
    const count = geometry.attributes.position.count, indexCount = geometry.index?.count ?? count;
    if (attributes.some(name => geometry.attributes[name].count !== count) || indexCount % 3 ||
        geometry.drawRange.start !== 0 || geometry.drawRange.count < indexCount) { skip('partialGeometry'); return; }
    const signature = attributes.map(name => {
      const a = geometry.attributes[name]; return `${name}:${a.itemSize}:${a.normalized}:${a.array.constructor.name}:${a.gpuType}`;
    }).join('|');
    const key = [material.id, !!object.castShadow, !!object.receiveShadow, object.renderOrder, object.layers.mask, object.frustumCulled, signature].join(';');
    if (!groups.has(key)) groups.set(key, { material, attributes, objects: [], castShadow: object.castShadow, receiveShadow: object.receiveShadow, renderOrder: object.renderOrder, layers: object.layers.mask, frustumCulled: object.frustumCulled });
    groups.get(key).objects.push(object);
  });
  let mergedGroups = 0, sourceMeshes = 0, maximumPositionError = 0;
  const merged = [];
  for (const group of groups.values()) {
    if (group.objects.length < minCount) continue;
    const sources = group.objects.map(object => {
      const matrix = new THREE.Matrix4().multiplyMatrices(inverseRoot, object.matrixWorld);
      const geometry = object.geometry.clone(); geometry.applyMatrix4(matrix);
      return { object, geometry, mirrored: matrix.determinant() < 0, matrix };
    });
    const vertexCount = sources.reduce((sum, s) => sum + s.geometry.attributes.position.count, 0);
    const indexCount = sources.reduce((sum, s) => sum + (s.geometry.index?.count ?? s.geometry.attributes.position.count), 0);
    const geometry = new THREE.BufferGeometry();
    for (const name of group.attributes) {
      const first = sources[0].geometry.attributes[name];
      const array = new first.array.constructor(vertexCount * first.itemSize);
      const attribute = new THREE.BufferAttribute(array, first.itemSize, first.normalized);
      attribute.setUsage(first.usage); attribute.gpuType = first.gpuType;
      let offset = 0;
      for (const source of sources) {
        const a = source.geometry.attributes[name]; array.set(a.array, offset);
        if (name === 'tangent' && first.itemSize === 4 && source.mirrored)
          for (let i = 3; i < a.array.length; i += 4) array[offset + i] *= -1;
        offset += a.array.length;
      }
      geometry.setAttribute(name, attribute);
    }
    const indices = vertexCount > 65535 ? new Uint32Array(indexCount) : new Uint16Array(indexCount);
    let vertexOffset = 0, indexOffset = 0;
    const probe = new THREE.Vector3(), actual = new THREE.Vector3();
    for (const source of sources) {
      const p = source.geometry.attributes.position, original = source.object.geometry.attributes.position;
      const oldIndices = source.geometry.index;
      const size = oldIndices?.count ?? p.count;
      for (let i = 0; i < size; i += 3) {
        const a = oldIndices ? oldIndices.getX(i) : i, b = oldIndices ? oldIndices.getX(i + 1) : i + 1, c = oldIndices ? oldIndices.getX(i + 2) : i + 2;
        indices[indexOffset++] = vertexOffset + a;
        indices[indexOffset++] = vertexOffset + (source.mirrored ? c : b);
        indices[indexOffset++] = vertexOffset + (source.mirrored ? b : c);
      }
      // Check every source vertex against the exact relative transform. This is
      // numerical validation, not an estimated FPS or a screenshot comparison.
      for (let i = 0; i < original.count; i++) {
        probe.fromBufferAttribute(original, i).applyMatrix4(source.matrix);
        actual.fromBufferAttribute(geometry.attributes.position, vertexOffset + i);
        maximumPositionError = Math.max(maximumPositionError, probe.distanceTo(actual));
      }
      vertexOffset += p.count;
    }
    geometry.setIndex(new THREE.BufferAttribute(indices, 1));
    geometry.computeBoundingBox(); geometry.computeBoundingSphere();
    const mesh = new THREE.Mesh(geometry, group.material);
    mesh.name = 'Static batch · ' + (group.material.name || 'shared material');
    mesh.castShadow = group.castShadow; mesh.receiveShadow = group.receiveShadow;
    mesh.renderOrder = group.renderOrder; mesh.layers.mask = group.layers; mesh.frustumCulled = group.frustumCulled;
    mesh.userData.staticBatchMerged = true;
    mesh.userData.sourceNames = group.objects.map(object => object.name);
    mesh.userData.sourceMeshCount = group.objects.length;
    root.add(mesh);
    for (const source of sources) { source.object.removeFromParent(); source.geometry.dispose(); }
    // Source buffers may be shared by unbatched meshes or external references;
    // leave them owned by the model rather than disposing them here.
    merged.push(mesh); mergedGroups++; sourceMeshes += sources.length;
  }
  const after = stats();
  return { before, after, mergedGroups, sourceMeshes, maximumPositionError, skipCounts, merged };
}
