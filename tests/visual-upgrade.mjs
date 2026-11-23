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
const home = await (await worker.fetch(new Request('https://test.local/'))).text();
const slides = [...home.matchAll(/<figure class="hc-slide [^"]+"[^>]*>\s*(<img [^>]+>)/g)].map(match => match[1]);
assert.equal(slides.length, 4);
const preload = home.match(/<link rel="preload" as="image"[^>]+>/)[0];
const attribute = (tag, name) => tag.match(new RegExp(' ' + name + '="([^"]+)"'))?.[1];
assert.equal(attribute(preload, 'href'), attribute(slides[0], 'src'));
assert.equal(attribute(preload, 'imagesrcset'), attribute(slides[0], 'srcset'));
assert.equal(attribute(preload, 'imagesizes'), attribute(slides[0], 'sizes'));
assert.equal(attribute(slides[0], 'fetchpriority'), 'high');
for (const [index, base] of ['medico', 'recepcion'].entries()) {
  const webPath = '/navidad/interiores/' + base;
  assert.equal(attribute(slides[index], 'src'), webPath + '.webp');
  assert.equal(attribute(slides[index], 'srcset'), webPath + '-720.webp 720w, ' + webPath + '.webp 1536w');
  for (const suffix of ['', '-720']) {
    assert.ok(fs.existsSync(new URL('../public' + webPath + suffix + '.webp', import.meta.url)));
  }
}
assert.ok(!home.includes('Siemens'));
const portal=await worker.fetch(new Request('https://test.local/portal-pacientes.html'));assert.ok(!(await portal.text()).includes('id="visual-upgrade"'));assert.match(portal.headers.get('x-robots-tag'),/noindex/);
assert.equal((await worker.fetch(new Request('https://test.local/not-found'))).status,404);
console.log('PASS: 10 rendered routes, local image paths, HEAD, portal isolation, 404');
