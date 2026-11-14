import assert from 'node:assert/strict';
import fs from 'node:fs';
import { LunaPatients } from '../components/luna-patients.js';
const { chromium } = await import(process.env.LUNA_PLAYWRIGHT_MODULE || 'playwright');
const browser = await chromium.launch({executablePath:process.env.CHROMIUM_PATH || '/usr/bin/chromium',headless:true,args:['--no-sandbox']});
try {
 for (const viewport of [{width:1280,height:900},{width:768,height:1024},{width:414,height:896},{width:390,height:844},{width:375,height:667},{width:320,height:568},{width:390,height:380}]) {
  const page=await browser.newPage({viewport,reducedMotion:'reduce'});let enabled=true;let mode='ok';let calls=0;
  await page.route('**/*',async route=>{
   const path=new URL(route.request().url()).pathname;
   if(path==='/luna-patients.js')return route.fulfill({contentType:'text/javascript; charset=utf-8',body:fs.readFileSync(new URL('../public/luna-patients.js',import.meta.url),'utf8')});
   if(path==='/assets/luna/luna-ivory-v2.webp')return route.fulfill({contentType:'image/webp',body:fs.readFileSync(new URL('../public/assets/luna/luna-ivory-v2.webp',import.meta.url))});
   if(path==='/luna-bear.svg')return route.fulfill({contentType:'image/svg+xml',body:fs.readFileSync(new URL('../public/luna-bear.svg',import.meta.url),'utf8')});
   if(path==='/api/luna-pacientes'){
    calls++;if(mode==='error')return route.abort();
    if(mode==='late')await new Promise(resolve=>setTimeout(resolve,1000));
    if(mode==='xss')return route.fulfill({json:{text:'<img src=x onerror=alert(1)>',links:[{label:'bad',href:'javascript:alert(1)'},null,{label:'bad',href:'http://['}]}});
    return route.fulfill({status:mode==='limit'?429:200,json:{reaction:mode==='happy'?'happy':'responding',text:mode==='limit'?'Por ahora no puedo recibir más consultas.':'Plaza Farid: Avenida Roosevelt Norte #412, Barrio San Felipe, San Miguel.',links:[{label:'Contactar Plaza Farid',href:'https://wa.me/50378195960'}]}});
   }
   return route.fulfill({contentType:'text/html; charset=utf-8',body:'<!doctype html><html lang="es"><head><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="background:#ece7e5">'+LunaPatients(enabled)+'</body></html>'});
  });
  await page.goto('https://test.local/');await page.locator('#luna-launch').click();
  assert.equal(await page.evaluate(()=>document.activeElement.id),'luna-question');
  assert.equal(await page.locator('#luna-choices').count(),0);
  assert.equal(await page.locator('[data-luna-mascot] svg').count(),1);
  assert.equal(await page.locator('svg[data-luna-design="ivory-v2"]').count(),3, 'Launcher, header and welcome use the approved design');
  const mascotIds=await page.locator('.luna-bear [id]').evaluateAll(els=>els.map(el=>el.id));
  assert.equal(new Set(mascotIds).size,mascotIds.length, 'Repeated mascots have independent SVG definitions');
  assert.equal(await page.locator('#luna-launch svg').getAttribute('viewBox'),await page.locator('[data-luna-mascot] svg').getAttribute('viewBox'), 'Small avatars share the portrait crop');
  assert.notEqual(await page.locator('#luna-welcome svg').getAttribute('viewBox'),await page.locator('[data-luna-mascot] svg').getAttribute('viewBox'), 'Welcome shows the full character');
  assert.equal(await page.locator('#luna-panel').getAttribute('data-luna-mode'),'happy');
  assert.ok(await page.locator('[data-luna-mascot] .luna-bear-body').evaluate(el=>getComputedStyle(el).animationName!=='none'), 'Reduced motion keeps a gentle animation while the panel is open');
  assert.ok(await page.locator('#luna-launch svg *').evaluateAll(els=>els.every(el=>getComputedStyle(el).animationName==='none')), 'The launcher stays static');
  const box=await page.locator('#luna-panel').boundingBox();assert.ok(box.x>=0&&box.y>=0&&box.x+box.width<=viewport.width+1&&box.y+box.height<=viewport.height+1);
  assert.ok(await page.locator('#luna-scroll').evaluate(el=>el.scrollWidth<=el.clientWidth+1), 'Welcome fits horizontally without scrolling');
  if (viewport.height > 500) {
   const avatar=await page.locator('#luna-welcome .luna-avatar').boundingBox();
   const figure=await page.locator('#luna-welcome svg').boundingBox();
   assert.ok(figure.x>=avatar.x-1&&figure.y>=avatar.y-1&&figure.x+figure.width<=avatar.x+avatar.width+1&&figure.y+figure.height<=avatar.y+avatar.height+1, 'Full-body SVG fits its avatar box without clipping the feet');
  }
  const sendBox=await page.locator('#luna-send').boundingBox();assert.ok(sendBox.y+sendBox.height<=viewport.height);
  await page.screenshot({path:`/tmp/luna-chat-welcome-${viewport.width}-${viewport.height}.png`});
  async function ask(text){await page.locator('#luna-question').fill(text);await page.locator('#luna-question').press('Enter');await page.waitForFunction(()=>!document.querySelector('#luna-send').disabled);}
  await ask('¿Dónde queda Plaza Farid?');assert.equal(calls,1);assert.equal(await page.locator('#luna-panel').getAttribute('data-luna-mode'),'responding');assert.equal(await page.locator('.luna-message-user').count(),1);assert.match(await page.locator('.luna-message-assistant').last().textContent(),/Roosevelt/);
  await page.screenshot({path:`/tmp/luna-chat-answer-${viewport.width}-${viewport.height}.png`});
  mode='limit';await ask('Otra consulta');assert.match(await page.locator('.luna-message-assistant').last().textContent(),/Por ahora/);
  mode='error';await ask('Hola');assert.match(await page.locator('.luna-message-assistant').last().textContent(),/No pude conectarme/);assert.equal(await page.locator('#luna-panel').getAttribute('data-luna-mode'),'attentive');
  mode='xss';await ask('<svg onload=alert(1)>');assert.equal(await page.locator('#luna-messages img,#luna-messages svg').count(),0);assert.equal(await page.locator('.luna-message-assistant').last().locator('a').count(),0);
  mode='ok';await ask('Hola');assert.equal(await page.locator('.luna-message').count(),8);
  await page.locator('#luna-reset').click();assert.equal(await page.locator('.luna-message').count(),0);assert.ok(await page.locator('#luna-welcome').isVisible());
  mode='late';await page.locator('#luna-question').fill('Consulta pendiente');await page.locator('#luna-send').click();
  assert.equal(await page.locator('#luna-panel').getAttribute('data-luna-mode'),'reading');
  await page.waitForTimeout(750);assert.equal(await page.locator('#luna-panel').getAttribute('data-luna-mode'),'thinking');
  await page.locator('#luna-close').click();await page.locator('#luna-launch').click();await page.waitForTimeout(1100);assert.equal(await page.locator('.luna-message').count(),0);
  mode='happy';await ask('Gracias');assert.equal(await page.locator('#luna-panel').getAttribute('data-luna-mode'),'happy');
  await page.locator('#luna-reset').click();assert.equal(await page.locator('#luna-panel').getAttribute('data-luna-mode'),'attentive');
  await page.keyboard.press('Escape');assert.ok(!(await page.locator('#luna-panel').isVisible()));assert.equal(await page.evaluate(()=>document.activeElement.id),'luna-launch');
  enabled=false;await page.reload();await page.locator('#luna-launch').click();assert.ok(await page.locator('#luna-question').isVisible());assert.ok(await page.locator('#luna-question').isDisabled());assert.ok(await page.locator('#luna-send').isDisabled());assert.equal(await page.locator('.luna-bottom a').getAttribute('href'),'https://wa.me/50378205613');
  assert.equal(await page.evaluate(()=>localStorage.length+sessionStorage.length),0);
  await page.close();
 }
 console.log('PASS: approved mascot in portrait/full-body crops, unique SVG definitions, five reactive modes, gentle reduced motion, static launcher, desktop/tablet/mobile/short viewport; keyboard, focus, errors/429, XSS, eight-message cap, reset, stale-response cancellation, unavailable state. All API replies mocked.');
} finally {await browser.close();}
