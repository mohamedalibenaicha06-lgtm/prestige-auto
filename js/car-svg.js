/* =========================================================================
   PRESTIGE AUTO — Générateur d'illustrations SVG de véhicules
   Aucune photo externe : chaque voiture est dessinée en vectoriel,
   selon sa silhouette (coupé, berline, SUV, cabriolet) et sa teinte.
   ========================================================================= */
(function () {
  let uid = 0;

  function shade(hex, pct) {
    const h = hex.replace("#", "");
    const num = parseInt(h, 16);
    let r = (num >> 16) & 255, g = (num >> 8) & 255, b = num & 255;
    const t = pct < 0 ? 0 : 255;
    const p = Math.abs(pct);
    r = Math.round((t - r) * p + r);
    g = Math.round((t - g) * p + g);
    b = Math.round((t - b) * p + b);
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  // Arcs de roues communs (roue AR cx=185, roue AV cx=610)
  const ARCHES = "L 666 232 A 56 56 0 0 0 554 232 L 241 232 A 56 56 0 0 0 129 232 Z";

  const PROFILES = {
    coupe: {
      body: "M 62 232 L 62 198 Q 66 176 104 168 Q 170 152 240 120 Q 300 96 372 94 L 440 96 Q 500 104 560 140 L 700 156 Q 748 164 752 196 L 754 232 " + ARCHES,
      glass: "M 252 140 Q 302 108 372 103 L 438 104 Q 490 112 535 142 Z",
      pillars: [408],
      shoulder: "M 110 178 Q 400 162 730 178",
      door: "M 380 146 L 372 230",
      light: { x: 728, y: 176 },
      tail: { x: 68, y: 186 },
    },
    sedan: {
      body: "M 62 232 L 60 196 Q 62 170 98 164 L 175 158 Q 215 154 245 148 Q 300 100 370 94 L 470 94 Q 530 98 590 140 L 702 154 Q 748 162 752 194 L 754 232 " + ARCHES,
      glass: "M 262 148 Q 312 110 374 103 L 466 103 Q 520 108 568 144 Z",
      pillars: [412],
      shoulder: "M 105 174 Q 400 158 732 176",
      door: "M 412 150 L 408 230",
      light: { x: 730, y: 174 },
      tail: { x: 66, y: 180 },
    },
    suv: {
      body: "M 60 232 L 58 170 Q 60 140 92 132 L 130 128 Q 160 80 220 76 L 470 74 Q 530 78 588 124 L 700 140 Q 750 150 754 186 L 756 232 " + ARCHES,
      glass: "M 150 128 Q 176 92 226 88 L 466 87 Q 516 92 562 128 Z",
      pillars: [300, 432],
      shoulder: "M 96 160 Q 400 146 736 166",
      door: "M 432 130 L 428 232",
      light: { x: 732, y: 164 },
      tail: { x: 64, y: 160 },
    },
    cabriolet: {
      body: "M 62 232 L 60 198 Q 62 168 100 162 L 330 152 L 470 150 L 520 150 L 700 158 Q 748 166 752 196 L 754 232 " + ARCHES,
      glass: "M 474 152 L 522 110 L 532 112 L 498 152 Z",
      pillars: [],
      shoulder: "M 108 178 Q 400 164 730 180",
      door: "M 350 154 L 344 230",
      light: { x: 728, y: 180 },
      tail: { x: 66, y: 184 },
      extra: '<rect x="352" y="120" width="26" height="34" rx="9" fill="#141414"/><rect x="400" y="124" width="22" height="30" rx="8" fill="#141414"/>',
    },
  };

  function wheel(cx, cy, id) {
    let spokes = "";
    for (let i = 0; i < 5; i++) {
      spokes += `<path d="M 0 -6 L -5 -27 L 5 -27 Z" fill="url(#rim-${id})" transform="rotate(${i * 72})"/>`;
    }
    return `
      <g class="car-wheel" transform="translate(${cx} ${cy})">
        <g class="car-wheel-spin">
          <circle r="45" fill="#0a0a0a"/>
          <circle r="44" fill="none" stroke="#1d1d1d" stroke-width="3"/>
          <circle r="31" fill="#161616"/>
          <circle r="29" fill="none" stroke="url(#rim-${id})" stroke-width="3"/>
          ${spokes}
          <circle r="7" fill="#d4af6a"/>
        </g>
        <path d="M -20 -20 A 28 28 0 0 1 4 -28" stroke="#c9a55c" stroke-width="5" fill="none" opacity=".9"/>
      </g>`;
  }

  /**
   * @param {object} v véhicule (body, hex)
   * @param {object} [opts] { className, title }
   */
  function carSVG(v, opts = {}) {
    const p = PROFILES[v.body] || PROFILES.coupe;
    const id = "c" + ++uid;
    const base = v.hex || "#333333";
    const top = shade(base, 0.35);
    const bottom = shade(base, -0.55);
    const title = opts.title || `Illustration ${v.brand || ""} ${v.model || ""}`.trim();
    const pillars = p.pillars
      .map((x) => `<line x1="${x}" y1="80" x2="${x - 4}" y2="156" stroke="${shade(base, -0.3)}" stroke-width="9"/>`)
      .join("");

    return `
<svg class="car-svg ${opts.className || ""}" viewBox="0 0 800 300" role="img" aria-label="${PA.escape(title)}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="body-${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${top}"/>
      <stop offset=".45" stop-color="${base}"/>
      <stop offset="1" stop-color="${bottom}"/>
    </linearGradient>
    <linearGradient id="glass-${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#3a4250"/>
      <stop offset=".5" stop-color="#11151c"/>
      <stop offset="1" stop-color="#05070a"/>
    </linearGradient>
    <linearGradient id="rim-${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#f2f2f2"/>
      <stop offset=".5" stop-color="#8d8f94"/>
      <stop offset="1" stop-color="#3a3b3e"/>
    </linearGradient>
    <linearGradient id="sheen-${id}" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#fff" stop-opacity="0"/>
      <stop offset=".5" stop-color="#fff" stop-opacity=".35"/>
      <stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="shadow-${id}" cx=".5" cy=".5" r=".5">
      <stop offset="0" stop-color="#000" stop-opacity=".75"/>
      <stop offset="1" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
    <clipPath id="clip-${id}"><path d="${p.body}"/></clipPath>
    <clipPath id="gclip-${id}"><path d="${p.glass}"/></clipPath>
  </defs>
  <ellipse cx="408" cy="272" rx="380" ry="16" fill="url(#shadow-${id})"/>
  <g class="car-body">
    <path d="${p.body}" fill="url(#body-${id})"/>
    <path d="${p.glass}" fill="url(#glass-${id})"/>
    <g clip-path="url(#gclip-${id})">${pillars}</g>
    ${p.extra || ""}
    <g clip-path="url(#clip-${id})">
      <rect class="car-sheen" x="-200" y="60" width="160" height="200" fill="url(#sheen-${id})" transform="skewX(-20)"/>
    </g>
    <path d="${p.shoulder}" stroke="#fff" stroke-opacity=".28" stroke-width="2" fill="none"/>
    <path d="${p.door}" stroke="${shade(base, -0.45)}" stroke-width="2" fill="none"/>
    <line x1="245" y1="226" x2="550" y2="226" stroke="${shade(base, -0.7)}" stroke-width="8" stroke-linecap="round"/>
    <line x1="250" y1="214" x2="545" y2="214" stroke="#c9a55c" stroke-width="1.5" opacity=".7"/>
    <path d="M ${p.light.x - 24} ${p.light.y - 6} L ${p.light.x + 18} ${p.light.y - 2} L ${p.light.x + 14} ${p.light.y + 8} L ${p.light.x - 20} ${p.light.y + 4} Z" fill="#fff6dc"/>
    <rect x="${p.tail.x - 4}" y="${p.tail.y - 6}" width="16" height="12" rx="3" fill="#c0262d"/>
  </g>
  ${wheel(185, 226, id)}
  ${wheel(610, 226, id)}
</svg>`;
  }

  window.PA = window.PA || {};
  PA.carSVG = carSVG;
  PA.shade = shade;
})();
