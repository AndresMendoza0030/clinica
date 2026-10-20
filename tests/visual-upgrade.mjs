import assert from 'node:assert/strict';
import fs from 'node:fs';
import worker from '../worker.js';
for (const path of ['/', '/index.html','/estudios.html','/estudios-rm.html','/estudios-tac.html','/estudios-us.html','/estudios-rayosx.html','/estudios-mamografia.html','/estudios-especiales.html','/laboratorio.html']) {
 const res=await worker.fetch(new Request('https://test.local'+path)); assert.equal(res.status,200);
 const html=await res.text(); assert.ok(html.includes('id="visual-upgrade"'));
 for(const match of html.matchAll(/(?:src|href)="(\/assets\/visuals\/[^" ]+)"/g))assert.ok(fs.existsSync(new URL('../public'+match[1],import.meta.url)),match[1]);
 assert.ok(html.includes(path==='/'||path==='/index.html'?'v3-home-art':'v3-page-art'),path);
 const head=await worker.fetch(new Request('https://test.local'+path,{method:'HEAD'}));assert.equal(await head.text(),'');
}
const portal=await worker.fetch(new Request('https://test.local/portal-pacientes.html'));assert.ok(!(await portal.text()).includes('id="visual-upgrade"'));assert.match(portal.headers.get('x-robots-tag'),/noindex/);
assert.equal((await worker.fetch(new Request('https://test.local/not-found'))).status,404);
console.log('PASS: 10 rendered routes, local image paths, HEAD, portal isolation, 404');
