import {getBranchViewer} from './branch-viewers.js';

/** Three scrolling image sheets, not a particle system. The shared model owns
 * only an age, shake envelope and three fixed layer descriptors. Texture masks
 * are generated once; there are no per-flake runtime positions or velocities.
 * Adapted from the image-layer/parallax idea in Wang & Wade, SIGGRAPH 2004.
 */
export const SNOW_PARALLAX=Object.freeze({yaw:.09,pitch:.045});
const finite=(n,fallback=0)=>Number.isFinite(n)?n:fallback;
const clamp=(n,a=0,b=1)=>Math.max(a,Math.min(b,n));
const smooth=n=>{const t=clamp(n);return t*t*(3-2*t);};
const fract=n=>n-Math.floor(n);

export function createSnowLayers({seed=731,duration=7.2,reducedMotion=false,radius=1.73,floor=-.78,welcome=false}={}){
  radius=clamp(finite(radius,1.73),.1,10);floor=clamp(finite(floor,-.78),-radius*.95,radius*.7);
  duration=clamp(finite(duration,7.2),3,12);
  const runDuration=reducedMotion?Math.min(duration,3.8):duration;
  let randomState=finite(seed,731)>>>0;
  const random=()=>{randomState=(Math.imul(randomState,1664525)+1013904223)>>>0;return randomState/4294967296;};
  const layers=[-1,0,1].map((depth,index)=>({
    index,depth:depth*radius/1.73,opacity:0,offsetX:random(),offsetY:random(),repeat:1,
    ceiling:floor,upperY:floor,span:radius*2.08,
    phaseX:random(),phaseY:random(),swayPhase:random()*Math.PI*2
  }));
  let age=runDuration,time=0,strength=.7,windX=0,windZ=0,cycle=0,activity=0;
  function update(){
    if(age>=runDuration){activity=0;for(const layer of layers){layer.opacity=0;layer.ceiling=layer.upperY=floor;}return;}
    const fraction=age/runDuration;
    const rise=smooth(age/(reducedMotion?.55:.85));
    const fadeIn=smooth(age/.20),fadeOut=1-smooth((fraction-.47)/.53);
    const envelope=fadeIn*fadeOut,amplitude=clamp(.38+strength*.48,.30,.93);
    activity=envelope*amplitude;
    const ceiling=floor+(radius-floor)*rise*(1-smooth((fraction-.30)/.70));
    const motion=reducedMotion?.24:1;
    for(const layer of layers){
      const speed=[.053,.083,.119][layer.index];
      layer.opacity=activity*[.45,.60,.78][layer.index]*(reducedMotion?.70:1);
      layer.offsetX=layer.phaseX+cycle*.173+motion*(age*(.005+windX*.017)+Math.sin(age*.82+layer.swayPhase)*.018*strength);
      // Positive crop-Y moves a texture upward in both the Canvas and native
      // renderers. The short lift gives way to slow downward scrolling.
      layer.offsetY=layer.phaseY+cycle*.137+motion*(rise*(.19+.07*layer.index)*Math.min(strength,1.4)-age*speed+windZ*.025*Math.sin(age));
      layer.ceiling=layer.upperY=ceiling;
    }
  }
  function shake(impulse={strength:.7}){
    if(typeof impulse==='number')impulse={strength:impulse};
    const amount=clamp(finite(impulse?.strength,.7),0,2.5);
    if(amount<=0)return activity;
    strength=Math.min(1.7,amount+(age<runDuration?activity*.20:0));
    const x=finite(impulse?.x),z=finite(impulse?.z),length=Math.hypot(x,z);
    windX=length>1e-9?x/length:0;windZ=length>1e-9?z/length:0;
    age=0;cycle++;update();return activity;
  }
  function step(dt){
    // No integrator needs substeps: analytical texture/envelope motion can
    // advance across a slow frame without extending the real settling time.
    dt=clamp(finite(dt),0,runDuration);
    if(age>=runDuration||dt===0)return false;
    age=Math.min(runDuration,age+dt);time+=dt;update();
    return true; // Includes the final zero-opacity update: render one clear frame.
  }
  function reset(){const changed=age<runDuration||activity>0;age=runDuration;update();return changed;}
  const api={
    step,shake,reset,getLayers:()=>layers,
    get layers(){return layers;},get active(){return age<runDuration;},get activity(){return activity;},
    get age(){return age;},get time(){return time;},get seed(){return finite(seed,731)>>>0;},
    get duration(){return runDuration;},get radius(){return radius;},get floor(){return floor;},get reducedMotion(){return !!reducedMotion;}
  };
  if(welcome)shake({strength:.42});else update();
  return api;
}

