// The approved 2D illustration is shared by all layers and all three avatars.
// SVG clips preserve the artwork; CSS moves the head, arms, eyes and mouth.
// IDs must be local to each instance: Safari resolves fragments globally.
export function LunaMascot({ id = 'mascot', portrait = false } = {}) {
  const p = 'luna-' + String(id).replace(/[^a-z0-9_-]/gi, '');
  const head = 'M250 0H960V420L914 477Q820 540 620 525Q430 530 336 448L250 320Z';
  const raised = 'M160 448H340L400 523L457 520L510 550Q530 596 490 652Q475 701 410 706Q341 716 287 663L160 598Z';
  const resting = 'M808 727L900 714L970 812V963H824L807 842Z';
  const leftEye = 'M474 278Q518 258 557 279Q585 302 579 333Q570 369 535 369Q499 369 485 342Q475 324 481 301L470 290Z';
  const rightEye = 'M707 259Q742 239 775 255L797 267L790 280Q795 315 770 338Q740 352 716 329Q704 310 708 285L701 274Z';
  const use = `<use href="#${p}-art"/>`;
  return `<svg class="luna-bear${portrait ? ' luna-bear--portrait' : ''}" data-luna-design="ivory-v2" xmlns="http://www.w3.org/2000/svg" viewBox="${portrait ? '250 15 715 540' : '140 0 880 1254'}" aria-hidden="true" focusable="false">
<defs>
  <image id="${p}-art" href="/assets/luna/luna-ivory-v2.webp" width="1254" height="1254"/>
  <clipPath id="${p}-head" clipPathUnits="userSpaceOnUse"><path d="${head}"/></clipPath>
  <clipPath id="${p}-raised" clipPathUnits="userSpaceOnUse"><path d="${raised}"/></clipPath>
  <clipPath id="${p}-resting" clipPathUnits="userSpaceOnUse"><path d="${resting}"/></clipPath>
  <clipPath id="${p}-left-eye" clipPathUnits="userSpaceOnUse"><path d="${leftEye}"/></clipPath>
  <clipPath id="${p}-right-eye" clipPathUnits="userSpaceOnUse"><path d="${rightEye}"/></clipPath>
  <clipPath id="${p}-smile" clipPathUnits="userSpaceOnUse"><ellipse cx="660" cy="422" rx="70" ry="27"/></clipPath>
  <mask id="${p}-torso" maskUnits="userSpaceOnUse" x="0" y="0" width="1254" height="1254" style="mask-type:luminance">
    <rect width="1254" height="1254" fill="white"/><path d="${head}" fill="black"/><path d="${raised}" fill="black"/><path d="${resting}" fill="black"/>
  </mask>
  <mask id="${p}-face" maskUnits="userSpaceOnUse" x="250" y="0" width="710" height="560" style="mask-type:luminance">
    <rect x="250" width="710" height="560" fill="white"/><path d="${leftEye}" fill="black"/><path d="${rightEye}" fill="black"/><ellipse cx="660" cy="422" rx="70" ry="27" fill="black"/>
  </mask>
  <radialGradient id="${p}-skin"><stop stop-color="#ffebd8"/><stop offset="1" stop-color="#f7dcc3"/></radialGradient>
  <radialGradient id="${p}-muzzle"><stop stop-color="#ffe8cc"/><stop offset="1" stop-color="#fcdfbf"/></radialGradient>
  <linearGradient id="${p}-coat" x2=".8" y2="1"><stop stop-color="#fffefd"/><stop offset="1" stop-color="#e7dcd6"/></linearGradient>
  <linearGradient id="${p}-paper" x2=".2" y2="1"><stop stop-color="#fff"/><stop offset="1" stop-color="#f2e8e2"/></linearGradient>
</defs>
<g class="luna-bear-body">
  <g class="luna-bear-torso">
    <path class="luna-bear-joint-fill" d="M478 548Q508 523 554 528L553 669L466 672Z" fill="url(#${p}-coat)"/>
    <path class="luna-bear-joint-fill" d="M806 728L901 756L910 842L817 850Z" fill="url(#${p}-coat)"/>
    <g mask="url(#${p}-torso)">${use}</g>
  </g>
  <g class="luna-bear-paw-left"><g clip-path="url(#${p}-raised)">${use}</g></g>
  <g class="luna-bear-paw-right"><g clip-path="url(#${p}-resting)">${use}</g></g>
  <g class="luna-bear-head">
    <g clip-path="url(#${p}-head)">
      <path d="${leftEye}" fill="url(#${p}-skin)"/><path d="${rightEye}" fill="url(#${p}-skin)"/>
      <ellipse cx="660" cy="422" rx="70" ry="27" fill="url(#${p}-muzzle)"/>
      <g mask="url(#${p}-face)">${use}</g>
      <g class="luna-bear-open-eyes">
        <g class="luna-bear-eye luna-bear-eye-left"><g clip-path="url(#${p}-left-eye)"><g class="luna-bear-gaze">${use}</g></g></g>
        <g class="luna-bear-eye luna-bear-eye-right"><g clip-path="url(#${p}-right-eye)"><g class="luna-bear-gaze">${use}</g></g></g>
      </g>
      <g class="luna-bear-happy-eyes" fill="none" stroke="#5a3520" stroke-width="9" stroke-linecap="round">
        <path d="M495 322Q532 288 565 316M716 303Q745 275 774 298"/>
        <path d="m498 319-9-7m280-14 9-8" stroke-width="6"/>
      </g>
      <g class="luna-bear-smile" clip-path="url(#${p}-smile)">${use}</g>
      <g class="luna-bear-talk-mouth"><ellipse cx="660" cy="424" rx="23" ry="15" fill="#603c32"/><path d="M645 433Q660 421 675 433" fill="#d58e83"/></g>
      <g class="luna-bear-happy-mouth"><path d="M622 414Q659 444 698 411Q671 469 638 442Z" fill="#603c32"/><path d="M642 439Q662 428 681 440Q663 454 642 439" fill="#d58e83"/></g>
    </g>
  </g>
  <g class="luna-bear-reading">
    <path d="M487 570Q451 606 423 744L451 800L491 745L530 634Z" fill="url(#${p}-coat)" stroke="#d9cbc2" stroke-width="2"/>
    <path d="M822 721Q866 761 844 820L791 843L775 784Z" fill="url(#${p}-coat)" stroke="#d9cbc2" stroke-width="2"/>
    <path d="M443 726Q636 710 825 727L816 943Q633 962 449 942Z" fill="url(#${p}-paper)" stroke="#cbb9ae" stroke-width="3"/>
    <path d="M486 781H692M486 817H776M486 853H755M486 889H660" fill="none" stroke="#c9b6ae" stroke-width="8" stroke-linecap="round"/>
    <g fill="#b72b37"><path d="M754 756a21 21 0 0 0-21-21v21Zm5 0h21a21 21 0 0 0-21-21Zm-5 5h-21a21 21 0 0 0 21 21Zm5 0v21a21 21 0 0 0 21-21Z"/></g>
    <ellipse cx="444" cy="834" rx="26" ry="42" fill="url(#${p}-muzzle)" stroke="#dab796" stroke-width="2"/>
    <ellipse cx="821" cy="831" rx="25" ry="40" fill="url(#${p}-muzzle)" stroke="#dab796" stroke-width="2"/>
  </g>
</g>
<g class="luna-bear-thought" fill="#ad2939"><circle cx="911" cy="190" r="8" opacity=".35"/><circle cx="935" cy="159" r="11" opacity=".55"/><circle class="luna-bear-thought-dot" cx="938" cy="117" r="16"/></g>
<g class="luna-bear-joy" fill="#d5a863"><path d="m921 389 7 22 22 7-22 7-7 22-7-22-22-7 22-7Z"/><path d="m277 373 5 16 16 5-16 5-5 16-5-16-16-5 16-5Z"/></g>
</svg>`;
}

