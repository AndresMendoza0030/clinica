const finite = (n, fallback = 0) => Number.isFinite(n) ? n : fallback;
const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));

/** Pure pointer-motion detector. Distances are CSS pixels and time is ms.
 * A steady drag rotates normally; a fast reversal or sudden jerk agitates snow.
 * push() returns a shake hint or null, and calls the optional callback once. */
export function createShakeGestureDetector({ minInterval = 140, onShake } = {}) {
  minInterval = Math.max(0, finite(minInterval, 140));
  let previousTime = null, vx = 0, vy = 0, lastShake = -Infinity;
  function reset(time = null) {
    previousTime = Number.isFinite(time) ? time : null;
    vx = vy = 0;
  }
  function push(dx, dy, time) {
    dx = clamp(finite(dx), -180, 180);
    dy = clamp(finite(dy), -180, 180);
    time = finite(time, (previousTime ?? 0) + 16);
    let elapsed = previousTime === null ? 16 : time - previousTime;
    if (elapsed > 150 || elapsed <= 0) {
      previousTime = time; vx = vy = 0; return null;
    }
    // A suspended/coalesced event must not turn slow movement into a jerk.
    const dt = clamp(elapsed, 8, 80);
    const nx = dx / dt, ny = dy / dt;
    const speed = Math.hypot(nx, ny), previousSpeed = Math.hypot(vx, vy);
    const acceleration = Math.hypot(nx - vx, ny - vy) / dt;
    const cosine = speed * previousSpeed > 1e-8 ? (nx * vx + ny * vy) / (speed * previousSpeed) : 1;
    const reversal = speed > .48 && previousSpeed > .48 && cosine < -.32;
    const jerk = speed > 1.35 && acceleration > .055;
    previousTime = time; vx = nx; vy = ny;
    if ((!reversal && !jerk) || time - lastShake < minInterval) return null;
    lastShake = time;
    const norm = Math.max(speed, 1e-6);
    const hint = {
      x: clamp(nx / norm, -1, 1), y: .5, z: clamp(-ny / norm, -1, 1),
      strength: clamp(.32 + speed * .18 + acceleration * 2, .35, 1.15)
    };
    onShake?.(hint);
    return hint;
  }
  return { push, reset };
}

/** Shared native-WebGL and rendered-frame controls.
 * onRotate receives delta yaw/pitch in radians. onZoom receives a multiplier:
 * greater than 1 means closer. Device motion starts only when the caller invokes
 * requestMotionPermission() from an explicit user gesture. */
