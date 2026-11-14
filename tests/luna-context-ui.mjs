import assert from 'node:assert/strict';
import fs from 'node:fs';
import { LunaPatients } from '../components/luna-patients.js';
import { handleLuna } from '../luna/server.js';
const {chromium}=await import(process.env.LUNA_PLAYWRIGHT_MODULE || 'playwright');
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
try {
 const page=await browser.newPage({viewport:{width:390,height:844}});let requests=[];
 const env={LUNA_PATIENTS_ENABLED:'true',LUNA_PATIENTS_MODEL:'mock',LUNA_PATIENTS_OPENAI_API_KEY:'mock',LUNA_PATIENTS_BUDGET:{idFromName:x=>x,get:()=>({fetch:async()=>new Response(null,{status:204})})}};
 await page.route('https://test.local/**',async route=>{
  if(route.request().url().endsWith('/api/luna-pacientes')) {
   const data=route.request().postDataJSON();requests.push(data);
   const res=await handleLuna(new Request(route.request().url(),{method:'POST',headers:{origin:'https://test.local','content-type':'application/json'},body:JSON.stringify(data)}),env,async()=>({kind:'clarify',id:'sede'}));
   return route.fulfill({status:res.status,json:await res.json()});
  }
  if(route.request().url().endsWith('/luna-patients.js'))return route.fulfill({contentType:'text/javascript; charset=utf-8',body:fs.readFileSync(new URL('../public/luna-patients.js',import.meta.url),'utf8')});
  return route.fulfill({contentType:'text/html; charset=utf-8',body:'<!doctype html><html><body>'+LunaPatients(true)+'</body></html>'});
 });
 await page.goto('https://test.local/');await page.locator('#luna-launch').click();
 async function ask(text){await page.locator('#luna-question').fill(text);await page.locator('#luna-send').click();await page.waitForFunction(()=>!document.querySelector('#luna-send').disabled);}
 await ask('¿Dónde quedan?');await ask('Farid');assert.deepEqual(requests[1],{message:'Farid',context:'sede'});assert.match(await page.locator('.luna-message-assistant').last().textContent(),/Roosevelt Norte #412/);
 await ask('¿Dónde quedan?');assert.deepEqual(requests[2],{message:'¿Dónde quedan?'});
 await page.locator('#luna-close').click();await page.locator('#luna-launch').click();await ask('Farid');assert.deepEqual(requests[3],{message:'Farid'});
 await page.evaluate(()=>{const realNow=Date.now;Date.now=()=>realNow()+6*60*1000;});await ask('Farid');assert.deepEqual(requests[4],{message:'Farid'});
 await page.locator('#luna-reset').click();await ask('Farid');assert.deepEqual(requests.at(-1),{message:'Farid'});
 assert.equal(await page.evaluate(()=>localStorage.length+sessionStorage.length),0);
 console.log('PASS: mobile simulated end-to-end clarification, exact Farid answer, reset on answer/close/expiry/reset; no browser storage.');
}finally{await browser.close();}
