import {addClinicInterior} from '../../room-interiors.js';
import {createFestiveBatches} from '../../vegetation.js';

// Coordinates follow the model of Plaza Farid. All glazed openings are recessed
// into the masonry, so the upper strip windows keep their proportions in profile.
export function addFaridBuilding(THREE, root, {materials,signImage,interiorImage,makeCanvas,anisotropy=4}={}) {
  const building=new THREE.Group();
  building.name='Plaza Médica Farid · miniature';
  root.add(building);
  const m=materials, rooms=[];
  let windowCount=0;
  const bottom=-.798, back=-.64, height=.492, front=.391;
  const unitBox=new THREE.BoxGeometry(1,1,1);
  const box=(parent,name,x,y,z,w,h,d,material)=>{
    if(w<.00001||h<.00001||d<.00001)return;
    const mesh=new THREE.Mesh(unitBox,material);
    mesh.name=name;mesh.position.set(x,y,z);mesh.scale.set(w,h,d);parent.add(mesh);return mesh;
  };
  const metal=(name,color,roughness,metalness,emissive=0,emissiveIntensity=0)=>{
    const mat=new THREE.MeshStandardMaterial({color,roughness,metalness,emissive,emissiveIntensity});
    mat.name=name;return mat;
  };
  const crimson=metal('Plaza · paprika enamel',0xa40c1e,.25,.20,0xe0131c,.32);
  const maroon=metal('Plaza · enamel panel reveals',0x691419,.60,.06);
  const joint=metal('Plaza · limestone joint',0xb7a998,.74,.04);
  const aluminium=metal('Plaza · satin aluminium',0x897d70,.32,.64);
  const shutter=metal('Plaza · rolled silver steel',0xe5e0d7,.51,.22,0xa7a7a5,.45);
  const shutterShade=metal('Plaza · shutter groove',0x938d83,.56,.18,0x807f7b,.22);
  const shutterLip=metal('Plaza · folded shutter lip',0xe9e7df,.47,.28,0xb0aeab,.50);
  const enamel=metal('Plaza · dimensional lettering',0xc30b1b,.24,.26,0xd61120,.56);
  const sprigMaterials={dark:0x153c22,mid:0x25502c,light:0x3c6335};
  const mainWing={min:-.642,max:.532,z:front,top:.696,finish:m.facadeIvory};
  const leftWing={min:-1.287,max:-.642,z:.428,top:.811,finish:m.facadePaint};
  const rightWing={min:.532,max:1.287,z:.423,top:.8,finish:m.facadeIvory};
  const U=(x,y,w,h,kind,panes=3)=>({x,y,w,h,kind,panes});
  const leftWindows=[U(-.955,.155,.466,.199,'office')];
  const centerWindows=[U(.078,.158,.504,.205,'examination'),U(-.207,-.563,.375,.452,'reception',2),U(.284,-.483,.408,.254,'waiting'),U(-.456,.203,.113,.065,'vent',2),U(-.486,-.412,.110,.068,'vent',2)];
  const rightWindows=[U(.912,.162,.550,.226,'laboratory')];
  const leftDoor=U(-1.118,-.568,.146,.443,'service',1);
  const rollerDoor=U(.941,-.527,.523,.533,'shutter',1);

  function plane(parent,name,x,y,z,w,h,material){
    const mesh=new THREE.Mesh(new THREE.PlaneGeometry(w,h),material);
    mesh.name=name;mesh.position.set(x,y,z);parent.add(mesh);return mesh;
  }
  function panelledWall(parent,section,openings,seamsX=[],seamsY=[]){
    // Only architectural joints receive a reveal. Extra cuts surrounding the
    // openings meet flush; they do not introduce a spurious grid in the stone.
    const {min,max,z,top,finish}=section;
    const hcuts=[bottom,top,...seamsY.filter(y=>y>bottom&&y<top)];
    const vcuts=[min,max,...seamsX.filter(x=>x>min&&x<max)];
    for(const o of openings){hcuts.push(o.y-o.h/2,o.y+o.h/2);vcuts.push(o.x-o.w/2,o.x+o.w/2);}
    const ordered=v=>[...new Set(v)].sort((a,b)=>a-b);
    const xx=ordered(vcuts),yy=ordered(hcuts);
    const reveal=section.finish===m.facadePaint?maroon:joint;
    for(let j=0;j<yy.length-1;j++){
      const yl=yy[j],yh=yy[j+1],y=(yl+yh)/2;
      for(let i=0;i<xx.length-1;i++){
        const xl=xx[i],xh=xx[i+1],x=(xl+xh)/2;
        if(openings.some(o=>Math.abs(o.x-x)<o.w/2&&Math.abs(o.y-y)<o.h/2))continue;
        box(parent,'Cut façade cladding',x,y,z-.029,xh-xl,yh-yl,.058,finish);
        if(seamsX.includes(xl))box(parent,'Vertical panel reveal',xl+.001,y,z+.0008,.003,yh-yl,.0016,reveal);
        if(seamsY.includes(yl))box(parent,'Horizontal panel reveal',x,yl+.001,z+.0008,xh-xl,.003,.0016,reveal);
      }
    }
  }
  const course=[-.60,-.42,-.24,-.055,.12,.30,.477,.650];
  panelledWall(building,leftWing,[...leftWindows,leftDoor],[-1.125,-.962,-.799],course);
  panelledWall(building,mainWing,centerWindows,[-.15,.329],course);
  panelledWall(building,rightWing,[...rightWindows,rollerDoor],[.899],course);

  function gallery(parent,opening,face,side='frente'){
    const {x,y,w,h,kind,panes}=opening;
    const glass=plane(parent,'Cristal de '+kind,x,y,face-.003,w,h,m.window);
    glass.renderOrder=1;windowCount++;
    const thickness=kind==='vent'?.007:.010;
    const jambDepth=.058, z=face-jambDepth/2+.002;
    for(const dir of [-1,1]){
      box(parent,'Rebaje y perfil lateral',x+dir*(w/2-thickness/2),y,z,thickness,h,jambDepth,aluminium);
      box(parent,'Cabezal y alféizar',x,y+dir*(h/2-thickness/2),z,w,thickness,jambDepth,aluminium);
    }
    for(let i=1;i<panes;i++)box(parent,'Montante de cristal',x-w/2+i*w/panes,y,face-.001,thickness*.72,h-.011,.021,aluminium);
    if(kind==='vent'){
      box(parent,'Fondo de ventilación',x,y,face-.036,w-.006,h-.008,.008,m.frame);return;
    }
    const depth=Math.min(.26,.8*w),photo=addClinicInterior(THREE,parent,{
      kind,width:w-.009,height:h-.013,depth,interiorImage,makeCanvas,anisotropy
    });
    photo.position.set(x,y-h/2+.006,face-depth*.43-.047);
    rooms.push({kind,floor:y>0?1:0,lit:true,windows:[side]});
    if(side==='frente' && w>.22){
      const light=new THREE.PointLight(0xffc385,.16,.42,2);
      light.name='Lámpara de '+kind;light.position.set(x,y+h*.32,face-.031);parent.add(light);
    }
  }
  for(const [section,windows] of [[leftWing,leftWindows],[mainWing,centerWindows],[rightWing,rightWindows]]){
    for(const opening of windows)gallery(building,opening,section.z);
  }

  // Rear and side elevations have actual partitions, glazed returns and a
  // service entrance. They are deliberately more modest than the street face.
  for(const spec of [
    {angle:Math.PI,x:0,z:back,width:2.574,side:'posterior',openings:[U(-.76,.10,.32,.16,'office'),U(.37,.10,.37,.16,'examination'),U(-.43,-.51,.34,.17,'laboratory')]},
    {angle:-Math.PI/2,x:-1.287,z:-.127,width:1.026,side:'lateral oeste',openings:[U(-.21,.12,.30,.16,'office'),U(.18,-.49,.25,.18,'waiting')]},
    {angle:Math.PI/2,x:1.287,z:-.127,width:1.026,side:'lateral este',openings:[U(.19,.12,.27,.15,'laboratory'),U(-.19,-.46,.23,.16,'examination')]}
  ]){
    const wall=new THREE.Group();wall.name='Fachada '+spec.side;wall.rotation.y=spec.angle;wall.position.set(spec.x,0,spec.z);building.add(wall);
    panelledWall(wall,{min:-spec.width/2,max:spec.width/2,z:0,top:height,finish:m.facadeIvory},spec.openings,[],[-.23,.30]);
    for(const opening of spec.openings)gallery(wall,opening,0,spec.side);
    if(spec.side==='posterior'){
      box(wall,'Marco del acceso de servicio',.84,-.56,.008,.198,.467,.023,aluminium);
      box(wall,'Puerta posterior de servicio',.84,-.563,.022,.180,.444,.015,shutter);
      box(wall,'Manija posterior',.902,-.556,.036,.038,.010,.01,m.frame);
    }
  }
  for(const y of [bottom+.006,-.22,height-.006])box(building,'Losa del edificio',0,y,-.122,2.56,.021,1.015,m.ivory);
  // The tall red and ivory returns are genuine wrapped volumes, visible from
  // above and in profile. No billboards are used for the stepped silhouette.
  function snowCrest(name,cx,y,frontZ,w,d,amplitude,phase) {
    const positions=[],uv=[],indices=[],sections=Math.ceil(w/.035);
    // A single soft, watertight skin sits on the supporting snow slab. Depth
    // bands round each edge while a low undulation breaks the machine-cut line.
    const profile=[[-.005,0],[0,.28],[.055,.68],[.24,.96],[.53,1],[.78,.91],[.94,.82],[1,.50],[1.025,.12],[1.012,-.08]];
    const samples=profile.length;
    for(let col=0;col<=sections;col++){
      const t=col/sections,x=cx+(t-.5)*w;
      const undulation=.84+.18*Math.sin(x*16+phase)+.12*Math.sin(x*32-.8*phase)+.075*Math.cos(x*49+phase);
      // The snow melts down over both ends as it does along the two eaves.
      const end=Math.min(1,.48+Math.min(t,1-t)*w*12);
      for(const [depth,thickness] of profile){
        positions.push(x,y+amplitude*thickness*undulation*end,frontZ-d+depth*d);
        uv.push(x*1.9,depth);
      }
    }
    for(let col=0;col<sections;col++)for(let row=0;row<samples-1;row++){
      const a=col*samples+row,b=a+samples;
      indices.push(a,a+1,b,b,a+1,b+1);
    }
    for(const side of [0,sections]){
      const start=side*samples;
      for(let j=1;j<samples-1;j++){
        if(side===0)indices.push(start,start+j+1,start+j);
        else indices.push(start,start+j,start+j+1);
      }
    }
    const geo=new THREE.BufferGeometry();
    geo.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
    geo.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));geo.setIndex(indices);geo.computeVertexNormals();
    const cap=new THREE.Mesh(geo,m.snow);cap.name=name;building.add(cap);
  }
  for(const s of [leftWing,rightWing,mainWing]){
    const d=s===mainWing?.197:.25;
    const w=s.max-s.min,cx=(s.max+s.min)/2;
    for(const x of [s.min+.009,s.max-.009])box(building,'Retorno de pretil',x,(s.top+height)/2,s.z-d/2,.017,s.top-height,d,s.finish);
    box(building,'Trasdós de pretil',cx,(s.top+height)/2,s.z-d,w,s.top-height,.018,s.finish);
    box(building,'Albarda de piedra',cx,s.top-.005,s.z-d/2,w+.009,.016,d+.012,s.finish);
    box(building,'Snow on parapet',cx,s.top+.005,s.z-d/2,w+.014,.014,d+.015,m.snow);
    snowCrest('Cresta nevada del pretil',cx,s.top+.010,s.z+.013,w+.019,d+.021,.028,cx*5);
  }
  for(const s of [leftWing,rightWing]){
    const sideX=s===leftWing?s.min:s.max,overhang=s===leftWing?.042:.036;
    box(building,'Retorno de la fachada de calle',sideX,(height+bottom)/2,front+overhang/2,.024,height-bottom,overhang,s.finish);
  }
  box(building,'Ala de nieve sobre cubierta',0,height+.010,-.220,2.57,.014,.83,m.snow);
  box(building,'Peto trasero',0,height+.014,back+.006,2.574,.048,.027,m.ivory);
  box(building,'Nieve en el peto trasero',0,height+.042,back+.006,2.576,.013,.030,m.snow);
  // Closed external service door and corrugated shutter are distinctive to Farid.
  const sd=leftDoor;
  box(building,'Marco zapata roja',sd.x,sd.y,leftWing.z-.017,sd.w,sd.h,.052,maroon);
  box(building,'Puerta roja de servicio',sd.x,sd.y,leftWing.z+.003,sd.w-.016,sd.h-.017,.019,crimson);
  box(building,'Tirador latón',sd.x+.046,sd.y-.011,leftWing.z+.018,.029,.008,.009,m.edge);
  const sh=rollerDoor;
  box(building,'Marco de cortina metálica',sh.x,sh.y,rightWing.z-.012,sh.w,sh.h,.062,aluminium);
  box(building,'Persiana metálica',sh.x,sh.y,rightWing.z+.001,sh.w-.025,sh.h-.018,.031,shutter);
  for(let y=sh.y-sh.h/2+.018;y<sh.y+sh.h/2-.012;y+=.0235){
    const folded=box(building,'Labio plisado de la persiana',sh.x,y+.004,rightWing.z+.022,sh.w-.025,.008,.008,shutterLip);
    folded.rotation.x=-.32;
    box(building,'Sombra entre lamas',sh.x,y-.003,rightWing.z+.020,sh.w-.025,.0047,.009,shutterShade);
  }
  for(const x of [-.233,-.184])box(building,'Tirador de entrada',x,-.58,front+.027,.0055,.091,.012,m.edge);
  // Trace enamel letters as shallow solid geometry. They remain readable at
  // oblique angles, cast a small shadow, and do not light the surrounding panel.
  function letters(text,x,y,z,w,h){
    const art=lettering[text],shapes=[];
    for(const rings of art.glyphs){
      let shape;
      for(const [i,ring] of rings.entries()){
        const path=i?new THREE.Path():new THREE.Shape();
        for(let j=0;j<ring.length;j+=2){
          const px=(ring[j]/art.width-.5)*w,py=(.5-ring[j+1]/art.height)*h;
          if(j===0)path.moveTo(px,py);else path.lineTo(px,py);
        }
        path.closePath();if(!i){shape=path;shapes.push(shape);}else shape.holes.push(path);
      }
    }
    const geometry=new THREE.ExtrudeGeometry(shapes,{depth:.007,bevelEnabled:false,curveSegments:3});
    const mesh=new THREE.Mesh(geometry,enamel);mesh.name=text==='name'?'Letras corpóreas Dr. Mendoza':'Letras corpóreas Plaza Médica Farid';mesh.position.set(x,y,z);building.add(mesh);
  }
  letters('name',.108,.482,front+.006,.791,.257);
  letters('plaza',.907,.578,rightWing.z+.006,.659,.299);
  for(let k=0;k<4;k++){
    const a=k*Math.PI/2,r=.129,shape=new THREE.Shape();
    shape.moveTo(0,0);shape.lineTo(r*Math.cos(a),r*Math.sin(a));shape.absarc(0,0,r,a,a+Math.PI/2,false);shape.closePath();
    const quadrant=new THREE.Mesh(new THREE.ExtrudeGeometry(shape,{depth:.010,bevelEnabled:false,curveSegments:12}),enamel);
    quadrant.name='Emblema Dr. Mendoza · cuadrante';quadrant.position.set(-.478+Math.cos(a+Math.PI/4)*.005,.463+Math.sin(a+Math.PI/4)*.005,front+.004);building.add(quadrant);
  }
  function artDecal(name,rect,x,y,z,w,h){
    if(!signImage||!makeCanvas)return;
    const [sx,sy,sw,sh]=rect,c=makeCanvas(sw,sh);
    c.getContext('2d').drawImage(signImage,sx,sy,sw,sh,0,0,sw,sh);
    const map=new THREE.CanvasTexture(c);map.colorSpace=THREE.SRGBColorSpace;map.anisotropy=anisotropy;
    const mat=new THREE.MeshStandardMaterial({map,color:0xffffff,emissive:0xffffff,emissiveMap:map,emissiveIntensity:.30,roughness:.54});
    mat.name=name+' · original artwork';mat.userData.originalArtwork=true;
    const mesh=plane(building,name,x,y,z,w,h,mat);mesh.userData.originalArtwork=true;
  }
  box(building,'Borde metálico de ABIERTO',.089,-.035,front+.015,.380,.132,.023,aluminium);
  artDecal('ABIERTO',[0,0,100,34],.089,-.035,front+.028,.369,.119);
  // Translucent strips of exposed glass separate the small illustrated leaflets
  // from the door frames and preserve a view into the reception behind them.
  for(const [i,rect] of [[0,[0,40,40,83]],[1,[46,40,36,83]]]){
    artDecal('Vinilo de entrada',rect,-.207+(i-.5)*.184,-.584,front+.003,.143,.266);
  }
  for(const [i,rect] of [[0,[94,40,33,58]],[1,[136,40,31,58]],[2,[178,40,31,58]]]){
    artDecal('Vinilo de atención',rect,.284+(i-1)*.132,-.477,front+.003,.093,.153);
  }
  // Garland, folds and needles are low-poly baked batches, shared by renderers.
  box(building,'Marquesina continua',0,-.209,.489,2.604,.048,.204,aluminium);
  box(building,'Nieve en la marquesina',0,-.178,.486,2.609,.019,.207,m.snow);
  snowCrest('Nieve acumulada sobre marquesina',0,-.173,.591,2.61,.210,.018,6);
  const greens=createFestiveBatches(THREE),{V}=greens;
  let randomSeed=3901;
  function random(){randomSeed=(Math.imul(randomSeed,1664525)+1013904223)>>>0;return randomSeed/4294967296;}
  const bows=[-.74,.008,.713];
  for(let span=0;span<2;span++){
    const a=bows[span],b=bows[span+1];
    const path=t=>V(a+(b-a)*t,-.205-.054*Math.sin(t*Math.PI),.594);
    greens.tube(Array.from({length:15},(_,i)=>path(i/14)),.010,sprigMaterials.dark,0,5);
    for(let i=0;i<76;i++){
      const p=path(i/75);
      const direction=V(-.48+random()*.5,-.84+random()*.53,.18+random()*.46).normalize();
      const tip=p.clone().addScaledVector(direction,.038);
      greens.rod(p,tip,.004,.001,0x354225,0,4);
      for(let j=0;j<4;j++){
        const origin=p.clone().lerp(tip,j/4);
        for(const side of [-1,1])greens.needle(origin,V(side*.6,-.5,.45+random()*.3),.023+random()*.012,.0045,j%2?sprigMaterials.mid:sprigMaterials.light);
      }
      if(i%10===0)greens.ellipsoid(tip,V(.009,.009,.009),i%20?0xe8b552:0xa91425,1,7,5);
    }
  }
  for(const x of bows){
    const orig=V(x,-.201,.614),convert=path=>path.map(([x,y,z])=>orig.clone().add(V(x,y,z)));
    for(const s of [-1,1]){
      greens.ribbon(convert([[0,0,0],[s*.033,.023,.013],[s*.048,.025,.005],[s*.046,-.004,0],[s*.025,-.010,.008],[0,0,0]]),.020,.003,0xbd0c22);
      greens.ribbon(convert([[0,0,0],[s*.009,-.021,.004],[s*.020,-.048,.009],[s*.030,-.063,.003]]),.017,.003,0x9e0a1c);
    }
    greens.ellipsoid(orig,V(.013,.010,.008),0xc20d27,1,9,5);
  }
  greens.finish(building,'Guirnalda de abeto y tres lazos');
  const bulbs=[];
  for(const s of [leftWing,mainWing,rightWing]){
    const steps=Math.round((s.max-s.min)/.051);
    for(let i=0;i<steps;i++)bulbs.push([s.min+.025+i/steps*(s.max-s.min),s.top-.016,s.z+.006]);
    // The strand follows the projecting outer elements around their side returns.
    if(s!==mainWing)for(let i=0;i<5;i++)bulbs.push([s===leftWing?s.min-.003:s.max+.003,s.top-.015,s.z-i*.047]);
  }
  for(let i=0;i<43;i++)bulbs.push([-1.253+i*2.506/42,-.217,.594]);
  const smallLamps=new THREE.InstancedMesh(new THREE.SphereGeometry(.0058,8,5),m.led,bulbs.length),matrix=new THREE.Matrix4();
  smallLamps.name='Microbombillas de cornisa y guirnalda';
  bulbs.forEach(([x,y,z],index)=>smallLamps.setMatrixAt(index,matrix.makeTranslation(x,y,z)));building.add(smallLamps);
  for(const x of [-1.12,-.676,-.20,.311,.894]){
    box(building,'Foco bajo marquesina',x,-.234,.545,.050,.011,.046,m.led);
    if(x===-.20||x===.894){
      const light=new THREE.PointLight(0xffbf73,.12,.51,2);light.position.set(x,-.255,.525);building.add(light);
    }
  }
  return {building,rooms,windowCount};
}