/** A sparse alpha mask duplicated 2×2 for a single scrolling source crop.
 * size is the tile edge; the returned canvas is size*2 on both axes.
 * All randomized flake placement is baked here, once, and is then discarded.
 */
export function createSnowSheet({makeCanvas,seed=731,index=0,size=512}={}){
  if(typeof makeCanvas!=='function')throw new TypeError('makeCanvas(width,height) is required.');
  size=Math.round(clamp(finite(size,512),128,512));index=Math.round(clamp(finite(index),0,2));
  const tile=makeCanvas(size,size);tile.width=tile.height=size;
  const ctx=tile.getContext('2d');ctx.clearRect(0,0,size,size);
  let state=((finite(seed,731)>>>0)+index*7919)>>>0;
  const random=()=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return state/4294967296;};
  const count=[150,130,100][index],scale=size/512;
  for(let i=0;i<count;i++){
    const x=random()*size,y=random()*size,r=(.65+random()*(.85+index*.43))*scale*(1+index*.19)*1.15;
    const gradient=ctx.createRadialGradient(x,y,0,x,y,r);
    gradient.addColorStop(0,'rgba(255,255,255,.96)');gradient.addColorStop(.30,'rgba(255,255,255,.80)');gradient.addColorStop(1,'rgba(255,255,255,0)');
    ctx.fillStyle=gradient;ctx.fillRect(x-r,y-r,r*2,r*2);
    if(i%11===0&&index>0){
      ctx.strokeStyle='rgba(255,255,255,.35)';ctx.lineWidth=.45*scale;
      ctx.beginPath();for(let arm=0;arm<3;arm++){const a=arm*Math.PI/3,dx=Math.cos(a)*r*.8,dy=Math.sin(a)*r*.8;ctx.moveTo(x-dx,y-dy);ctx.lineTo(x+dx,y+dy);}ctx.stroke();
    }
  }
  const sheet=makeCanvas(size*2,size*2);sheet.width=sheet.height=size*2;
  const output=sheet.getContext('2d');for(let y=0;y<2;y++)for(let x=0;x<2;x++)output.drawImage(tile,x*size,y*size);
  sheet.snowTileSize=size;return sheet;
}

/** Three actual camera-facing planes. Add group to the scene, not to root.
 * Each fragment uses inverseRoot to clip the true globe, base and room volumes.
 * The shader has one texture fetch and no procedural-noise/flake loops.
 */
