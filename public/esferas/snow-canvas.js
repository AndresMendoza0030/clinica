import {getBranchViewer} from './branch-viewers.js';
import {createSnowSheet,SNOW_PARALLAX} from './snow-layers.js';

const TAU=Math.PI*2;
const fract=value=>((value%1)+1)%1;
function clipHalfPlane(polygon,a,b,c){
  const result=[];
  if(!polygon.length)return result;
  let previous=polygon[polygon.length-1],previousDistance=a*previous[0]+b*previous[1]+c;
  for(const current of polygon){
    const distance=a*current[0]+b*current[1]+c;
    if((distance>=0)!==(previousDistance>=0)){
      const t=previousDistance/(previousDistance-distance);
      result.push([previous[0]+(current[0]-previous[0])*t,previous[1]+(current[1]-previous[1])*t]);
    }
    if(distance>=0)result.push(current);
    previous=current;previousDistance=distance;
  }
  return result;
}

function projectOccluders(layer,{fit,pitch,yaw},profile){
  const sy=Math.sin(yaw),cy=Math.cos(yaw),sp=Math.sin(pitch),cp=Math.cos(pitch);
  const depth=layer.depth,half=layer.span/2,scale=fit.size/5.4;
  // Inverse of the same Euler rotation used for this branch's offline frames.
  // At the sheet's fixed depth every local coordinate is linear in screen x/y.
  const rows=profile.orbitOrder==='XYZ'
    ? [[cy,sy*sp,-sy*cp*depth],[0,cp,sp*depth],[sy,-cy*sp,cy*cp*depth]]
    : [[cy,0,-sy*depth],[sp*sy,cp,sp*cy*depth],[cp*sy,-sp,cp*cy*depth]];
  const centerX=fit.x+fit.size*.5,centerY=fit.y+fit.size*.574074074;
  return profile.snowOccluders.map(bounds=>{
    let polygon=[[-half,-half],[half,-half],[half,half],[-half,half]];
    for(let axis=0;axis<3&&polygon.length;axis++){
      const [a,b,c]=rows[axis],[minimum,maximum]=bounds[['x','y','z'][axis]];
      polygon=clipHalfPlane(polygon,a,b,c-minimum);
      polygon=clipHalfPlane(polygon,-a,-b,maximum-c);
    }
    return polygon.map(([x,y])=>[centerX+x*scale,centerY-y*scale]);
  });
}

// The turntable uses a 5.4-unit orthographic view. Each camera-facing sheet is
// cut by the real sphere and the ornament-local floor, rather than the bowl.
export function projectSnowLayer(layer,{fit,pitch=.16,yaw=0,radius=1.73,floor=-.78,orbitOrder='YXZ'},out={}){
  const {size,x,y}=fit,scale=size/5.4,depth=layer.depth;
  const cosine=Math.max(.01,Math.cos(pitch)),sine=Math.sin(pitch);
  const upright=orbitOrder==='XYZ';
  const depthY=sine*(upright?1:Math.cos(yaw))*depth;
  const floorY=(floor-depthY)/cosine;
  const upperY=((layer.ceiling??layer.upperY)-depthY)/cosine;
  out.cx=x+size*.5;out.cy=y+size*.574074074;
  out.radius=Math.sqrt(Math.max(0,radius*radius-depth*depth))*scale;
  out.top=out.cy-upperY*scale;out.bottom=out.cy-floorY*scale;
  out.slope=upright?0:sine*Math.sin(yaw)/cosine;
  out.span=layer.span*scale;
  return out;
}

export function createCanvasSnow({makeCanvas,seed=731,size=256,radius=1.73,floor=-.78,profile=getBranchViewer()}={}){
  const sheets=Array.from({length:3},(_,index)=>createSnowSheet({makeCanvas,seed,index,size}));
  const projected={};
  const clipCache=[];
  return {
    draw(context,{near,layers,fit,yaw=0,pitch=.16}){
      // Fixed work: two distant sheets before the building, one nearby sheet
      // before the glass. The opaque photographic rooms remain behind their
      // actual windows; this foreground powder belongs outside the building.
      for(const layer of layers){
        if((layer.depth>0)!==near||layer.opacity<=0)continue;
        projectSnowLayer(layer,{fit,pitch,yaw,radius,floor,orbitOrder:profile.orbitOrder},projected);
        const {cx,cy,top,bottom,span,slope}=projected;
        if(top>=bottom||projected.radius<=0||span<=0)continue;
        const sheet=sheets[layer.index],tile=sheet.snowTileSize||sheet.width/2;
        // Changing the sampled region gives depth parallax while the snow keeps
        // falling vertically, instead of orbiting as a flat card with the body.
        const sx=fract(layer.offsetX+yaw*layer.depth*SNOW_PARALLAX.yaw)*tile;
        const sy=fract(layer.offsetY+pitch*layer.depth*SNOW_PARALLAX.pitch)*tile;
        let cached=clipCache[layer.index];
        if(!cached||cached.yaw!==yaw||cached.pitch!==pitch||cached.depth!==layer.depth||cached.size!==fit.size||cached.x!==fit.x||cached.y!==fit.y){
          cached={yaw,pitch,depth:layer.depth,size:fit.size,x:fit.x,y:fit.y,holes:projectOccluders(layer,{fit,pitch,yaw},profile)};
          clipCache[layer.index]=cached;
        }
        context.save();
        context.beginPath();context.arc(cx,cy,projected.radius,0,TAU);context.clip();
        const half=span/2,tilt=slope*half;
        context.beginPath();
        context.moveTo(cx-half,top-tilt);context.lineTo(cx+half,top+tilt);
        context.lineTo(cx+half,bottom+tilt);context.lineTo(cx-half,bottom-tilt);
        context.closePath();context.clip();
        for(const hole of cached.holes){
          if(hole.length<3)continue;
          // Separate even-odd clips subtract the union, including the small
          // overlap of the sign tower and building, rather than XORing it.
          context.beginPath();context.rect(cx-half,cy-half,span,span);
          context.moveTo(hole[0][0],hole[0][1]);
          for(let i=1;i<hole.length;i++)context.lineTo(hole[i][0],hole[i][1]);
          context.closePath();context.clip('evenodd');
        }
        context.globalAlpha=layer.opacity;
        context.drawImage(sheet,sx,sy,tile,tile,cx-span/2,cy-span/2,span,span);
        context.restore();
      }
    },
    dispose(){sheets.length=0;clipCache.length=0;}
  };
}
