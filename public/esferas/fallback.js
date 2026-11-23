import {getBranchViewer} from './branch-viewers.js';
import {createSnowLayers} from './snow-layers.js';
import {createCanvasSnow} from './snow-canvas.js';
import {installOrnamentGestures} from './gesture-controls.js';
import {createFrameCache} from './frame-cache.js';
import {describeView,AUTO_ORBIT_SPEED} from './view-orientation.js';

const FRAME_COUNT = 36;
const FRAME_STEP = 2 * Math.PI / FRAME_COUNT;
const PAINT_INTERVAL = 32;

function frameForYaw(yaw) {
  const index = Math.round(yaw / FRAME_STEP) % FRAME_COUNT;
  return (index + FRAME_COUNT) % FRAME_COUNT;
}

// Complete renders of the shared 3D scene, including its image-based interiors.
export async function startFallback({host,branch='advanced'}){
  const profile=getBranchViewer(branch);
  const $=id=>document.getElementById(id);
  const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
  const canvas=document.createElement('canvas');
  const context=canvas.getContext('2d',{alpha:true});
  if(!context)throw new Error('Canvas no disponible');
  canvas.style.position='absolute';canvas.style.inset='0';
  canvas.setAttribute('role','img');
  canvas.setAttribute('aria-label','Esfera giratoria de '+profile.name+'. Arrastre para girar, use la rueda o pellizque para acercar. Espacio o doble toque para agitar la nieve; Inicio para recentrar.');
  host.prepend(canvas);host.tabIndex=0;
  const reducedMotion=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches||false;
  const snow=createSnowLayers({radius:1.73,floor:-.78,seed:731,reducedMotion});
  const snowCanvas=createCanvasSnow({makeCanvas:()=>document.createElement('canvas'),seed:snow.seed,size:256,profile});
  const pitch=.16;
  const cleanups=[];
  let yaw=0,zoom=.90,automatic=false,width=1,height=1,dpr=1;
  let ready=false,dirty=true,stopped=false,lastFrame=0,requestedFrame=-1;
  let frameTime=null,raf=null,glassImage=null,viewer=null;
  const glassRequest = new AbortController();
  const listen=(target,type,fn,options)=>{
    target.addEventListener(type,fn,options);
    cleanups.push(()=>target.removeEventListener(type,fn,options));
  };
  function loadImage(src, signal) {
    if (signal.aborted) return Promise.resolve(null);
    return new Promise(resolve => {
      const image = new Image();
      image.decoding = 'async';
      let settled = false;
      function finish(success) {
        if (settled) return;
        settled = true;
        signal.removeEventListener('abort', abort);
        image.onload = image.onerror = null;
        if (!success) image.removeAttribute('src');
        resolve(success ? image : null);
      }
      const abort = () => finish(false);
      signal.addEventListener('abort', abort, { once: true });
      image.onload = () => {
        if (typeof image.decode === 'function') image.decode().then(() => finish(true), abort);
        else finish(true);
      };
      image.onerror = abort;
      image.src = src;
    });
  }
  const frameCache = createFrameCache({
    frameCount: FRAME_COUNT, limit: 9, concurrency: 3,
    load(index, { signal }) {
      return loadImage(`${profile.frames}/frame-${String(index).padStart(3, '0')}.webp`, signal);
    },
    onChange(index, status) {
      if (status === 'loaded' && index === frameForYaw(yaw)) invalidate();
    }
  });
  function protectFrames() {
    frameCache.setProtected([requestedFrame, requestedFrame - 1, requestedFrame + 1, lastFrame]);
  }
  function requestView() {
    const index = frameForYaw(yaw);
    if (index === requestedFrame) return;
    requestedFrame = index;
    protectFrames();
    if (index !== lastFrame && frameCache.peek(index)) dirty = true;
    frameCache.request(index);
    frameCache.request(index - 1);
    frameCache.request(index + 1);
  }
  function updateViewStatus(angle) {
    const view = describeView(angle);
    $('angleValue').textContent = `${view.angle}°`;
    if ($('viewLabel').textContent !== view.label) $('viewLabel').textContent = view.label;
  }
  function setAuto(value) {
    if (automatic === value) return;
    automatic = value;
    const button = $('toggleAuto');
    button.setAttribute('aria-pressed', String(value));
    button.title = value ? 'Pausar giro automático' : 'Activar giro automático';
    wake();
  }
  function reset() {
    yaw = 0;
    zoom = .90;
    setAuto(false);
    invalidate();
  }
  function resize() {
    const nextWidth = Math.max(1, host.clientWidth);
    const nextHeight = Math.max(1, host.clientHeight);
    const nextDpr = Math.min(window.devicePixelRatio || 1, 1.5);
    if (nextWidth === width && nextHeight === height && nextDpr === dpr) return;
    width = nextWidth;
    height = nextHeight;
    dpr = nextDpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    invalidate();
  }
  const observer = new ResizeObserver(resize);
  observer.observe(host);
  resize();
  function layout(){
    const expanded=!!document.fullscreenElement||document.body.classList.contains('expanded');
    const margin=Math.max(14,Math.min(26,width*.025));
    const top=width<601&&!expanded?Math.min(78,height*.18):margin;
    const bottom=Math.max(24,margin);
    // The model occupies image x .165..835 and y .08..91, including its ring.
    const fit=Math.max(1,Math.min((width-margin*2)/.67,(height-top-bottom)/.83));
    const size=fit*zoom;
    return {size,x:width/2-size*.5,y:top+(height-top-bottom)/2-size*.495};
  }
  function drawGlass(fit){
    const {size,x,y}=fit,cx=x+size*.5,cy=y+size*.574074074,r=size/3;
    context.save();
    const rim=context.createRadialGradient(cx,cy,r*.55,cx,cy,r);
    rim.addColorStop(0,'rgba(255,247,223,0)');
    rim.addColorStop(.66,'rgba(255,247,223,.006)');
    rim.addColorStop(.87,'rgba(255,242,206,.035)');
    rim.addColorStop(.97,'rgba(255,248,226,.10)');
    rim.addColorStop(1,'rgba(255,250,239,.15)');
    context.beginPath();context.arc(cx,cy,r,0,Math.PI*2);
    context.fillStyle=rim;context.fill();
    context.strokeStyle='rgba(255,247,223,.27)';context.lineWidth=.8;
    context.shadowColor='rgba(255,237,192,.15)';context.shadowBlur=2;context.stroke();
    context.shadowBlur=0;
    // Broad, restrained studio reflections follow the uncut round glass surface.
    context.beginPath();context.arc(cx,cy,r*.94,0,Math.PI*2);context.clip();
    for(const s of [-1,1]){
      context.save();
      context.translate(cx+s*r*.52,cy-r*.56);context.rotate(s*.57);
      context.scale(s<0?.57:.42,1.20);
      const reflection=context.createRadialGradient(0,0,0,0,0,r*.28);
      reflection.addColorStop(0,'rgba(255,255,251,.15)');
      reflection.addColorStop(.55,'rgba(255,255,251,.10)');
      reflection.addColorStop(1,'rgba(255,255,251,0)');
      context.fillStyle=reflection;
      context.beginPath();context.arc(0,0,r*.28,0,Math.PI*2);context.fill();
      context.restore();
    }
    context.restore();
  }
  function draw(elapsed) {
    snow.step(elapsed);
    const desired = frameForYaw(yaw);
    const desiredImage = frameCache.peek(desired);
    const index = desiredImage ? desired : lastFrame;
    const image = desiredImage || frameCache.peek(lastFrame);
    if (!image) return;

    // Resize and repaint in the same callback, keeping the previous image filled
    // between an observer notification and the next scheduled render.
    const pixelsWide = Math.round(width * dpr);
    const pixelsHigh = Math.round(height * dpr);
    if (canvas.width !== pixelsWide) canvas.width = pixelsWide;
    if (canvas.height !== pixelsHigh) canvas.height = pixelsHigh;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.clearRect(0, 0, width, height);
    const fit = layout(), angle = index * FRAME_STEP;
    const layers = snow.getLayers();
    snowCanvas.draw(context, { near: false, layers, fit, yaw: angle, pitch });
    context.drawImage(image, fit.x, fit.y, fit.size, fit.size);
    snowCanvas.draw(context, { near: true, layers, fit, yaw: angle, pitch });
    if (glassImage) context.drawImage(glassImage, fit.x, fit.y, fit.size, fit.size);
    else drawGlass(fit);

    // Commit the caption and occlusion pose with the pixels they describe.
    if (index !== lastFrame) {
      lastFrame = index;
      protectFrames();
      updateViewStatus(angle);
    }
    dirty = false;
  }
  function hasWork() {
    return dirty || automatic || snow.active || frameForYaw(yaw) !== requestedFrame;
  }
  function wake() {
    if (!ready || stopped || document.hidden || raf !== null || !hasWork()) return;
    if (frameTime === null) frameTime = performance.now();
    raf = requestAnimationFrame(tick);
  }
  function invalidate() {
    dirty = true;
    wake();
  }
  function tick(now) {
    raf = null;
    if (stopped || document.hidden || !hasWork()) {
      frameTime = null;
      return;
    }
    if (now - frameTime >= PAINT_INTERVAL) {
      const elapsed = (now - frameTime) / 1000;
      frameTime = now;
      if (automatic && !gestures.isDragging) yaw += Math.min(elapsed, .125) * AUTO_ORBIT_SPEED;
      requestView();
      if (dirty || snow.active) draw(elapsed);
    }
    if (!hasWork()) frameTime = null;
    wake();
  }
  function shake(impulse) {
    snow.shake(impulse);
    frameTime = performance.now();
    invalidate();
  }
  const gestures=installOrnamentGestures({
    element:host,
    onRotate(dxRadians){yaw+=dxRadians;wake();},
    onZoom(factor){zoom=clamp(zoom*factor,.60,1);invalidate();},
    onShake:shake,
    onInteract(){setAuto(false);$('gestureHint').classList.add('experienced');},
    onReset:reset
  });
  cleanups.push(()=>gestures.dispose());
  listen($('resetView'),'click',reset);
  listen($('toggleAuto'),'click',()=>setAuto(!automatic));
  $('toggleSnow').removeAttribute('aria-pressed');$('toggleSnow').title='Agitar suavemente la esfera y permitir agitar con el teléfono';
  listen($('toggleSnow'),'click',()=>{
    Promise.resolve(gestures.requestMotionPermission()).catch(()=>{});
    shake({strength:.65});
  });
  listen(host, 'ornament-reveal', () => shake({ strength: .42 }), { once: true });
  listen(window, 'online', () => {
    const index = frameForYaw(yaw);
    if (index === requestedFrame) frameCache.retryFailed(index);
  });
  listen(document, 'visibilitychange', () => {
    if (raf !== null) cancelAnimationFrame(raf);
    raf = frameTime = null;
    if (!document.hidden) invalidate();
  });
  function dispose() {
    if (stopped) return;
    stopped = true;
    if (raf !== null) cancelAnimationFrame(raf);
    raf = null;
    observer.disconnect();
    cleanups.forEach(fn => fn());
    frameCache.dispose();
    glassRequest.abort();
    snowCanvas.dispose();
    glassImage = null;
    if (window.ornamentViewer === viewer) delete window.ornamentViewer;
    canvas.remove();
    canvas.width = canvas.height = 1;
  }

  const firstFrame = frameCache.request(0);
  loadImage('assets/glass-v6.webp', glassRequest.signal).then(image => {
    if (stopped || !image) return;
    glassImage = image;
    invalidate();
  });
  if(!await firstFrame){
    dispose();
    throw new Error('La primera vista de la esfera no está disponible');
  }
  requestView();
  draw(0);
  updateViewStatus(lastFrame * FRAME_STEP);
  ready = true;
  viewer = {
    mode: 'turntable', branch, canvas, gestures, snow, shake, reset, dispose,
    get frameCache() { return frameCache.diagnostics(); },
    get yaw() { return yaw; },
    get presentedYaw() { return lastFrame * FRAME_STEP; },
    get pitch() { return pitch; },
    get zoom() { return zoom; },
    get auto() { return automatic; }
  };
  window.ornamentViewer = viewer;
  return viewer;
}
