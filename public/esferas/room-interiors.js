// One photographic room volume is shared by every window opening onto that room.
// Ordinary opaque UV meshes work identically in Three.js and the offline exporter.
const roomKinds=['reception','waiting','laboratory','radiology','office','examination'];
const photographCache=new WeakMap();
const fixtureCache=new WeakMap();

function photographMaterial(THREE,{kind,interiorImage,makeCanvas,anisotropy}){
  if(!interiorImage||typeof makeCanvas!=='function'){
    const material=new THREE.MeshBasicMaterial({color:0xc8b59a,side:THREE.FrontSide,toneMapped:false});
    material.name='Photo room fallback · '+kind;return {material,crop:null};
  }
  let cache=photographCache.get(interiorImage);
  if(!cache){cache=new Map();photographCache.set(interiorImage,cache);}
  const key=kind+':'+anisotropy;
  if(cache.has(key))return cache.get(key);
  const index=roomKinds.indexOf(kind),column=index%3,row=Math.floor(index/3);
  const cellWidth=interiorImage.width/3,cellHeight=interiorImage.height/2,inset=2;
  const crop={x:column*cellWidth+inset,y:row*cellHeight+inset,width:cellWidth-inset*2,height:cellHeight-inset*2};
  const canvas=makeCanvas(Math.floor(crop.width),Math.floor(crop.height));
  canvas.width=Math.floor(crop.width);canvas.height=Math.floor(crop.height);
  canvas.getContext('2d').drawImage(interiorImage,crop.x,crop.y,crop.width,crop.height,0,0,canvas.width,canvas.height);
  const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;
  texture.anisotropy=Math.max(1,Math.min(16,Number.isFinite(anisotropy)?anisotropy:8));
  texture.wrapS=texture.wrapT=THREE.ClampToEdgeWrapping;
  texture.minFilter=THREE.LinearMipmapLinearFilter;texture.magFilter=THREE.LinearFilter;
  texture.name='Warm photographic clinic room · '+kind;
  const material=new THREE.MeshBasicMaterial({map:texture,side:THREE.FrontSide,toneMapped:false});
  material.name='Photo interior · '+kind;
  material.userData={photoRoom:true,sharedAcrossWindows:true,sourceAtlas:'assets/interiors-v10.webp',cell:index,crop};
  const result={material,crop};cache.set(key,result);return result;
}

function fixtureMaterials(THREE){
  if(fixtureCache.has(THREE))return fixtureCache.get(THREE);
  const frame=new THREE.MeshStandardMaterial({color:0x5a5141,metalness:.48,roughness:.38});
  frame.name='Photographic room · ceiling fixture frame';
  const diffuser=new THREE.MeshStandardMaterial({color:0xffebc7,roughness:.32,emissive:0xffd49a,emissiveIntensity:3.2});
  diffuser.name='Photographic room · warm ceiling diffuser';
  const value={frame,diffuser};fixtureCache.set(THREE,value);return value;
}

/**
 * Local floor y=0, centre x=z=0, front +z. No PointLights are added here.
 * interiorImage is a 3-column × 2-row atlas of six landscape photographs.
 * A fixed, shallow five-face frustum preserves the complete photograph from
 * the front and introduces geometric parallax at oblique views. Its inward
 * faces are one-sided: the near face culls from side/rear windows rather than
 * laying an opaque photographic panel over those architectural openings.
 */