export function installOrnamentGestures({
  element,
  onRotate = () => {}, onZoom = () => {}, onShake = () => {},
  onInteract = () => {}, onReset = () => {}
} = {}) {
  if (!element?.addEventListener) throw new TypeError('An interactive element is required.');
  const win = element.ownerDocument?.defaultView ?? globalThis.window ?? globalThis;
  const now = () => win.performance?.now?.() ?? Date.now();
  const bindings = [], pointers = new Map();
  const previousTouchAction = element.style?.touchAction;
  const previousTabIndex = element.getAttribute?.('tabindex');
  let disposed = false, pinchDistance = 0, lastShake = -Infinity;
  let lastTap = null, lastTouchInput = -Infinity, suppressDragShake = false;
  let motionEnabled = false, motionRequest = null;
  let gravityX = 0, gravityY = 0, gravityZ = 0, hasGravity = false, lastMotionTime = 0;
  let motionReadyAt = 0, motionLatched = false, highX = 0, highY = 0, highZ = 0;
  if (element.style) element.style.touchAction = 'none';
  if (element.tabIndex < 0) element.tabIndex = 0;
  function listen(target, type, fn, options) {
    if (!target?.addEventListener) return;
    target.addEventListener(type, fn, options);
    bindings.push(() => target.removeEventListener(type, fn, options));
  }
  const eventTime = event => finite(event?.timeStamp, now());
  const prevent = event => { if (event.cancelable !== false) event.preventDefault?.(); };
  const isControl = target => target !== element && !!(target?.isContentEditable || target?.closest?.('button,a,input,textarea,select,[contenteditable=""],[contenteditable="true"],[contenteditable="plaintext-only"]'));
  function emitShake(hint, force = false) {
    if (disposed) return false;
    const time = now();
    if (!force && time - lastShake < 140) return false;
    lastShake = time;
    onShake(hint);
    return true;
  }
  const detector = createShakeGestureDetector({ onShake: hint => emitShake(hint) });
  const distance = () => {
    if (pointers.size < 2) return 0;
    const [a, b] = pointers.values();
    return Math.hypot(a.x - b.x, a.y - b.y);
  };
  function pointerDown(event) {
    if (disposed || isControl(event.target) || (event.button != null && event.button !== 0)) return;
    const x = finite(event.clientX), y = finite(event.clientY), time = eventTime(event);
    pointers.set(event.pointerId, { x, y, startX: x, startY: y, started: time, moved: false, multiTouch: false, type: event.pointerType });
    if (event.pointerType === 'touch') lastTouchInput = now();
    if (pointers.size > 1) {
      for (const pointer of pointers.values()) pointer.multiTouch = true;
      lastTap = null; suppressDragShake = true;
    } else suppressDragShake = false;
    try { element.setPointerCapture(event.pointerId); } catch { /* capture may be unavailable */ }
    if (pointers.size === 1) {
      try { element.focus?.({ preventScroll: true }); } catch { element.focus?.(); }
    }
    pinchDistance = distance();
    detector.reset(eventTime(event));
    onInteract(); prevent(event);
  }
  function pointerMove(event) {
    const prior = pointers.get(event.pointerId);
    if (!prior || disposed) return;
    if (event.pointerType === 'mouse' && event.buttons === 0) { pointerEnd(event); return; }
    const x = finite(event.clientX, prior.x), y = finite(event.clientY, prior.y);
    const dx = clamp(x - prior.x, -180, 180), dy = clamp(y - prior.y, -180, 180);
    prior.x = x; prior.y = y;
    prior.moved ||= (x - prior.startX) ** 2 + (y - prior.startY) ** 2 > 100;
    if (pointers.size >= 2) {
      const next = distance();
      if (next > 2 && pinchDistance > 2 && Math.abs(next - pinchDistance) > .001) {
        onInteract(); onZoom(clamp(next / pinchDistance, .70, 1.40));
      }
      pinchDistance = next;
      detector.reset(eventTime(event));
    } else {
      if (dx || dy) { onInteract(); onRotate(dx * .008, dy * .0065); }
      if (suppressDragShake) { detector.reset(eventTime(event)); suppressDragShake = false; }
      else detector.push(dx, dy, eventTime(event));
    }
    prevent(event);
  }
  function pointerEnd(event) {
    const pointer = pointers.get(event.pointerId);
    if (!pointer) return;
    const time = eventTime(event), endedNormally = event.type === 'pointerup';
    if (pointer.type === 'touch') {
      lastTouchInput = now();
      const x = finite(event.clientX, pointer.x), y = finite(event.clientY, pointer.y);
      const tap = endedNormally && !pointer.multiTouch && !pointer.moved && pointers.size === 1 &&
        time - pointer.started >= 0 && time - pointer.started <= 320 && (x - pointer.startX) ** 2 + (y - pointer.startY) ** 2 <= 100;
      if (tap) {
        if (lastTap && time - lastTap.time > 0 && time - lastTap.time <= 360 && (x - lastTap.x) ** 2 + (y - lastTap.y) ** 2 <= 28 ** 2) {
          onInteract(); emitShake({ x: 0, y: 1, z: 0, strength: .85 }, true); lastTap = null;
        } else lastTap = { x, y, time };
      } else lastTap = null;
    }
    pointers.delete(event.pointerId);
    try {
      if (element.hasPointerCapture?.(event.pointerId)) element.releasePointerCapture(event.pointerId);
    } catch { /* capture can already have ended */ }
    pinchDistance = distance(); detector.reset(eventTime(event));
    suppressDragShake = pointers.size === 1 && pointer.multiTouch;
  }
  function wheel(event) {
    if (disposed || isControl(event.target)) return;
    const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? Math.max(100, element.clientHeight || 500) : 1;
    const factor = clamp(Math.exp(-finite(event.deltaY) * unit * .0012), .75, 1.33);
    onInteract(); onZoom(factor); prevent(event);
  }
  function keyDown(event) {
    if (disposed || isControl(event.target) || event.isComposing || event.altKey || event.ctrlKey || event.metaKey) return;
    const increment = event.shiftKey ? .16 : .085;
    let handled = true;
    switch (event.key) {
      case 'ArrowLeft': onInteract(); onRotate(-increment, 0); break;
      case 'ArrowRight': onInteract(); onRotate(increment, 0); break;
      case 'ArrowUp': onInteract(); onRotate(0, -increment); break;
      case 'ArrowDown': onInteract(); onRotate(0, increment); break;
      case '+': case '=': case 'Add': onInteract(); onZoom(1.10); break;
      case '-': case '_': case 'Subtract': onInteract(); onZoom(1 / 1.10); break;
      case 'Home': onInteract(); onReset(); break;
      case ' ': case 'Spacebar':
        if (!event.repeat) { onInteract(); emitShake({ x: 0, y: 1, z: 0, strength: .85 }, true); }
        break;
      default: handled = false;
    }
    if (handled) prevent(event);
  }
  function doubleClick(event) {
    if (disposed || isControl(event.target)) return;
    // Touch double taps are recognized from pointers, including browsers which
    // omit dblclick. Ignore their subsequent compatibility mouse event.
    const fromTouch = event.pointerType === 'touch' || event.sourceCapabilities?.firesTouchEvents === true ||
      (!event.pointerType && event.sourceCapabilities == null && now() - lastTouchInput < 600);
    if (fromTouch) { prevent(event); return; }
    onInteract(); emitShake({ x: 0, y: 1, z: 0, strength: .85 }, true); prevent(event);
  }
  function cancelPointers() {
    const ids = [...pointers.keys()]; pointers.clear(); pinchDistance = 0;
    lastTap = null; suppressDragShake = false; detector.reset();
    for (const id of ids) {
      try { if (element.hasPointerCapture?.(id)) element.releasePointerCapture(id); } catch { /* capture may already be gone */ }
    }
  }
  function resetMotionBaseline() {
    hasGravity = false; lastMotionTime = 0; motionLatched = false; highX = highY = highZ = 0; motionReadyAt = now() + 200;
  }
  listen(element, 'pointerdown', pointerDown);
  listen(element, 'pointermove', pointerMove, { passive: false });
  listen(element, 'pointerup', pointerEnd);
  listen(element, 'pointercancel', pointerEnd);
  listen(element, 'lostpointercapture', pointerEnd);
  listen(element, 'wheel', wheel, { passive: false });
  listen(element, 'keydown', keyDown);
  listen(element, 'dblclick', doubleClick);
  listen(win, 'pointermove', event => {
    if (event.target !== element && !element.contains?.(event.target)) pointerMove(event);
  }, { passive: false });
  listen(win, 'pointerup', pointerEnd);
  listen(win, 'pointercancel', pointerEnd);
  listen(win, 'blur', () => { cancelPointers(); resetMotionBaseline(); });
  listen(element.ownerDocument, 'visibilitychange', () => { cancelPointers(); resetMotionBaseline(); });

  function motion(event) {
    if (!motionEnabled || disposed || element.ownerDocument?.hidden) return;
    const time = now();
    if (time < motionReadyAt) { lastMotionTime = time; return; }
    if (lastMotionTime && time - lastMotionTime > 600) { hasGravity = false; motionLatched = false; }
    let x = event.acceleration?.x, y = event.acceleration?.y, z = event.acceleration?.z;
    if (![x, y, z].every(Number.isFinite)) {
      const raw = event.accelerationIncludingGravity;
      if (!raw || ![raw.x, raw.y, raw.z].every(Number.isFinite)) return;
      if (!hasGravity) {
        gravityX = raw.x; gravityY = raw.y; gravityZ = raw.z; hasGravity = true;
        lastMotionTime = time; return;
      }
      const dt = clamp((time - lastMotionTime) / 1000, .008, .1);
      const smoothing = 1 - Math.exp(-dt / .45);
      gravityX += (raw.x - gravityX) * smoothing;
      gravityY += (raw.y - gravityY) * smoothing;
      gravityZ += (raw.z - gravityZ) * smoothing;
      x = raw.x - gravityX; y = raw.y - gravityY; z = raw.z - gravityZ;
      // Rotating a resting phone changes gravity's direction, not magnitude.
      // Without linear acceleration this must not be interpreted as a shake.
      if (Math.abs(Math.hypot(raw.x, raw.y, raw.z) - 9.81) < 2) { lastMotionTime = time; motionLatched = false; return; }
    }
    lastMotionTime = time;
    x = clamp(x, -70, 70); y = clamp(y, -70, 70); z = clamp(z, -70, 70);
    const magnitude = Math.hypot(x, y, z);
    if (magnitude < 3.5) motionLatched = false;
    if (magnitude < 8.0) return;
    const hint = { x: x / magnitude, y: y / magnitude, z: z / magnitude, strength: clamp(magnitude / 19, .40, 1.30) };
    const reversal = hint.x * highX + hint.y * highY + hint.z * highZ < -.25;
    if ((!motionLatched || reversal) && emitShake(hint)) {
      motionLatched = true; highX = hint.x; highY = hint.y; highZ = hint.z; onInteract();
    }
  }
  function requestMotionPermission() {
    if (disposed) return Promise.resolve(false);
    if (motionEnabled) return Promise.resolve(true);
    if (motionRequest) return motionRequest;
    const DeviceMotion = win.DeviceMotionEvent;
    if (!DeviceMotion) return Promise.resolve(false);
    // The permission call executes synchronously up to its first await, keeping
    // Safari's user-gesture requirement intact. Nothing invokes this on load.
    const request = (async () => {
      try {
        if (typeof DeviceMotion.requestPermission === 'function') {
          const permission = await DeviceMotion.requestPermission();
          if (permission !== 'granted' || disposed) return false;
        }
        if (disposed) return false;
        motionEnabled = true; resetMotionBaseline();
        listen(win, 'devicemotion', motion, { passive: true });
        return true;
      } catch { return false; }
    })();
    motionRequest = request;
    request.then(() => { if (motionRequest === request) motionRequest = null; });
    return request;
  }
  function dispose() {
    if (disposed) return;
    disposed = true; motionEnabled = false;
    cancelPointers();
    for (const remove of bindings.splice(0)) remove();
    if (element.style) element.style.touchAction = previousTouchAction ?? '';
    if (previousTabIndex == null) element.removeAttribute?.('tabindex');
    else element.setAttribute?.('tabindex', previousTabIndex);
  }
  return { requestMotionPermission, dispose, get isDragging() { return pointers.size > 0; } };
}
