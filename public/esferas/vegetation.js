// Deterministic, merged evergreen geometry. Natural surfaces, polished ornaments
// and luminous beads use three draw calls per tree, indoors or outdoors.
export function createFestiveBatches(THREE) {
  const batches = Array.from({ length: 3 }, () => ({ p: [], n: [], c: [] }));
  const colors = new Map(), templates = new Map();
  const V = (x = 0, y = 0, z = 0) => new THREE.Vector3(x, y, z);
  const color = value => {
    if (value?.isColor) return value;
    if (!colors.has(value)) colors.set(value, new THREE.Color(value));
    return colors.get(value);
  };
  function triangle(batch, a, b, c, tint, normals) {
    const out = batches[batch], rgb = color(tint);
    const face = normals ? null : b.clone().sub(a).cross(c.clone().sub(a)).normalize();
    if (!normals && face.lengthSq() < .1) return;
    const points = [a, b, c];
    for (let i = 0; i < 3; i++) {
      const p = points[i], n = normals?.[i] ?? face;
      out.p.push(p.x, p.y, p.z); out.n.push(n.x, n.y, n.z); out.c.push(rgb.r, rgb.g, rgb.b);
    }
  }
  function template(key, create) {
    if (!templates.has(key)) {
      const source = create(), flat = source.index ? source.toNonIndexed() : source;
      templates.set(key, { p: flat.attributes.position.array.slice(), n: flat.attributes.normal.array.slice() });
      if (source !== flat) source.dispose(); flat.dispose();
    }
    return templates.get(key);
  }
  function transformed(t, centre, scale, tint, batch = 0, rotation = 0) {
    const cs = Math.cos(rotation), sn = Math.sin(rotation), rgb = color(tint), out = batches[batch];
    for (let i = 0; i < t.p.length; i += 3) {
      const x = t.p[i] * scale.x, y = t.p[i + 1] * scale.y, z = t.p[i + 2] * scale.z;
      let nx = t.n[i] / scale.x, ny = t.n[i + 1] / scale.y, nz = t.n[i + 2] / scale.z;
      const len = Math.hypot(nx, ny, nz) || 1; nx /= len; ny /= len; nz /= len;
      out.p.push(centre.x + x * cs + z * sn, centre.y + y, centre.z - x * sn + z * cs);
      out.n.push(nx * cs + nz * sn, ny, -nx * sn + nz * cs); out.c.push(rgb.r, rgb.g, rgb.b);
    }
  }
  function ellipsoid(centre, scale, tint, batch = 0, segments = 10, rings = 6, rotation = 0) {
    transformed(template(`sphere${segments}/${rings}`, () => new THREE.SphereGeometry(1, segments, rings)), centre, scale, tint, batch, rotation);
  }
  function box(centre, scale, tint, batch = 0, rotation = 0) {
    transformed(template('box', () => new THREE.BoxGeometry(1, 1, 1)), centre, scale, tint, batch, rotation);
  }
  function rod(a, b, ra, rb, tint, batch = 0, sides = 5, caps = false) {
    const axis = b.clone().sub(a), length = axis.length();
    if (length < 1e-8 || !(ra > 0 || rb > 0)) return;
    axis.divideScalar(length);
    const u = axis.clone().cross(Math.abs(axis.y) > .9 ? V(1, 0, 0) : V(0, 1, 0)).normalize();
    const v = axis.clone().cross(u).normalize();
    const at = (origin, radius, angle) => origin.clone().addScaledVector(u, Math.cos(angle) * radius).addScaledVector(v, Math.sin(angle) * radius);
    const normal = angle => u.clone().multiplyScalar(Math.cos(angle)).addScaledVector(v, Math.sin(angle)).addScaledVector(axis, (ra - rb) / length).normalize();
    for (let i = 0; i < sides; i++) {
      const aa = i / sides * Math.PI * 2, ab = (i + 1) / sides * Math.PI * 2;
      const a0 = at(a, ra, aa), a1 = at(a, ra, ab), b0 = at(b, rb, aa), b1 = at(b, rb, ab);
      const n0 = normal(aa), n1 = normal(ab);
      triangle(batch, a0, a1, b0, tint, [n0, n1, n0]); triangle(batch, a1, b1, b0, tint, [n1, n1, n0]);
      if (caps) { triangle(batch, a, a1, a0, tint); triangle(batch, b, b0, b1, tint); }
    }
  }
  function tube(points, radius, tint, batch = 0, sides = 4) {
    for (let i = 1; i < points.length; i++) rod(points[i - 1], points[i], radius, radius, tint, batch, sides);
  }
  function needle(origin, direction, length, width, tint) {
    const d = direction.clone().normalize(), end = origin.clone().addScaledVector(d, length);
    let side = d.clone().cross(V(0, 1, 0)); if (side.lengthSq() < .01) side = V(1, 0, 0); side.normalize();
    const normal = side.clone().cross(d).normalize();
    const base = origin.clone().addScaledVector(normal, width * .45);
    const middle = origin.clone().addScaledVector(d, length * .34);
    const left = middle.clone().addScaledVector(side, width), right = middle.clone().addScaledVector(side, -width);
    triangle(0, base, left, end, tint); triangle(0, base, end, right, tint);
  }
  function ribbon(points, width, thickness, tint, batch = 0) {
    const sides = points.map((p, i) => {
      const before = points[Math.max(0, i - 1)], after = points[Math.min(points.length - 1, i + 1)];
      const tangent = after.clone().sub(before); const side = V(-tangent.y, tangent.x, 0).normalize().multiplyScalar(width / 2);
      return [p.clone().add(side), p.clone().sub(side)];
    });
    for (let i = 1; i < sides.length; i++) {
      const [a, b] = sides[i - 1], [c, d] = sides[i];
      const aa = a.clone().add(V(0, 0, -thickness)), bb = b.clone().add(V(0, 0, -thickness));
      const cc = c.clone().add(V(0, 0, -thickness)), dd = d.clone().add(V(0, 0, -thickness));
      triangle(batch, a, b, c, tint); triangle(batch, b, d, c, tint);
      triangle(batch, aa, cc, bb, tint); triangle(batch, bb, cc, dd, tint);
      triangle(batch, a, c, aa, tint); triangle(batch, aa, c, cc, tint);
      triangle(batch, b, bb, d, tint); triangle(batch, bb, dd, d, tint);
    }
    const first = sides[0], last = sides[sides.length - 1];
    for (const [a, b] of [first, last]) {
      triangle(batch, a, a.clone().add(V(0, 0, -thickness)), b, tint);
      triangle(batch, b, a.clone().add(V(0, 0, -thickness)), b.clone().add(V(0, 0, -thickness)), tint);
    }
  }
  function fitTree(radius, height) {
    let maxRadius = 0, minY = Infinity, maxY = 0;
    for (const b of batches) for (let i = 0; i < b.p.length; i += 3) {
      maxRadius = Math.max(maxRadius, Math.hypot(b.p[i], b.p[i + 2])); minY = Math.min(minY, b.p[i + 1]); maxY = Math.max(maxY, b.p[i + 1]);
    }
    const sx = Math.min(1, radius / Math.max(radius, maxRadius)), sy = Math.min(1, height / Math.max(height, maxY - Math.min(0, minY)));
    for (const b of batches) for (let i = 0; i < b.p.length; i += 3) {
      b.p[i] *= sx; b.p[i + 2] *= sx; b.p[i + 1] = (b.p[i + 1] - Math.min(0, minY)) * sy;
      let nx = b.n[i] / sx, ny = b.n[i + 1] / sy, nz = b.n[i + 2] / sx; const len = Math.hypot(nx, ny, nz) || 1;
      b.n[i] = nx / len; b.n[i + 1] = ny / len; b.n[i + 2] = nz / len;
    }
  }
  function finish(parent, name = 'Organic Christmas evergreen') {
    const group = new THREE.Group(); group.name = name;
    const materials = [
      new THREE.MeshStandardMaterial({ vertexColors: true, roughness: .74, side: THREE.DoubleSide }),
      new THREE.MeshStandardMaterial({ vertexColors: true, metalness: .84, roughness: .22 }),
      new THREE.MeshStandardMaterial({ vertexColors: true, roughness: .25, emissive: 0xffb251, emissiveIntensity: 3.1 })
    ];
    materials[0].name = 'Evergreen natural needles, bark and snow'; materials[1].name = 'Christmas polished red and gold ornaments'; materials[2].name = 'Christmas warm miniature bulbs';
    for (let i = 0; i < batches.length; i++) {
      const b = batches[i]; if (!b.p.length) { materials[i].dispose(); continue; }
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.Float32BufferAttribute(b.p, 3)); g.setAttribute('normal', new THREE.Float32BufferAttribute(b.n, 3)); g.setAttribute('color', new THREE.Float32BufferAttribute(b.c, 3));
      g.computeBoundingBox(); g.computeBoundingSphere();
      const mesh = new THREE.Mesh(g, materials[i]); mesh.name = name + ' · ' + ['natural surfaces', 'hanging ornaments', 'warm spiral lights'][i];
      mesh.castShadow = i !== 2; mesh.receiveShadow = i !== 2; group.add(mesh);
    }
    parent?.add(group); group.userData.drawCalls = group.children.length;
    group.userData.triangles = group.children.reduce((sum, mesh) => sum + mesh.geometry.attributes.position.count / 3, 0);
    return group;
  }
  return { V, color, triangle, ellipsoid, box, rod, tube, needle, ribbon, fitTree, finish };
}

