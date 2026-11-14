import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

// Run the shipped controller against a small DOM surface. Network completion and
// time are controlled so cancellation races are reproducible without a browser.
function harness(enabled = true) {
  let clock = 0; let nextTimer = 1;
  const timers = new Map(); const requests = [];
  class Element {
    constructor(tag = 'div') { this.tagName = tag.toUpperCase(); this.children = []; this.dataset = {}; this.listeners = {}; this.attributes = new Map(); this.value = ''; this.disabled = false; this.hidden = false; this._text = ''; }
    addEventListener(type, callback) { (this.listeners[type] ||= []).push(callback); }
    emit(type, event = {}) { for (const callback of this.listeners[type] || []) callback({preventDefault() {}, ...event}); }
    append(...children) { for (const child of children) { child.parent = this; this.children.push(child); } }
    replaceChildren(...children) { this.children = []; this._text = ''; this.append(...children); }
    remove() { this.parent.children.splice(this.parent.children.indexOf(this), 1); }
    get childElementCount() { return this.children.length; }
    get firstElementChild() { return this.children[0]; }
    set textContent(value) { this._text = String(value); this.children = []; }
    get textContent() { return this._text + this.children.map(child => child.textContent).join(''); }
    set innerHTML(_) { throw Error('Unsafe HTML insertion'); }
    setAttribute(name, value) { this.attributes.set(name, String(value)); }
    getAttribute(name) { return this.attributes.get(name) ?? null; }
    hasAttribute(name) { return this.attributes.has(name); }
    removeAttribute(name) { this.attributes.delete(name); }
    contains(element) { return this === element || this.children.some(child => child.contains(element)); }
    focus() { document.activeElement = this; }
    showModal() { this.open = true; }
    close() { this.open = false; this.emit('close'); }
  }
  const ids = ['luna-panel', 'luna-launch', 'luna-form', 'luna-question', 'luna-send', 'luna-messages', 'luna-status', 'luna-welcome', 'luna-scroll', 'luna-state', 'luna-close', 'luna-reset'];
  const elements = Object.fromEntries(ids.map(id => [id, new Element()]));
  elements.sedes = new Element('section');
  const get = id => elements['luna-' + id];
  get('panel').dataset.enabled = String(enabled);
  get('form').reset = () => { get('question').value = ''; };
  get('form').requestSubmit = () => get('form').emit('submit');
  const document = {getElementById:id => elements[id], createElement:tag => new Element(tag), createElementNS:(_,tag) => new Element(tag)};
  const location = {origin:'https://test.local', pathname:'/', search:''};
  vm.runInNewContext(fs.readFileSync(new URL('../public/luna-patients.js', import.meta.url), 'utf8'), {
    document, location, URL, AbortController,
    Date:class extends Date { static now() { return clock; } },
    setTimeout(callback, delay) { const id = nextTimer++; timers.set(id, {at:clock + delay, callback}); return id; },
    clearTimeout:id => timers.delete(id),
    fetch(url, options) { return new Promise((resolve, reject) => requests.push({url, options, resolve, reject})); },
  });
  const flush = async () => { for (let i = 0; i < 8; i++) await Promise.resolve(); };
  return {
    get, requests, location, section:elements.sedes, focused:() => document.activeElement,
    mode:() => get('panel').dataset.lunaMode,
    open:() => get('launch').emit('click'),
    submit(text) { get('question').value = text; get('form').emit('submit'); },
    async answer(index, result, ok = true) { requests[index].resolve({ok, json:async () => result}); await flush(); },
    async fail(index) { requests[index].reject(Error('Offline')); await flush(); },
    async advance(milliseconds) {
      const end = clock + milliseconds;
      for (;;) {
        const next = [...timers].filter(([,timer]) => timer.at <= end).sort((a,b) => a[1].at - b[1].at)[0];
        if (!next) break;
        timers.delete(next[0]); clock = next[1].at; next[1].callback(); await flush();
      }
      clock = end; await flush();
    },
  };
}

const h = harness();
h.open();
assert.equal(h.mode(), 'happy');
assert.equal(h.get('panel').dataset.lunaAnimate, 'true');
assert.equal(h.focused(), h.get('question'));
await h.advance(2200);
assert.equal(h.mode(), 'attentive');
h.submit('A que hora habre uste');
assert.equal(h.mode(), 'reading');
assert.equal(h.get('send').disabled, true);
assert.deepEqual(JSON.parse(h.requests[0].options.body), {message:'A que hora habre uste'});
h.submit('No debe duplicar la solicitud');
assert.equal(h.requests.length, 1, 'Submitting while busy cannot create a duplicate request');
await h.advance(700);
assert.equal(h.mode(), 'thinking');
await h.answer(0, {text:'Con gusto. Horario general de atención.', reaction:'responding', links:[]});
assert.equal(h.mode(), 'responding');
assert.equal(h.get('send').disabled, false);
await h.advance(6000);
assert.equal(h.mode(), 'attentive');
h.submit('Muchas gracias');
await h.answer(1, {text:'Con mucho gusto.', reaction:'happy', links:[]});
assert.equal(h.mode(), 'happy');
h.get('reset').emit('click');
assert.equal(h.mode(), 'attentive');
assert.equal(h.get('messages').childElementCount, 0);
await h.advance(7000);
assert.equal(h.mode(), 'attentive');

