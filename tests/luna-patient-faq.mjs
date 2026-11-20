import assert from 'node:assert/strict';
import { locations } from '../components/clinic-locations.js';
import { catalog, fallback } from '../luna/catalog.js';
import { handleLuna, selectWithOpenAI } from '../luna/server.js';

const origin = 'https://clinica.example';
let budgetCalls = 0;
const env = {
  LUNA_PATIENTS_ENABLED: 'true',
  LUNA_PATIENTS_MODEL: 'test',
  LUNA_PATIENTS_OPENAI_API_KEY: 'test',
  LUNA_PATIENTS_BUDGET: {
    idFromName: name => name,
    get: () => ({
      fetch() {
        budgetCalls++;
        return new Response(null, {status: 204});
      },
    }),
  },
};

async function ask(message, provider, context) {
  const request = new Request(origin + '/api/luna-pacientes', {
    method: 'POST',
    headers: {origin, 'Content-Type': 'application/json'},
    body: JSON.stringify({message, context}),
  });
  const response = await handleLuna(request, env, provider);
  assert.equal(response.status, 200, message);
  return response.json();
}

const unexpectedProvider = () => assert.fail('An exact FAQ should resolve locally');
const noLab = /(?:no|sin)\b[^.\n]*laboratorio/i;
const branchFacts = [/Matriz/i, /Farid/i, /Advanced/i, /tomograf|\bTAC\b/i, /resonancia|\bRM\b/i, noLab];
for (const message of ['¿Cuál es la diferencia de las sedes?', '¿Qué diferencia hay entre las sedes?']) {
  const {text} = await ask(message, unexpectedProvider);
  for (const fact of branchFacts) assert.match(text, fact, message);
}

const labContacts = locations.filter(branch => ['matriz', 'farid'].includes(branch.id));
for (const message of ['¿Hay laboratorio en Advanced?', '¿Hacen exámenes de sangre en Advanced Radiology?']) {
  const {text, links} = await ask(message, unexpectedProvider);
  assert.match(text, noLab, message);
  const whatsappLinks = links.filter(link => link.href.startsWith('https://wa.me/')).map(link => link.href);
  assert.deepEqual(whatsappLinks.sort(), labContacts.map(branch => branch.whatsappHref).sort(), message);
}

const clarification = await ask('¿Cómo me preparo?', unexpectedProvider);
assert.equal(clarification.context, 'preparacion');
for (const [followup, expectedId] of [
  ['TAC con contraste', 'procedimiento_tac_contraste'],
  ['ultrasonido', 'procedimiento_us'],
]) {
  const answer = await ask(followup, unexpectedProvider, clarification.context);
  assert.equal(answer.text, catalog.find(item => item.id === expectedId).text, followup);
  if (followup === 'TAC con contraste') {
    assert.match(answer.text, /(?:6|seis) horas/i);
    assert.match(answer.text, /creatinina/i);
  }
}
assert.equal(budgetCalls, 0);

let handoffs = 0;
for (const message of [
  '¿Hay laboratorio en Advanced y cuánto cuesta la prueba?',
  '¿Qué diferencia hay entre las sedes y cuál me recomienda por mi dolor?',
]) {
  const answer = await ask(message, () => {
    handoffs++;
    return {kind: 'handoff', id: 'none'};
  });
  assert.equal(answer.text, fallback, message);
}
assert.equal(handoffs, 2);

const procedures = catalog.filter(item => item.id.startsWith('procedimiento_'));
assert.ok(procedures.length > 0, 'The classifier needs reviewed procedure FAQs');
const approved = procedures.find(item => item.id === 'procedimiento_rm_implantes');
assert.ok(approved);
let consulted = false;
const faqAnswer = await ask('¿Para qué sirve llevar la tarjeta de mi implante a la resonancia?', (message, config, context) =>
  selectWithOpenAI(message, config, async (_url, options) => {
    consulted = true;
    const payload = JSON.parse(options.body);
    const validIds = payload.text.format.schema.properties.id.enum;
    for (const item of procedures) {
      assert.ok(validIds.includes(item.id), item.id);
      assert.ok(payload.instructions.includes(item.id), item.id);
    }
    return Response.json({
      status: 'completed',
      output: [{type: 'message', content: [
        {type: 'output_text', text: JSON.stringify({kind: 'answer', id: approved.id})},
      ]}],
    });
  }, 8000, context));
assert.ok(consulted);
assert.equal(faqAnswer.text, approved.text);
assert.ok(faqAnswer.links.some(link => link.href === approved.href));
console.log('PASS: branch comparisons, Advanced lab referrals, mixed intents and procedure FAQ selection.');
