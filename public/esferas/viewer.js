import * as THREE from './vendor/three.module.js';
import {getBranchViewer} from './branch-viewers.js';
import {createSnowLayers,createNativeSnowSheets} from './snow-layers.js';
import {installOrnamentGestures} from './gesture-controls.js';
import {LIGHTING_PROFILE} from './lighting-profile.js';
import {batchStaticMeshes} from './static-batching.js';
import {describeView,AUTO_ORBIT_SPEED} from './view-orientation.js';

const $=id=>document.getElementById(id);
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export async function startNative({host,canvas,context,branch='advanced'}){
  const profile=getBranchViewer(branch);
  const renderer=new THREE.WebGLRenderer({canvas,context,antialias:true,alpha:true,powerPreference:'high-performance'});
  renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.5));
  renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.08;
  renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  renderer.shadowMap.autoUpdate=false;renderer.shadowMap.needsUpdate=true;
  canvas.tabIndex=-1;canvas.setAttribute('role','img');
  canvas.setAttribute('aria-label','Esfera 3D de '+profile.name+'. Arrastre para girar. Agite de lado a lado, pulse Espacio o haga doble clic para levantar la nieve.');
  const scene=new THREE.Scene();
  const camera=new THREE.OrthographicCamera(-2.7,2.7,2.7,-2.7,.1,40);camera.position.set(0,.4,10);camera.lookAt(0,.4,0);
  scene.add(new THREE.HemisphereLight(0xd6e3ff,0x29231c,LIGHTING_PROFILE.hemisphere));
  for(const [index,color,intensity,pos]of LIGHTING_PROFILE.directional){
    const light=new THREE.DirectionalLight(color,intensity);light.position.fromArray(pos);
    if(index===0){light.castShadow=true;light.shadow.mapSize.set(1024,1024);Object.assign(light.shadow.camera,{left:-2.4,right:2.4,top:2.6,bottom:-2.2,near:1,far:15});light.shadow.bias=-.0004;light.shadow.normalBias=.006;light.shadow.camera.updateProjectionMatrix();}
    scene.add(light);
  }
  const studio=new THREE.Scene();studio.background=new THREE.Color(0x17232b);
  for(const[w,h,p,c,k]of LIGHTING_PROFILE.studioCards){
    const mesh=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({color:new THREE.Color(c).multiplyScalar(k),side:THREE.DoubleSide}));mesh.position.fromArray(p);mesh.lookAt(0,0,0);studio.add(mesh);
  }
  const pmrem=new THREE.PMREMGenerator(renderer);const environment=pmrem.fromScene(studio,.04,.1,30);scene.environment=environment.texture;scene.environmentIntensity=LIGHTING_PROFILE.environment;pmrem.dispose();
  studio.traverse(o=>{o.geometry?.dispose();o.material?.dispose();});
  const loadImage=src=>new Promise((resolve,reject)=>{const im=new Image();im.onload=()=>resolve(im);im.onerror=reject;im.src=src;});
  const [{createOrnamentModel},signImage,interiorImage]=await Promise.all([
    profile.loadModel(), loadImage(profile.sign), loadImage('assets/interiors-v10.webp')
  ]);
  const makeCanvas=(w,h)=>{const c=document.createElement('canvas');c.width=w;c.height=h;return c;};
  const model=createOrnamentModel(THREE,{signImage,interiorImage,makeCanvas,anisotropy:renderer.capabilities.getMaxAnisotropy()});
  const root=model.root;root.rotation.order=profile.orbitOrder;root.rotation.x=.16;scene.add(root);
  // r170 uses scene.environmentIntensity when material.envMap is null. Give
  // polished metals an explicit, restrained reflection level of their own.
  root.traverse(o=>{if(!o.isMesh)return;for(const m of Array.isArray(o.material)?o.material:[o.material])if(m?.isMeshStandardMaterial&&m.metalness>=.8){m.envMap=environment.texture;m.envMapIntensity=LIGHTING_PROFILE.metalEnvironment;}});
  root.traverse(o=>{if(o.isMesh&&!o.isInstancedMesh&&!o.material.transparent){const wasCaster=o.castShadow;o.receiveShadow=true;o.geometry.computeBoundingBox();o.castShadow=wasCaster||((o.geometry.index?.count||o.geometry.attributes.position.count)<22000&&o.geometry.boundingBox.max.y<1.75);}});
  const batching=batchStaticMeshes(THREE,root);
  const reducedMotion=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches||false;
  const snow=createSnowLayers({reducedMotion});
  const snowSheets=createNativeSnowSheets(THREE,{state:snow,root,camera,makeCanvas,size:256,occluders:profile.snowOccluders});scene.add(snowSheets.group);
  let yaw=0,pitch=.16,targetYaw=0,targetPitch=.16,zoom=.92,targetZoom=.92,automatic=false,halfHeight=2.7,aspect=1,lastTime=performance.now(),lastPaint=0,statusTick=0;
  let shakeGlow=0,needsRender=true,raf=0,revealed=false,disposed=false,contextLost=false,runtime=null,renderWidth=0,renderHeight=0;
  const cleanups=[];
  const listen=(target,type,handler,options)=>{target.addEventListener(type,handler,options);cleanups.push(()=>target.removeEventListener(type,handler,options));};
  const lastShadowRotation=root.quaternion.clone(),capA=new THREE.Vector3(),capB=new THREE.Vector3();
  function fit(){
    capA.set(0,2.05,0).applyQuaternion(root.quaternion);capB.set(0,2.46,0).applyQuaternion(root.quaternion);
    const minX=Math.min(-1.8,capA.x-.55,capB.x-.21),maxX=Math.max(1.8,capA.x+.55,capB.x+.21);
    const minY=Math.min(-1.8,capA.y-.55,capB.y-.21),maxY=Math.max(1.8,capA.y+.55,capB.y+.21);
    const fitted=Math.min(halfHeight*2*aspect/(maxX-minX+.30),halfHeight*2/(maxY-minY+.35));
    camera.zoom=fitted*zoom;camera.position.x=(minX+maxX)/2;camera.position.y=(minY+maxY)/2;camera.lookAt(camera.position.x,camera.position.y,0);camera.updateProjectionMatrix();
  }
  function hasMotion(){return automatic||Math.abs(targetYaw-yaw)>1e-5||Math.abs(targetPitch-pitch)>1e-5||Math.abs(targetZoom-zoom)>1e-5||shakeGlow>1e-4||snow.active||needsRender;}
  function schedule(){if(!raf&&!disposed&&!contextLost&&revealed&&!document.hidden)raf=requestAnimationFrame(frame);}
  function wake(){
    needsRender=true;
    if(!raf){lastTime=performance.now();lastPaint=lastTime-32;}
    schedule();
  }
  function cancelFrame(){if(raf)cancelAnimationFrame(raf);raf=0;}
  function resize(){
    const r=host.getBoundingClientRect();if(!r.width||!r.height||(r.width===renderWidth&&r.height===renderHeight))return;
    renderWidth=r.width;renderHeight=r.height;aspect=r.width/r.height;halfHeight=Math.max(2.7,2.00/aspect);renderer.setSize(r.width,r.height);camera.left=-halfHeight*aspect;camera.right=halfHeight*aspect;camera.top=halfHeight;camera.bottom=-halfHeight;fit();
    if(!revealed){snowSheets.update();renderer.render(scene,camera);needsRender=false;lastTime=performance.now();}
    else wake();
  }
  resize();
  const observer=new ResizeObserver(resize);
  observer.observe(host);
  needsRender=false;
  function setAuto(value){
    if(automatic===value)return;
    automatic=value;
    const button=$('toggleAuto');
    button.setAttribute('aria-pressed',String(value));
    button.title=value?'Pausar giro automático':'Activar giro automático';
    wake();
  }
  function reset(){targetYaw=0;targetPitch=.16;targetZoom=.92;setAuto(false);wake();}
  function shake(impulse={strength:.65}){
    snow.shake(impulse);shakeGlow=.05;host.classList.add('snow-awake');lastTime=performance.now();wake();
  }
  const gestures=installOrnamentGestures({element:host,onRotate:(dx,dy)=>{targetYaw+=dx;targetPitch=clamp(targetPitch+dy,-.78,.78);wake();},onZoom:factor=>{targetZoom=clamp(targetZoom*factor,.65,1);wake();},onShake:shake,onInteract:()=>{setAuto(false);$('gestureHint').classList.add('experienced');},onReset:reset});
  listen($('resetView'),'click',reset);
  listen($('toggleAuto'),'click',()=>setAuto(!automatic));
  listen($('toggleSnow'),'click',()=>{shake({strength:.7});gestures.requestMotionPermission();});
  listen(document,'visibilitychange',()=>{
    if(document.hidden){cancelFrame();lastTime=performance.now();}
    else wake();
  });
  listen(host,'ornament-reveal',()=>{
    if(revealed)return;
    revealed=true;snow.shake({strength:.42});lastTime=performance.now();wake();
  },{once:true});
  listen(canvas,'webglcontextlost',event=>{
    event.preventDefault();contextLost=true;dispose();
    $('loading').dispatchEvent(new CustomEvent('ornament-error',{detail:'La vista se ha pausado.'}));
  },{once:true});
  function frame(now){
    raf=0;if(disposed||contextLost||document.hidden||!hasMotion())return;
    if(now-lastPaint<32){schedule();return;}lastPaint=now;
    const elapsed=Math.max(0,(now-lastTime)/1000),dt=Math.min(elapsed,.08);lastTime=now;if(automatic&&!gestures.isDragging)targetYaw+=dt*AUTO_ORBIT_SPEED;
    const ease=1-Math.exp(-dt*12);yaw+=(targetYaw-yaw)*ease;pitch+=(targetPitch-pitch)*ease;zoom+=(targetZoom-zoom)*ease;shakeGlow*=Math.exp(-elapsed*4);
    if(Math.abs(targetYaw-yaw)<1e-5)yaw=targetYaw;if(Math.abs(targetPitch-pitch)<1e-5)pitch=targetPitch;if(Math.abs(targetZoom-zoom)<1e-5)zoom=targetZoom;
    if(shakeGlow<1e-4)shakeGlow=0;
    root.rotation.set(pitch,yaw,Math.sin(now*.022)*shakeGlow*.22);fit();snow.step(elapsed);snowSheets.update();
    const rotationChanged=!lastShadowRotation.equals(root.quaternion);
    if(rotationChanged){renderer.shadowMap.needsUpdate=true;lastShadowRotation.copy(root.quaternion);}
    if(!snow.active)host.classList.remove('snow-awake');
    needsRender=false;const moving=hasMotion();
    if(now-statusTick>150||!moving){
      const view=describeView(yaw),angle=view.angle+'°';
      if($('angleValue').textContent!==angle)$('angleValue').textContent=angle;
      if($('viewLabel').textContent!==view.label)$('viewLabel').textContent=view.label;
      statusTick=now;
    }
    renderer.render(scene,camera);
    if(moving)schedule();
  }
  function dispose(){
    if(disposed)return;disposed=true;cancelFrame();observer.disconnect();gestures.dispose();cleanups.forEach(remove=>remove());host.classList.remove('snow-awake');
    snowSheets.dispose();
    const geometries=new Set(),materials=new Set(),textures=new Set([environment.texture]);
    root.traverse(object=>{if(object.geometry)geometries.add(object.geometry);if(object.material)for(const material of Array.isArray(object.material)?object.material:[object.material])materials.add(material);});
    for(const material of materials){for(const value of Object.values(material))if(value?.isTexture&&!textures.has(value)){textures.add(value);value.dispose();}material.dispose();}
    for(const geometry of geometries)geometry.dispose();
    scene.traverse(object=>object.shadow?.dispose());environment.dispose();renderer.dispose();canvas.remove();
    if(window.ornamentViewer===runtime)delete window.ornamentViewer;
  }
  runtime={mode:'native',branch,canvas,model,snow,snowSheets,renderer,scene,camera,root,shake,reset,dispose,batching,get yaw(){return yaw;},get pitch(){return pitch;},get zoom(){return zoom;},get auto(){return automatic;}};
  return runtime;
}
