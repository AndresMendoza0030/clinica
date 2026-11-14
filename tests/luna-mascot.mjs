import assert from 'node:assert/strict';
import fs from 'node:fs';
import { LunaMascot } from '../components/luna-mascot.js';
import { LunaPatients } from '../components/luna-patients.js';

const idsIn = markup => [...markup.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
const artwork = [];
let referenceCount = 0;
for (const [id, portrait] of [['launch', true], ['header', true], ['welcome', false]]) {
  const svg = LunaMascot({id, portrait});
  const ids = idsIn(svg);
  const definitions = new Set(ids);
  assert.equal(definitions.size, ids.length, `${id}: no duplicate SVG IDs`);
  // References must resolve inside this SVG, not accidentally to a sibling's
  // mask/clip/gradient. Safari can otherwise paint a different avatar's layers.
  const references = [
    ...[...svg.matchAll(/\b(?:href|xlink:href)="#([^"]+)"/g)].map(match => match[1]),
    ...[...svg.matchAll(/url\(\s*#([^)'"\s]+)\s*\)/g)].map(match => match[1]),
  ];
  assert.ok(references.length > 0, `${id}: layered SVG references are present`);
  for (const reference of references) assert.ok(definitions.has(reference), `${id}: missing local definition ${reference}`);
  referenceCount += references.length;
  const imageTags = [...svg.matchAll(/<image\b([^>]+)>/g)];
  assert.equal(imageTags.length, 1, `${id}: every layer reuses one artwork definition`);
  const attributes = Object.fromEntries([...imageTags[0][1].matchAll(/([\w:-]+)="([^"]*)"/g)].map(match => [match[1], match[2]]));
  artwork.push(attributes);
}

for (const enabled of [true, false]) {
  const ids = idsIn(LunaPatients(enabled));
  assert.equal(new Set(ids).size, ids.length, 'Rendering all three avatars together must not introduce duplicate IDs');
}

const imagePaths = new Set(artwork.map(image => image.href));
assert.equal(imagePaths.size, 1, 'All avatar instances share a single cacheable artwork URL');
const [imagePath] = imagePaths;
assert.match(imagePath, /^\/assets\/luna\/[a-z0-9-]+-v\d+\.webp$/, 'Use a versioned asset URL for artwork changes');
const file = fs.readFileSync(new URL(`../public${imagePath}`, import.meta.url));
assert.equal(file.toString('ascii', 0, 4), 'RIFF');
assert.equal(file.toString('ascii', 8, 12), 'WEBP', 'The deployed .webp must actually contain WebP bytes');
assert.equal(file.readUInt32LE(4) + 8, file.length, 'Complete WebP container');
assert.ok(file.length < 256 * 1024, 'Keep the shared mascot artwork below its 256 KiB transfer budget');

let dimensions;
let hasAlpha = false;
let hasImage = false;
for (let offset = 12; offset < file.length;) {
  assert.ok(offset + 8 <= file.length, 'Complete WebP chunk header');
  const type = file.toString('ascii', offset, offset + 4);
  const length = file.readUInt32LE(offset + 4);
  const data = offset + 8;
  assert.ok(data + length <= file.length, `Complete ${type} chunk`);
  assert.notEqual(type, 'ANIM', 'The artwork is a static image, not a separate encoded animation for each reaction');
  if (type === 'VP8X') {
    assert.ok(length >= 10);
    dimensions = [file.readUIntLE(data + 4, 3) + 1, file.readUIntLE(data + 7, 3) + 1];
    hasAlpha ||= Boolean(file[data] & 0x10);
  } else if (type === 'VP8L') {
    assert.ok(length >= 5);
    assert.equal(file[data], 0x2f);
    const bits = file.readUInt32LE(data + 1);
    dimensions ||= [(bits & 0x3fff) + 1, ((bits >>> 14) & 0x3fff) + 1];
    hasAlpha ||= Boolean(bits & 0x10000000);
    hasImage = true;
  } else if (type === 'VP8 ') {
    assert.ok(length >= 10);
    assert.equal(file.subarray(data + 3, data + 6).toString('hex'), '9d012a');
    dimensions ||= [file.readUInt16LE(data + 6) & 0x3fff, file.readUInt16LE(data + 8) & 0x3fff];
    hasImage = true;
  }
  offset = data + length + (length % 2);
}
assert.ok(hasImage, 'WebP includes an image payload');
assert.ok(hasAlpha, 'Transparent artwork is required by the face and arm layers');
for (const image of artwork) {
  assert.deepEqual([Number(image.width), Number(image.height)], dimensions, 'SVG coordinates must match the actual artwork dimensions');
}
console.log(`PASS: three isolated SVG instances, ${referenceCount} local references, shared versioned ${dimensions.join('×')} WebP with alpha (${file.length} bytes), complete image container and transfer budget.`);
