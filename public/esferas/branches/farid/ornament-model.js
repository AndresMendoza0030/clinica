import {addWinterPine,createFestiveBatches} from '../../vegetation.js';
import {addFaridBuilding} from './farid-building.js';
import {createSurfaceMaterials} from '../../surface-materials.js';
import {LIGHTING_PROFILE} from '../../lighting-profile.js';

// The architecture and the snowy landscaping share one set of coordinates in
// native WebGL and in the pre-rendered turntable. +Z faces Plaza Farid's street.
export function createOrnamentModel(THREE,{signImage,interiorImage,makeCanvas,anisotropy=8}={}){
  const root=new THREE.Group();root.name='Plaza Farid · esfera navideña';
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
  function torus(parent,x,y,z,r,t,mat){const mesh=new THREE.Mesh(new THREE.TorusGeometry(r,t,10,64),mat);mesh.position.set(x,y,z);parent.add(mesh);return mesh;}
  const {building, rooms, windowCount} = addFaridBuilding(THREE, root, {
    materials, signImage, interiorImage, makeCanvas, anisotropy
  });

  const profile = [new THREE.Vector2(0, -1.76)];
  for (let i = 0; i <= 42; i++) {
    const y = -1.755 + i / 42 * .935;
    profile.push(new THREE.Vector2(Math.sqrt(Math.max(0, 1.76 ** 2 - y * y)), y));
  }
  root.add(new THREE.Mesh(new THREE.LatheGeometry(profile, 112), materials.snow));
  const snowTop = new THREE.Mesh(new THREE.CircleGeometry(1.557, 96), materials.snow);
  snowTop.rotation.x = -Math.PI / 2;
  snowTop.position.y = -.820;
  root.add(snowTop);

  // The asphalt narrows with the bowl. Its soft curved front never protrudes
  // through the snow or crystal when the ornament turns sideways.
  const parking = new THREE.Shape();
  const streetHalfWidth = 1.27;
  parking.moveTo(-streetHalfWidth, -.37);
  parking.lineTo(streetHalfWidth, -.37);
  for (let i = 0; i <= 32; i++) {
    const x = streetHalfWidth * (1 - 2 * i / 32);
    const near = .58 + .64 * Math.sqrt(Math.max(0, 1 - (x / streetHalfWidth) ** 2));
    parking.lineTo(x, -near);
  }
  parking.closePath();
  function onGround(geometry, material, x, y, z, name) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.set(x, y, z);
    root.add(mesh);
    return mesh;
  }
  onGround(new THREE.ShapeGeometry(parking), materials.pavement, 0, -.807, 0, 'Bahía asfaltada de Plaza Farid');
  // A single swept drift follows the irregular boundary between the cleared
  // asphalt and the bowl. Its windward edge thins below the pavement; the
  // leeward edge melts into the existing snow without a seam or separate blobs.
  const driftVertices=[], driftUV=[], driftFaces=[];
  const arcSteps=80, crossSteps=9;
  for(let i=0;i<=arcSteps;i++) {
    const t=i/arcSteps, theta=(t-.5)*Math.PI;
    const sin=Math.sin(theta),cos=Math.cos(theta);
    const x=streetHalfWidth*sin,z=.58+.64*cos;
    const length=Math.hypot(sin/streetHalfWidth,cos/.64);
    const nx=sin/(streetHalfWidth*length), nz=cos/(.64*length);
    const fade=Math.min(1,Math.sin(Math.PI*t)*6);
    const leftDrift=Math.exp(-((x+.78)**2)/.054);
    const rightDrift=Math.exp(-((x-.71)**2)/.074);
    const wind=.55*Math.sin(theta*11+.32)+.27*Math.sin(theta*22-1)+.18*Math.cos(theta*35+.4);
    const inner=-.042-.024*wind-.026*leftDrift-.016*rightDrift;
    const freeRun=-(x*nx+z*nz)+Math.sqrt((x*nx+z*nz)**2+1.54**2-x*x-z*z);
    const outer=Math.min(freeRun,.14+.028*wind+.05*(leftDrift+rightDrift));
    const height=fade*(.055+.021*wind+.046*leftDrift+.028*rightDrift);
    for(let j=0;j<=crossSteps;j++) {
      const k=j/crossSteps,offset=(inner+(outer-inner)*k)*fade;
      const crest=Math.sin(k*Math.PI)**1.8*(1.25-.5*k);
      const px=x+nx*offset,pz=z+nz*offset;
      driftVertices.push(px,-.826+height*crest,pz);
      driftUV.push(px*.75,pz*.75);
      if(i<arcSteps&&j<crossSteps){
        const a=i*(crossSteps+1)+j,b=a+crossSteps+1;
        driftFaces.push(a,a+1,b,b,a+1,b+1);
      }
    }
  }
  const driftGeometry=new THREE.BufferGeometry();
  driftGeometry.setAttribute('position',new THREE.Float32BufferAttribute(driftVertices,3));
  driftGeometry.setAttribute('uv',new THREE.Float32BufferAttribute(driftUV,2));
  driftGeometry.setIndex(driftFaces);
  driftGeometry.computeVertexNormals();
  const snowBank=new THREE.Mesh(driftGeometry,materials.snow);
  snowBank.name='Nieve acumulada junto al estacionamiento';
  root.add(snowBank);
  box(root, 0, -.798, .51, 2.52, .035, .23, materials.ivory, 'Acera frente a la sede');
  for (const x of [-.99, -.63, -.27, .09, .45, .81, 1.13]) {
    const near = .60 + .56 * Math.sqrt(Math.max(0, 1 - ((x-.04) / streetHalfWidth) ** 2));
    const far = .64, length = near - far;
    const stripe = onGround(new THREE.PlaneGeometry(.012, length), materials.yellow,
      x, -.804, (near + far) / 2, 'Marca del estacionamiento');
    stripe.rotation.z = -.085;
  }
  for (const x of [-.79, -.435, -.075, .285, .645, 1.005]) {
    box(root, x, -.791, .659, .175, .032, .046, materials.ivory, 'Tope de rueda');
  }

  // Painted, planar parking symbol. Build the strokes once so it scales like a
  // road marking and never depends on a platform-specific wheelchair glyph.
  const parkingBlue = new THREE.MeshStandardMaterial({color:0x176b80, roughness:.83});
  const roadWhite = new THREE.MeshStandardMaterial({color:0xf3e9cf, roughness:.86,
    emissive:0xeedbc5,emissiveIntensity:.06});
  parkingBlue.name = 'Esmalte azul del espacio accesible';
  roadWhite.name = 'Pintura de tráfico marfil';
  const bayX = -.444, bayZ = .865;
  onGround(new THREE.PlaneGeometry(.285, .267),roadWhite,bayX,-.802,bayZ,'Borde del espacio accesible');
  onGround(new THREE.PlaneGeometry(.266, .248),parkingBlue,bayX,-.801,bayZ,'Espacio accesible');
  const marking = new THREE.Group();
  marking.name = 'Símbolo de acceso';
  marking.position.set(bayX,-.800,bayZ);
  marking.rotation.x = -Math.PI / 2;
  root.add(marking);
  function mark(meshGeometry,x,y,angle=0) {
    const mesh = new THREE.Mesh(meshGeometry,roadWhite);
    mesh.position.set(x,y,0);
    mesh.rotation.z = angle;
    marking.add(mesh);
  }
  function stroke(x1,y1,x2,y2,width) {
    mark(new THREE.PlaneGeometry(Math.hypot(x2-x1,y2-y1),width),
      (x1+x2)/2,(y1+y2)/2,Math.atan2(y2-y1,x2-x1));
  }
  mark(new THREE.CircleGeometry(.018,14),-.027,.070);
  mark(new THREE.RingGeometry(.047,.057,26,1,.79,4.96),-.026,-.025);
  stroke(-.027,.047,-.017,-.010,.015);
  stroke(-.023,.025,.021,.024,.012);
  stroke(-.018,-.009,.035,-.009,.015);
  stroke(.032,-.009,.055,-.054,.015);
  stroke(.053,-.053,.074,-.047,.012);

  // The reference places presents under both trees and leaves the public and
  // service entrances clear. The gifts belong to the same static tree batches.
  for (const side of [-1,1]) {
    const gifts = [
      {x:-side*.065,z:.115,w:.124,h:.115,d:.100,color:0xb31928,ribbon:0xf4c269,rotation:side*.12},
      {x:-side*.145,z:.093,w:.082,h:.073,d:.081,color:0xca2634,ribbon:0xe4b252,rotation:-side*.18}
    ];
    addWinterPine(THREE,root,{x:side*1.292,y:-.806,z:.56,
      height:side<0?.86:.82,radius:.204,seed:side<0?17:53,gifts});
  }
  // Small pine and berry sprays break up the pavement and snow, as in the
  // reference. All five share the same mesh and add one draw call.
  const shrubs = createFestiveBatches(THREE);
  const sprigPositions = [[-.58,.50], [.15,.50], [.49,.50], [-.76,1.16], [.73,1.16]];
  for (const [cx,cz] of sprigPositions) {
    const frontBank = cz > 1;
    const ground = frontBank ? -.786 : -.777;
    const width = frontBank ? .108 : .084;
    for (let i=0;i<11;i++) {
      const angle = i*2.39996 + cx;
      const dir = shrubs.V(Math.cos(angle),.44+.36*(i%3),Math.sin(angle)).normalize();
      const origin = shrubs.V(cx,ground,cz);
      const tip = origin.clone().addScaledVector(dir,width*(1-.025*(i%4)));
      shrubs.rod(origin,tip,.002,.001,0x785433,0,4);
      for (let j=1;j<=4;j++) {
        const base = origin.clone().lerp(tip,j/5);
        for (const side of [-1,1]) {
          const leaf = shrubs.V(dir.x + side*.64*dir.z, dir.y+.26, dir.z-side*.64*dir.x);
          shrubs.needle(base,leaf,.039-j*.004,.007,j%2?0x385536:0x1f4b34);
        }
      }
      if(i%3===0) shrubs.ellipsoid(tip,shrubs.V(.008,.008,.008),0xb31a2c,0,7,4);
      if(i%2===0) {
        const dust = origin.clone().lerp(tip,.72);
        dust.y += .004;
        shrubs.ellipsoid(dust,shrubs.V(.022,.007,.014),0xf9efe0,0,7,4,-angle);
      }
    }
  }
  shrubs.finish(root,'Ramas nevadas y bayas');
  const strandRadius = Math.sqrt(1.76 ** 2 - 1.28 ** 2) + .012;
  const strand = torus(root,0,-1.28,0,strandRadius,.0025,materials.edge);
  strand.rotation.x = Math.PI / 2;
  const count = 48;
  const bulbs = new THREE.InstancedMesh(new THREE.SphereGeometry(.008,8,5),materials.led,count);
  bulbs.name = 'Guirnalda interior del cristal';
  const bulb = new THREE.Object3D();
  for (let i=0;i<count;i++) {
    const angle = i * 2 * Math.PI / count;
    bulb.position.set(Math.cos(angle)*strandRadius,-1.28,Math.sin(angle)*strandRadius);
    bulb.updateMatrix();
    bulbs.setMatrixAt(i,bulb.matrix);
  }
  root.add(bulbs);

  // Full gold filigree cap; no image cards are attached to the metal or glass.
  const cap=new THREE.Group();cap.name='Casquillo de filigrana y anilla de oro';root.add(cap);
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
      if(!m||seen.has(m)||!m.isMeshStandardMaterial||m.map||m.userData?.originalArtwork)continue;seen.add(m);const name=m.name.toLowerCase();let kind=null;
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
  root.userData = {
    branch:'plaza-farid', rooms, windowCount, outerRadius:1.8,
    imageBasedInteriors:true, luminousFacadePaint:true, luminousFacadeMasonry:true,
    dimAmbient:true, physicallyTextured:true
  };
  return {root,building,rooms,windowCount,materials,surfaces};
}