// A server can finish after abort. Neither its text nor its timers may affect a
// reopened conversation or unlock the send button of a newer request.
h.submit('Consulta antigua');
h.get('close').emit('click');
assert.equal(h.requests[2].options.signal.aborted, true);
assert.equal(h.get('panel').dataset.lunaAnimate, undefined);
assert.equal(h.mode(), 'attentive');
assert.equal(h.get('messages').childElementCount, 0);
h.open();h.submit('Consulta nueva');
await h.answer(2, {text:'Respuesta antigua', reaction:'happy'});
assert.equal(h.get('messages').childElementCount, 1);
assert.equal(h.mode(), 'reading');
assert.equal(h.get('send').disabled, true);
await h.answer(3, {text:'Respuesta nueva', reaction:'responding'});
assert.equal(h.mode(), 'responding');
assert.match(h.get('messages').textContent, /Respuesta nueva/);
assert.doesNotMatch(h.get('messages').textContent, /Respuesta antigua/);

h.submit('Consulta que se borrará');h.get('reset').emit('click');
await h.answer(4, {text:'No debe reaparecer', reaction:'happy'});
assert.equal(h.get('messages').childElementCount, 0);
assert.equal(h.mode(), 'attentive');
h.submit('Consulta sin conexión');await h.fail(5);
assert.equal(h.mode(), 'attentive');
assert.match(h.get('messages').textContent, /Gracias por su paciencia/);
assert.equal(h.get('send').disabled, false);
h.submit('Consulta limitada');await h.answer(6, {text:'Contacte a la clínica.', reaction:'happy'}, false);
assert.equal(h.mode(), 'attentive', 'HTTP failures never celebrate');
h.submit('Consulta con salida no confiable');
const markup = '<img src=x onerror=alert(1)>';
await h.answer(7, {text:markup, reaction:'<script>', links:[{href:'javascript:alert(1)',label:'Peligro'}, {href:'https://evil.example',label:'Peligro'}]});
const last = h.get('messages').children.at(-1);
assert.equal(last.children[1].tagName, 'P');
assert.equal(last.children[1].textContent, markup);
assert.equal(last.childElementCount, 2, 'Untrusted URLs do not create anchors');
h.get('close').emit('click');await h.advance(20000);
assert.equal(h.mode(), 'attentive');
assert.equal(h.get('messages').childElementCount, 0);

const disabled = harness(false);disabled.open();disabled.submit('Hola');
assert.equal(disabled.requests.length, 0);

// Suggestions are genuine links with clear destinations, safe labels and
// separate internal/external affordances. Same-page navigation must reveal the
// section instead of leaving the modal over it.
const navigation = harness(); navigation.open(); navigation.submit('Horario');
await navigation.answer(0, {text:'Consulte nuestras sedes.', links:[
  {href:'/#sedes', label:markup},
  {href:'https://test.local/#sedes', label:'Duplicado'},
  {href:'https://wa.me/50378205613', label:'WhatsApp de Clínica Matriz'},
  {href:'https://wa.me/50378205613', label:'Duplicado externo'},
]});
const actions = navigation.get('messages').children.at(-1).children[2];
assert.equal(actions.className, 'luna-actions');
assert.equal(actions.childElementCount, 2, 'Repeated destinations render only once');
const [internal, external] = actions.children;
assert.equal(internal.tagName, 'A');
assert.equal(internal.href, 'https://test.local/#sedes');
assert.equal(internal.className, 'luna-action');
assert.equal(internal.children[0].children[0].tagName, 'SVG');
assert.equal(internal.children[0].children[0].getAttribute('aria-hidden'), 'true');
assert.equal(internal.children[1].children[0].textContent, markup, 'Link labels remain plain text');
assert.equal(internal.children[1].children[1].textContent, 'Ver información');
assert.equal(internal.children[2].tagName, 'SVG');
assert.equal(internal.children[2].getAttribute('class'), 'luna-action-arrow');
assert.equal(internal.children[2].getAttribute('aria-hidden'), 'true');
assert.equal(internal.children[2].children[0].getAttribute('d'), 'M5 12h14m-6-6 6 6-6 6');
assert.equal(external.className, 'luna-action luna-action-external');
assert.equal(external.target, '_blank');
assert.equal(external.rel, 'noopener noreferrer');
assert.equal(external.children[1].children[1].textContent, 'Abrir WhatsApp');
assert.equal(external.children[2].tagName, 'SVG');
assert.equal(external.children[2].children[0].getAttribute('d'), 'M7 17 17 7M7 7h10v10');
internal.emit('click', {ctrlKey:true});
assert.equal(navigation.get('panel').open, true, 'Modified clicks leave the current conversation open');
let prevented = false;
internal.emit('click', {preventDefault() { prevented = true; }});
assert.equal(prevented, false, 'Internal CTA retains native navigation');
assert.equal(navigation.get('panel').open, false);
assert.equal(navigation.get('messages').childElementCount, 0, 'Following a section link clears conversation');
assert.equal(navigation.focused(), navigation.section);
assert.equal(navigation.section.getAttribute('tabindex'), '-1');
navigation.section.emit('blur');
assert.equal(navigation.section.hasAttribute('tabindex'), false, 'Temporary section focus does not change later tab order');

const otherPage = harness(); otherPage.location.pathname = '/estudios.html';
otherPage.open(); otherPage.submit('Horario');
await otherPage.answer(0, {text:'Sedes.', links:[{href:'/#sedes',label:'Sedes y contacto'}]});
otherPage.get('messages').children.at(-1).children[2].children[0].emit('click');
assert.equal(otherPage.get('panel').open, false);
assert.equal(otherPage.focused(), otherPage.get('launch'), 'Another page is not focused before native navigation');
console.log('PASS: controller reactions, duplicate submission, reaction expiry, reset/close/stale-response races, errors, safe text/links, deduplicated CTA cards, native navigation, same-page section focus and privacy cleanup; fake DOM/network/time, no browser or API calls.');
