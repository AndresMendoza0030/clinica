import {addWinterPine} from './vegetation.js';
import {addClinicInterior} from './room-interiors.js';
import {addFestiveRoomDetails,addEvergreenWreath} from './festive-details.js';
import {createSurfaceMaterials} from './surface-materials.js';
import {LIGHTING_PROFILE} from './lighting-profile.js';

// Exterior architecture and landscape remain physical volumes. The original
// artwork supplies the fixed sign; room photographs live inside shared alcoves.
export function createOrnamentModel(THREE,{image,signImage,interiorImage,makeCanvas,anisotropy=8}={}){
  const root=new THREE.Group();root.name='Advanced Radiology · continuous miniature';
  const materials={
    ivory:new THREE.MeshStandardMaterial({color:0xe8ddcb,roughness:.62}),
    facadeIvory:new THREE.MeshStandardMaterial({color:0xe8ddcb,roughness:.62,emissive:0xffecd4,emissiveIntensity:.16}),
    red:new THREE.MeshStandardMaterial({color:0xbb071b,roughness:.34,metalness:.08}),
    facadePaint:new THREE.MeshPhysicalMaterial({color:0xbb071b,roughness:.17,metalness:.08,emissive:0xff071f,emissiveIntensity:.45,clearcoat:.55,clearcoatRoughness:.17}),
    snow:new THREE.MeshStandardMaterial({color:0xfffbef,roughness:.9}),
    gold:new THREE.MeshStandardMaterial({color:0xe3b150,metalness:1,roughness:.20,envMapIntensity:.55}),
    edge:new THREE.MeshStandardMaterial({color:0xf7d891,metalness:1,roughness:.17,envMapIntensity:.55}),
    frame:new THREE.MeshStandardMaterial({color:0x17262e,metalness:.50,roughness:.30}),
    pavement:new THREE.MeshStandardMaterial({color:0x53565d,roughness:.29,metalness:.10}),
    wood:new THREE.MeshStandardMaterial({color:0x846038,roughness:.57}),
    yellow:new THREE.MeshStandardMaterial({color:0xedc755,roughness:.7}),
    green:new THREE.MeshStandardMaterial({color:0x1c402a,roughness:.64}),
    linen:new THREE.MeshStandardMaterial({color:0xdfcfae,roughness:.88}),
    led:new THREE.MeshBasicMaterial({color:0xffd697,toneMapped:false}),
    window:new THREE.MeshPhysicalMaterial({color:0xcddfed,transparent:true,opacity:.20,roughness:.055,metalness:0,clearcoat:1,clearcoatRoughness:.025,reflectivity:.8,ior:1.46,depthWrite:false,envMapIntensity:.75})
  };
  for(const [key,m]of Object.entries(materials))m.name=key==='window'?'Architectural window glass':'Miniature · '+key;
  const surfaces=makeCanvas?createSurfaceMaterials(THREE,{makeCanvas,anisotropy}):null;
  const geometryCache=new Map();
  function roundedBox(w,h,d){
    const r=Math.min(.009,Math.min(w,h,d)*.18),g=new THREE.BoxGeometry(1,1,1,4,4,4),p=g.attributes.position,n=g.attributes.normal;
    const v=new THREE.Vector3(),q=new THREE.Vector3(),normal=new THREE.Vector3(),inner=new THREE.Vector3(w/2-r,h/2-r,d/2-r);
    const lower=inner.clone().negate();
    const remap=(u,size)=>u<-.49?-size/2:u<-.01?-size/2+r:u>.49?size/2:u>.01?size/2-r:0;
    for(let i=0;i<p.count;i++){v.set(remap(p.getX(i),w),remap(p.getY(i),h),remap(p.getZ(i),d));q.copy(v).clamp(lower,inner);normal.copy(v).sub(q).normalize();v.copy(q).addScaledVector(normal,r);p.setXYZ(i,v.x,v.y,v.z);n.setXYZ(i,normal.x,normal.y,normal.z);}
    g.computeBoundingBox();g.computeBoundingSphere();return g;
  }
  function box(parent,x,y,z,w,h,d,mat,name=''){
    const key=[w,h,d].join(',');let geometry=geometryCache.get(key);if(!geometry){geometry=roundedBox(w,h,d);geometryCache.set(key,geometry);}
    const mesh=new THREE.Mesh(geometry,mat);mesh.position.set(x,y,z);mesh.name=name;parent.add(mesh);return mesh;
  }
  function sphere(parent,x,y,z,r,mat,scale){const mesh=new THREE.Mesh(new THREE.SphereGeometry(r,14,10),mat);mesh.position.set(x,y,z);if(scale)mesh.scale.set(...scale);parent.add(mesh);return mesh;}
  function cylinder(parent,x,y,z,r,h,mat){const mesh=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,16),mat);mesh.position.set(x,y,z);parent.add(mesh);return mesh;}
  function torus(parent,x,y,z,r,t,mat){const mesh=new THREE.Mesh(new THREE.TorusGeometry(r,t,10,64),mat);mesh.position.set(x,y,z);parent.add(mesh);return mesh;}
  const building=new THREE.Group();building.name='Closed building with six furnished rooms';root.add(building);
  const halfWidth=1.34,front=.34,back=-.64,levels=[-.78,.015],roomHeight=.64;
  const bays=[{x:-.895,width:.825,kind:['reception','radiology']},{x:0,width:.835,kind:['waiting','office']},{x:.895,width:.825,kind:['laboratory','examination']}];
  const floorMat=new THREE.MeshStandardMaterial({color:0xb99365,roughness:.44});floorMat.name='Warm wooden room floors';
  const roomRecords=[];let windows=0;
  // Shared slabs and actual partitions define a consistent two-floor plan.
  for(const floorY of levels){
    box(building,0,floorY-.018,(front+back)/2,2.68,.036,.98,floorMat);
    box(building,0,floorY+roomHeight+.018,(front+back)/2,2.68,.036,.98,materials.ivory);
    for(const x of [-.45,.45])box(building,x,floorY+roomHeight/2,(front+back)/2,.035,roomHeight,.98,materials.ivory,'Interior partition');
  }
  for(let floorIndex=0;floorIndex<2;floorIndex++){
    const fy=levels[floorIndex],cy=fy+roomHeight/2;
    for(const bay of bays){
      const interior=addClinicInterior(THREE,building,{kind:bay.kind[floorIndex],width:bay.width,depth:.90,height:roomHeight,interiorImage,makeCanvas,anisotropy,seed:19+floorIndex*7+Math.round((bay.x+1)*10)});
      interior.position.set(bay.x,fy,-.15);interior.name=bay.kind[floorIndex]+' · shared photographic room';
      addFestiveRoomDetails(THREE,interior,{kind:bay.kind[floorIndex],width:bay.width,depth:.90,height:roomHeight,seed:31+floorIndex*11+Math.round((bay.x+1)*10)});
      const lamp=new THREE.PointLight(0xffb66d,.88,1.35,2);lamp.position.set(bay.x,fy+.51,.02);lamp.name='Warm ceiling light · '+bay.kind[floorIndex];building.add(lamp);
      roomRecords.push({kind:bay.kind[floorIndex],floor:floorIndex,lit:true,festive:true,bounds:{minX:bay.x-bay.width/2,maxX:bay.x+bay.width/2,minY:fy,maxY:fy+roomHeight,minZ:back,maxZ:front},windows:['front','rear',...(bay.x<-.5?['left A','left B']:bay.x>.5?['right A','right B']:[])]});
    }
    // Front and rear piers leave true openings onto each shared room volume.
    for(const z of [front,back]){
      for(const x of [-halfWidth,-.45,.45,halfWidth])box(building,x,cy,z,.065,roomHeight,.06,materials.facadeIvory,'Exterior pier');
      box(building,0,fy+(z===back?.115:.022),z,2.68,z===back?.23:.044,.06,materials.facadeIvory,'Window sill wall');
      box(building,0,fy+(z===back?.605:roomHeight-.022),z,2.68,z===back?.07:.044,.06,materials.facadeIvory,'Window lintel wall');
      for(const bay of bays){
        const w=z===back?.50:bay.width,h=z===back?.34:roomHeight-.088,windowY=z===back?fy+.40:cy;
        if(z===back){const infill=(bay.width-w)/2;for(const sx of [-1,1])box(building,bay.x+sx*(w/2+infill/2),cy,z,infill,roomHeight,.06,materials.facadeIvory,'Rear window jamb wall');
          box(building,bay.x,fy+.455,back+.052,.49,.23,.006,materials.linen,'Partly lowered privacy linen');
          const roller=cylinder(building,bay.x,fy+.575,back+.052,.010,.51,materials.ivory);roller.rotation.z=Math.PI/2;
        }
        const glass=new THREE.Mesh(new THREE.PlaneGeometry(w,h),materials.window);
        glass.position.set(bay.x,windowY,z+(z===front?.034:-.034));if(z===back)glass.rotation.y=Math.PI;
        glass.name='Actual room window · '+bay.kind[floorIndex];building.add(glass);windows++;
        const zz=z+(z===front?.039:-.039);
        for(const x of [bay.x-w/2,bay.x,bay.x+w/2])box(building,x,windowY,zz,.012,h+.018,.018,materials.frame);
        for(const y of [windowY-h/2,windowY+h*.27,windowY+h/2])box(building,bay.x,y,zz,w+.018,.012,.018,materials.frame);
      }
    }
    // Both side windows on each floor belong to the same outer room.
    for(const sx of [-1,1]){
      const x=sx*halfWidth;
      for(const z of [back,-.15,front])box(building,x,cy,z,.06,roomHeight,.065,materials.facadeIvory,'Side pier');
      box(building,x,fy+.055,-.15,.06,.11,.98,materials.facadeIvory);box(building,x,fy+.575,-.15,.06,.13,.98,materials.facadeIvory);
      for(const z of [-.395,.095]){
        const glass=new THREE.Mesh(new THREE.PlaneGeometry(.425,.40),materials.window);glass.rotation.y=sx*Math.PI/2;glass.position.set(x+sx*.034,fy+.31,z);glass.name='Shared room side window';building.add(glass);windows++;
        for(const zz of [z-.2125,z,z+.2125])box(building,x+sx*.039,fy+.31,zz,.018,.418,.012,materials.frame);
        for(const y of [fy+.11,fy+.418,fy+.51])box(building,x+sx*.039,y,z,.018,.012,.44,materials.frame);
      }
    }
  }
  // Continuous red bands close around every corner and snap to the shared slabs.
  function ribbon(y,height){
    box(building,0,y,front+.005,2.78,height,.11,materials.facadePaint);
    box(building,0,y,back-.005,2.78,height,.11,materials.facadePaint);
    for(const sx of [-1,1])box(building,sx*1.335,y,-.15,.11,height,1.09,materials.facadePaint);
    box(building,0,y+.5*height+.014,-.15,2.80,.028,1.11,materials.snow,'Continuous snow cornice');
  }
  ribbon(-.055,.14);ribbon(.715,.14);
  // Slightly projecting entrance canopy is a solid connected block.
  box(building,0,-.04,.425,.99,.14,.29,materials.facadePaint,'Connected entrance canopy');
  box(building,0,.045,.425,1.01,.03,.31,materials.snow);
  box(building,0,.965,.30,1.14,.43,.21,materials.facadeIvory,'Solid raised sign');
  box(building,0,1.189,.30,1.17,.025,.23,materials.snow,'Snow on sign');
  if((signImage||image)&&makeCanvas){
    const c=makeCanvas(318,116),ctx=c.getContext('2d');
    // The lossless sign in the browser is the same 318 × 116 raster used for the baked views.
    if(signImage)ctx.drawImage(signImage,0,0);
    else ctx.drawImage(image,490,438,303,111,0,0,318,116);
    const texture=new THREE.CanvasTexture(c);texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=anisotropy;
    const emissionCanvas=makeCanvas(318,116),emissionContext=emissionCanvas.getContext('2d');
    const artworkPixels=ctx.getImageData(0,0,318,116),emissionPixels=emissionContext.createImageData(318,116);
    let selectedPixels=0,neutralPixels=0;
    for(let i=0;i<artworkPixels.data.length;i+=4){
      const r=artworkPixels.data[i],g=artworkPixels.data[i+1],b=artworkPixels.data[i+2];
      const dominance=r-Math.max(g,b);
      // Keep original reds, and give the neutral backing its own restrained light.
      // Dark letter edges remain unlit so the original artwork keeps its definition.
      const isRed=r>=65&&dominance>32&&r>g*1.32&&r>b*1.25;
      const t=isRed?Math.max(0,Math.min(1,(dominance-30)/48)):0;
      const coverage=t*t*(3-2*t);
      const luminance=.2126*r+.7152*g+.0722*b;
      const isNeutral=!isRed&&luminance>=145&&dominance<38&&Math.max(r,g,b)-Math.min(r,g,b)<=70&&r<g*1.28;
      // A small luminance range retains the approved surface texture without
      // inheriting the warm cast or turning the entire plate into a flat lamp.
      const backing=isNeutral?Math.round(150+18*Math.max(0,Math.min(1,(luminance-145)/110))):0;
      emissionPixels.data[i]=isNeutral?backing:Math.round(r*coverage);
      emissionPixels.data[i+1]=isNeutral?backing:Math.round(g*coverage);
      emissionPixels.data[i+2]=isNeutral?backing:Math.round(b*coverage);
      emissionPixels.data[i+3]=255;
      if(coverage>0)selectedPixels++;
      if(isNeutral)neutralPixels++;
    }
    emissionContext.putImageData(emissionPixels,0,0);
    const emissiveTexture=new THREE.CanvasTexture(emissionCanvas);emissiveTexture.colorSpace=THREE.SRGBColorSpace;emissiveTexture.anisotropy=anisotropy;
    emissiveTexture.name='Original lettering and neutral backing · dual-zone emission';
    const sourceArtwork={asset:'assets/original.png',crop:{x:490,y:438,width:303,height:111},canvas:{width:318,height:116},emissionMask:'original red lettering plus subtly lit textured neutral backing'};
    const signMat=new THREE.MeshStandardMaterial({map:texture,color:0xffffff,roughness:.48,metalness:.02,emissive:0xffffff,emissiveMap:emissiveTexture,emissiveIntensity:1.1});
    signMat.name='Original Advanced Radiology sign fixed to wall';
    signMat.userData={originalArtwork:true,sourceArtwork,emissionMaskStats:{selectedPixels,redPixels:selectedPixels,neutralPixels,unlitPixels:318*116-selectedPixels-neutralPixels,totalPixels:318*116,neutralEmissionSRGB:{min:150,max:168}}};
    const sign=new THREE.Mesh(new THREE.PlaneGeometry(1.10,.397),signMat);sign.position.set(0,.965,.406);sign.userData={originalArtwork:true,sourceArtwork};building.add(sign);
    // A small mounted lamp gives the cream backing a gentle, local warm wash.
    box(building,0,1.208,.414,.055,.027,.030,materials.frame,'Sign lamp mount');
    const signArm=cylinder(building,0,1.212,.489,.004,.174,materials.frame);signArm.rotation.x=Math.PI/2;
    box(building,0,1.205,.580,.18,.024,.040,materials.frame,'Warm sign lamp housing');
    box(building,0,1.192,.580,.15,.003,.028,materials.led,'Warm sign lamp diffuser');
    const signLight=new THREE.PointLight(0xffefdc,.24,.8,2);signLight.position.set(0,1.175,.64);signLight.name='Warm sign wash';building.add(signLight);
  }
  // Double entrance hardware, lights below eaves and delicate roof string lights.
  for(const x of [-.028,.028]){
    cylinder(building,x,-.40,.408,.004,.095,materials.edge);
    for(const y of [-.438,-.362])sphere(building,x,y,.399,.005,materials.edge);
  }
  const lamps=[];
  for(const y of [.675,-.10])for(let i=0;i<11;i++)lamps.push([(i/10*2.5)-1.25,y,front+.064]);
  for(let i=0;i<38;i++){
    const a=i/38*Math.PI*2;
    // Strings follow the rectangular roof perimeter rather than the crystal shell.
    const x=Math.cos(a)*1.34,z=-.15+Math.sin(a)*.52;
    lamps.push([x,.784,z]);
  }
  // A warm continuous strand traces the snow bowl just inside the glass.
  const strandRadius=Math.sqrt(1.76**2-1.28**2)+.012;
  const strand=torus(root,0,-1.28,0,strandRadius,.0025,materials.edge);strand.rotation.x=Math.PI/2;
  for(let i=0;i<48;i++){const a=i/48*Math.PI*2;lamps.push([Math.cos(a)*strandRadius,-1.28,Math.sin(a)*strandRadius]);}
  const bulbs=new THREE.InstancedMesh(new THREE.SphereGeometry(.009,8,6),materials.led,lamps.length),tmp=new THREE.Object3D();
  lamps.forEach((p,i)=>{tmp.position.set(...p);tmp.scale.set(1,1,1);tmp.updateMatrix();bulbs.setMatrixAt(i,tmp.matrix);});building.add(bulbs);
  if(makeCanvas){
    const c=makeCanvas(64,64),ctx=c.getContext('2d'),glow=ctx.createRadialGradient(32,32,0,32,32,32);glow.addColorStop(0,'rgba(255,255,255,1)');glow.addColorStop(.12,'rgba(255,255,255,.7)');glow.addColorStop(.4,'rgba(255,255,255,.16)');glow.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=glow;ctx.fillRect(0,0,64,64);
    const t=new THREE.CanvasTexture(c),geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(lamps.flat(),3));
    const halo=new THREE.Points(geo,new THREE.PointsMaterial({map:t,size:.075,color:0xffbd61,transparent:true,opacity:.46,blending:THREE.AdditiveBlending,depthWrite:false,toneMapped:false}));halo.name='Warm bulb halos';building.add(halo);
  }
  // Real evergreen needles and a folded three-dimensional ribbon dress the entrance.
  addEvergreenWreath(THREE,root,{x:0,y:-.025,z:.586,radius:.113,seed:27});
  // A genuine snow bowl and paved forecourt support the entire building.
  const profile=[new THREE.Vector2(0,-1.76)];for(let i=0;i<=42;i++){const y=-1.755+i/42*.935;profile.push(new THREE.Vector2(Math.sqrt(Math.max(0,1.76**2-y*y)),y));}
  root.add(new THREE.Mesh(new THREE.LatheGeometry(profile,112),materials.snow));
  const snowTop=new THREE.Mesh(new THREE.CircleGeometry(1.557,96),materials.snow);snowTop.rotation.x=-Math.PI/2;snowTop.position.y=-.820;root.add(snowTop);
  box(root,0,-.802,.865,1.68,.026,.55,materials.pavement,'Paved forecourt');
  box(root,0,-.782,.51,.54,.05,.20,materials.ivory,'Entrance step');
  for(const x of [-.55,.55]){const line=box(root,x,-.786,.925,.012,.003,.27,materials.yellow);line.rotation.y=x<0?-.22:.22;}
  const arrow=new THREE.Shape();arrow.moveTo(-.02,-.07);arrow.lineTo(.02,-.07);arrow.lineTo(.02,.025);arrow.lineTo(.055,.025);arrow.lineTo(0,.085);arrow.lineTo(-.055,.025);arrow.lineTo(-.02,.025);arrow.closePath();
  const arrowMesh=new THREE.Mesh(new THREE.ShapeGeometry(arrow),materials.snow);arrowMesh.rotation.x=-Math.PI/2;arrowMesh.rotation.z=Math.PI;arrowMesh.position.set(0,-.785,1.02);root.add(arrowMesh);
  for(const sx of [-1,1]){
    addWinterPine(THREE,root,{x:sx*1.075,y:-.802,z:.77,height:.65,radius:.20,seed:sx<0?15:53});
    cylinder(root,sx*.50,-.72,.865,.025,.17,materials.gold);
    box(root,sx*.50,-.635,.865,.052,.07,.052,materials.led,'Warm path lantern');
    box(root,sx*.50,-.591,.865,.068,.018,.068,materials.gold);
    const pathLight=new THREE.PointLight(0xffb754,.040,.52,2);pathLight.position.set(sx*.50,-.59,.89);pathLight.name='Warm path lantern';root.add(pathLight);
  }
  let seed=61731;const random=()=>{seed=(1664525*seed+1013904223)>>>0;return seed/4294967296;};
  for(const sx of [-1,1])for(let i=0;i<20;i++){
    const x=sx*(.65+random()*.27),z=.70+random()*.20;
    sphere(root,x,-.78+random()*.03,z,.045,materials.green,[1.4,.7,1.0]);
    sphere(root,x,-.74+random()*.02,z,.034,materials.snow,[1.3,.38,1]);
    if(i%2===0)sphere(root,x+.012,-.735,z+.025,.012,materials.red);
  }
  // Full gold filigree cap; no image cards are attached to the metal or glass.
  const cap=new THREE.Group();root.add(cap);
  const capProfile=[[0,1.79],[.43,1.79],[.50,1.81],[.47,1.87],[.45,2.18],[.42,2.23],[.18,2.26],[0,2.26]].map(p=>new THREE.Vector2(...p));
  cap.add(new THREE.Mesh(new THREE.LatheGeometry(capProfile,96),materials.gold));
  function wire(points,r=.006){const curve=new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p)),false,'centripetal');cap.add(new THREE.Mesh(new THREE.TubeGeometry(curve,Math.max(4,points.length*3),r,5,false),materials.edge));}
  for(let i=0;i<28;i++){
    const a=i/28*Math.PI*2;
    wire([[Math.cos(a)*.49,1.82,Math.sin(a)*.49],[Math.cos(a)*.465,1.95,Math.sin(a)*.465],[Math.cos(a)*.451,2.17,Math.sin(a)*.451]],.006);
    for(let j=0;j<3;j++){const y=1.85+j*.105,da=Math.PI/28*.74,r=.465-(y-1.85)*.06;wire([[Math.cos(a)*r,y,Math.sin(a)*r],[Math.cos(a+da)*r,y+.05,Math.sin(a+da)*r],[Math.cos(a)*r,y+.10,Math.sin(a)*r],[Math.cos(a-da)*r,y+.05,Math.sin(a-da)*r],[Math.cos(a)*r,y,Math.sin(a)*r]],.003);}
  }
  for(const [r,y,t]of [[.48,1.82,.012],[.45,2.19,.011],[.41,2.23,.01]]){const ring=torus(cap,0,y,0,r,t,materials.edge);ring.rotation.x=Math.PI/2;}
  sphere(cap,0,2.27,0,.089,materials.gold,[1,.45,1]);torus(cap,0,2.46,0,.177,.022,materials.gold);
  // Continuous transparent sphere with camera-dependent highlights only.
  const crystal=LIGHTING_PROFILE.glass;
  const glass=new THREE.ShaderMaterial({name:'Clear continuous crystal shell',transparent:true,depthWrite:false,side:THREE.FrontSide,
    vertexShader:`varying vec3 vN;varying vec3 vP;void main(){vec4 w=modelMatrix*vec4(position,1.);vP=w.xyz;vN=normalize(mat3(modelMatrix)*normal);gl_Position=projectionMatrix*viewMatrix*w;}`,
    fragmentShader:`varying vec3 vN;varying vec3 vP;float panel(vec3 r,vec3 d,vec3 up,float w,float h){vec3 right=normalize(cross(up,d));up=normalize(cross(d,right));float den=max(.001,dot(r,d));vec2 q=vec2(dot(r,right),dot(r,up))/den;return(1.-smoothstep(w,w+.035,abs(q.x)))*(1.-smoothstep(h,h+.025,abs(q.y)))*step(.1,den);}void main(){vec3 n=normalize(vN),v=normalize(cameraPosition-vP),r=reflect(-v,n);float f=pow(1.-max(0.,dot(n,v)),4.3);float p=panel(r,normalize(vec3(-2.7,3.8,4.5)),vec3(0,1,0),.21,.29);float p2=panel(r,normalize(vec3(3.5,3.,3.)),vec3(0,1,0),.10,.27);float a=clamp(f*${crystal.fresnel.toFixed(3)}+p*${crystal.primary.toFixed(3)}+p2*${crystal.secondary.toFixed(3)},0.,${crystal.maxAlpha.toFixed(3)});gl_FragColor=vec4(mix(vec3(.88,.84,.73),vec3(1.,.98,.94),clamp(p+p2+f,0.,1.)),a);}`});
  const shell=new THREE.Mesh(new THREE.SphereGeometry(1.80,112,80),glass);shell.name='Uncut glass shell';shell.renderOrder=9;root.add(shell);
  if(surfaces){
    const seen=new Set();root.traverse(object=>{if(!object.isMesh||!object.geometry.attributes.uv)return;for(const m of Array.isArray(object.material)?object.material:[object.material]){
      if(!m||seen.has(m)||!m.isMeshStandardMaterial)continue;seen.add(m);const name=m.name.toLowerCase();let kind=null;
      if(m===materials.facadePaint)kind='paint';
      else if(m===materials.facadeIvory)kind='stucco';
      else if(name.includes('leather'))kind='leather';
      else if(name.includes('upholstery')||name.includes('fabric'))kind='fabric';
      else if(name.includes('wood')||name.includes('walnut'))kind='wood';
      else if(name.includes('snow'))kind='snow';
      else if(name.includes('gold')||name==='miniature · edge')kind='gold';
      else if(name.includes('pavement'))kind='pavement';
      else if(name==='miniature · ivory'||name==='miniature · linen')kind='stucco';
      else if(name.includes('red')||name.includes('warm ivory'))kind='paint';
      else if(name.includes('green'))kind='green';
      if(kind)surfaces.applyTo(m,kind);
      if(m===materials.facadePaint){m.emissiveMap=m.map;m.userData.luminousFacadePaint=true;m.needsUpdate=true;}
      if(m===materials.facadeIvory){m.emissiveMap=m.map;m.userData.luminousFacadeMasonry=true;m.needsUpdate=true;}
    }});
  }
  root.userData={rooms:roomRecords,windowCount:windows,outerRadius:1.8,signUsesOriginalArtwork:true,signSelectiveEmission:true,signDualZoneEmission:true,hasPhotographicCutouts:false,imageBasedInteriors:true,finishVersion:11,luminousFacadePaint:true,luminousFacadeMasonry:true,dimAmbient:true,physicallyTextured:true,warmLitRooms:6,decoratedRooms:6};
  return {root,building,rooms:roomRecords,windowCount:windows,materials,surfaces};
}
