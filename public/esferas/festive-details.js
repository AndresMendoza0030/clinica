import {addWinterPine, createFestiveBatches} from './vegetation.js';

// Canonical x/z coordinates agreed with the room-furnishing layout. Each reserved
// patch stays in front of the furniture and within the physical window opening.
export const FESTIVE_ROOM_PLACEMENTS = Object.freeze({
  reception: Object.freeze({ x: -.35, z: .40 }),
  waiting: Object.freeze({ x: -.35, z: .40 }),
  laboratory: Object.freeze({ x: .35, z: .40 }),
  radiology: Object.freeze({ x: -.35, z: .40 }),
  office: Object.freeze({ x: .35, z: .40 }),
  examination: Object.freeze({ x: .35, z: .40 })
});

export function addFestiveRoomDetails(THREE, parent, {
  kind, width = .835, depth = .90, height = .64, seed = 1
} = {}) {
  const patch = FESTIVE_ROOM_PLACEMENTS[kind];
  if (!patch) throw new RangeError('Unknown festive room: ' + kind);
  if (!(width > 0 && depth > 0 && height > 0)) throw new RangeError('Room dimensions must be positive.');
  let state = seed >>> 0;
  const random = () => { state = (Math.imul(state, 1664525) + 1013904223) >>> 0; return state / 4294967296; };
  const group = new THREE.Group(); group.name = kind + ' · physical Christmas decorations'; parent.add(group);
  const scaleY = height / .64, treeHeight = (.330 + random() * .025) * scaleY;
  const treeRadius = .095 * Math.min(width, depth), cx = patch.x * width, cz = patch.z * depth;
  const towardCentre = patch.x < 0 ? 1 : -1;
  const gifts = [
    { x: towardCentre * .067 * width, z: .045 * depth, w: .046 * width, h: .041 * scaleY, d: .047 * depth, color: 0xab172b, ribbon: 0xe7be61, rotation: -.16 * towardCentre },
    { x: towardCentre * .035 * width, z: -.045 * depth, w: .054 * width, h: .032 * scaleY, d: .041 * depth, color: 0xe8ddbd, ribbon: 0xad1a2e, rotation: .19 * towardCentre }
  ];
  const tree = addWinterPine(THREE, group, {
    x: cx, y: 0, z: cz, height: treeHeight, radius: treeRadius, seed,
    indoor: true, detail: 'low', snow: false, container: 'basket', gifts
  });
  group.userData = {
    kind, treeCount: 1, giftCount: gifts.length, naturalTreeWithoutSnow: true,
    canonicalPosition: { ...patch }, treePosition: { x: cx, y: 0, z: cz },
    treeHeight, foliageRadius: treeRadius, drawCalls: tree.userData.drawCalls, triangles: tree.userData.triangles
  };
  return group;
}

/** A dense, dimensional wreath: actual needles and twigs, polished ornaments,
 * warm beads, and a solid folded cloth bow instead of a torus and flat card. */
export function addEvergreenWreath(THREE, parent, {
  x = 0, y = 0, z = 0, radius = .113, seed = 27
} = {}) {
  if (!(radius > 0)) throw new RangeError('Wreath radius must be positive.');
  const b = createFestiveBatches(THREE), { V } = b, r = radius;
  let state = seed >>> 0;
  const random = () => { state = (Math.imul(state, 1664525) + 1013904223) >>> 0; return state / 4294967296; };
  const greens = [0x123c25, 0x1c4c2c, 0x285b36, 0x0c2d1b, 0x315e37];
  const backing = [];
  for (let i = 0; i <= 48; i++) { const a = i / 48 * Math.PI * 2; backing.push(V(Math.cos(a) * r * .85, Math.sin(a) * r * .85, -.018 * r)); }
  b.tube(backing, r * .035, 0x624526, 0, 5);
  for (let i = 0; i < 36; i++) {
    const a = i / 36 * Math.PI * 2;
    const radial = V(Math.cos(a), Math.sin(a), 0), tangent = V(-Math.sin(a), Math.cos(a), 0);
    const origin = radial.clone().multiplyScalar(r * (.82 + random() * .07));
    origin.z = (random() - .3) * r * .13;
    const end = origin.clone().addScaledVector(tangent, r * .31).addScaledVector(radial, r * .06);
    b.rod(origin, end, r * .012, r * .003, 0x6f4e29, 0, 4);
    for (let twig = 0; twig < 3; twig++) {
      const p = origin.clone().lerp(end, .12 + twig * .31);
      const direction = tangent.clone().multiplyScalar(.53).addScaledVector(radial, (twig % 2 ? -.35 : .62)).add(V(0, 0, .28)).normalize();
      const tip = p.clone().addScaledVector(direction, r * (.22 + random() * .07));
      b.rod(p, tip, r * .005, r * .001, 0x5c4528, 0, 4);
      for (let n = 0; n < 7; n++) {
        const centre = p.clone().lerp(tip, n / 7);
        for (const side of [-1, 1]) {
          const d = direction.clone().multiplyScalar(.5).addScaledVector(radial, side * .62).add(V(0, 0, .24 + random() * .25));
          b.needle(centre, d, r * (.20 + random() * .09), r * .017, greens[Math.floor(random() * greens.length)]);
        }
      }
    }
  }
  for (let i = 0; i < 18; i++) {
    const a = i / 18 * Math.PI * 2 + .11, rr = r * (.78 + random() * .15);
    const p = V(Math.cos(a) * rr, Math.sin(a) * rr, r * (.14 + random() * .10));
    b.ellipsoid(p, V(r * .057, r * .061, r * .057), i % 4 === 0 ? 0xe7be61 : 0xb71328, 1, 10, 6);
    if (i % 3 === 0) b.ellipsoid(p.clone().add(V(r * .073, -r * .018, -r * .013)), V(r * .041, r * .044, r * .041), 0xb00c25, 1, 8, 5);
  }
  for (let i = 0; i < 9; i++) {
    const a = i / 9 * Math.PI * 2 + .37;
    b.ellipsoid(V(Math.cos(a) * r * .89, Math.sin(a) * r * .89, r * .25), V(r * .027, r * .032, r * .027), 0xffd28c, 2, 6, 4);
  }
  const convert = path => path.map(p => V(p[0] * r, p[1] * r, p[2] * r));
  // The loop and tails fold forward/back in Z and have closed thickness.
  for (const side of [-1, 1]) {
    b.ribbon(convert([[0, .77, .35], [side * .28, .99, .43], [side * .57, 1.04, .35], [side * .57, .74, .30], [side * .26, .62, .43], [0, .77, .35]]), r * .18, r * .030, 0xb10d26);
    b.ribbon(convert([[side * .08, .72, .34], [side * .20, .42, .46], [side * .16, .10, .39], [side * .33, -.22, .30]]), r * .20, r * .028, side < 0 ? 0xa80b24 : 0xc0142c);
  }
  b.ellipsoid(V(0, r * .77, r * .43), V(r * .16, r * .13, r * .13), 0xc1162d, 0, 12, 8);
  const group = b.finish(parent, 'Needle evergreen wreath and folded ribbon');
  group.position.set(x, y, z);
  Object.assign(group.userData, { radius, seed, physicalNeedles: true, foldedSolidBow: true, warmBulbs: 9 });
  return group;
}