export function addClinicInterior(THREE,parent,{
  kind,width=.86,depth=1,height=.64,seed=1,interiorImage,makeCanvas,anisotropy=8
}={}){
  if(!roomKinds.includes(kind))throw new RangeError('Unknown clinic interior kind: '+kind);
  if(![width,depth,height].every(value=>Number.isFinite(value)&&value>0))throw new RangeError('Room dimensions must be positive');
  const group=new THREE.Group();group.name='Photographic shared room · '+kind;
  const {material,crop}=photographMaterial(THREE,{kind,interiorImage,makeCanvas,anisotropy});
  const left=-width*.49,right=width*.49,bottom=height*.012,top=height*.986;
  const front=depth*.43,back=depth*.28;
  const backUV={left:.08,right:.92,bottom:.07,top:.86};
  const xAt=u=>left+(right-left)*u,yAt=v=>bottom+(top-bottom)*v;
  const fl=[left,bottom,front],fr=[right,bottom,front],tl=[left,top,front],tr=[right,top,front];
  const bfl=[xAt(backUV.left),yAt(backUV.bottom),back],bfr=[xAt(backUV.right),yAt(backUV.bottom),back];
  const btl=[xAt(backUV.left),yAt(backUV.top),back],btr=[xAt(backUV.right),yAt(backUV.top),back];
  const positions=[],uvs=[];
  function quad(vertices,inward){
    let points=vertices;
    const a=new THREE.Vector3(...points[0]),b=new THREE.Vector3(...points[1]),c=new THREE.Vector3(...points[2]);
    const normal=b.sub(a).cross(c.sub(a));
    if(normal.dot(new THREE.Vector3(...inward))<0)points=[vertices[0],vertices[3],vertices[2],vertices[1]];
    for(const i of [0,1,2,0,2,3]){
      const p=points[i];positions.push(...p);
      // A single orthographic projector is shared by all five faces. Every
      // image pixel appears exactly once in a frontal view, without stretching
      // separate window cards, duplicate foreground layers or angle fades.
      uvs.push((p[0]-left)/(right-left),(p[1]-bottom)/(top-bottom));
    }
  }
  quad([bfl,bfr,btr,btl],[0,0,1]);
  quad([fl,bfl,btl,tl],[1,0,0]);
  quad([fr,tr,btr,bfr],[-1,0,0]);
  quad([fl,fr,bfr,bfl],[0,1,0]);
  quad([tl,btl,btr,tr],[0,-1,0]);
  const geometry=new THREE.BufferGeometry();
  geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
  geometry.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));
  geometry.computeVertexNormals();geometry.computeBoundingBox();geometry.computeBoundingSphere();
  const alcove=new THREE.Mesh(geometry,material);alcove.name='Five-face photo alcove · '+kind;
  alcove.userData={photoRoom:true,sharedAcrossWindows:true,angleFades:false};
  group.add(alcove);

  // A small physical ceiling fitting remains in front of the photographic depth.
  // The caller retains actual room lights and independent Christmas ornaments.
  const fittings=fixtureMaterials(THREE),batches=new Map();
  function addFitting(g,m,x,y,z){
    g.translate(x,y,z);const list=batches.get(m)||[];list.push(g);batches.set(m,list);
  }
  addFitting(new THREE.BoxGeometry(width*.43,height*.018,depth*.095),fittings.frame,0,height*.962,depth*.265);
  addFitting(new THREE.BoxGeometry(width*.39,height*.009,depth*.072),fittings.diffuser,0,height*.947,depth*.265);
  for(const [m,geometries] of batches){
    const p=[],n=[],uv=[];
    for(const source of geometries){
      const flat=source.toNonIndexed();
      for(const v of flat.attributes.position.array)p.push(v);
      for(const v of flat.attributes.normal.array)n.push(v);
      for(const v of flat.attributes.uv.array)uv.push(v);
      flat.dispose();source.dispose();
    }
    const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));
    g.setAttribute('normal',new THREE.Float32BufferAttribute(n,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));
    g.computeBoundingBox();g.computeBoundingSphere();
    const mesh=new THREE.Mesh(g,m);mesh.name=kind+' · '+m.name;group.add(mesh);
  }
  const anchors={reception:[-.35,.40],waiting:[-.35,.40],laboratory:[.35,.40],radiology:[-.35,.40],office:[.35,.40],examination:[.35,.40]};
  const anchor=anchors[kind];
  group.userData={
    kind,seed,photoRoom:true,sharedAcrossWindows:true,hasFurnitureMeshes:false,angleFades:false,
    photoProjection:{surfaceCount:5,frontAxis:'+z',inwardFacing:true,frontDepth:front,backDepth:back,backUV,crop,atlasCell:roomKinds.indexOf(kind),atlasLayout:{columns:3,rows:2}},
    festiveAnchor:{x:anchor[0]*width,y:0,z:anchor[1]*depth,radius:.095*Math.min(width,depth),height:.30*height/.64},
    luminaireAnchors:[{kind:'warm ceiling panel',x:0,y:height*.947,z:depth*.265}]
  };
  parent.add(group);return group;
}
