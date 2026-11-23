/**
 * Shared, deterministic miniature PBR surfaces. There is no DOM dependency:
 * makeCanvas(width, height) may return an HTMLCanvasElement, OffscreenCanvas,
 * or a node canvas. Albedo is a near-white modulation of the material's tint;
 * applyTo() deliberately preserves the approved cream/red/wood/gold colors.
 */
export function createSurfaceMaterials(THREE, { makeCanvas, anisotropy = 8 } = {}) {
  if (typeof makeCanvas !== 'function') throw new TypeError('makeCanvas(width, height) is required.');
  const cache = new Map();
  const clamp = (v, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, v));
  const mix = (a, b, t) => a + (b - a) * t;
  const smooth = (a, b, x) => { const t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t); };
  const fract = v => v - Math.floor(v);
  const defs = {
    stucco: { width: 512, height: 512, seed: 34571, repeat: [3, 3], normalStrength: 1.8, normalScale: .34, bumpScale: .0014 },
    paint: { width: 512, height: 512, seed: 12891, repeat: [3, 3], normalStrength: 1.15, normalScale: .15, bumpScale: .00065 },
    fabric: { width: 512, height: 512, seed: 71327, repeat: [2, 2], normalStrength: 1.4, normalScale: .25, bumpScale: .00065 },
    leather: { width: 512, height: 512, seed: 41713, repeat: [2, 2], normalStrength: 1.5, normalScale: .18, bumpScale: .0005 },
    wood: { width: 1024, height: 512, seed: 73843, repeat: [1, 1], normalStrength: 2.1, normalScale: .30, bumpScale: .0011 },
    snow: { width: 512, height: 512, seed: 81221, repeat: [3, 3], normalStrength: 1.9, normalScale: .38, bumpScale: .0021 },
    pavement: { width: 512, height: 512, seed: 59149, repeat: [2, 2], normalStrength: 2.2, normalScale: .36, bumpScale: .0019 },
    gold: { width: 512, height: 512, seed: 42373, repeat: [2, 2], normalStrength: 1.05, normalScale: .14, bumpScale: .00035 },
    green: { width: 512, height: 512, seed: 95441, repeat: [2, 2], normalStrength: 1.2, normalScale: .18, bumpScale: .00075 }
  };
  const aliases = { ivory: 'stucco', red: 'paint', vermilion: 'paint', asphalt: 'pavement', brass: 'gold' };
  function hash(x, y, seed) {
    let n = Math.imul(x + 374761393, 668265263) ^ Math.imul(y + 1274126177, 2246822519) ^ seed;
    n = Math.imul(n ^ (n >>> 13), 1274126177);
    return ((n ^ (n >>> 16)) >>> 0) / 4294967295;
  }
  function grid(width, height, seed) {
    const data = new Float32Array(width * height);
    for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) data[y * width + x] = hash(x, y, seed);
    return { width, height, data };
  }
  // Periodic lattice interpolation makes every scale tile continuously. Low-
  // frequency layers remain very quiet; high frequencies carry tactile detail.
  function noise(g, u, v) {
    const x = fract(u) * g.width, y = fract(v) * g.height;
    const ix = Math.floor(x), iy = Math.floor(y), tx = x - ix, ty = y - iy;
    const sx = tx * tx * (3 - 2 * tx), sy = ty * ty * (3 - 2 * ty);
    const nx = (ix + 1) % g.width, ny = (iy + 1) % g.height;
    const a = g.data[iy * g.width + ix], b = g.data[iy * g.width + nx];
    const c = g.data[ny * g.width + ix], d = g.data[ny * g.width + nx];
    return mix(mix(a, b, sx), mix(c, d, sx), sy);
  }
  function canvas(width, height) {
    const c = makeCanvas(width, height);
    if (!c?.getContext) throw new TypeError('makeCanvas must return a 2D canvas.');
    if (c.width !== width) c.width = width;
    if (c.height !== height) c.height = height;
    return c;
  }
  function texture(c, kind, role, repeat) {
    const t = new THREE.CanvasTexture(c);
    t.name = `Procedural ${kind} ${role}`;
    t.colorSpace = role === 'albedo' ? THREE.SRGBColorSpace : THREE.NoColorSpace;
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(...repeat);
    t.anisotropy = clamp(Number.isFinite(anisotropy) ? anisotropy : 8, 1, 16);
    t.minFilter = THREE.LinearMipmapLinearFilter;
    t.magFilter = THREE.LinearFilter;
    t.generateMipmaps = true;
    t.userData.surfaceKind = kind; t.userData.surfaceRole = role;
    t.needsUpdate = true;
    return t;
  }
  function getSurface(requestedKind) {
    const kind = aliases[requestedKind] ?? requestedKind;
    if (!defs[kind]) throw new RangeError(`Unknown surface: ${requestedKind}`);
    if (cache.has(kind)) return cache.get(kind).surface;
    const def = defs[kind], width = def.width, height = def.height, seed = def.seed;
    const count = width * height;
    const heights = new Float32Array(count);
    let heightBytes = new Uint8Array(count);
    let heightCanvas, heightTexture;
    const canvases = {
      albedo: canvas(width, height),
      get height() {
        if (!heightCanvas) {
          // The interactive scene uses normals instead of a bump map. Keep
          // one byte per texel until an exporter asks for the height canvas.
          const output = canvas(width, height);
          const context = output.getContext('2d');
          const image = context.createImageData(width, height);
          const pixels = image.data;
          for (let i = 0; i < count; i++) {
            const k = i * 4;
            pixels[k] = pixels[k + 1] = pixels[k + 2] = heightBytes[i];
            pixels[k + 3] = 255;
          }
          context.putImageData(image, 0, 0);
          heightCanvas = output;
          heightBytes = null;
        }
        return heightCanvas;
      },
      normal: canvas(width, height),
      roughness: canvas(width, height)
    };
    const albedoContext = canvases.albedo.getContext('2d');
    const roughContext = canvases.roughness.getContext('2d');
    const albedoImage = albedoContext.createImageData(width, height);
    const roughImage = roughContext.createImageData(width, height);
    const albedo = albedoImage.data, rough = roughImage.data;
    const coarse = ['fabric', 'leather', 'green'].includes(kind) ? null : grid(3, 3, seed + 1);
    const middle = kind === 'snow' ? null : grid(17, 19, seed + 2);
    const fine = kind === 'gold' ? null : grid(73, 79, seed + 3);
    const grit = kind === 'wood' || kind === 'gold' ? null : grid(191, 197, seed + 4);
    const grainA = kind === 'wood' ? grid(5, 83, seed + 5) : null;
    const grainB = kind === 'wood' ? grid(23, 227, seed + 6) : null;
    const brush = kind === 'gold' ? grid(7, 211, seed + 7) : null;
    for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
      const i = y * width + x, k = i * 4, u = x / width, v = y / height;
      const n0 = coarse ? noise(coarse, u, v) : 0, n1 = middle ? noise(middle, u, v) : 0;
      const n2 = fine ? noise(fine, u, v) : 0, n3 = grit ? noise(grit, u, v) : 0;
      const micro = kind === 'fabric' ? 0 : hash(x, y, seed + 101);
      let level = 1, r = .8, elevation = .5;
      let cr = 1, cg = 1, cb = 1;
      if (kind === 'stucco') {
        const plaster = n2 * .39 + n3 * .38 + micro * .23;
        const pore = smooth(.77, .94, micro) * smooth(.55, .8, n3);
        elevation = clamp(.22 + plaster * .59 - pore * .17 + (n1 - .5) * .028);
        level = .975 + (n0 - .5) * .012 + (plaster - .5) * .035 - pore * .025;
        r = clamp(.78 + plaster * .12 + pore * .03, .76, .94);
        cb = .997;
      } else if (kind === 'paint') {
        const peel = n2 * .53 + n3 * .32 + micro * .15;
        elevation = .35 + peel * .30;
        level = .988 + (n0 - .5) * .008 + (peel - .5) * .022;
        r = .28 + peel * .115 + (n1 - .5) * .025;
      } else if (kind === 'fabric') {
        const warp = Math.pow(Math.max(0, Math.cos(u * Math.PI * 128)), 3);
        const weft = Math.pow(Math.max(0, Math.cos(v * Math.PI * 128)), 3);
        const crossing = ((Math.floor(u * 64) + Math.floor(v * 64)) & 1) ? warp : weft;
        elevation = .35 + crossing * .19 + (n3 - .5) * .09;
        level = .965 + (crossing - .25) * .035 + (n1 - .5) * .02;
        r = .79 + n2 * .13;
      } else if (kind === 'leather') {
        const grain = n2 * .55 + n3 * .35 + micro * .10;
        const pore = smooth(.72, .94, n3) * smooth(.55, .85, micro);
        elevation = .40 + grain * .18 - pore * .10;
        level = .98 + (n1 - .5) * .025 - pore * .035;
        r = .43 + grain * .18;
      } else if (kind === 'wood') {
        // Irregular anisotropic noise is warped slowly along the grain. There
        // are no uniform sine bands, ruler-straight stripes or obvious knots.
        const warp = (n0 - .5) * .024 + (n1 - .5) * .005;
        const broadGrain = noise(grainA, u, v + warp);
        const fineGrain = noise(grainB, u + (n0 - .5) * .006, v + warp * 1.12);
        const latewood = smooth(.49, .85, broadGrain);
        const pores = smooth(.73, .93, fineGrain) * (.5 + .5 * n2);
        elevation = clamp(.46 + (fineGrain - .5) * .16 + (broadGrain - .5) * .15 - pores * .14 + (micro - .5) * .055);
        level = .986 - latewood * .13 - pores * .095 + (n0 - .5) * .018 + (micro - .5) * .013;
        cr = 1; cg = .990 - latewood * .008; cb = .966 - latewood * .014;
        r = clamp(.44 + latewood * .12 + pores * .08 + (n1 - .5) * .045, .40, .68);
      } else if (kind === 'snow') {
        const powder = n2 * .29 + n3 * .44 + micro * .27;
        const crystal = micro > .995 && n3 > .50;
        elevation = clamp(.20 + powder * .65 + (crystal ? .11 : 0));
        level = .988 + (n0 - .5) * .010 + (powder - .5) * .018;
        cr = .998; cg = 1; cb = 1;
        // Sparse low-roughness crystal facets sparkle only when a studio light
        // actually reflects toward the camera. They are never emissive dots.
        r = crystal ? .23 + n2 * .12 : .80 + powder * .14;
      } else if (kind === 'pavement') {
        const aggregate = n2 * .34 + n3 * .40 + micro * .26;
        const damp = smooth(.43, .78, n0 * .65 + n1 * .35);
        const darkStone = smooth(.76, .96, micro) * .055;
        elevation = clamp(.18 + aggregate * .69 - darkStone);
        level = .925 + (aggregate - .5) * .11 - damp * .13 - darkStone;
        cr = .993; cg = .997; cb = 1;
        r = clamp(mix(.71 + aggregate * .13, .30 + n2 * .12, damp), .28, .87);
      } else if (kind === 'gold') {
        const brushing = noise(brush, u + (n0 - .5) * .01, v + (n1 - .5) * .0015);
        elevation = .42 + (brushing - .5) * .20 + (micro - .5) * .055;
        level = .993 + (brushing - .5) * .016 + (n0 - .5) * .006;
        cr = 1; cg = .998; cb = .990;
        r = .17 + brushing * .075 + (micro - .5) * .012;
      } else if (kind === 'green') {
        const wax = n2 * .53 + n3 * .29 + micro * .18;
        elevation = .36 + wax * .28;
        level = .973 + (n1 - .5) * .021 + (wax - .5) * .021;
        r = .48 + wax * .20;
      }
      heights[i] = clamp(elevation);
      heightBytes[i] = Math.round(heights[i] * 255);
      albedo[k] = Math.round(clamp(level * cr) * 255);
      albedo[k + 1] = Math.round(clamp(level * cg) * 255);
      albedo[k + 2] = Math.round(clamp(level * cb) * 255);
      albedo[k + 3] = 255;
      // Preserve rounding through the original Float32 roughness precision.
      rough[k] = rough[k + 1] = rough[k + 2] = Math.round(Math.fround(clamp(r, .04, 1)) * 255);
      rough[k + 3] = 255;
    }
    albedoContext.putImageData(albedoImage, 0, 0);
    roughContext.putImageData(roughImage, 0, 0);
    const normalContext = canvases.normal.getContext('2d');
    const normalImage = normalContext.createImageData(width, height);
    const normal = normalImage.data;
    for (let y = 0; y < height; y++) {
      const row = y * width;
      const aboveRow = (y === 0 ? height - 1 : y - 1) * width;
      const belowRow = (y === height - 1 ? 0 : y + 1) * width;
      for (let x = 0; x < width; x++) {
        const k = (row + x) * 4;
        const left = heights[row + (x === 0 ? width - 1 : x - 1)];
        const right = heights[row + (x === width - 1 ? 0 : x + 1)];
        const above = heights[aboveRow + x], below = heights[belowRow + x];
        let nx = (left - right) * def.normalStrength;
        // Canvas pixels run downward while OpenGL tangent-space +Y runs upward.
        const ny = (below - above) * def.normalStrength;
        if (kind === 'gold') nx *= .25;
        const length = Math.hypot(nx, ny, 1);
        normal[k] = Math.round((nx / length * .5 + .5) * 255);
        normal[k + 1] = Math.round((ny / length * .5 + .5) * 255);
        normal[k + 2] = Math.round((1 / length * .5 + .5) * 255);
        normal[k + 3] = 255;
      }
    }
    normalContext.putImageData(normalImage, 0, 0);
    const surface = {
      kind, width, height, canvases,
      map: texture(canvases.albedo, kind, 'albedo', def.repeat),
      normalMap: texture(canvases.normal, kind, 'normal', def.repeat),
      roughnessMap: texture(canvases.roughness, kind, 'roughness', def.repeat),
      get heightMap() { return heightTexture ??= texture(canvases.height, kind, 'height', def.repeat); },
      repeat: [...def.repeat], normalScale: def.normalScale, bumpScale: def.bumpScale
    };
    cache.set(kind, {
      surface,
      dispose() {
        surface.map.dispose();
        surface.normalMap.dispose();
        surface.roughnessMap.dispose();
        heightTexture?.dispose();
      }
    });
    return surface;
  }
  const textures = {};
  for (const kind of [...Object.keys(defs), ...Object.keys(aliases)]) Object.defineProperty(textures, kind, { enumerable: true, get: () => getSurface(kind) });
  function applyTo(material, kind) {
    if (!material) return material;
    const surface = getSurface(kind);
    material.map = surface.map;
    material.normalMap = surface.normalMap;
    material.normalScale ??= new THREE.Vector2(1, 1);
    material.normalScale.set(surface.normalScale, surface.normalScale);
    material.normalMapType = THREE.TangentSpaceNormalMap;
    material.roughnessMap = surface.roughnessMap;
    // The roughness canvas contains the complete intended roughness, not a
    // second multiplier that accidentally turns stucco or snow into gloss.
    material.roughness = 1;
    material.bumpMap = null;
    if (surface.kind === 'gold') material.metalness = 1;
    material.userData ??= {};
    material.userData.surfaceKind = surface.kind;
    material.userData.proceduralSurface = {
      repeat: [...surface.repeat], normalScale: surface.normalScale,
      bumpScale: surface.bumpScale, albedoPreservesTint: true
    };
    material.needsUpdate = true;
    return material;
  }
  /** Iterates only generated, unique maps. texture.image is the source canvas.
   * Browser: canvas.toBlob()/convertToBlob(); node canvas: toBuffer('image/png'). */
  function forEachTexture(callback) {
    for (const { surface } of cache.values()) for (const role of ['map', 'normalMap', 'roughnessMap', 'heightMap']) callback(surface[role], surface.kind, role);
  }
  function dispose() {
    for (const entry of cache.values()) entry.dispose();
    cache.clear();
  }
  return {
    textures, getSurface, applyTo, forEachTexture, dispose,
    palette: { stucco: 0xeee4d7, paint: 0xbb071b, wood: 0xa8774a, snow: 0xfffdf7, pavement: 0x62636a, gold: 0xe9b554, green: 0x173b25 }
  };
}
