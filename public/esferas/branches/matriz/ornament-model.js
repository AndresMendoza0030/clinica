import {addWinterPine,createFestiveBatches} from '../../vegetation.js';
import {addMatrizBuilding} from './matriz-building.js';
import {createSurfaceMaterials} from '../../surface-materials.js';
import {LIGHTING_PROFILE} from '../../lighting-profile.js';

// The architecture and the snowy landscaping share one set of coordinates in
// native WebGL and in the pre-rendered turntable. +Z faces Casa Matriz's street.
export function createOrnamentModel(THREE,{signImage,interiorImage,makeCanvas,anisotropy=8}={}){
  const root=new THREE.Group();root.name='Casa Matriz · esfera navideña';
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
  const {building, rooms, windowCount} = addMatrizBuilding(THREE, root, {
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

  // Blanquecino patio peatonal de la sede original. A swept bank bounds
  // the cleared sandstone path; the pavement ends under the public door.
  box(root,-.685,-.807,.680,.65,.025,.491,materials.ivory,'Atrio de piedra de Casa Matriz');
  box(root,-.685,-.792,.511,.626,.022,.192,materials.ivory,'Escalón bajo de la entrada');
  for (let i=0;i<3;i++) box(root,-.685,-.792,.663+i*.094,.643,.002,.003,materials.linen,'Junta del atrio');
  const vertices=[],uv=[],faces=[];
  const along=74,across=8;
  for(let i=0;i<=along;i++){
    const t=i/along,theta=(t-.5)*Math.PI;
    const x=1.24*Math.sin(theta),z=.45+.65*Math.cos(theta);
    const wind=.015*Math.sin(theta*11+.1)+.02*Math.cos(theta*5);
    const strength=.052+.024*Math.pow(Math.sin(theta*3+.5),2);
    for(let j=0;j<=across;j++){
      const q=j/across,radius=.09+.07*q+wind;
      const px=x+Math.sin(theta)*radius,pz=z+Math.cos(theta)*radius;
      const h=.988*Math.sin(q*Math.PI)**1.38*Math.min(1,Math.sin(t*Math.PI)*7);
      vertices.push(px,-.829+h*strength,pz);uv.push(px,pz);
      if(i<along&&j<across){const a=i*(across+1)+j,b=a+across+1;faces.push(a,a+1,b,b,a+1,b+1);}
    }
  }
  const snowGeometry=new THREE.BufferGeometry();
  snowGeometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));
  snowGeometry.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));snowGeometry.setIndex(faces);snowGeometry.computeVertexNormals();
  const drift=new THREE.Mesh(snowGeometry,materials.snow);drift.name='Ventisquero junto al atrio';root.add(drift);

  // Golden star pines flank the closed architectural volume without masking its doors.
  for(const side of [-1,1]){
    const gifts=[
      {x:-side*.047,z:.169,w:.158,h:.142,d:.133,color:0xbb1b26,ribbon:0xeec35d,rotation:side*.13},
      {x:-side*.160,z:.129,w:.110,h:.095,d:.102,color:0xda3331,ribbon:0xf8d98c,rotation:-side*.13}
    ];
    addWinterPine(THREE,root,{x:side*1.31,y:-.806,z:.385,height:side<0?1.19:1.15,radius:.221,seed:side<0?94:133,gifts});
  }
  const plants=createFestiveBatches(THREE),{V}=plants;
  // Layered, radially bent bracts keep the poinsettias recognizable from all sides.
  function bract(origin,a,len,width,rise,tint) {
    const along=V(Math.cos(a),0,Math.sin(a)),across=V(-along.z,0,along.x);
    const mid=origin.clone().addScaledVector(along,len*.50).add(V(0,rise,0));
    const point=origin.clone().addScaledVector(along,len).add(V(0,rise*.30,0));
    const l=mid.clone().addScaledVector(across,width),r=mid.clone().addScaledVector(across,-width);
    const ridge=mid.clone().add(V(0,len*.075,0));
    for(const tri of [[origin,l,ridge],[l,point,ridge],[point,r,ridge],[r,origin,ridge]]){
      const [u,v,w]=tri;
      const normal=v.clone().sub(u).cross(w.clone().sub(u));
      if(normal.y<0)plants.triangle(0,u,w,v,tint);else plants.triangle(0,u,v,w,tint);
    }
  }
  for(const side of [-1,1]){
    const cx=side*1.19,cz=.68;
    for(let k=0;k<4;k++){
      const a=k*2.39996,c=V(cx+Math.cos(a)*.044,-.743+.014*(k%2),cz+Math.sin(a)*.039);
      plants.rod(V(c.x,-.81,c.z),c,.004,.002,0x35602e,0,5);
      for(let i=0;i<7;i++)bract(c,i*.898+a,.089,.025,.038,i%2?0x346334:0x1d5131);
      for(let i=0;i<7;i++)bract(c.clone().add(V(0,.016,0)),i*.898+a+.41,.083,.026,.035,i%2?0xbc1725:0xde292e);
      for(let i=0;i<5;i++)bract(c.clone().add(V(0,.024,0)),i*1.256+a,.043,.014,.026,0xde292f);
      plants.ellipsoid(c.clone().add(V(0,.043,0)),V(.009,.008,.008),0xf1c84c,1,7,4);
    }
  }
  // Low spherical shrubs with warm light among their snowy leaves, like the reference.
  for(const [cx,cz,r] of [[-.27,.506,.113],[.06,.551,.072],[.32,.54,.066],[.64,.515,.129],[.89,.52,.061]]){
    const centre=V(cx,-.8+r*.76,cz);
    plants.ellipsoid(centre,V(r,r*.88,r*.82),0x315439,0,12,8);
    for(let i=0;i<74;i++){
      const y=-.58+1.58*i/74,a=i*2.399963,hr=Math.sqrt(1-y*y);
      const n=V(hr*Math.cos(a),y,hr*Math.sin(a)),p=centre.clone().add(V(n.x*r,n.y*r*.88,n.z*r*.82));
      plants.needle(p,n,.016,.005,i%2?0x326037:0x406a3b);
      if(y>.20&&i%3===0)plants.ellipsoid(p,V(.020,.006,.013),0xfff3de,0,7,4);
      if(i%7===0)plants.ellipsoid(p,V(.006,.006,.006),0xffc265,2,7,4);
    }
  }
  plants.finish(root,'Flores de Pascua y boj iluminado de Casa Matriz');
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
    branch:'casa-matriz', rooms, windowCount, outerRadius:1.8,
    imageBasedInteriors:true, luminousFacadePaint:true, luminousFacadeMasonry:true,
    dimAmbient:true, physicallyTextured:true
  };
  return {root,building,rooms,windowCount,materials,surfaces};
}
