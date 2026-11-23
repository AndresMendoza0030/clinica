import {addClinicInterior} from '../../room-interiors.js';
import {createFestiveBatches} from '../../vegetation.js';

// Local +Z faces the street. Adjacent upper windows share a single photo room and
// reveal different parts of it as the visitor turns the ornament.
export function addMatrizBuilding(THREE, root, {materials, signImage, interiorImage, makeCanvas, anisotropy=4}) {
  const building = new THREE.Group();
  building.name = 'Casa Matriz · clínica y laboratorio';
  root.add(building);
  const m=materials, floor=-.798, rooms=[];
  const back=-.62, bodyRoof=.858, front=.398, unitCube=new THREE.BoxGeometry(1,1,1);
  let windowCount=0;
  const bronze = new THREE.MeshStandardMaterial({name:'Casa Matriz · perfilería anodizada', color:0x776447, metalness:.34, roughness:.37});
  const stone = new THREE.MeshStandardMaterial({name:'Casa Matriz · moldura de cantera clara',color:0xf6e8d3, roughness:.67, emissive:0xfff2db, emissiveIntensity:.16});
  const reveal = new THREE.MeshStandardMaterial({name:'Casa Matriz · junta fina',color:0xbcae9a,roughness:.79});
  const redTrim = new THREE.MeshStandardMaterial({name:'Casa Matriz · granate de los cantos',color:0x8f1022,roughness:.38,metalness:.1,emissive:0x9c101d,emissiveIntensity:.12});
  const gold = new THREE.MeshStandardMaterial({name:'Casa Matriz · latón',color:0xcd9b52,metalness:.58,roughness:.32,emissive:0xa86325,emissiveIntensity:.09});
  const boxes = (parent,name,x,y,z,w,h,d,mat)=>{
    const mesh=new THREE.Mesh(unitCube,mat);mesh.position.set(x,y,z);mesh.scale.set(w,h,d);mesh.name=name;parent.add(mesh);return mesh;
  };
  const faceGroup=(name,x,z,angle=0)=>{
    const face=new THREE.Group();face.name=name;face.position.set(x,0,z);face.rotation.y=angle;building.add(face);return face;
  };
  function facade(group, left, right, top, openings, material) {
    const coords=(values)=>[...new Set(values)].sort((a,b)=>a-b);
    const xs=coords([left,right,...openings.flatMap(o=>[o.x-o.w/2,o.x+o.w/2])]);
    const ys=coords([floor,top,...openings.flatMap(o=>[o.y-o.h/2,o.y+o.h/2])]);
    for(let j=1;j<ys.length;j++) for(let i=1;i<xs.length;i++) {
      const x=(xs[i-1]+xs[i])/2,y=(ys[j-1]+ys[j])/2;
      if(openings.some(o=>Math.abs(x-o.x)<o.w/2 && Math.abs(y-o.y)<o.h/2))continue;
      boxes(group,'Paño de mampostería',x,y,-.027,xs[i]-xs[i-1],ys[j]-ys[j-1],.054,material);
    }
  }
  function glazing(face, openings, kind, side, isDoor=false) {
    const wLeft=Math.min(...openings.map(o=>o.x-o.w/2)), wRight=Math.max(...openings.map(o=>o.x+o.w/2));
    const bottom=Math.min(...openings.map(o=>o.y-o.h/2)), ceiling=Math.max(...openings.map(o=>o.y+o.h/2));
    const depth=isDoor ? .52 : .28;
    const room=addClinicInterior(THREE,face,{kind,width:wRight-wLeft+.07,height:ceiling-bottom+.03,
      depth,interiorImage,makeCanvas,anisotropy});
    room.position.set((wLeft+wRight)/2,bottom-.012,-.037-depth*.43);
    rooms.push({kind,floor:bottom>0?1:0,lit:true,windows:Array(openings.length).fill(side)});
    for(const o of openings){
      const {x,y,w,h}=o;
      const jamb=isDoor ? .018 : .012;
      for(const dir of [-1,1]){
        boxes(face,'Jamba clara tallada',x+dir*(w/2+.005),y,.004,.017,h+.028,.028,isDoor?redTrim:stone);
        boxes(face,'Cabezal y alféizar de piedra',x,y+dir*(h/2+.005),.006,w+.026,.018,.03,isDoor?redTrim:stone);
        boxes(face,'Perfil de aluminio',x+dir*(w/2-jamb/2),y,-.004,jamb,h,.039,bronze);
        boxes(face,'Remate de aluminio',x,y+dir*(h/2-jamb/2),-.002,w,jamb,.039,bronze);
      }
      const glass=new THREE.Mesh(new THREE.PlaneGeometry(w-jamb*2,h-jamb*2),m.window);
      glass.renderOrder=1;glass.name=isDoor?'Hojas de vidrio de acceso':'Ventana vertical rehundida';
      glass.position.set(x,y,-.007);face.add(glass);windowCount++;
      if(isDoor){
        boxes(face,'Encuentro de las hojas',x,y,.002,.012,h-.02,.032,bronze);
        boxes(face,'Travesaño de banderola',x,y+h*.29,.001,w-.016,.012,.025,bronze);
        for(const s of [-1,1]){
          boxes(face,'Tirador vertical de latón',x+s*.027,y-.025,.023,.009,.082,.013,gold);
          for(const dy of [-.035,.035])boxes(face,'Apoyo del tirador',x+s*.027,y-.025+dy,.015,.010,.009,.022,gold);
        }
      }
    }
  }
  function revealBands(group,x,width,levels) {
    for(const y of levels) boxes(group,'Junta horizontal en el estuco',x,y,.001,width,.004,.0018,reveal);
  }
  const left=faceGroup('Pabellón rojo de la entrada',0,.43);
  const right=faceGroup('Pabellón marfil',0,.39);
  const wall=faceGroup('Soporte del mural médico',0,.405);
  const opening=(x,y,w,h)=>({x,y,w,h});
  const door=opening(-.706,-.532,.572,.526);
  const lw=[opening(-.881,.423,.168,.444),opening(-.522,.433,.168,.443)];
  const rw=[opening(.69,.433,.162,.451),opening(.938,.441,.160,.446)];
  facade(left,-1.145,-.266,.99,[door,...lw],m.facadePaint);
  facade(wall,-.266,.531,.978,[],m.facadeIvory);
  facade(right,.531,1.145,.985,rw,m.facadeIvory);
  glazing(left,lw,'waiting','frente');
  glazing(right,rw,'office','frente');
  glazing(left,[door],'reception','entrada',true);
  // A projecting red canopy divides the upper windows from the sheltered entry.
  boxes(left,'Marquesina sobre el umbral',-.707,.021,.045,.921,.067,.174,m.facadePaint);
  boxes(left,'Canto de la marquesina',-.707,-.009,.125,.924,.016,.021,redTrim);
  boxes(left,'Nieve de la marquesina',-.707,.057,.044,.927,.010,.181,m.snow);
  boxes(left,'Zócalo de esmalte',-1.127,.450,.013,.027,1.00,.047,redTrim);
  boxes(right,'Cornisa marfil entre pisos',.839,.028,.025,.630,.031,.068,stone);
  boxes(right,'Sombra de cornisa',.839,.001,.010,.623,.014,.042,m.facadeIvory);
  boxes(right,'Moldura alta',.839,.758,.012,.630,.025,.038,stone);
  boxes(right,'Pilastra lateral',1.12,.425,.012,.036,.617,.038,stone);
  revealBands(right,.837,.607,[-.51,-.238,.109,.701]);
  boxes(left,'Umbral de piedra',-.706,-.785,.046,.628,.019,.154,stone);

  // The published mural is artwork on three discrete mounted panels. Their
  // fronts reuse the same atlas with continuous UVs; the sides remain modeled.
  const artwork=signImage?new THREE.CanvasTexture(signImage):null;
  if(artwork){artwork.colorSpace=THREE.SRGBColorSpace;artwork.anisotropy=Math.min(anisotropy,8);artwork.name='Mural institucional de Casa Matriz';}
  const mural=new THREE.MeshStandardMaterial({name:'Impresión satinada del mural médico',map:artwork,
    color:0xffffff,roughness:.66,metalness:0,emissive:0xffffff,emissiveMap:artwork,emissiveIntensity:artwork ? .56 : 0});
  mural.userData.originalArtwork=true;
  const mx=.132,mw=.783,mt=.901,mb=-.725,mh=mt-mb;
  for(const [name,from,to,z] of [
    ['Especialidades radiológicas',0,193/426,.022],
    ['Emblema y nombre institucional',193/426,277/426,.030],
    ['Laboratorio clínico',277/426,1,.021]
  ]){
    const high=mt-from*mh,low=mt-to*mh,cy=(high+low)/2;
    boxes(wall,'Borde del panel · '+name,mx,cy,z*.5,mw+.009,high-low+.007,z,stone);
    const g=new THREE.PlaneGeometry(mw,high-low),uv=g.attributes.uv;
    for(let k=0;k<uv.count;k++)uv.setY(k,1-to+uv.getY(k)*(to-from));
    const art=new THREE.Mesh(g,mural);art.name='Mural · '+name;art.userData.originalArtwork=true;
    art.position.set(mx,cy,z+.001);wall.add(art);
  }
  // Three complete side/rear elevations carry modest, functioning clinic
  // openings. Their opaque panels cover only the parts between the windows.
  const middleZ=(back+front)/2;
  for(const [name,x,z,angle,width,openings] of [
    ['Poniente',-1.145,middleZ,-Math.PI/2,front-back,[opening(-.10,.30,.262,.35),opening(.12,-.40,.245,.25)]],
    ['Oriente',1.145,middleZ,Math.PI/2,front-back,[opening(.016,.37,.183,.36),opening(-.235,-.41,.212,.25)]],
    ['Posterior',0,back,Math.PI,2.29,[opening(-.593,.32,.487,.265),opening(.36,.32,.426,.265),opening(.26,-.401,.359,.236)]]
  ]){
    const side=faceGroup('Fachada '+name,x,z,angle);
    facade(side,-width/2,width/2,bodyRoof,openings,m.facadeIvory);
    for(const [i,win] of openings.entries())glazing(side,[win],['laboratory','examination','radiology'][i],name);
    revealBands(side,0,width,[-.106,.647]);
    boxes(side,'Cornisa perimetral',0,bodyRoof-.027,.010,width+.004,.036,.045,stone);
    if(name==='Posterior'){
      boxes(side,'Acceso posterior de servicio',-.895,-.526,.015,.241,.492,.029,bronze);
      boxes(side,'Hoja de acero pintada',-.895,-.526,.033,.217,.466,.013,stone);
      boxes(side,'Manilla',-.831,-.534,.046,.035,.009,.016,gold);
    }
  }
  for(const [y,name] of [[-.785,'Planta baja'],[-.010,'Entrepiso'],[bodyRoof-.020,'Azotea']]){
    boxes(building,name,0,y,(back+front)/2,2.276,.029,front-back,m.ivory);
  }
  boxes(building,'Manto de nieve de la azotea',0,bodyRoof+.001,middleZ,2.277,.017,front-back-.016,m.snow);
  for(const [section,min,max,z,height,mat] of [
    ['ala roja',-1.145,-.266,.43,.990,m.facadePaint],
    ['pabellón del mural',-.266,.531,.405,.978,m.facadeIvory],
    ['ala clara',.531,1.145,.39,.985,m.facadeIvory]
  ]){
    const x=(min+max)/2,w=max-min,depth=.19;
    boxes(building,'Pretil envolvente · '+section,x,(height+bodyRoof)/2,z-depth/2,w,height-bodyRoof,depth,mat);
    boxes(building,'Cornisa · '+section,x,height-.006,z-.058,w+.013,.031,.145,mat);
    boxes(building,'Nieve sobre cornisa · '+section,x,height+.012,z-.055,w+.016,.016,.154,m.snow);
  }
  // Attach a real red return and a short white return on the street corners.
  boxes(building,'Retorno lateral de aluminio rojo',-1.143,.075,.366,.026,1.74,.140,m.facadePaint);
  boxes(building,'Retorno lateral de cornisa marfil',1.141,.393,.369,.025,1.07,.077,stone);

  const festive=createFestiveBatches(THREE),V=festive.V;
  function festoon(from,to,y,z,step) {
    const n=Math.ceil((to-from)/step);
    festive.rod(V(from,y,z),V(to,y,z),.003,.003,0xa17b4e,0,5);
    for(let i=0;i<=n;i++) {
      const x=from+(to-from)*i/n;
      festive.ellipsoid(V(x,y-.004,z+.004),V(.008,.011,.008),0xffcf77,2,8,5);
    }
  }
  festoon(-1.142,-.267,.952,.439,.071);
  festoon(-.262,.529,.943,.417,.069);
  festoon(.538,1.146,.948,.403,.065);
  // The high front parapet returns only 0.19 along the right wall. Keep the
  // cable attached to that face, stopping before the lower roof begins.
  const returnEnd=.39-.19;
  festive.rod(V(1.146,.944,.398),V(1.146,.944,returnEnd+.008),.0025,.0025,0xa17b4e,0,5);
  for(let z=.35;z>=returnEnd+.007;z-=.05){
    festive.ellipsoid(V(1.149,.94,z),V(.008,.009,.007),0xffdb9e,2,7,5);
  }
  // Evergreen wreath and fabric bow hang over the glazed entrance, between the two sconces.
  const wx=-.706,wy=-.102,wz=.463,wr=.116;
  const p=(a,r=wr,d=0)=>V(wx+Math.cos(a)*r,wy+Math.sin(a)*r,wz+d);
  const ring=Array.from({length:41},(_,i)=>p(Math.PI*2*i/40));
  festive.tube(ring,.019,0x38502c,0,6);
  for(let i=0;i<73;i++) {
    const a=i*2.39996,r=wr+.016*Math.sin(i*1.71),origin=p(a,r,.010);
    for(const s of [-1,0,1])festive.needle(origin,V(-Math.sin(a)+Math.cos(a)*s*.9,Math.cos(a)+Math.sin(a)*s*.9,.23),.027,.006,i%2?0x2b5b32:0x1d462a);
    if(i%5===0)festive.ellipsoid(p(a,r,.027),V(.010,.010,.009),i%2?0xe8bc64:0xc5202b,1,8,5);
    if(i%9===0)festive.ellipsoid(p(a,r+.005,.026),V(.006,.006,.006),0xffcd70,2,7,4);
  }
  const knot=V(wx,wy+wr+.006,wz+.034),ribbonRed=0xaa1029;
  for(const s of [-1,1]) {
    const shape=[knot,knot.clone().add(V(s*.028,.028,.002)),knot.clone().add(V(s*.061,.034,.006)),knot.clone().add(V(s*.060,.001,.011)),knot.clone().add(V(s*.029,-.005,.004)),knot];
    festive.ribbon(shape,.025,.005,ribbonRed);
    festive.ribbon([knot,knot.clone().add(V(s*.023,-.032,.008)),knot.clone().add(V(s*.032,-.061,.007))],.020,.005,ribbonRed);
  }
  festive.ellipsoid(knot,V(.016,.014,.011),0xb5182a,1,8,5);
  for(const x of [-1.032,-.383]){
    boxes(left,'Soporte de farol',x,-.124,.025,.021,.062,.065,bronze);
    boxes(left,'Caja de farol encendido',x,-.124,.063,.039,.066,.038,m.led);
    for(const s of [-1,1]) {
      boxes(left,'Listón vertical del farol',x+s*.022,-.124,.082,.005,.072,.007,bronze);
      boxes(left,'Tapas del farol',x,-.124+s*.036,.063,.052,.008,.046,gold);
    }
    const lamp=new THREE.PointLight(0xffc370,.16,.49,2);lamp.position.set(x,-.136,.513);lamp.name='Farol de entrada';building.add(lamp);
  }
  festive.finish(building,'Corona, lazo y luces de Casa Matriz');
  return {building,rooms,windowCount};
}
