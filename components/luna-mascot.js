// Decorative, self-contained SVG: no IDs, external images, scripts or SVG filters.
// Put data-luna-mode on an ancestor and data-luna-animate="true" on the open panel.
export function LunaMascot() {
  return `<svg class="luna-bear" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 180" aria-hidden="true" focusable="false">
<ellipse cx="80" cy="170" rx="43" ry="6" fill="#e9c6c4" opacity=".65"/>
<g class="luna-bear-body" stroke="#92343a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M56 148v20h19v-20m10 0v20h19v-20" fill="#b22c36"/>
  <g class="luna-bear-paw-left"><path d="M48 121q-24 5-22 29 0 10 10 11 10-1 10-10l12-16" fill="#f8f2ef"/><path d="m30 149 9 1" stroke="#d6b7b3"/></g>
  <g class="luna-bear-paw-right"><path d="M112 121q24 5 22 29 0 10-10 11-10-1-10-10l-12-16" fill="#f8f2ef"/><path d="m121 150 9-1" stroke="#d6b7b3"/></g>
  <path d="M49 119q31-13 62 0l10 41q-41 12-82 0Z" fill="#fff"/>
  <path d="m63 116 17 17 17-17-7 38H70Z" fill="#b22c36"/>
  <path d="m60 116-6 18 12 3-4 9 18 13m20-43 6 18-12 3 4 9-18 13" fill="#fff"/>
  <path d="M80 144v20m17-19h14v11H97Z" fill="none"/>
  <path d="M104 147v6m-3-3h6" stroke="#b22c36" stroke-width="2"/>
  <g class="luna-bear-head">
    <circle cx="39" cy="40" r="21" fill="#faf7f4"/><circle cx="121" cy="40" r="21" fill="#faf7f4"/>
    <circle cx="39" cy="40" r="11" fill="#c8454e"/><circle cx="121" cy="40" r="11" fill="#c8454e"/>
    <path d="M27 69q-2-44 53-44t53 44v18q-4 36-53 36T27 87Z" fill="#faf7f4"/>
    <path d="M43 38q14-7 25-7" stroke="#fff" stroke-width="5"/>
    <path d="M80 27v9M29 86h8m86 0h8" fill="none" stroke="#d2b6b3"/>
    <circle cx="36" cy="89" r="3" fill="#b22c36" stroke="none"/><circle cx="124" cy="89" r="3" fill="#b22c36" stroke="none"/>
    <ellipse cx="80" cy="96" rx="25" ry="18" fill="#fff8f1" stroke="#e6c9c2"/>
    <g fill="#fff" fill-opacity=".55" stroke="#bb2935" stroke-width="5"><rect x="37" y="57" width="35" height="29" rx="12"/><rect x="88" y="57" width="35" height="29" rx="12"/><path d="M73 66q7-5 14 0M28 61l9 5m86 0 9-5" fill="none"/></g>
    <g class="luna-bear-open-eyes"><g class="luna-bear-gaze">
      <g fill="#402c30" stroke="none"><ellipse cx="56" cy="72" rx="4" ry="6"/><ellipse cx="104" cy="72" rx="4" ry="6"/></g>
      <g fill="#fff" stroke="none"><circle cx="57" cy="70" r="1.5"/><circle cx="105" cy="70" r="1.5"/></g>
    </g></g>
    <g class="luna-bear-happy-eyes" stroke="#402c30" stroke-width="3" fill="none"><path d="M50 75q6-9 12 0m36 0q6-9 12 0"/></g>
    <path d="M73 89q7-5 14 0-2 9-7 9t-7-9" fill="#a32832" stroke="none"/>
    <path class="luna-bear-smile" d="M69 102q11 11 22 0" fill="none"/>
    <g class="luna-bear-talk-mouth"><ellipse cx="80" cy="105" rx="8" ry="5" fill="#92343a" stroke="none"/><path d="M76 107q4-3 8 0" stroke="#ed9a9e" stroke-width="2"/></g>
    <path class="luna-bear-happy-mouth" d="M68 101q12 21 24 0Z" fill="#92343a" stroke="none"/>
    <circle cx="43" cy="95" r="6" fill="#f2bab8" stroke="none"/><circle cx="117" cy="95" r="6" fill="#f2bab8" stroke="none"/>
  </g>
  <g class="luna-bear-reading" transform="rotate(-5 80 140)">
    <path d="M48 125h64v35H48Z" fill="#fff" stroke="#b22c36"/>
    <path d="M57 134h33m-33 7h45m-45 7h30" stroke="#d7aeac" stroke-width="2.5"/>
    <path d="M94 131v6m-3-3h6" stroke="#b22c36" stroke-width="2"/>
    <ellipse cx="47" cy="148" rx="7" ry="9" fill="#faf7f4"/><ellipse cx="113" cy="145" rx="7" ry="9" fill="#faf7f4"/>
  </g>
</g>
<g class="luna-bear-thought" fill="#b22c36"><circle cx="133" cy="48" r="3" opacity=".4"/><circle cx="142" cy="35" r="4" opacity=".65"/><circle class="luna-bear-thought-dot" cx="141" cy="17" r="6"/></g>
<g class="luna-bear-joy" stroke="#ba2a35" stroke-width="2.5" stroke-linecap="round" fill="none"><path d="m139 89 2 6 6 2-6 2-2 6-2-6-6-2 6-2Z" fill="#f4c6c4"/><path d="m16 99 2-5m-5 0-4-2m12 11 5 1"/></g>
</svg>`;
}

