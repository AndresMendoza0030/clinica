import { contact } from './catalog.js';

const key = value => String(value || '').normalize('NFD').replace(/\p{M}/gu, '')
  .toLowerCase().replace(/\s+/g, ' ').trim();
const names = item => [item.name, ...(Array.isArray(item.aliases) ? item.aliases : [])].map(key);
const validCode = /^[a-zA-Z0-9][a-zA-Z0-9_-]{0,99}$/;

// Enable only in a separate review deployment, with an explicitly configured appointment origin.
export function pilotOrigin(env, request) {
  if (env.CITAS_PILOT_ENABLED !== 'true') return '';
  const publicHosts = ['www.clinicadrmendoza.com', 'clinicadrmendoza.com'];
  if (publicHosts.includes(new URL(request.url).hostname.toLowerCase())) return '';
  try {
    const url = new URL(env.CITAS_PILOT_ORIGIN);
    if (url.protocol !== 'https:' || url.origin !== env.CITAS_PILOT_ORIGIN) return '';
    return url.origin;
  } catch { return ''; }
}

const cachedCatalogs = new WeakMap();
export async function readBookingCatalog(env, origin) {
  if (!origin) return [];
  const cached = cachedCatalogs.get(env);
  if (cached?.origin === origin && cached.until > Date.now()) return cached.rows;
  try {
    const url = origin + '/api/public/catalog';
    const options = {signal: AbortSignal.timeout(2000), redirect: 'error'};
    // Never forward the patient's query, cookies, or request headers to the catalogue.
    const result = env.CITAS_PILOT ? await env.CITAS_PILOT.fetch(url, options) : await fetch(url, options);
    if (!result.ok) return [];
    const { items } = await result.json();
    const rows = Array.isArray(items) ? items.filter(item => item && typeof item.code === 'string' && validCode.test(item.code)
      && typeof item.name === 'string' && item.name.trim() && item.selectable !== false) : [];
    if (rows.length) cachedCatalogs.set(env, {origin, rows, until:Date.now() + 60000});
    return rows;
  } catch { return []; }
}

function bookingLink(origin, item) {
  return origin + '/reservar#estudio=' + encodeURIComponent(item.code);
}

export function studyLinkRenderer(items, origin, path) {
  const sourcePath = path.replace(/\.html$/, '') + '.html';
  const fromPage = items.filter(item => {
    try { return new URL(item.source_url).pathname === sourcePath; } catch { return false; }
  });
  return (name, group, section) => {
    const matches = fromPage.filter(item => names(item).includes(key(name)) && key(item.category) === key(group)
      && (!item.source_section || key(item.source_section) === key(section)));
    if (matches.length !== 1) return name;
    return '<a class="font-bold text-primary underline underline-offset-4" rel="noreferrer" aria-label="Solicitar ' +
      name.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;') + '" href="' +
      bookingLink(origin, matches[0]) + '">' + name + '</a>';
  };
}

export function resolveBookingQuestion(message, items, origin) {
  const query = key(message).replace(/^[¿¡]+|[?!.]+$/g, '')
    .replace(/^(?:(?:quisiera|quiero|deseo) (?:solicitar|buscar|agendar|reservar)|solicitar|buscar|agendar|reservar)\s+(?:(?:el |la |un |una )?(?:estudio|prueba|examen) (?:de )?)?/, '').trim();
  if (!query) return null;
  const exact = items.filter(item => names(item).includes(query));
  const roots = new Set(exact.map(item => item.code));
  const family = items.filter(item => roots.has(item.code) || roots.has(item.variant_of));
  // A partial name offers choices only when several catalogue entries share the complete prefix.
  const prefix = !family.length && query.length >= 4
    ? items.filter(item => names(item).some(name => name.startsWith(query + ' '))) : [];
  const matches = family.length ? family : prefix.length > 1 ? prefix : [];
  if (!matches.length) return null;
  if (matches.length > 8) return {text:'Encontré varias opciones. ¿Puede escribir el nombre completo tal como figura en su boleta?', context:'estudio', reaction:'attentive', links:[contact]};
  const repeated = new Set(matches.filter(a => matches.some(b => a.code !== b.code && key(a.name) === key(b.name))).map(a => key(a.name)));
  const links = matches.map(item => ({
    label: repeated.has(key(item.name)) ? [item.name, item.modality, item.category].filter(Boolean).join(' · ') : item.name,
    href: bookingLink(origin, item)
  }));
  return {
    text: matches.length === 1
      ? 'Este estudio figura en el catálogo. Puede abrir Citas para solicitarlo. Allí verá si puede elegir horario o si el equipo debe revisar su boleta.'
      : 'Encontré varias opciones. Elija la que aparece en su boleta para continuar en Citas. Si tiene dudas, puede consultar al equipo por WhatsApp.',
    reaction:'responding', links:[...links, contact]
  };
}
