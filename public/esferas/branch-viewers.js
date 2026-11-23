// These descriptors are safe to import on a Canvas-only phone. A model's
// JavaScript and artwork are fetched only when that model actually starts.
const viewers = {
  advanced: {
    name: 'Advanced Radiology',
    loadModel: () => import('./ornament-model.js'),
    sign: 'assets/sign-source.png',
    frames: 'assets/turntable-v11',
    orbitOrder: 'YXZ',
    snowOccluders: [
      {x:[-1.4,1.4], y:[-.80,.82], z:[-.70,.45]},
      {x:[-.6,.6], y:[.75,1.22], z:[.18,.43]}
    ]
  },
  farid: {
    name: 'Plaza Farid',
    loadModel: () => import('./branches/farid/ornament-model.js'),
    sign: 'assets/farid/details.webp',
    frames: 'assets/farid/turntable',
    orbitOrder: 'XYZ',
    snowOccluders: [
      {x:[-1.287,1.287], y:[-.798,.510], z:[-.640,.390]},
      {x:[-.642,.532], y:[.492,.732], z:[.185,.405]},
      {x:[-1.287,-.642], y:[-.798,.850], z:[.170,.432]},
      {x:[.532,1.287], y:[-.798,.839], z:[.170,.432]},
      {x:[-1.302,1.302], y:[-.233,-.168], z:[.386,.591]}
    ]
  },
  matriz: {
    name: 'Casa Matriz',
    loadModel: () => import('./branches/matriz/ornament-model.js'),
    sign: 'assets/matriz/details.webp',
    frames: 'assets/matriz/turntable',
    orbitOrder: 'XYZ',
    snowOccluders: [
      {x:[-1.145,1.145], y:[-.80,.88], z:[-.62,.36]},
      {x:[-1.145,1.145], y:[-.80,.99], z:[.34,.435]},
      {x:[-1.15,-.258], y:[-.01,.062], z:[.408,.56]}
    ]
  }
};

export function getBranchViewer(branch = 'advanced') {
  return Object.prototype.hasOwnProperty.call(viewers,branch) ? viewers[branch] : viewers.advanced;
}
