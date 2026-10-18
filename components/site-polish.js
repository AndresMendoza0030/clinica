// Mejoras compartidas que conservan la identidad actual del sitio.
export function SitePolish() {
  return `
    <style>
      html { scroll-behavior: smooth; scroll-padding-top: 5.4rem; }
      body { -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; }
      .material-symbols-outlined {
        font-variation-settings: 'FILL' 0, 'wght' 430, 'GRAD' 0, 'opsz' 24;
        flex-shrink: 0;
        vertical-align: middle;
      }
      a:focus-visible, button:focus-visible {
        outline: 3px solid #e4a15f;
        outline-offset: 3px;
        border-radius: 5px;
      }
      .clinic-image {
        background-size: cover;
        background-position: center;
        background-color: #eadfdf;
      }
      .clinic-lab-visual {
        position: relative;
        isolation: isolate;
        overflow: hidden;
      }
      .clinic-lab-visual::after {
        content: "";
        position: absolute;
        border: 1px solid currentColor;
        opacity: .13;
        width: 168px; height: 168px;
        border-radius: 50%;
        transform: translate(54px, 32px);
        pointer-events: none;
      }
      .clinic-lab-visual > .material-symbols-outlined { z-index: 1; }
      .clinic-lab-card:nth-child(2n) .clinic-lab-visual {
        background: linear-gradient(135deg, #f2f4ff, #e5ebfa);
        color: #526eac;
      }
      .clinic-lab-card:nth-child(3n) .clinic-lab-visual {
        background: linear-gradient(135deg, #f3f9f6, #e3f2e9);
        color: #3f8070;
      }
      .clinic-lab-card:nth-child(5n) .clinic-lab-visual {
        background: linear-gradient(135deg, #fff9f0, #f9eddc);
        color: #a97637;
      }
      @media (prefers-reduced-motion: reduce) {
        html { scroll-behavior: auto; }
        *, *::before, *::after { transition-duration: .01ms !important; animation-duration: .01ms !important; }
      }
    </style>
  `;
}
