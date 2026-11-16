/* =========================================================================
   BEST OF PINS — Script commun (en-tête, pied de page, animations)
   ========================================================================= */
(function () {
  const page = document.body.dataset.page || "";
  const links = [
    ["index.html", "Accueil", "home"],
    ["achat.html", "Achat", "achat"],
    ["vente.html", "Vente", "vente"],
    ["raids.html", "Raids & Randonnées", "raids"],
    ["videos.html", "Vidéos", "videos"],
    ["contact.html", "Contact", "contact"],
  ];

  const waIcon =
    '<svg viewBox="0 0 24 24" aria-hidden="true" width="22" height="22"><path fill="currentColor" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91A9.85 9.85 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23a8.2 8.2 0 0 1 8.23 8.24c0 4.54-3.7 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48a.92.92 0 0 0-.67.31c-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.08.15-1.18-.06-.11-.23-.17-.48-.29Z"/></svg>';
  PA.waIcon = waIcon;

  /* ---------- En-tête ---------- */
  const header = document.getElementById("site-header");
  if (header) {
    header.innerHTML = `
      <div class="header-inner container">
        <a class="logo" href="index.html" aria-label="BEST OF PINS — accueil">
          <img class="logo-img" src="media/logo.webp" alt="BEST OF PINS" width="936" height="501">
        </a>
        <nav class="main-nav" id="main-nav" aria-label="Navigation principale">
          <ul>
            ${links
              .map(
                ([href, label, key]) =>
                  `<li><a href="${href}" class="${key === page ? "active" : ""}" ${key === page ? 'aria-current="page"' : ""}>${label}</a></li>`
              )
              .join("")}
          </ul>
          <a class="btn btn-wa btn-sm nav-cta js-wa" href="#" target="_blank" rel="noopener">WhatsApp</a>
        </nav>
        <button class="burger" id="burger" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="main-nav">
          <span></span><span></span><span></span>
        </button>
      </div>`;

    const burger = document.getElementById("burger");
    const nav = document.getElementById("main-nav");
    const toggle = (open) => {
      document.body.classList.toggle("nav-open", open);
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    };
    burger.addEventListener("click", () => toggle(!document.body.classList.contains("nav-open")));
    nav.addEventListener("click", (e) => { if (e.target.closest("a")) toggle(false); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") toggle(false); });

    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function creditsHTML() {
    const list = Object.values(window.PHOTOS || {}).filter((p) => !p.own);
    if (!list.length) return "";
    return `<div class="container"><details class="credits"><summary>Crédits photos</summary><ul>${list
      .map((p) => `<li>${PA.escape(p.title)} — ${PA.escape(p.author)}, <a href="${PA.escape(p.licenseUrl)}" target="_blank" rel="noopener">${PA.escape(p.license)}</a>, via <a href="${PA.escape(p.source)}" target="_blank" rel="noopener">Wikimedia Commons</a>${p.edited ? " (recadrée et compressée)" : ""}</li>`)
      .join("")}</ul></details></div>`;
  }

  /* ---------- Pied de page ---------- */
  const footer = document.getElementById("site-footer");
  if (footer) {
    const c = window.SITE_CONFIG;
    const coords = [c.address, c.phone, c.email].filter(Boolean);
    footer.innerHTML = `
      <div class="container footer-grid">
        <div>
          <a class="logo" href="index.html"><img class="logo-img logo-img-lg" src="media/logo.webp" alt="BEST OF PINS" width="936" height="501" loading="lazy"></a>
          <p class="muted footer-about">${PA.escape(c.tagline)}</p>
        </div>
        <div>
          <h4>Navigation</h4>
          <ul>${links.map(([h, l]) => `<li><a href="${h}">${l}</a></li>`).join("")}</ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul class="muted">
            ${coords.length ? coords.map((x) => `<li>${PA.escape(x)}</li>`).join("") : "<li>Coordonnées à venir</li>"}
            <li><a class="js-wa" href="#" target="_blank" rel="noopener">Écrire sur WhatsApp</a></li>
          </ul>
        </div>
      </div>
      ${creditsHTML()}
      <div class="container footer-bottom">
        <p>© ${new Date().getFullYear()} BEST OF PINS. Can-Am, Maverick et Rotax sont des marques de BRP ; site indépendant, non affilié à BRP. Annonces présentées à titre d'exemple.</p>
      </div>`;
  }

  /* ---------- Bouton WhatsApp flottant ---------- */
  if (!document.querySelector(".wa-float")) {
    const wa = document.createElement("a");
    wa.className = "wa-float";
    wa.href = PA.waLink();
    wa.target = "_blank";
    wa.rel = "noopener";
    wa.setAttribute("aria-label", "Nous écrire sur WhatsApp");
    wa.innerHTML = waIcon + '<span class="wa-float-label">WhatsApp</span>';
    document.body.appendChild(wa);
  }

  /* ---------- Transitions de page ---------- */
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  requestAnimationFrame(() => document.body.classList.add("is-loaded"));
  window.addEventListener("pageshow", () => {
    document.body.classList.remove("is-leaving");
    document.body.classList.add("is-loaded");
  });
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a || reduced) return;
    const href = a.getAttribute("href");
    if (!href || href.startsWith("#") || a.target === "_blank" || e.metaKey || e.ctrlKey || e.shiftKey) return;
    if (/^(https?:|mailto:|tel:)/.test(href)) return;
    e.preventDefault();
    document.body.classList.add("is-leaving");
    setTimeout(() => (window.location.href = href), 320);
  });

  /* ---------- Apparition au défilement ---------- */
  PA.observeReveal = function (root = document) {
    const els = root.querySelectorAll(".reveal:not(.in)");
    if (!("IntersectionObserver" in window) || reduced) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
  };

  /* ---------- Compteurs animés ---------- */
  PA.observeCounters = function () {
    const els = document.querySelectorAll("[data-count]");
    const run = (el) => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || "";
      if (reduced) { el.textContent = target.toLocaleString("fr-FR") + suffix; return; }
      const start = performance.now();
      const dur = 1600;
      const step = (t) => {
        const k = Math.min(1, (t - start) / dur);
        const eased = 1 - Math.pow(1 - k, 3);
        el.textContent = Math.round(target * eased).toLocaleString("fr-FR") + suffix;
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if (!("IntersectionObserver" in window)) return els.forEach(run);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { run(en.target); io.unobserve(en.target); }
      });
    }, { threshold: 0.5 });
    els.forEach((el) => io.observe(el));
  };

  /* ---------- Carte modèle (annonce d'exemple) ---------- */
  /* ---------- Showroom : buggy seul sur fond anthracite ---------- */
  // Photo détourée (m.cutout) si fournie, sinon illustration vectorielle.
  PA.carVisual = function (m, eager) {
    const src = m.views && m.views.length ? m.views[0] : m.cutout;
    return src
      ? `<img class="car-cutout" src="${PA.escape(src)}" alt="${PA.escape(m.name)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`
      : `<div class="car-cutout car-art">${PA.buggySVG(m, { title: "Illustration " + m.name + " (photo détourée à venir)" })}</div>`;
  };

  // Vue 360° : tourne au doigt / à la souris / au clavier si m.views contient assez de photos.
  PA.spin360 = function (el, frames) {
    const ok = !!frames && frames.length >= 8;
    el.classList.toggle("is-360", ok);
    el._frames = ok ? frames : null;
    if (!ok) { el.removeAttribute("tabindex"); return false; }
    frames.forEach((f) => (new Image().src = f)); // préchargement
    el.tabIndex = 0;
    el.setAttribute("aria-label", "Vue 360° : faites glisser ou utilisez les flèches");
    el._i = 0;
    if (el._spin) return true;
    el._spin = true;
    let x0 = 0, i0 = 0, down = false;
    const set = (n) => {
      const f = el._frames; if (!f) return;
      el._i = ((n % f.length) + f.length) % f.length;
      el.querySelector("img.car-cutout").src = f[el._i];
    };
    el.addEventListener("pointerdown", (e) => { if (!el._frames) return; down = true; x0 = e.clientX; i0 = el._i; el.setPointerCapture(e.pointerId); el.classList.add("grabbing"); });
    el.addEventListener("pointermove", (e) => { if (down) set(i0 - Math.round((e.clientX - x0) / (el.clientWidth / el._frames.length / 1.5))); });
    const up = () => { down = false; el.classList.remove("grabbing"); };
    el.addEventListener("pointerup", up); el.addEventListener("pointercancel", up);
    el.addEventListener("keydown", (e) => { if (e.key === "ArrowLeft") set(el._i - 1); if (e.key === "ArrowRight") set(el._i + 1); });
    return true;
  };

  // Sélecteur de modèles façon showroom (Accueil + Achat)
  PA.showroom = function (root) {
    const ms = window.MODELS;
    root.innerHTML = `
      <div class="sr-tabs" role="tablist" aria-label="Choisir un modèle">${ms
        .map((m, i) => `<button type="button" role="tab" class="sr-tab" aria-selected="${!i}" data-i="${i}"><b>${PA.escape(m.short)}</b><span>${m.seats} places</span></button>`)
        .join("")}</div>
      <div class="sr-main">
        <div class="sr-stage" role="tabpanel">
          <span class="stage-word" aria-hidden="true"></span>
          <div class="sr-drive"><div class="sr-car"></div></div>
          <div class="sr-floor" aria-hidden="true"></div>
          <p class="sr-hint"></p>
        </div>
        <div class="sr-info"></div>
      </div>`;
    const stage = root.querySelector(".sr-stage"), car = root.querySelector(".sr-car"), info = root.querySelector(".sr-info");
    let cur = -1;
    function show(i) {
      if (i === cur) return;
      const m = ms[i], dir = i > cur ? 1 : -1;
      cur = i;
      root.querySelectorAll(".sr-tab").forEach((t, j) => t.setAttribute("aria-selected", String(j === i)));
      stage.style.setProperty("--dir", dir);
      stage.classList.remove("in"); void stage.offsetWidth;
      stage.querySelector(".stage-word").textContent = m.short;
      car.innerHTML = PA.carVisual(m, i === 0);
      const is360 = PA.spin360(stage, m.views);
      root.querySelector(".sr-hint").textContent = is360 ? "↔ Faites glisser pour tourner autour" : "Vue 360° bientôt disponible";
      stage.classList.add("in");
      info.innerHTML = `
        <p class="car-brand">Can-Am · ${PA.escape(m.family)} · ${m.year}</p>
        <h3 class="sr-name">${PA.escape(m.name)}</h3>
        <p class="muted">${PA.escape(m.tagline)}</p>
        <ul class="sr-specs">
          <li><b>${m.key.power}</b><span>Puissance</span></li>
          <li><b>${m.key.travel}</b><span>Débattement</span></li>
          <li><b>${m.key.clearance}</b><span>Garde au sol</span></li>
          <li><b>${m.key.weight}</b><span>Poids à sec</span></li>
        </ul>
        <p class="sr-status">${m.available ? PA.escape(m.price || "Prix sur demande") : "Exemple — non disponible à la vente"}</p>
        <div class="card-actions">
          <a class="btn btn-gold" href="achat.html#${m.id}">Fiche complète <span class="arrow">→</span></a>
          <a class="btn btn-outline" href="${PA.waLink("Bonjour BEST OF PINS, je souhaite des informations sur le " + m.name + ".")}" target="_blank" rel="noopener">WhatsApp</a>
        </div>`;
    }
    root.querySelector(".sr-tabs").addEventListener("click", (e) => { const t = e.target.closest(".sr-tab"); if (t) show(+t.dataset.i); });
    root.querySelector(".sr-tabs").addEventListener("keydown", (e) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      const n = (cur + (e.key === "ArrowRight" ? 1 : -1) + ms.length) % ms.length;
      show(n); root.querySelectorAll(".sr-tab")[n].focus();
    });
    // Glisser horizontalement sur la scène = modèle suivant (sauf en mode 360°)
    let sx = null;
    stage.addEventListener("pointerdown", (e) => { if (!stage.classList.contains("is-360")) sx = e.clientX; });
    stage.addEventListener("pointerup", (e) => {
      if (sx === null) return;
      const d = e.clientX - sx; sx = null;
      if (Math.abs(d) > 50) show((cur + (d < 0 ? 1 : -1) + ms.length) % ms.length);
    });
    show(0);
  };

  PA.modelCard = function (m) {
    const info = `Bonjour BEST OF PINS, je souhaite des informations sur le ${m.name}.`;
    return `
      <article class="car-card reveal zoom" id="${m.id}">
        <div class="car-card-stage">
          <span class="badge">${m.year}</span>
          <span class="badge badge-fuel">${m.seats} places</span>
          <span class="stage-word" aria-hidden="true">${PA.escape(m.short)}</span>
          ${PA.carVisual(m)}
          ${m.available ? "" : '<span class="sample-flag">Exemple — non disponible à la vente</span>'}
        </div>
        <div class="car-card-body">
          <p class="car-brand">Can-Am · ${PA.escape(m.family)}</p>
          <h3 class="car-model">${PA.escape(m.name)}</h3>
          <p class="muted card-tagline">${PA.escape(m.tagline)}</p>
          <ul class="key-list">
            <li><b>${m.key.power}</b><span>Puissance</span></li>
            <li><b>${m.key.travel}</b><span>Débattement av./arr.</span></li>
            <li><b>${m.key.clearance}</b><span>Garde au sol</span></li>
            <li><b>${m.key.weight}</b><span>Poids à sec</span></li>
          </ul>
          <details class="specs">
            <summary>Fiche technique complète</summary>
            <table class="spec-table"><tbody>${m.specs.map(([k, v]) => `<tr><th scope="row">${PA.escape(k)}</th><td>${PA.escape(v)}</td></tr>`).join("")}</tbody></table>
            <p class="spec-source">Source : <a href="${m.official}" target="_blank" rel="noopener">fiche officielle Can-Am</a> · <a href="${m.specSheet}" target="_blank" rel="noopener">fiche PDF</a>. Modèle ${m.year}, Canada ; peut varier selon le marché.</p>
          </details>
          ${m.available ? `<p class="car-price">${PA.escape(m.price || "Prix sur demande")}</p>` : ""}
          <div class="card-actions">
            <a class="btn btn-gold" href="contact.html?sujet=achat&amp;modele=${encodeURIComponent(m.id)}">Demander des informations</a>
            <a class="btn btn-outline btn-icon" href="${PA.waLink(info)}" target="_blank" rel="noopener" aria-label="Demander sur WhatsApp">${waIcon}</a>
          </div>
        </div>
      </article>`;
  };

  /* ---------- Photos sous licence libre (voir PHOTOS dans data.js) ---------- */
  PA.photo = (key) => (window.PHOTOS || {})[key] || null;
  PA.photoHTML = function (key, fallback, eager) {
    const ph = PA.photo(key);
    if (!ph) return fallback;
    const img = `<img class="photo" src="${PA.escape(ph.src)}" alt="${PA.escape(ph.alt || "")}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
    // Photo paysage sur écran large, portrait sur téléphone
    return ph.wide ? `<picture class="photo-pic"><source media="(min-aspect-ratio: 1/1)" srcset="${PA.escape(ph.wide)}">${img}</picture>` : img;
  };

  /* ---------- Fonds : photo si disponible, sinon illustration ---------- */
  document.querySelectorAll("[data-scene], [data-photo]").forEach((el) => {
    if (el.innerHTML.trim()) return;
    el.innerHTML = PA.photoHTML(el.dataset.photo, el.dataset.scene ? PA.sceneSVG(el.dataset.scene) : "", el.dataset.eager !== undefined);
    if (PA.photo(el.dataset.photo)) el.classList.add("is-photo");
  });

  /* ---------- Compte à rebours ---------- */
  document.querySelectorAll("[data-countdown]").forEach((el) => {
    const target = new Date(el.dataset.countdown).getTime();
    const labels = el.dataset.long ? ["Jours", "Heures", "Minutes", "Secondes"] : ["Jours", "Heures", "Min", "Sec"];
    let timer;
    const tick = () => {
      let d = Math.max(0, target - Date.now());
      if (!d && el.dataset.done) { el.innerHTML = `<p class="countdown-done">${PA.escape(el.dataset.done)}</p>`; clearInterval(timer); return; }
      const parts = [[labels[0], 864e5], [labels[1], 36e5], [labels[2], 6e4], [labels[3], 1e3]].map(([l, ms]) => {
        const v = Math.floor(d / ms); d -= v * ms; return [l, v];
      });
      el.innerHTML = parts.map(([l, v]) => `<div><b>${String(v).padStart(2, "0")}</b><span>${l}</span></div>`).join("");
    };
    tick();
    timer = setInterval(tick, 1000);
  });

  /* ---------- Voitures de l'intro : images réelles si renseignées (HERO_CARS) ---------- */
  document.querySelectorAll(".tow-car[data-car]").forEach((el) => {
    const src = (window.HERO_CARS || [])[+el.dataset.car];
    if (src) el.innerHTML = `<img src="${PA.escape(src)}" alt="" decoding="async">`;
  });

  /* ---------- Profondeur légère sur les grandes images ---------- */
  const para = [...document.querySelectorAll(".hero-bg, .raid-hero-bg")];
  if (para.length && !reduced) {
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y < window.innerHeight * 1.2) para.forEach((el) => (el.style.translate = `0 ${y * 0.25}px`));
        ticking = false;
      });
    }, { passive: true });
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".js-wa").forEach((a) => { if (!a.dataset.msg) a.href = PA.waLink(); });
    PA.observeReveal();
    PA.observeCounters();
  });
})();
