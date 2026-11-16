/* PRESTIGE AUTO — Accueil, Achat, Raids & Randonnées, Vidéos */
(function () {
  const $ = (id) => document.getElementById(id);
  const cfg = window.SITE_CONFIG;

  /* ---------- Accueil ---------- */
  if ($("hero-bg")) {
    const ph = PA.photo("hero");
    if (ph || cfg.heroPhoto) {
      $("hero-bg").innerHTML = ph ? PA.photoHTML("hero") : PA.media(cfg.heroPhoto, "", "Buggy Can-Am en action");
      const hero = document.querySelector(".hero");
      hero.classList.add("has-photo");
      if (ph && ph.focus) hero.style.setProperty("--focus", ph.focus);
      if (ph) hero.insertAdjacentHTML("beforeend", `<p class="photo-credit">Photo : ${PA.escape(ph.author)} · <a href="${PA.escape(ph.licenseUrl)}" target="_blank" rel="noopener">${PA.escape(ph.license)}</a></p>`);
      $("hero-car").remove();
    } else {
      $("hero-bg").innerHTML = PA.sceneSVG("dunes");
      $("hero-car").innerHTML = PA.buggySVG(MODELS[0], { title: "Illustration d'un buggy Can-Am Maverick X3" });
    }
  }

  /* ---------- Achat ---------- */
  if ($("models")) {
    $("models").innerHTML = MODELS.map(PA.modelCard).join("");
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 300);
    }
  }

  /* ---------- Raids ---------- */
  if ($("gallery")) {
    const r = RAIDS.main;
    const g = RAIDS.gallery;
    $("raid-visual").innerHTML = PA.photoHTML("raid2", PA.media(g[0] && g[0].src, PA.sceneSVG("dunes", { title: "Illustration : dunes du Maroc" }), r.name));
    const top = $("raid-wa-top"); if (top) top.href = PA.waLink(`Bonjour PRESTIGE AUTO, je souhaite me renseigner sur le ${r.name} (${r.dates}, ${r.place}).`);
    $("raid-wa").href = PA.waLink(`Bonjour PRESTIGE AUTO, je souhaite me renseigner sur le ${r.name} (${r.dates}, ${r.place}).`);

    const art = (it) => PA.photoHTML(it.photo, PA.media(it.src, PA.sceneSVG(it.scene, { title: "Illustration : " + it.caption }), it.caption));
    $("gallery").innerHTML = g
      .map(
        (it, i) => `
        <button type="button" class="gallery-item reveal" data-i="${i}" aria-label="Agrandir : ${PA.escape(it.caption)}">
          ${art(it)}
          <span class="gallery-caption">${PA.escape(it.caption)}${it.src || PA.photo(it.photo) ? "" : " <small>· photo à venir</small>"}</span>
        </button>`
      )
      .join("");

    const box = $("lightbox");
    $("gallery").addEventListener("click", (e) => {
      const btn = e.target.closest(".gallery-item");
      if (!btn) return;
      const it = g[+btn.dataset.i];
      $("lightbox-media").innerHTML = art(it);
      $("lightbox-caption").textContent = it.caption;
      if (box.showModal) box.showModal(); else box.setAttribute("open", "");
    });
    const close = () => (box.close ? box.close() : box.removeAttribute("open"));
    box.querySelector(".lightbox-close").addEventListener("click", close);
    box.addEventListener("click", (e) => { if (e.target === box) close(); });
  }

  /* ---------- Vidéos ---------- */
  if ($("videos")) {
    const cats = ["Toutes", ...new Set(VIDEOS.map((v) => v.category))];
    const sceneFor = { Buggys: "dunes", Randonnées: "mountain", Raids: "night" };
    $("video-filters").innerHTML = cats
      .map((c, i) => `<label class="chip"><input type="radio" name="vcat" value="${PA.escape(c)}" ${i ? "" : "checked"}><span>${PA.escape(c)}</span></label>`)
      .join("");

    const card = (v, i) => {
      let media;
      if (v.youtube) {
        media = `<button type="button" class="video-poster" data-yt="${PA.escape(v.youtube)}" aria-label="Lire : ${PA.escape(v.title)}">
          ${v.poster ? `<img class="photo" src="${PA.escape(v.poster)}" alt="" loading="lazy">` : PA.sceneSVG(sceneFor[v.category] || "dunes")}
          <span class="play" aria-hidden="true"></span></button>`;
      } else if (v.src) {
        media = `<video controls preload="none" playsinline ${v.poster ? `poster="${PA.escape(v.poster)}"` : ""} src="${PA.escape(v.src)}"></video>`;
      } else {
        media = `<div class="video-poster is-empty">${PA.sceneSVG(sceneFor[v.category] || "dunes")}<span class="play" aria-hidden="true"></span><span class="soon">Vidéo à venir</span></div>`;
      }
      return `<article class="video-card reveal" data-cat="${PA.escape(v.category)}">
        <div class="video-frame">${media}</div>
        <div class="video-body"><span class="video-cat">${PA.escape(v.category)}</span><h3>${PA.escape(v.title)}</h3></div>
      </article>`;
    };
    $("videos").innerHTML = VIDEOS.map(card).join("");

    $("video-filters").addEventListener("change", (e) => {
      const c = e.target.value;
      $("videos").querySelectorAll(".video-card").forEach((el) => (el.hidden = c !== "Toutes" && el.dataset.cat !== c));
    });
    // YouTube : chargé seulement au clic (plus léger en 5G, sans cookies)
    $("videos").addEventListener("click", (e) => {
      const b = e.target.closest("[data-yt]");
      if (!b) return;
      b.outerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(b.dataset.yt)}?autoplay=1&playsinline=1" title="Vidéo" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
    });
  }
})();
