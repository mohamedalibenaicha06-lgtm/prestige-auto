/* =========================================================================
   PRESTIGE AUTO — Illustrations vectorielles (provisoires)
   Remplacées automatiquement par vos photos dès qu'un chemin est renseigné
   dans js/data.js. Aucune image externe.
   ========================================================================= */
(function () {
  let uid = 0;

  function shade(hex, pct) {
    const n = parseInt(hex.replace("#", ""), 16);
    let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    const t = pct < 0 ? 0 : 255, p = Math.abs(pct);
    r = Math.round((t - r) * p + r); g = Math.round((t - g) * p + g); b = Math.round((t - b) * p + b);
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  function wheel(cx, cy, id, accent) {
    let spokes = "";
    for (let i = 0; i < 6; i++) spokes += `<rect x="-4" y="-38" width="8" height="26" rx="3" fill="#2a2a2a" transform="rotate(${i * 60})"/>`;
    return `
    <g transform="translate(${cx} ${cy})">
      <g class="bg-wheel">
        <circle r="74" fill="#0d0d0d"/>
        <circle r="70" fill="none" stroke="#1f1f1f" stroke-width="10" stroke-dasharray="9 7"/>
        <circle r="44" fill="#151515"/>
        <circle r="41" fill="none" stroke="url(#rim-${id})" stroke-width="5"/>
        ${spokes}
        <circle r="11" fill="${accent}"/>
      </g>
    </g>`;
  }

  /** Buggy côte à côte, vue de profil. m = { color, accent, max } */
  function buggy(m, opts = {}) {
    const id = "b" + ++uid;
    const base = m.color || "#2f3236";
    const accent = m.accent || "#ff6b1a";
    const long = !!m.max;
    const R = long ? 150 : 200, F = long ? 690 : 640; // roues arrière / avant
    const sx = (F - R) / 440; // étirement du châssis
    const label = opts.title || `Illustration ${m.name || "buggy"}`;
    // Cage : une ou deux sections selon MAX
    const cage = long
      ? `M 130 228 L 185 112 L 470 104 L 520 112 L 585 226 M 185 112 L 160 228 M 330 108 L 330 228 M 470 104 L 455 228`
      : `M 150 228 L 210 112 L 440 104 L 490 112 L 560 226 M 210 112 L 175 228 M 330 108 L 330 228`;
    const roof = long ? `M 178 102 L 520 94 L 515 108 L 182 116 Z` : `M 204 102 L 490 94 L 485 108 L 208 116 Z`;
    return `
<svg class="art buggy-svg ${opts.className || ""}" viewBox="0 0 860 420" role="img" aria-label="${PA.escape(label)}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="body-${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${shade(base, 0.35)}"/><stop offset=".5" stop-color="${base}"/><stop offset="1" stop-color="${shade(base, -0.5)}"/>
    </linearGradient>
    <linearGradient id="rim-${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#e9e9e9"/><stop offset="1" stop-color="#505257"/>
    </linearGradient>
    <radialGradient id="sh-${id}" cx=".5" cy=".5" r=".5">
      <stop offset="0" stop-color="#000" stop-opacity=".7"/><stop offset="1" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <ellipse cx="${(R + F) / 2}" cy="392" rx="${(F - R) / 2 + 150}" ry="16" fill="url(#sh-${id})"/>
  <g class="bg-body">
    <!-- bras de suspension -->
    <path d="M ${R} 318 L ${R + 120} 262 M ${R} 318 L ${R + 135} 286 M ${F} 318 L ${F - 120} 262 M ${F} 318 L ${F - 135} 286" stroke="#1b1b1b" stroke-width="9" stroke-linecap="round"/>
    <path d="M ${R + 15} 300 L ${R + 70} 200 M ${F - 15} 300 L ${F - 70} 205" stroke="${accent}" stroke-width="7" stroke-linecap="round"/>
    <g transform="translate(${R} 0) scale(${sx} 1) translate(-200 0)">
      <!-- cage -->
      <path d="${cage}" stroke="#3d4046" stroke-width="12" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
      <path d="${cage}" stroke="#8a8e96" stroke-width="2.5" fill="none" stroke-linejoin="round" opacity=".55" transform="translate(-2 -3)"/>
      <path d="${roof}" fill="url(#body-${id})"/>
      <!-- caisse -->
      <path d="M 92 262 L 120 222 L 260 214 L 330 230 L 560 226 L 690 238 L 760 262 L 742 284 L 650 286 L 600 300 L 300 302 L 250 286 L 110 284 Z" fill="url(#body-${id})"/>
      <path d="M 560 226 L 690 238 L 760 262 L 700 252 L 600 244 Z" fill="${shade(base, 0.25)}"/>
      <path d="M 300 268 L 600 266 L 594 300 L 304 302 Z" fill="${shade(base, -0.45)}"/>
      <path d="M 330 236 L 556 232" stroke="${accent}" stroke-width="5" stroke-linecap="round"/>
      <path d="M 96 262 L 250 252" stroke="${accent}" stroke-width="4" stroke-linecap="round" opacity=".9"/>
      <!-- sièges -->
      <path d="M 352 228 L 362 160 Q 366 150 378 152 L 388 156 L 384 228 Z" fill="#101010"/>
      ${m.max ? '<path d="M 232 222 L 242 162 Q 246 152 258 154 L 266 158 L 262 222 Z" fill="#101010"/>' : ""}
      <!-- phares -->
      <path d="M 728 252 L 758 258 L 752 266 L 724 260 Z" fill="#fff4dc"/>
      <rect x="100" y="250" width="16" height="9" rx="2" fill="#d63a2a"/>
    </g>
  </g>
  ${wheel(R, 318, id, accent)}
  ${wheel(F, 318, id, accent)}
</svg>`;
  }

  /** Paysage marocain stylisé. type : dunes | mountain | city | plain | night */
  function scene(type = "dunes", opts = {}) {
    const id = "s" + ++uid;
    const night = type === "night";
    const sky = night ? ["#05070f", "#141a33", "#2a1f3a"] : ["#1a0f0a", "#7a2e12", "#ff8a3d"];
    const sun = night
      ? `<circle cx="640" cy="90" r="34" fill="#f3ead6"/><g fill="#fff" opacity=".8">${Array.from({ length: 40 }, (_, i) => `<circle cx="${(i * 97) % 800}" cy="${(i * 53) % 220}" r="${i % 3 ? 1 : 1.8}"/>`).join("")}</g>`
      : `<circle cx="640" cy="235" r="46" fill="#ffd08a" opacity=".9"/>`;
    const layers = {
      dunes: [
        "M0 300 Q 150 230 320 280 T 640 260 T 800 270 V 450 H 0 Z",
        "M0 340 Q 200 290 380 330 T 800 320 V 450 H 0 Z",
        "M0 390 Q 220 350 460 380 T 800 375 V 450 H 0 Z",
      ],
      mountain: [
        "M0 280 L 120 190 L 210 250 L 330 150 L 460 260 L 560 200 L 680 250 L 800 180 V 450 H 0 Z",
        "M0 330 L 150 260 L 290 320 L 420 250 L 600 330 L 800 270 V 450 H 0 Z",
        "M0 390 Q 300 350 800 380 V 450 H 0 Z",
      ],
      city: [
        "M0 330 Q 400 300 800 330 V 450 H 0 Z",
        "M60 330 V 270 H 120 V 330 Z M150 330 V 250 H 170 V 200 H 190 V 250 H 210 V 330 Z M240 330 V 280 H 330 V 330 Z M420 330 V 240 H 440 V 150 L 452 132 L 464 150 V 240 H 484 V 330 Z M520 330 V 275 H 620 V 330 Z M650 330 V 260 H 720 V 330 Z",
        "M0 380 Q 400 360 800 385 V 450 H 0 Z",
      ],
      plain: [
        "M0 300 L 200 280 L 420 295 L 800 270 V 450 H 0 Z",
        "M0 340 Q 400 320 800 345 V 450 H 0 Z",
        "M0 395 Q 400 380 800 400 V 450 H 0 Z",
      ],
      night: [
        "M0 300 Q 150 250 320 290 T 800 280 V 450 H 0 Z",
        "M0 350 Q 250 310 500 345 T 800 340 V 450 H 0 Z",
        "M0 400 Q 300 375 800 400 V 450 H 0 Z",
      ],
    }[type] || [];
    const fills = night ? ["#1b1730", "#120f20", "#09070f"] : ["#a2481b", "#6b2c10", "#2a1208"];
    const extra = night
      ? `<g transform="translate(330 360)"><path d="M0 30 L 40 -20 L 80 30 Z" fill="#2a2130"/><circle cx="110" cy="22" r="10" fill="#ff8a3d"/><circle cx="110" cy="22" r="26" fill="#ff8a3d" opacity=".2"/></g>`
      : "";
    return `
<svg class="art scene-svg ${opts.className || ""}" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${PA.escape(opts.title || "Illustration de paysage")}" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="sky-${id}" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${sky[0]}"/><stop offset=".6" stop-color="${sky[1]}"/><stop offset="1" stop-color="${sky[2]}"/>
  </linearGradient></defs>
  <rect width="800" height="450" fill="url(#sky-${id})"/>
  ${sun}
  ${layers.map((d, i) => `<path d="${d}" fill="${type === "city" && i === 1 ? "#3a1a0c" : fills[i]}"/>`).join("")}
  ${extra}
</svg>`;
  }

  /** Média : photo si fournie, sinon illustration + mention. */
  PA.media = function (src, fallbackHTML, alt) {
    return src
      ? `<img class="photo" src="${PA.escape(src)}" alt="${PA.escape(alt || "")}" loading="lazy" decoding="async">`
      : fallbackHTML;
  };

  PA.buggySVG = buggy;
  PA.sceneSVG = scene;
})();
