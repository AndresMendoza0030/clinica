import assert from 'node:assert/strict';
import fs from 'node:fs';
import worker from '../worker.js';

const origin = 'https://clinicadrmendoza.com';
const sitemapResponse = await worker.fetch(new Request(`${origin}/sitemap.xml`));
assert.equal(sitemapResponse.status, 200);
assert.match(sitemapResponse.headers.get('content-type'), /application\/xml/);
const sitemap = await sitemapResponse.text();
assert.match(sitemap, /xmlns="http:\/\/www.sitemaps.org\/schemas\/sitemap\/0.9"/);
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
const expectedPages = fs.readdirSync(new URL('../pages/', import.meta.url))
  .filter((file) => file.endsWith('.js') && file !== 'portal-pacientes.js')
  .map((file) => origin + (file === 'home.js' ? '/' : `/${file.replace(/\.js$/, '.html')}`));
assert.deepEqual([...urls].sort(), expectedPages.sort(), 'Sitemap must cover the public pages exactly once');

const titles = new Set();
for (const url of urls) {
  const response = await worker.fetch(new Request(url));
  assert.equal(response.status, 200, url);
  assert.equal(response.headers.get('x-robots-tag'), null, url);
  const html = await response.text();
  const head = html.match(/<head>([\s\S]*?)<\/head>/i)[1];
  const canonical = [...head.matchAll(/<link rel="canonical" href="([^"]+)"/g)];
  assert.deepEqual(canonical.map((match) => match[1]), [url]);
  assert.equal([...head.matchAll(/<title>/g)].length, 1);
  const title = head.match(/<title>(.*?)<\/title>/)[1];
  assert.match(title, /San Miguel/);
  assert.ok(!titles.has(title), 'Every catalog page should have a distinct title');
  titles.add(title);
  assert.equal([...head.matchAll(/name="description"/g)].length, 1);
  for (const key of ['type', 'locale', 'site_name', 'title', 'description', 'url', 'image']) {
    assert.equal([...head.matchAll(new RegExp(`property="og:${key}"`, 'g'))].length, 1);
  }
  assert.equal(head.match(/property="og:url" content="([^"]+)"/)[1], url);
  const image = new URL(head.match(/property="og:image" content="([^"]+)"/)[1]);
  assert.equal(image.origin, origin);
  assert.ok(fs.existsSync(new URL(`../public${image.pathname}`, import.meta.url)));

  const path = new URL(url).pathname;
  const aliases = path === '/' ? ['/index', '/index.html', '/'] : [path.replace(/\.html$/, ''), `${path}/`];
  for (const alias of aliases) {
    const response = await worker.fetch(new Request(`https://www.clinicadrmendoza.com${alias}?utm_source=revision`));
    assert.equal(response.status, 200);
    const aliasHtml = await response.text();
    assert.equal(aliasHtml.match(/rel="canonical" href="([^"]+)"/)[1], url);
    assert.ok(!aliasHtml.includes('utm_source=revision'));
  }
}

const home = await (await worker.fetch(new Request(origin))).text();
const data = JSON.parse(home.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
assert.equal(data['@context'], 'https://schema.org');
const clinics = data['@graph'].filter((entry) => entry['@type'] === 'MedicalClinic');
assert.equal(clinics.length, 3);
assert.equal(new Set(clinics.map((entry) => entry['@id'])).size, 3);
for (const clinic of clinics) {
  assert.ok(home.includes(`href="tel:${clinic.telephone}"`));
  assert.ok(home.includes(clinic.address.streetAddress));
  assert.ok(home.includes(`id="${new URL(clinic.url).hash.slice(1)}"`));
  assert.equal(clinic.address.addressCountry, 'SV');
  assert.equal(clinic.aggregateRating, undefined);
}

const robots = await worker.fetch(new Request(`${origin}/robots.txt`));
assert.match(robots.headers.get('content-type'), /text\/plain/);
assert.match(await robots.text(), /Sitemap: https:\/\/clinicadrmendoza\.com\/sitemap\.xml/);
for (const path of ['/portal-pacientes', '/portal-pacientes.html']) {
  const portal = await worker.fetch(new Request(origin + path));
  assert.match(portal.headers.get('x-robots-tag'), /noindex/);
  assert.ok(!(await portal.text()).includes('rel="canonical"'));
  assert.ok(!sitemap.includes(path));
}
for (const path of ['/', '/sitemap.xml', '/robots.txt', '/estudios-rm.html']) {
  const head = await worker.fetch(new Request(origin + path, { method: 'HEAD' }));
  assert.equal(head.status, 200);
  assert.equal(await head.text(), '');
  assert.equal((await worker.fetch(new Request(origin + path, { method: 'POST' }))).status, 405);
}
for (const path of ['/no-existe', '/__proto__', '/constructor', '/toString']) {
  assert.equal((await worker.fetch(new Request(origin + path))).status, 404);
}
console.log(`PASS: ${urls.length} public pages, canonical aliases, metadata, 3 clinics, crawler routes, portal exclusion, HEAD, 405 and 404`);
