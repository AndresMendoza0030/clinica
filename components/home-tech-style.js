import { Footer } from './footer.js';
import { Header } from './header.js';

export function HomeTechHeader() { return Header('home'); }

export function HomeTechFooter() { return Footer(); }

export function HomeTechStyle() {
  return `
  <style>
    :root {
      --th-night: #0a131d;
      --th-night-2: #111e2a;
      --th-slate: #263440;
      --th-ink: #16232d;
      --th-red: #9d2320;
      --th-red-hover: #bb312b;
      --th-border: #dce2e6;
      --th-paper: #f6f8f9;
      --th-secondary: #67727c;
      --th-font: "Manrope", "Segoe UI", Arial, sans-serif;
      --th-mono: "IBM Plex Mono", monospace;
    }
    *, *::before, *::after { box-sizing:border-box; }
    html { scroll-behavior:smooth; scroll-padding-top:88px; }
    body.th-body { margin:0; background:#fff; color:var(--th-ink); font:400 15px/1.65 var(--th-font); -webkit-font-smoothing:antialiased; overflow-x:hidden; }
    .th-body a { text-decoration:none; color:inherit; }
    .th-body a:focus-visible, .th-body button:focus-visible { outline:3px solid #e9938c; outline-offset:4px; }
    .th-shell { width:min(100% - 100px, 1390px); margin-inline:auto; }
    .th-home-hero { position:relative; isolation:isolate; min-height:615px; overflow:hidden; background-color:#13202d; display:flex; align-items:center; color:white; }
    .th-home-hero::before { content:""; position:absolute; inset:0; z-index:-1; background:linear-gradient(90deg,rgba(5,15,23,.97) 0%,rgba(6,17,26,.92) 31%,rgba(7,20,29,.55) 54%,rgba(4,14,24,.10) 82%),linear-gradient(0deg,rgba(2,12,19,.26),transparent 50%); }
    .th-hero-photo { position:absolute; inset:0; z-index:-2; background-image:url("https://lwjusnpkibgoxkcvrvww.supabase.co/storage/v1/object/public/ClinicaIMG/Resonancia%20magnetica.png"); background-size:cover; background-position:center 46%; filter:saturate(.75) contrast(1.08); }
    .th-hero-photo::after { content:""; position:absolute; inset:0; background:linear-gradient(90deg,#0c1b29 0%,transparent 70%); }
    .th-hero-content { position:relative; padding-block:88px 105px; }
    .th-kicker { display:flex; align-items:center; gap:13px; color:#d3dfe8; font-family:var(--th-mono); font-size:10.5px; letter-spacing:.17em; font-weight:500; text-transform:uppercase; }
    .th-kicker::before { content:""; flex:none; width:31px; height:2px; background:var(--th-red-hover); }
    .th-home-hero h1 { font-size:clamp(45px,5.1vw,76px); line-height:1.095; font-weight:700; letter-spacing:-.048em; margin:22px 0 20px; max-width:680px; text-wrap:balance; }
    .th-hero-lead { font-size:clamp(14px,1.3vw,18px); line-height:1.75; color:#dfebf2; max-width:570px; margin:0; font-weight:450; }
    .th-actions { display:flex; flex-wrap:wrap; gap:13px; margin-top:31px; }
    .th-button { display:inline-flex; align-items:center; justify-content:center; gap:21px; min-height:52px; padding:14px 22px; border-radius:3px; font-weight:760; font-size:12px; letter-spacing:.04em; transition:transform .2s, background .2s, border-color .2s; }
    .th-button:hover { transform:translateY(-2px); }
    .th-button-primary { background:var(--th-red); color:#fff!important; }
    .th-button-primary:hover { background:var(--th-red-hover); }
    .th-button-outline { border:1px solid #91a2ad; color:white!important; }
    .th-button-outline:hover { background:#ffffff15; border-color:#fff; }
    .th-arrow { font-family:Arial,sans-serif; font-size:21px; font-weight:400; line-height:1; }
    .th-hero-proof { margin-top:60px; display:flex; align-items:stretch; gap:0; }
    .th-proof { display:flex; flex-direction:column; gap:6px; padding:0 24px; border-left:1px solid rgba(215,229,239,.38); min-width:139px; }
    .th-proof:first-child { padding-left:0; border-left:0; }
    .th-proof strong { font-size:12px; line-height:1.3; font-weight:800; letter-spacing:.06em; }
    .th-proof span { color:#aebecb; text-transform:uppercase; font:500 9px/1.4 var(--th-mono); letter-spacing:.12em; }
    .th-photo-note { position:absolute; right:26px; bottom:20px; z-index:1; color:#d5dee4; background:#09151ca8; padding:5px 9px; font:500 10px/1.5 var(--th-mono); letter-spacing:.06em; }
    .th-modality-strip { display:grid; grid-template-columns:repeat(6,minmax(0,1fr)); background:#0e1a26; border-top:1px solid #32414b; border-bottom:1px solid #263541; color:#fff; }
    .th-modality { position:relative; display:flex; flex-direction:column; justify-content:space-between; min-height:218px; padding:23px 22px 19px; overflow:hidden; border-right:1px solid #ffffff4a; isolation:isolate; }
    .th-modality:last-child { border-right:0; }
    .th-modality img { position:absolute; z-index:-2; inset:0; width:100%; height:100%; object-fit:cover; filter:saturate(.60) brightness(.72); transition:transform .35s,filter .35s; }
    .th-modality::after { content:""; position:absolute; inset:0; z-index:-1; background:linear-gradient(90deg,rgba(4,17,26,.86),rgba(5,17,26,.31)),linear-gradient(0deg,rgba(4,12,19,.70),transparent 65%); transition:background .2s; }
    .th-modality:hover img { transform:scale(1.06); filter:saturate(.86) brightness(.87); }
    .th-modality:hover::after { background:linear-gradient(90deg,rgba(4,17,26,.72),rgba(5,17,26,.15)),linear-gradient(0deg,rgba(4,12,19,.60),transparent 65%); }
    .th-modality--lab::after { background:linear-gradient(90deg,rgba(105,17,19,.95),rgba(65,16,20,.54)); }
    .th-modality-number { font:500 10px var(--th-mono); color:#c0cbd2; letter-spacing:.15em; }
    .th-modality h2 { font-size:clamp(14px,1.45vw,19px); letter-spacing:-.028em; line-height:1.22; font-weight:730; margin:0 0 10px; max-width:205px; }
    .th-modality p { font-size:11.5px; line-height:1.53; color:#d4dfe5; margin:0; max-width:185px; }
    .th-modality-link { display:inline-block; margin-top:12px; font-size:22px; line-height:1; font-family:Arial,sans-serif; }
    .th-section-label { display:flex; align-items:center; gap:11px; color:var(--th-red); letter-spacing:.19em; font:600 10px/1.4 var(--th-mono); text-transform:uppercase; }
    .th-section-label::after { content:""; width:30px; height:1px; background:currentColor; }
    .th-institution { background:#f7f9fa; padding:88px 0 94px; }
    .th-institution-grid { display:grid; grid-template-columns:minmax(0,1.02fr) minmax(0,.98fr); gap:clamp(40px,5vw,84px); align-items:center; }
    .th-headline { font-size:clamp(34px,3.5vw,52px); line-height:1.15; letter-spacing:-.045em; font-weight:720; color:#1b2932; margin:18px 0 21px; }
    .th-body-copy { color:#596772; font-size:14.5px; line-height:1.85; max-width:595px; margin:0 0 18px; }
    .th-inline-link { display:inline-flex; align-items:center; gap:13px; color:var(--th-red)!important; font-size:12px; font-weight:780; letter-spacing:.025em; border-bottom:1px solid #beaaa9; padding-bottom:7px; }
    .th-inline-link:hover { color:#bf2927!important; }
    .th-facts { display:grid; grid-template-columns:repeat(3,1fr); margin-top:38px; border-top:1px solid #d2dade; padding-top:25px; }
    .th-fact { padding:0 22px; border-left:1px solid #d2dade; }
    .th-fact:first-child { padding-left:0; border-left:0; }
    .th-fact strong { display:block; color:#1b2a34; letter-spacing:-.04em; font-size:clamp(19px,2vw,30px); line-height:1.2; }
    .th-fact span { display:block; margin-top:5px; color:#6b7780; font:500 10px/1.6 var(--th-mono); text-transform:uppercase; letter-spacing:.035em; }
    .th-institution-image { position:relative; overflow:hidden; aspect-ratio:1.18; background:#cdd6da; }
    .th-institution-image img { width:100%; height:100%; display:block; object-fit:cover; object-position:center; }
    .th-lab-feature { display:grid; grid-template-columns:1fr 1fr; min-height:358px; background:#e8eff3; overflow:hidden; }
    .th-lab-image { position:relative; overflow:hidden; background:#b6c6d1; }
    .th-lab-image img { width:100%; height:100%; object-fit:cover; position:absolute; inset:0; filter:saturate(.7); }
    .th-lab-image span { position:absolute; bottom:18px; left:25px; font:500 10px var(--th-mono); background:#0d1b27b5; color:#fff; padding:6px 9px; }
    .th-lab-content { padding:58px clamp(30px,6vw,105px); display:flex; flex-direction:column; justify-content:center; align-items:flex-start; }
    .th-lab-content h2 { font-size:clamp(33px,3vw,47px); font-weight:750; line-height:1.16; letter-spacing:-.044em; margin:18px 0 17px; }
    .th-lab-content p { margin:0 0 22px; max-width:450px; color:#586772; line-height:1.8; font-size:14px; }
    @media(max-width:1190px) {
      .th-shell { width:min(100% - 64px,1390px); }
      .th-modality { padding:20px 16px; }
    }
    @media(max-width:980px) {
      .th-home-hero { min-height:585px; }
      .th-hero-photo { background-position:62% center; }
      .th-modality-strip { grid-template-columns:repeat(3,minmax(0,1fr)); }
      .th-modality { min-height:210px; }
      .th-institution-grid { grid-template-columns:1fr 1fr; gap:32px; }
      .th-fact { padding-inline:11px; }
    }
    @media(max-width:670px) {
      .th-shell { width:calc(100% - 38px); }
      .th-home-hero { min-height:595px; }
      .th-home-hero::before { background:linear-gradient(90deg,rgba(5,15,23,.93),rgba(5,15,23,.76) 62%,rgba(5,15,23,.48)); }
      .th-hero-photo { background-position:64% center; }
      .th-hero-content { padding:74px 0 85px; }
      .th-home-hero h1 { font-size:clamp(40px,9vw,56px); max-width:540px; }
      .th-hero-proof { margin-top:42px; flex-wrap:wrap; row-gap:18px; }
      .th-proof { padding:0 14px; min-width:125px; }
      .th-proof:first-child { padding-left:0; }
      .th-modality-strip { grid-template-columns:repeat(2,minmax(0,1fr)); }
      .th-modality { min-height:195px; padding:18px; }
      .th-modality h2 { font-size:17px; }
      .th-institution { padding:65px 0; }
      .th-institution-grid { grid-template-columns:1fr; gap:35px; }
      .th-institution-image { aspect-ratio:1.35; }
      .th-lab-feature { grid-template-columns:1fr; }
      .th-lab-image { min-height:245px; }
      .th-lab-content { padding:47px 24px 50px; }
    }
    @media(max-width:395px) {
      .th-home-hero h1 { font-size:37px; }
      .th-actions { flex-direction:column; align-items:stretch; }
      .th-proof { padding-inline:10px; min-width:auto; }
      .th-modality { min-height:188px; padding:15px; }
      .th-modality h2 { font-size:15px; }
      .th-modality p { font-size:11px; }
      .th-facts { gap:9px; }
      .th-fact { padding-inline:9px; }
      .th-fact strong { font-size:19px; }
    }
    @media(prefers-reduced-motion:reduce) {
      html { scroll-behavior:auto; }
      .th-body *, .th-body *::before, .th-body *::after { transition:none!important; animation:none!important; }
    }
  </style>
  `;
}