export function createNativeSnowSheets(THREE,{state,root,camera,makeCanvas,size=512,occluders=getBranchViewer().snowOccluders}={}){
  if(!state||!root||!camera)throw new TypeError('state, root and camera are required.');
  const group=new THREE.Group();group.name='Three image-based snow sheets';
  const geometry=new THREE.PlaneGeometry(1,1),inverseRoot=new THREE.Matrix4();
  const center=new THREE.Vector3(),cameraQuaternion=new THREE.Quaternion(),scale=new THREE.Vector3();
  // Compile the selected building's fixed walls into the shader once.
  const solidMask = occluders.map(({x,y,z}) => {
    const corner = i => 'vec3(' + [x[i],y[i],z[i]].map(n => n.toFixed(3)).join(',') + ')';
    return 'if(all(greaterThan(p,' + corner(0) + '))&&all(lessThan(p,' + corner(1) + ')))discard;';
  }).join('\n');
  const textures=[],meshes=[];
  for(const layer of state.layers){
    const texture=new THREE.CanvasTexture(createSnowSheet({makeCanvas,seed:state.seed,index:layer.index,size}));
    texture.name='Baked sparse snow mask '+layer.index;texture.flipY=false;texture.colorSpace=THREE.NoColorSpace;
    texture.minFilter=THREE.LinearMipmapLinearFilter;texture.magFilter=THREE.LinearFilter;texture.generateMipmaps=true;textures.push(texture);
    const material=new THREE.ShaderMaterial({
      name:'Clipped image-based snow '+layer.index,transparent:true,depthWrite:false,depthTest:true,side:THREE.FrontSide,toneMapped:false,
      uniforms:{uSheet:{value:texture},uInverseRoot:{value:inverseRoot},uRadiusSquared:{value:state.radius**2},uFloor:{value:state.floor},uCeiling:{value:state.floor},uOpacity:{value:0},uOffset:{value:new THREE.Vector2()}},
      vertexShader:`varying vec2 vUv;varying vec3 vWorld;void main(){vUv=uv;vec4 world=modelMatrix*vec4(position,1.);vWorld=world.xyz;gl_Position=projectionMatrix*viewMatrix*world;}`,
      fragmentShader:`uniform sampler2D uSheet;uniform mat4 uInverseRoot;uniform float uRadiusSquared,uFloor,uCeiling,uOpacity;uniform vec2 uOffset;varying vec2 vUv;varying vec3 vWorld;
      void main(){if(uOpacity<.001)discard;vec3 p=(uInverseRoot*vec4(vWorld,1.)).xyz;
        if(dot(p,p)>uRadiusSquared||p.y<uFloor||p.y>uCeiling)discard;
        ${solidMask}
        float band=smoothstep(uFloor,uFloor+.045,p.y)*(1.-smoothstep(uCeiling-.09,uCeiling,p.y));
        vec2 crop=(vec2(vUv.x,1.-vUv.y)+uOffset)*.5;float alpha=texture2D(uSheet,crop).a*uOpacity*band;
        if(alpha<.003)discard;gl_FragColor=vec4(1.,.99,.96,alpha);}`
    });
    const mesh=new THREE.Mesh(geometry,material);mesh.name='Snow depth sheet '+layer.depth;mesh.renderOrder=2;mesh.frustumCulled=false;
    mesh.castShadow=false;mesh.receiveShadow=false;mesh.position.z=layer.depth;mesh.scale.set(layer.span,layer.span,1);group.add(mesh);meshes.push(mesh);
  }
  function update(){
    root.updateWorldMatrix(true,false);camera.updateWorldMatrix(true,false);
    inverseRoot.copy(root.matrixWorld).invert();root.getWorldPosition(center);root.getWorldScale(scale);camera.getWorldQuaternion(cameraQuaternion);
    group.position.copy(center);group.quaternion.copy(cameraQuaternion);group.scale.setScalar(Math.max(Math.abs(scale.x),Math.abs(scale.y),Math.abs(scale.z)));
    group.visible=state.active&&state.activity>0;
    for(let i=0;i<meshes.length;i++){
      const layer=state.layers[i],uniforms=meshes[i].material.uniforms;
      uniforms.uOpacity.value=layer.opacity;uniforms.uCeiling.value=layer.ceiling;
      uniforms.uOffset.value.set(fract(layer.offsetX+root.rotation.y*layer.depth*SNOW_PARALLAX.yaw),fract(layer.offsetY+root.rotation.x*layer.depth*SNOW_PARALLAX.pitch));
    }
    return group.visible;
  }
  function dispose(){group.removeFromParent();geometry.dispose();for(const mesh of meshes)mesh.material.dispose();for(const texture of textures)texture.dispose();}
  update();return{group,meshes,textures,update,dispose};
}
