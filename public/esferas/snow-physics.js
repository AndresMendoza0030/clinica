/**
 * Snow-globe powder in ornament-local coordinates. Positions are shared with a
 * THREE.BufferAttribute or Canvas renderer; no particles respawn in the air.
 *
 * step(dt, gravity) accepts seconds and a local downward direction (for example,
 * world down transformed by the inverse ornament quaternion). It uses a fixed
 * 120 Hz simulation so a changing display frame rate does not change the motion.
 */
export function createSnowSimulation({
  count = 620, radius = 1.73, floor = -.78, seed = 712651
} = {}) {
  const finite = (v, fallback) => Number.isFinite(v) ? v : fallback;
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  count = Math.round(clamp(finite(count, 620), 1, 12000));
  radius = clamp(finite(radius, 1.73), .05, 100);
  floor = clamp(finite(floor, -.78), -radius * .98, radius * .85);
  const scale = radius / 1.73;
  const h = 1 / 120;
  const positions = new Float32Array(count * 3);
  const velocities = new Float32Array(count * 3);
  const radii = new Float32Array(count);
  const drag = new Float32Array(count);
  const bed = new Float32Array(count);
  const phase = new Float32Array(count);
  // 0 = moving, 1 = supported by snow bed, 2 = supported by globe wall.
  const sleeping = new Uint8Array(count);
  let randomState = finite(seed, 712651) >>> 0;
  const random = () => {
    randomState = (Math.imul(randomState, 1664525) + 1013904223) >>> 0;
    return randomState / 4294967296;
  };
  let accumulator = 0, time = 0, gust = 0;
  let gx = 0, gy = -1, gz = 0;
  let energy = 0, activity = 0, activeCount = 0, airborneCount = 0;

  function placeOnBed(i) {
    const k = i * 3;
    const y = bed[i], max = Math.sqrt(Math.max(0, (radius - radii[i]) ** 2 - y * y));
    const distance = Math.hypot(positions[k], positions[k + 2]);
    if (distance > max && distance > 0) {
      const factor = max / distance * .9998;
      positions[k] *= factor; positions[k + 2] *= factor;
    }
    positions[k + 1] = y;
    velocities[k] = velocities[k + 1] = velocities[k + 2] = 0;
    sleeping[i] = 1;
  }
  for (let i = 0; i < count; i++) {
    const k = i * 3;
    radii[i] = radius * (.0021 + random() * .0016);
    bed[i] = floor + radii[i] + random() * radius * .004;
    drag[i] = .84 + random() * .72;
    phase[i] = random() * Math.PI * 2;
    const max = Math.sqrt(Math.max(0, (radius - radii[i]) ** 2 - bed[i] ** 2));
    const angle = random() * Math.PI * 2, distance = Math.sqrt(random()) * max * .98;
    positions[k] = Math.cos(angle) * distance;
    positions[k + 2] = Math.sin(angle) * distance;
    positions[k + 1] = bed[i];
    sleeping[i] = 1;
    // A few residual flakes provide a gentle opening moment; most snow rests.
    if (i % 13 === 0) {
      const y = floor + (radius - floor) * (.10 + random() * .70);
      const available = Math.sqrt(Math.max(0, (radius - radii[i]) ** 2 - y * y));
      const rr = Math.sqrt(random()) * available * .96;
      positions[k] = Math.cos(angle) * rr;
      positions[k + 1] = y;
      positions[k + 2] = Math.sin(angle) * rr;
      velocities[k + 1] = -(.015 + random() * .025) * scale;
      sleeping[i] = 0;
    }
  }

  function measure() {
    let e = 0, moving = 0, airborne = 0;
    for (let i = 0; i < count; i++) {
      const k = i * 3;
      e += velocities[k] ** 2 + velocities[k + 1] ** 2 + velocities[k + 2] ** 2;
      if (!sleeping[i]) moving++;
      if (positions[k + 1] > bed[i] + .035 * scale) airborne++;
    }
    energy = e / (2 * count);
    activity = clamp(Math.sqrt(2 * energy) / (1.4 * scale), 0, 1);
    activeCount = moving;
    airborneCount = airborne;
    return activity;
  }

  function integrate() {
    time += h;
    gust *= Math.exp(-h / .85);
    const gravityStrength = .58 * scale;
    const ax = gx * gravityStrength, ay = gy * gravityStrength, az = gz * gravityStrength;
    const floorSupports = gy < -.15 && Math.hypot(gx, gz) < -gy * .70;
    for (let i = 0; i < count; i++) {
      const k = i * 3;
      let x = positions[k], y = positions[k + 1], z = positions[k + 2];
      const limit = radius - radii[i];
      if (sleeping[i] === 1) {
        if (floorSupports) continue;
        sleeping[i] = 0;
      } else if (sleeping[i] === 2) {
        const length = Math.hypot(x, y, z) || 1;
        const dot = (gx * x + gy * y + gz * z) / length;
        const tangent = Math.sqrt(Math.max(0, gx * gx + gy * gy + gz * gz - dot * dot));
        if (dot > 0 && tangent < .10) continue;
        sleeping[i] = 0;
      }
      let vx = velocities[k], vy = velocities[k + 1], vz = velocities[k + 2];
      const damping = Math.exp(-drag[i] * h);
      // A brief, decaying swirl belongs to the shake, not to calm snowfall.
      const swirl = gust * .11 * scale;
      vx = (vx + (ax + Math.sin(phase[i] + time * 2.1) * swirl) * h) * damping;
      vy = (vy + ay * h) * damping;
      vz = (vz + (az + Math.cos(phase[i] + time * 1.8) * swirl) * h) * damping;
      x += vx * h; y += vy * h; z += vz * h;
      let floorContact = false, wallContact = false;
      if (y < bed[i]) {
        y = bed[i]; floorContact = true;
        if (vy < 0) vy = -vy * .035;
        const friction = Math.exp(-11 * h);
        vx *= friction; vz *= friction;
      }
      const distance = Math.hypot(x, y, z);
      if (distance > limit) {
        wallContact = true;
        const nx = x / distance, ny = y / distance, nz = z / distance;
        x = nx * limit; y = ny * limit; z = nz * limit;
        const outward = vx * nx + vy * ny + vz * nz;
        if (outward > 0) {
          vx -= nx * outward * 1.025;
          vy -= ny * outward * 1.025;
          vz -= nz * outward * 1.025;
        }
        // Contact gently loses tangential energy without a rubbery rebound.
        const surfaceDrag = Math.exp(-1.1 * h);
        vx *= surfaceDrag; vy *= surfaceDrag; vz *= surfaceDrag;
      }
      // This also handles a nondefault positive floor: sphere and bed must both
      // constrain the particle after the wall projection.
      if (y < bed[i]) {
        y = bed[i]; floorContact = true;
        if (vy < 0) vy = 0;
        const rr = Math.hypot(x, z);
        const max = Math.sqrt(Math.max(0, limit * limit - y * y));
        if (rr > max && rr > 0) { x *= max / rr; z *= max / rr; }
      }
      if (floorContact && floorSupports && vx * vx + vy * vy + vz * vz < .0015 * scale * scale) {
        vx = vy = vz = 0; y = bed[i]; sleeping[i] = 1;
      } else if (wallContact && vx * vx + vy * vy + vz * vz < .0010 * scale * scale) {
        const length = Math.hypot(x, y, z) || 1;
        const dot = (gx * x + gy * y + gz * z) / length;
        const tangent = Math.sqrt(Math.max(0, gx * gx + gy * gy + gz * gz - dot * dot));
        if (dot > 0 && tangent < .08) { vx = vy = vz = 0; sleeping[i] = 2; }
      }
      // Float32 storage can round a projected boundary outward by one ULP.
      // The tiny inset keeps the public particle centers strictly within R.
      if (x * x + y * y + z * z > (radius - radii[i] * .90) ** 2) {
        const factor = (radius - radii[i]) / Math.hypot(x, y, z) * .999999;
        x *= factor; y *= factor; z *= factor;
      }
      positions[k] = x; positions[k + 1] = y; positions[k + 2] = z;
      velocities[k] = vx; velocities[k + 1] = vy; velocities[k + 2] = vz;
    }
  }

  function step(dt, gravity = { x: 0, y: -1, z: 0 }) {
    dt = clamp(finite(dt, 0), 0, .125);
    if (!dt) return activity;
    const x = finite(gravity?.x, 0), y = finite(gravity?.y, -1), z = finite(gravity?.z, 0);
    const length = Math.hypot(x, y, z);
    gx = length > 1e-9 ? x / length : 0;
    gy = length > 1e-9 ? y / length : 0;
    gz = length > 1e-9 ? z / length : 0;
    accumulator = Math.min(accumulator + dt, .14);
    let steps = 0;
    while (accumulator + 1e-10 >= h && steps++ < 17) {
      integrate(); accumulator -= h;
    }
    if (accumulator < 0) accumulator = 0;
    return measure();
  }

  /** Direction is a normalized agitation hint, strength is bounded [0, 2.5].
   * Even a horizontal gesture lifts powder from the bed before it falls again. */
  function shake({ x = 0, y = 0, z = 0, strength = 1 } = {}) {
    strength = clamp(finite(strength, 1), 0, 2.5);
    if (!strength) return activity;
    x = finite(x, 0); y = finite(y, 0); z = finite(z, 0);
    const length = Math.hypot(x, y, z);
    if (length > 1e-9) { x /= length; y /= length; z /= length; }
    gust = Math.min(2.5, gust + strength);
    for (let i = 0; i < count; i++) {
      const k = i * 3;
      const radial = Math.hypot(positions[k], positions[k + 2]);
      const sign = i % 2 ? 1 : -1;
      const tx = radial > .01 ? -positions[k + 2] / radial : Math.cos(phase[i]);
      const tz = radial > .01 ? positions[k] / radial : Math.sin(phase[i]);
      const lift = (1.65 + random() * .72 + Math.abs(y) * .15) * scale * strength;
      velocities[k] += (x * .70 + tx * sign * (.27 + random() * .40) - gx * .12) * scale * strength;
      velocities[k + 1] += lift;
      velocities[k + 2] += (z * .70 + tz * sign * (.27 + random() * .40) - gz * .12) * scale * strength;
      const speed = Math.hypot(velocities[k], velocities[k + 1], velocities[k + 2]);
      const maxSpeed = 4.0 * scale;
      if (speed > maxSpeed) {
        const factor = maxSpeed / speed;
        velocities[k] *= factor; velocities[k + 1] *= factor; velocities[k + 2] *= factor;
      }
      sleeping[i] = 0;
    }
    return measure();
  }

  function settle() {
    for (let i = 0; i < count; i++) placeOnBed(i);
    accumulator = 0; gust = 0;
    return measure();
  }
  measure();
  return {
    positions, velocities, radii, count, radius, floor, step, shake, settle,
    get energy() { return energy; },
    get activity() { return activity; },
    get activeCount() { return activeCount; },
    get airborneCount() { return airborneCount; },
    get time() { return time; }
  };
}
