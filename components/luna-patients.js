import { catalog, contact } from '../luna/catalog.js';
export function LunaPatients(enabled = false) {
  return `<style>
#luna-launch{position:fixed;bottom:94px;right:24px;z-index:51;border:0;border-radius:24px;background:#9d2320;color:white;padding:12px 18px;font:600 14px system-ui;min-height:48px;cursor:pointer}
#luna-panel{box-sizing:border-box;border:1px solid #decac6;border-radius:18px;background:#fffaf7;color:#301d1d;padding:20px;width:min(420px,calc(100vw - 24px));max-height:calc(100dvh - 24px);overflow:auto;font:16px/1.5 system-ui;box-shadow:0 12px 70px #0004}
#luna-panel::backdrop{background:#101a2380}#luna-panel *{box-sizing:border-box}#luna-panel h2{font-size:21px;margin:0}#luna-panel p{margin:12px 0}#luna-panel button,#luna-panel a{min-height:44px}#luna-panel button{cursor:pointer;border:1px solid #d6bfba;border-radius:10px;padding:9px 12px;background:white;color:#76201e;font:inherit}#luna-panel button:disabled{opacity:.55;cursor:wait}#luna-panel :focus-visible,#luna-launch:focus-visible{outline:3px solid #126b91;outline-offset:3px}#luna-panel header{display:flex;justify-content:space-between;align-items:center;gap:12px}#luna-panel small{display:block;color:#63514c;font-size:13px}#luna-choices{display:flex;gap:8px;flex-wrap:wrap;margin:14px 0}#luna-choices button{font-size:14px}#luna-panel input{width:100%;padding:12px;border:1px solid #9e8782;border-radius:8px;font:inherit;color:#301d1d;background:white;margin:6px 0 10px}#luna-panel a{display:inline-flex;align-items:center;color:#842724;text-decoration:underline}#luna-answer{white-space:pre-wrap}#luna-panel [hidden]{display:none!important}#luna-panel form>button{background:#9d2320;color:white;width:100%}
</style>
<button id="luna-launch" type="button" aria-haspopup="dialog" aria-controls="luna-panel">Luna · Información</button>
<dialog id="luna-panel" aria-labelledby="luna-title" aria-describedby="luna-note">
<header><h2 id="luna-title">Luna Pacientes</h2><button id="luna-close" type="button" aria-label="Cerrar Luna">Cerrar</button></header>
<p id="luna-note">${enabled ? 'Información pública de la clínica, con ayuda de IA.' : 'Guía informativa · preguntas rápidas sin IA.'}</p>
<small>No comparta datos personales ni resultados. Luna no brinda orientación médica.${enabled ? ' Su consulta se envía a OpenAI para identificar el tema.' : ''}</small>
<div id="luna-choices" aria-label="Preguntas rápidas">${catalog.map(x=>`<button type="button" data-luna-id="${x.id}">${x.label}</button>`).join('')}</div>
<form id="luna-form" ${enabled ? '' : 'hidden'}><label for="luna-question">¿Qué información necesita?</label><input id="luna-question" name="message" maxlength="400" autocomplete="off" required><button type="submit">Consultar</button></form>
<div role="status" aria-live="polite" aria-atomic="true"><p id="luna-answer"></p><div id="luna-links"></div></div>
<a href="${contact.href}" target="_blank" rel="noopener noreferrer">${contact.label}</a>
</dialog><script src="/luna-patients.js" defer></script>`;
}
