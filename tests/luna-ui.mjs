import assert from 'node:assert/strict';
const { chromium } = await import(process.env.LUNA_PLAYWRIGHT_MODULE || 'playwright');
const browser = await chromium.launch({executablePath:process.env.CHROMIUM_PATH || '/usr/bin/chromium',headless:true,args:['--no-sandbox']});
try {
 for (const viewport of [{width:1280,height:900},{width:390,height:844},{width:320,height:568}]) {
  const page=await browser.newPage({viewport});
  // No third-party assets are needed to verify the widget; keep this test offline except localhost.
  await page.route('**/*', route => new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort());
  await page.goto('http://127.0.0.1:8787/');
  await page.locator('#luna-launch').click();
  assert.ok(await page.locator('#luna-panel').isVisible());
  assert.ok(!(await page.locator('#luna-form').isVisible()));
  const box=await page.locator('#luna-panel').boundingBox();
  assert.ok(box.x>=0 && box.y>=0 && box.x+box.width<=viewport.width+1 && box.y+box.height<=viewport.height+1,JSON.stringify(box));
  await page.locator('[data-luna-id="sede_farid"]').click();
  await page.waitForFunction(()=>document.querySelector('#luna-answer').textContent.includes('Avenida Roosevelt Norte #412'));
  await page.screenshot({path:`/tmp/luna-clean-${viewport.width}.png`});
  await page.locator('#luna-close').click();
  assert.equal(await page.evaluate(()=>document.activeElement.id),'luna-launch');
  await page.locator('#luna-launch').click();
  assert.equal(await page.locator('#luna-answer').textContent(),'');
  await page.keyboard.press('Escape');assert.ok(!(await page.locator('#luna-panel').isVisible()));
  await page.locator('#luna-launch').click();
  await page.route('**/api/luna-pacientes',route=>route.abort());
  await page.locator('[data-luna-id="sede_matriz"]').click();
  await page.waitForFunction(()=>document.querySelector('#luna-answer').textContent.includes('No pude'));
  await page.unroute('**/api/luna-pacientes');
  await page.route('**/api/luna-pacientes',route=>route.fulfill({json:{text:'<img src=x onerror=alert(1)>',links:[{label:'invalid',href:'javascript:alert(1)'}]}}));
  await page.locator('[data-luna-id="sede_matriz"]').click();
  await page.waitForFunction(()=>document.querySelector('#luna-answer').textContent.includes('<img'));
  assert.equal(await page.locator('#luna-answer img').count(),0); assert.equal(await page.locator('#luna-links a').count(),0);
  await page.screenshot({path:`/tmp/luna-${viewport.width}.png`});
  await page.close();
 }
 console.log('PASS: Chromium 1280/390/320px; bounds, local answers, close/reopen/Escape, focus, failures, text-only rendering.');
} finally {await browser.close();}