export function addWinterPine(THREE, parent, {
  x = 0, y = 0, z = 0, height = .65, radius = .2, seed = 1,
  detail = 'high', snow = true, indoor = false, container = false, gifts = []
} = {}) {
  if (!(height > 0 && radius > 0)) throw new RangeError('Pine height and radius must be positive.');
  let state = seed >>> 0;
  const random = () => { state = (Math.imul(state, 1664525) + 1013904223) >>> 0; return state / 4294967296; };
  const b = createFestiveBatches(THREE), { V } = b;
  const h = height, r = radius, low = detail === 'low' || indoor;
  const greens = [0x103b26, 0x174931, 0x205339, 0x0b2b1b, 0x285b3b];
  const bark = 0x5f3d23, gold = 0xe5b654, red = 0xb00e24, ivory = 0xfff8eb;
  const potHeight = container ? h * .115 : 0, base = potHeight * .72;
  const crownHeight = h * .952 - base;
  const layers = low ? 9 : 12, samples = low ? 4 : 7, leaves = low ? 3 : 5;
  b.rod(V(0, base, 0), V(0, h * .94, 0), h * .020, h * .0018, bark, 0, low ? 6 : 8, true);
  const anchors = [];
  for (let tier = 0; tier < layers; tier++) {
    const f = tier / (layers - 1), branchCount = (low ? 7 : 10) - Math.floor(f * 3);
    const tierY = base + crownHeight * (.085 + f * .82);
    const lengthBase = r * Math.pow(1 - f * .925, .98);
    for (let j = 0; j < branchCount; j++) {
      const angle = j / branchCount * Math.PI * 2 + tier * .78 + (random() - .5) * .38;
      const radial = V(Math.cos(angle), 0, Math.sin(angle)), lateral = V(-radial.z, 0, radial.x);
      const length = lengthBase * (.78 + random() * .23);
      const start = V(0, tierY + (random() - .5) * h * .025, 0);
      const droop = h * (.025 + random() * .024) * (1 - f * .45);
      const point = t => start.clone().addScaledVector(radial, length * t).add(V(0, -droop * Math.sin(t * Math.PI) + h * .014 * t, 0));
      const branchPoints = Array.from({ length: 5 }, (_, k) => point(k / 4));
      b.tube(branchPoints, h * .0026 * (1 - f * .78), bark, 0, low ? 4 : 5);
      for (let s = 1; s <= samples; s++) {
        const t = s / (samples + 1), origin = point(t);
        const twigLength = Math.min(h * .100 * (1 - f * .63) * (1 - t * .37), length * .35);
        for (const side of [-1, 1]) {
          const direction = radial.clone().multiplyScalar(.37).addScaledVector(lateral, side * .93).add(V(0, .18 + random() * .23, 0)).normalize();
          const end = origin.clone().addScaledVector(direction, twigLength);
          b.rod(origin, end, h * .0008, h * .00018, bark, 0, 4);
          for (let n = 0; n < leaves; n++) {
            const t = (n + .15) / leaves, centre = origin.clone().lerp(end, t);
            for (const side of [-1, 1]) {
              const d = direction.clone().multiplyScalar(.51).addScaledVector(radial, side * .67).add(V(0, .20 + random() * .42, 0));
              const length = h * (.024 + random() * .015) * (1 - f * .38);
              b.needle(centre, d, length, length * (.065 + random() * .035), greens[Math.floor(random() * greens.length)]);
            }
          }
          b.needle(end, direction.clone().add(V(0, .25, 0)), h * .028 * (1 - f * .3), h * .0020, greens[j % greens.length]);
        }
        if (snow && !indoor && s > 1 && s < samples && random() > .54) {
          const centre = origin.clone().add(V(0, h * .010, 0));
          b.ellipsoid(centre, V(twigLength * .48, h * (.007 + random() * .005), twigLength * .28), ivory, 0, 8, 5, -angle);
          if (random() > .6) b.ellipsoid(centre.clone().addScaledVector(lateral, twigLength * .18), V(twigLength * .24, h * .008, twigLength * .23), ivory, 0, 7, 4);
        }
      }
      anchors.push({ point: point(.77 + random() * .14), radial, level: f });
      const tip = point(.98);
      for (let n = 0; n < (low ? 4 : 8); n++) {
        const a = angle + n * 2.39996;
        b.needle(tip, V(Math.cos(a) * .5, .85, Math.sin(a) * .5), h * .035 * (1 - f * .2), h * .0018, greens[n % greens.length]);
      }
    }
  }
  for (let i = 0; i < (low ? 28 : 55); i++) {
    const t = i / (low ? 28 : 55), a = i * 2.39996;
    b.needle(V(0, h * (.81 + t * .15), 0), V(Math.cos(a) * .65, .8, Math.sin(a) * .65), h * .04 * (1 - t * .72), h * .0015, greens[i % greens.length]);
  }
  // Each bauble has a real cap, a short hanging stem and a folded wire loop.
  const ornamentCount = low ? 17 : 31;
  for (let i = 0; i < ornamentCount; i++) {
    const anchor = anchors[Math.floor(i / ornamentCount * anchors.length)];
    const size = h * (.0155 + random() * .006);
    const p = anchor.point.clone().addScaledVector(anchor.radial, size * .25).add(V(0, -size * 1.4 - h * .008, 0));
    b.ellipsoid(p, V(size, size * 1.045, size), i % 3 === 0 ? gold : red, 1, low ? 8 : 12, low ? 6 : 8);
    const capH = size * .40, capY = p.y + size + capH * .5;
    b.rod(V(p.x, capY - capH / 2, p.z), V(p.x, capY + capH / 2, p.z), size * .28, size * .25, gold, 1, 7, true);
    const hook = [];
    for (let n = 0; n <= 12; n++) { const a = n / 12 * Math.PI * 2; hook.push(V(p.x + Math.cos(a) * size * .29, capY + capH * .7 + Math.sin(a) * size * .30, p.z)); }
    b.tube(hook, size * .055, gold, 1, 3);
    b.rod(V(p.x, capY + capH * .8, p.z), anchor.point, size * .045, size * .045, gold, 1, 3);
  }
  const helix = [], turns = low ? 3 : 4.2, helixSteps = low ? 72 : 124;
  for (let i = 0; i <= helixSteps; i++) {
    const t = i / helixSteps, level = .11 + t * .79, angle = t * Math.PI * 2 * turns + .43;
    const radius = r * Math.pow(1 - t * .88, .98) * .88;
    helix.push(V(Math.cos(angle) * radius, base + crownHeight * level, Math.sin(angle) * radius));
  }
  b.tube(helix, h * .00165, 0x4d5227, 0, 4);
  const lightCount = low ? 31 : 61;
  for (let i = 0; i < lightCount; i++) {
    const p = helix[Math.round(i / (lightCount - 1) * helixSteps)], size = h * (.0035 + random() * .0011);
    b.ellipsoid(p, V(size, size * 1.3, size), 0xffd391, 2, 6, 4);
    b.rod(p.clone().add(V(0, -size * 1.7, 0)), p.clone().add(V(0, -size * .5, 0)), size * .45, size * .45, gold, 1, 4);
  }
  // Faceted front/back peaks make the topper a solid dimensional star.
  const starCentre = V(0, h * .967, 0), starRadius = h * .030, depth = h * .007;
  const star = [];
  for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2 + Math.PI / 2, rr = starRadius * (i % 2 ? .44 : 1); star.push(starCentre.clone().add(V(Math.cos(a) * rr, Math.sin(a) * rr, 0))); }
  for (let i = 0; i < 10; i++) {
    const j = (i + 1) % 10, af = star[i].clone().add(V(0, 0, depth * .18)), bf = star[j].clone().add(V(0, 0, depth * .18));
    const ab = star[i].clone().add(V(0, 0, -depth * .18)), bb = star[j].clone().add(V(0, 0, -depth * .18));
    b.triangle(1, starCentre.clone().add(V(0, 0, depth)), af, bf, i % 2 ? 0xf2ca70 : gold);
    b.triangle(1, starCentre.clone().add(V(0, 0, -depth)), bb, ab, gold);
    b.triangle(1, af, ab, bf, gold); b.triangle(1, ab, bb, bf, gold);
  }
  if (container) {
    const potR = Math.min(r * .47, h * .082), potH = potHeight;
    b.rod(V(0, .002 * h, 0), V(0, potH, 0), potR * .78, potR, 0x93673f, 0, 14, true);
    b.ellipsoid(V(0, potH * .99, 0), V(potR * .91, h * .004, potR * .91), 0x342719, 0, 12, 5);
    for (let j = 0; j < 7; j++) {
      const yy = potH * (.10 + j * .14), rr = potR * (.78 + yy / potH * .22), ring = [];
      for (let n = 0; n <= 22; n++) { const a = n / 22 * Math.PI * 2; ring.push(V(Math.cos(a) * rr, yy, Math.sin(a) * rr)); }
      b.tube(ring, h * .0021, j % 2 ? 0xaa7b4b : 0xb58b5a, 0, 3);
    }
    for (let j = 0; j < 14; j++) { const a = j / 14 * Math.PI * 2; b.rod(V(Math.cos(a) * potR * .79, h * .002, Math.sin(a) * potR * .79), V(Math.cos(a) * potR, potH, Math.sin(a) * potR), h * .0016, h * .0016, 0xc29863, 0, 4); }
  }
  b.fitTree(r, h);
  for (let i = 0; i < gifts.length; i++) {
    const g = gifts[i], centre = V(g.x, g.h / 2, g.z), rotation = g.rotation ?? 0;
    b.box(centre, V(g.w, g.h, g.d), g.color ?? (i % 2 ? 0xb52032 : 0xe9debc), 0, rotation);
    const ribbonCentre = centre.clone().add(V(0, .0007, 0));
    b.box(ribbonCentre, V(g.w * .15, g.h + .0013, g.d + .0013), g.ribbon ?? gold, 1, rotation);
    b.box(ribbonCentre, V(g.w + .0013, g.h + .0013, g.d * .14), g.ribbon ?? gold, 1, rotation);
    for (const side of [-1, 1]) {
      const loop = [], spread = g.w * .21;
      for (let n = 0; n <= 12; n++) { const a = n / 12 * Math.PI * 2; loop.push(V(g.x + side * spread * .60 + Math.cos(a) * spread * .62, g.h + .002 + Math.sin(a) * g.h * .13, g.z + Math.sin(a) * g.d * .09)); }
      b.tube(loop, Math.min(g.w, g.d) * .025, g.ribbon ?? gold, 1, 3);
    }
  }
  const tree = b.finish(parent, indoor ? 'Natural indoor Christmas pine' : 'Snow-laden organic outdoor fir');
  tree.position.set(x, y, z);
  Object.assign(tree.userData, { seed, detail: low ? 'low' : 'high', snow: !!snow && !indoor, indoor, container: !!container, giftCount: gifts.length, height, foliageRadius: radius, ornamentCount, lightCount });
  return tree;
}
