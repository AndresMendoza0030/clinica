import assert from 'node:assert/strict';
import worker from '../worker.js';
import { pilotOrigin, resolveBookingQuestion } from '../luna/booking-catalog.js';

const site = 'https://revision.example';
const appointments = 'https://citas-revision.example';
const rows = [
  {code:'web-laboratorio-hematologia-001', name:'Hemograma + plaquetas', aliases:['HC + PLQ'], category:'Hemograma y recuentos', modality:'Hematología', source_url: 'https://www.clinicadrmendoza.com/laboratorio-hematologia.html'},
  {code:'cortisol', name:'Cortisol', modality:'Laboratorio'},
  {code:'cortisol-orina', name:'Cortisol en orina', variant_of:'cortisol', modality:'Laboratorio'},
  {code:'cortisol-sangre', name:'Cortisol en sangre', aliases:['Cortisol sérico'], variant_of:'cortisol', modality:'Laboratorio'},
  {code:'no-seleccionable', name:'Prueba retirada', selectable:false}
];
let reads = 0;
const env = {CITAS_PILOT_ENABLED:'true', CITAS_PILOT_ORIGIN:appointments, CITAS_PILOT:{async fetch(url, options) {
  assert.equal(url, appointments + '/api/public/catalog');
  assert.equal(options.headers, undefined);
  reads++;
  return Response.json({items:rows});
}}};
const page = path => worker.fetch(new Request(site + path), env);
const html = await (await page('/laboratorio-hematologia')).text();
assert.ok(html.includes(appointments + '/reservar#estudio=web-laboratorio-hematologia-001'));
assert.ok(html.includes('https://wa.me/50378205613'));
const before = reads;
await page('/portal-pacientes');
for (const host of ['clinicadrmendoza.com','www.clinicadrmendoza.com']) {
  const req = new Request('https://' + host + '/laboratorio-hematologia.html');
  assert.equal(pilotOrigin(env, req), '');
  assert.ok(!(await (await worker.fetch(req, env)).text()).includes(appointments));
}
assert.equal(before, reads);
const post = async message => {
  const response = await worker.fetch(new Request(site + '/api/luna-pacientes', {method:'POST',
    headers:{'content-type':'application/json',origin:site}, body:JSON.stringify({message})}), env);
  return response.json();
};
assert.equal((await post('Quisiera solicitar HC + PLQ')).links[0].href, appointments + '/reservar#estudio=web-laboratorio-hematologia-001');
assert.deepEqual((await post('Cortisol')).links.slice(0,-1).map(link => link.label), ['Cortisol','Cortisol en orina','Cortisol en sangre']);
assert.equal((await post('cortisol serico')).links[0].label, 'Cortisol en sangre');
assert.equal((await post('prueba retirada')).links.length, 1);
assert.equal(resolveBookingQuestion('Cortisol si me duele la cabeza', rows, appointments), null);
const offline = {...env, CITAS_PILOT:{fetch:async()=>{throw Error('sin conexión')}}};
const fallback = await (await worker.fetch(new Request(site + '/laboratorio-hematologia.html'), offline)).text();
assert.ok(!fallback.includes('/reservar#estudio=') && fallback.includes('https://wa.me/50378205613'));
console.log('Piloto de catálogo, privacidad de la consulta, variantes, ficha, producción y caída de Citas verificados.');
