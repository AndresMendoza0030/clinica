// Keep the practical lamps bright; dim the sources that fill the whole miniature.
// The exporter carries this profile into the compatible Cycles turntable.
export const LIGHTING_PROFILE=Object.freeze({
  name:'warm-low-key-v7',
  hemisphere:.06875,
  environment:.275,
  metalEnvironment:.55,
  directional:[
    [0,0xffecd2,.35,[-3,5,4]],
    [1,0xc3ddff,.0625,[4,2,2]],
    [2,0xffc67b,.5625,[1,3,-4]],
    [3,0xffecd3,.10,[-1,-3,4]]
  ],
  studioCards:[
    [3,5,[-4,2,5],0xffe4bf,3.2],
    [1,4,[4,2,3],0xffffff,4.7],
    [5,2,[0,5,0],0xffecd3,2.2],
    [3,4,[0,2,-5],0xffcc87,3.2]
  ],
  glass:{fresnel:.25,primary:.14,secondary:.10,maxAlpha:.34},
  blender:{worldStrength:.0375,key:43.75,fill:15,top:45,rim:68.75,bounce:20,glareThreshold:1.3,glareMix:-.84}
});