export function LunaMascotStyles() {
  return `
.luna-bear{display:block;width:100%;height:100%;overflow:visible}
.luna-bear-body{transform-origin:80px 164px}.luna-bear-head{transform-origin:80px 108px}
.luna-bear-paw-left{transform-origin:49px 126px}.luna-bear-paw-right{transform-origin:111px 126px}
.luna-bear-open-eyes{transform-box:fill-box;transform-origin:center}.luna-bear-talk-mouth{transform-box:fill-box;transform-origin:center}
.luna-bear-reading,.luna-bear-thought,.luna-bear-joy,.luna-bear-happy-eyes,.luna-bear-happy-mouth,.luna-bear-talk-mouth{display:none}
[data-luna-mode="reading"] .luna-bear-reading,[data-luna-mode="thinking"] .luna-bear-thought,[data-luna-mode="responding"] .luna-bear-talk-mouth,[data-luna-mode="happy"] .luna-bear-joy,[data-luna-mode="happy"] .luna-bear-happy-eyes,[data-luna-mode="happy"] .luna-bear-happy-mouth{display:block}
[data-luna-mode="reading"] .luna-bear-gaze{transform:translateY(4px)}
[data-luna-mode="reading"] .luna-bear-head{transform:rotate(4deg)}
[data-luna-mode="thinking"] .luna-bear-head{transform:rotate(-9deg)}
[data-luna-mode="thinking"] .luna-bear-gaze{transform:translate(2px,-3px)}
[data-luna-mode="responding"] .luna-bear-smile,[data-luna-mode="happy"] .luna-bear-smile,[data-luna-mode="happy"] .luna-bear-open-eyes{display:none}
[data-luna-mode="responding"] .luna-bear-paw-right{transform:rotate(-42deg)}
[data-luna-mode="happy"] .luna-bear-head{transform:rotate(-5deg)}
[data-luna-mode="happy"] .luna-bear-paw-right{transform:rotate(-100deg)}
[data-luna-animate="true"] .luna-bear-body{animation:luna-bear-breathe 4.6s ease-in-out infinite}
[data-luna-animate="true"] .luna-bear-open-eyes{animation:luna-bear-blink 5.7s ease-in-out infinite}
[data-luna-animate="true"] [data-luna-mode="reading"] .luna-bear-gaze,[data-luna-animate="true"][data-luna-mode="reading"] .luna-bear-gaze{animation:luna-bear-read 2.4s ease-in-out infinite}
[data-luna-animate="true"] [data-luna-mode="thinking"] .luna-bear-thought-dot,[data-luna-animate="true"][data-luna-mode="thinking"] .luna-bear-thought-dot{animation:luna-bear-think 1.3s ease-in-out infinite}
[data-luna-animate="true"] [data-luna-mode="responding"] .luna-bear-talk-mouth,[data-luna-animate="true"][data-luna-mode="responding"] .luna-bear-talk-mouth{animation:luna-bear-talk .55s ease-in-out infinite}
[data-luna-animate="true"] [data-luna-mode="responding"] .luna-bear-paw-right,[data-luna-animate="true"][data-luna-mode="responding"] .luna-bear-paw-right{animation:luna-bear-explain 1.5s ease-in-out infinite}
[data-luna-animate="true"] [data-luna-mode="happy"] .luna-bear-paw-right,[data-luna-animate="true"][data-luna-mode="happy"] .luna-bear-paw-right{animation:luna-bear-wave 1.1s ease-in-out 3}
[data-luna-animate="true"] [data-luna-mode="happy"] .luna-bear-joy,[data-luna-animate="true"][data-luna-mode="happy"] .luna-bear-joy{animation:luna-bear-sparkle 1.8s ease-in-out 2}
@keyframes luna-bear-breathe{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}
@keyframes luna-bear-blink{0%,43%,47%,100%{transform:scaleY(1)}45%{transform:scaleY(.08)}}
@keyframes luna-bear-read{0%,100%{transform:translate(-2px,4px)}45%{transform:translate(3px,4px)}55%{transform:translate(-2px,6px)}}
@keyframes luna-bear-think{0%,100%{opacity:.4}50%{opacity:1}}
@keyframes luna-bear-talk{0%,100%{transform:scaleY(.5)}50%{transform:scaleY(1.1)}}
@keyframes luna-bear-explain{0%,100%{transform:rotate(-42deg)}50%{transform:rotate(-62deg)}}
@keyframes luna-bear-wave{0%,100%{transform:rotate(-100deg)}50%{transform:rotate(-125deg)}}
@keyframes luna-bear-sparkle{0%,100%{opacity:.45}50%{opacity:1}}
@media(prefers-reduced-motion:reduce){.luna-bear,.luna-bear *{animation:none!important;transition:none!important}}
`;
}