export function LunaMascotStyles() {
  return `
.luna-bear{display:block;width:100%;height:100%;overflow:visible}
.luna-bear-body{transform-box:view-box;transform-origin:640px 1200px}
.luna-bear-head{transform-box:view-box;transform-origin:640px 514px}
.luna-bear-paw-left{transform-box:view-box;transform-origin:491px 557px}
.luna-bear-paw-right{transform-box:view-box;transform-origin:850px 756px}
.luna-bear-eye-left{transform-box:view-box;transform-origin:532px 319px}
.luna-bear-eye-right{transform-box:view-box;transform-origin:746px 298px}
.luna-bear-talk-mouth{transform-box:view-box;transform-origin:660px 424px}
.luna-bear-reading,.luna-bear-thought,.luna-bear-joy,.luna-bear-happy-eyes,.luna-bear-happy-mouth,.luna-bear-talk-mouth{display:none}
.luna-bear--portrait .luna-bear-torso,.luna-bear--portrait .luna-bear-paw-left,.luna-bear--portrait .luna-bear-paw-right,.luna-bear--portrait .luna-bear-reading{display:none!important}
[data-luna-mode="reading"] .luna-bear-reading,[data-luna-mode="thinking"] .luna-bear-thought,[data-luna-mode="responding"] .luna-bear-talk-mouth,[data-luna-mode="happy"] .luna-bear-joy,[data-luna-mode="happy"] .luna-bear-happy-eyes,[data-luna-mode="happy"] .luna-bear-happy-mouth{display:block}
[data-luna-mode="reading"] .luna-bear-paw-left,[data-luna-mode="reading"] .luna-bear-paw-right,[data-luna-mode="reading"] .luna-bear-joint-fill{display:none}
[data-luna-mode="reading"] .luna-bear-gaze{transform:translateY(5px)}
[data-luna-mode="reading"] .luna-bear-head{transform:rotate(2deg)}
[data-luna-mode="thinking"] .luna-bear-head{transform:rotate(-3deg)}
[data-luna-mode="thinking"] .luna-bear-gaze{transform:translate(3px,-4px)}
[data-luna-mode="responding"] .luna-bear-smile,[data-luna-mode="happy"] .luna-bear-smile,[data-luna-mode="happy"] .luna-bear-open-eyes{display:none}
[data-luna-mode="happy"] .luna-bear-head{transform:rotate(-2deg)}
[data-luna-animate="true"] .luna-bear-body{animation:luna-bear-breathe 4.6s ease-in-out infinite}
[data-luna-animate="true"] .luna-bear-eye{animation:luna-bear-blink 5.7s ease-in-out infinite}
[data-luna-animate="true"][data-luna-mode="reading"] .luna-bear-gaze{animation:luna-bear-read 2.4s ease-in-out infinite}
[data-luna-animate="true"][data-luna-mode="thinking"] .luna-bear-thought-dot{animation:luna-bear-think 1.3s ease-in-out infinite}
[data-luna-animate="true"][data-luna-mode="responding"] .luna-bear-talk-mouth{animation:luna-bear-talk .55s ease-in-out infinite}
[data-luna-animate="true"][data-luna-mode="responding"] .luna-bear-paw-left{animation:luna-bear-explain 1.7s ease-in-out infinite}
[data-luna-animate="true"][data-luna-mode="happy"] .luna-bear-paw-left{animation:luna-bear-wave 1.1s ease-in-out 3}
[data-luna-animate="true"][data-luna-mode="happy"] .luna-bear-joy{animation:luna-bear-sparkle 1.8s ease-in-out 2}
@keyframes luna-bear-breathe{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes luna-bear-blink{0%,43%,47%,100%{transform:scaleY(1)}45%{transform:scaleY(.06)}}
@keyframes luna-bear-read{0%,100%{transform:translate(-3px,5px)}45%{transform:translate(4px,5px)}55%{transform:translate(-3px,8px)}}
@keyframes luna-bear-think{0%,100%{opacity:.4}50%{opacity:1}}
@keyframes luna-bear-talk{0%,100%{transform:scaleY(.5)}50%{transform:scaleY(1.1)}}
@keyframes luna-bear-explain{0%,100%{transform:rotate(0)}50%{transform:rotate(-4deg)}}
@keyframes luna-bear-wave{0%,100%{transform:rotate(0)}50%{transform:rotate(7deg)}}
@keyframes luna-bear-sparkle{0%,100%{opacity:.45}50%{opacity:1}}
@media(prefers-reduced-motion:reduce){
 [data-luna-animate="true"] .luna-bear-body{animation-name:luna-bear-breathe-gentle;animation-duration:7s}
 [data-luna-animate="true"] .luna-bear-eye{animation-duration:7.5s}
 [data-luna-animate="true"][data-luna-mode="responding"] .luna-bear-paw-left,[data-luna-animate="true"][data-luna-mode="happy"] .luna-bear-paw-left{animation-name:luna-bear-wave-gentle;animation-duration:2.6s}
 [data-luna-animate="true"][data-luna-mode="responding"] .luna-bear-talk-mouth{animation-duration:.9s}
 [data-luna-animate="true"] .luna-bear-thought-dot,[data-luna-animate="true"] .luna-bear-joy{animation-duration:2.5s}
}
@keyframes luna-bear-breathe-gentle{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}
@keyframes luna-bear-wave-gentle{0%,100%{transform:rotate(0)}50%{transform:rotate(2deg)}}
`;
}