// Vector outlines traced from the two inscriptions on the approved Farid ornament.
const lettering = {"name":{"width":221,"height":72,"glyphs":[[[122,5,124,4,125,7,121,14,114,30,109,44,106,56,107,56,109,54,112,49,114,44,117,40,121,36,124,35,127,37,128,39,128,41,124,48,118,50,118,56,120,56,121,55,126,48,130,39,133,36,135,35,138,37,138,40,142,35,145,35,147,37,148,40,142,54,143,55,146,49,148,43,153,37,157,34,160,34,162,35,171,14,172,11,174,10,177,10,178,11,178,12,167,37,162,52,162,53,165,49,170,38,175,34,177,33,180,34,182,36,183,40,182,46,186,38,186,36,188,33,190,32,192,34,192,37,193,37,197,32,199,33,200,35,199,36,191,46,194,48,194,52,201,39,205,34,208,32,211,33,213,34,214,33,217,32,218,34,212,51,213,52,213,51,218,44,220,44,220,46,216,52,212,56,209,55,207,53,206,54,202,56,200,56,197,52,194,56,191,57,188,54,188,51,184,56,182,57,180,55,180,54,190,42,190,41,189,41,187,42,184,47,180,50,177,55,174,57,171,57,169,56,166,52,165,55,161,57,158,57,156,55,155,56,151,58,148,57,146,54,144,57,140,59,138,57,137,54,141,40,131,58,127,58,126,57,131,45,131,43,127,52,121,59,118,59,115,59,113,57,112,54,109,58,105,60,102,59,100,56,101,50,103,41,103,39,93,58,90,61,88,59,87,56,89,46,94,33,94,31,90,39,87,48,81,56,77,59,73,61,70,62,66,61,61,56,58,48,59,40,60,37,64,32,69,29,75,28,80,31,83,36,83,42,80,48,76,53,73,54,70,54,67,53,64,49,66,47,68,50,71,51,74,50,76,48,78,46,79,42,79,38,78,36,76,34,73,33,70,34,66,36,63,41,62,49,64,56,67,58,73,58,77,55,81,50,94,24,104,8,108,5,110,6,111,8,109,10,105,19,100,34,97,43,97,45,102,35,112,16,117,9],[123,39,119,46,119,47,121,46,124,41,124,40],[158,39,156,41,153,49,152,54,153,54,154,53,158,46,160,40,159,38],[178,37,176,39,173,47,172,54,174,53,177,49,179,41,179,38],[210,36,208,37,205,42,203,49,203,53,204,52,208,46,211,37],[105,34,104,36,105,36],[106,32,105,34,106,34],[108,28,106,32,107,32,108,30],[96,45,96,47,97,45]],[[16,11,20,10,27,10,30,12,34,15,40,10,43,11,43,12,37,18,39,24,41,32,40,38,39,45,41,42,43,40,45,41,47,43,50,40,51,40,54,42,48,51,48,52,50,50,51,50,52,53,51,54,48,56,45,54,41,62,38,62,36,61,41,48,41,46,38,51,36,52,32,57,29,60,23,63,18,64,12,63,7,64,2,61,2,59,4,57,7,57,12,60,13,59,17,52,28,25,32,18,29,15,23,14,18,17,14,21,11,27,9,34,9,39,10,43,11,44,13,44,18,39,21,33,23,23,24,22,25,24,24,33,22,39,17,45,12,47,8,46,5,42,4,37,2,38,1,36,2,28,4,21,8,16,12,12],[35,23,24,50,17,60,22,60,25,58,29,55,33,48,35,43,37,33,36,27]],[[53,55,55,56,57,58,55,62,52,62,50,60,50,57]]]},"plaza":{"width":186,"height":84,"glyphs":[[[116,2,118,2,119,4,112,22,119,11,124,4,128,1,130,2,130,3,124,15,119,31,122,28,124,23,129,18,132,18,134,19,135,23,141,17,143,17,144,18,145,18,150,6,151,4,153,3,155,3,156,5,145,28,145,30,153,17,156,18,157,19,152,29,153,30,159,20,164,16,166,17,168,18,168,22,170,19,174,16,176,16,178,17,180,16,182,16,183,17,182,20,178,28,179,28,182,23,183,23,184,25,181,30,177,32,174,31,169,32,166,30,162,33,158,33,156,31,151,33,148,31,144,34,142,33,140,32,138,34,136,34,134,33,133,31,128,34,125,34,122,32,120,34,116,35,113,32,115,22,110,30,106,36,104,35,103,33,105,26,105,24,103,29,98,35,95,37,89,36,87,35,84,31,84,26,86,22,89,20,92,19,95,18,97,19,100,22,100,24,99,29,99,30,110,10,114,4],[131,21,129,23,129,25,131,22],[133,25,131,27,127,29,127,31,129,31,132,28,133,26],[141,22,138,27,137,30,138,31,142,23,142,21],[164,20,163,20,161,25,161,30,165,27,167,23,165,24,164,23,163,22],[176,19,175,19,173,22,171,28,171,30,175,24,177,20],[91,23,87,28,87,31,88,33,90,34,93,34,96,33,98,31,94,32,91,32,88,30,89,29,95,29,97,27,97,25,96,23],[98,30,98,31,99,30]],[[19,7,26,6,32,7,35,6,36,8,35,9,35,10,36,12,37,16,41,9,43,8,45,9,45,10,35,31,34,35,34,36,39,27,45,22,48,23,49,22,51,22,53,24,48,34,49,34,55,24,57,22,58,22,59,24,60,24,61,23,63,22,65,23,64,26,59,31,61,34,66,25,69,22,72,21,74,22,78,21,79,23,75,33,76,33,79,29,81,29,81,31,77,36,73,38,70,36,68,38,66,38,63,35,60,38,58,38,55,36,52,38,50,37,48,38,46,39,44,37,41,39,38,38,37,36,34,39,32,39,30,38,29,35,28,34,33,25,33,23,30,25,24,26,21,33,14,40,11,41,6,40,2,37,3,34,6,33,8,36,7,38,10,38,15,33,19,26,18,26,14,29,11,29,8,29,5,25,5,19,7,14,10,11,14,9],[25,9,20,10,22,12,23,17,28,10],[32,12,31,12,29,15,26,22,29,22,31,20,33,16],[45,26,42,31,41,35,42,35,45,30,46,27],[56,27,53,32,52,33,53,33,57,28],[72,25,68,31,67,34,68,35,70,32,72,28,73,26],[17,11,13,13,9,18,8,20,8,24,9,26,13,26,17,21,19,14,19,13]],[[136,9,138,10,139,12,134,16,132,17,131,16,131,15]],[[157,9,159,10,160,12,157,15,155,14,155,12,155,10]],[[83,47,85,46,86,48,86,49,83,52,77,54,73,61,73,62,76,60,78,61,78,62,74,68,74,69,79,64,87,64,88,66,85,72,85,74,89,67,92,63,94,63,96,65,98,63,99,62,100,63,101,64,101,66,97,69,97,70,100,68,103,64,105,62,108,64,104,72,104,74,109,66,112,63,116,61,118,63,119,62,125,49,129,49,130,50,128,52,119,73,119,74,120,73,123,69,124,69,125,71,120,77,117,78,114,76,112,78,110,78,106,76,103,78,101,79,99,77,99,72,97,74,95,73,94,73,91,79,88,79,87,76,84,79,82,79,79,78,75,80,73,79,72,76,72,74,73,71,72,71,70,72,68,71,66,75,63,78,56,81,51,81,48,81,44,78,41,73,42,67,45,64,48,63,54,63,55,62,54,58,56,54,58,52,65,48,78,48],[81,67,78,71,76,76,77,76,80,72,82,68],[115,66,112,71,111,75,113,73,116,67,116,66],[63,52,60,53,58,55,57,59,58,61,61,61,63,60,68,55,69,55,69,59,73,53,73,52],[62,65,60,66,58,65,58,73,54,77,52,77,48,76,46,74,46,73,50,74,54,73,56,70,56,68,54,66,48,66,46,68,44,72,45,76,48,78,51,78,54,78,58,76,62,71,62,70,60,72,59,70,60,68,63,65],[66,62,65,63,66,63]],[[108,55,109,55,111,57,110,59,108,61,107,60,105,58]]]}};
