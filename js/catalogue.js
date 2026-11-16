/* PRESTIGE AUTO — Catalogue et filtres */
(function () {
  const $ = (id) => document.getElementById(id);
  const brandSel = $("f-brand"), price = $("f-price"), km = $("f-km"), fuelBox = $("f-fuel"), sortSel = $("sort");
  const results = $("results"), count = $("count");

  const brands = [...new Set(VEHICLES.map((v) => v.brand))].sort();
  const fuels = ["Essence", "Diesel", "Hybride", "Électrique"];
  const step = 5000;
  const minPrice = Math.floor(Math.min(...VEHICLES.map((v) => v.price)) / step) * step;
  const maxPrice = Math.ceil(Math.max(...VEHICLES.map((v) => v.price)) / step) * step;
  const maxKm = Math.ceil(Math.max(...VEHICLES.map((v) => v.km)) / step) * step;

  brandSel.insertAdjacentHTML("beforeend", brands.map((b) => `<option value="${PA.escape(b)}">${PA.escape(b)}</option>`).join(""));
  fuelBox.innerHTML = fuels
    .map((f) => `<label class="chip"><input type="checkbox" name="fuel" value="${f}"><span>${f}</span></label>`)
    .join("");

  price.min = minPrice; price.max = maxPrice;
  km.min = 0; km.max = maxKm;
  $("s-price-min").textContent = PA.fmtPrice(minPrice);
  $("s-price-max").textContent = PA.fmtPrice(maxPrice);
  $("s-km-max").textContent = PA.fmtKm(maxKm);

  /* --- État initial depuis l'URL (liens partageables) --- */
  const params = new URLSearchParams(location.search);
  function applyDefaults() {
    brandSel.value = brands.includes(params.get("marque")) ? params.get("marque") : "";
    price.value = clamp(+params.get("prix") || maxPrice, minPrice, maxPrice);
    km.value = clamp(params.has("km") ? +params.get("km") : maxKm, 0, maxKm);
    const pf = (params.get("carburant") || "").split(",");
    fuelBox.querySelectorAll("input").forEach((i) => (i.checked = pf.includes(i.value)));
    sortSel.value = params.get("tri") || "featured";
    if (!sortSel.value) sortSel.value = "featured";
  }
  const clamp = (n, a, b) => Math.min(b, Math.max(a, n));

  function state() {
    return {
      brand: brandSel.value,
      price: +price.value,
      km: +km.value,
      fuels: [...fuelBox.querySelectorAll("input:checked")].map((i) => i.value),
      sort: sortSel.value,
    };
  }

  const sorters = {
    featured: (a, b) => (b.featured - a.featured) || b.price - a.price,
    "price-asc": (a, b) => a.price - b.price,
    "price-desc": (a, b) => b.price - a.price,
    "km-asc": (a, b) => a.km - b.km,
    "year-desc": (a, b) => b.year - a.year,
    "power-desc": (a, b) => b.power - a.power,
  };

  function syncUrl(s) {
    const p = new URLSearchParams();
    if (s.brand) p.set("marque", s.brand);
    if (s.price < maxPrice) p.set("prix", s.price);
    if (s.km < maxKm) p.set("km", s.km);
    if (s.fuels.length) p.set("carburant", s.fuels.join(","));
    if (s.sort !== "featured") p.set("tri", s.sort);
    const qs = p.toString();
    history.replaceState(null, "", location.pathname + (qs ? "?" + qs : ""));
  }

  function render() {
    const s = state();
    $("o-price").textContent = s.price >= maxPrice ? "Sans limite" : PA.fmtPrice(s.price);
    $("o-km").textContent = s.km >= maxKm ? "Sans limite" : PA.fmtKm(s.km);

    const list = VEHICLES.filter(
      (v) =>
        (!s.brand || v.brand === s.brand) &&
        v.price <= s.price &&
        v.km <= s.km &&
        (!s.fuels.length || s.fuels.includes(v.fuel))
    ).sort(sorters[s.sort] || sorters.featured);

    count.textContent = list.length;
    $("filters-apply").textContent = `Voir ${list.length} résultat${list.length > 1 ? "s" : ""}`;
    results.innerHTML = list.length
      ? list.map(PA.vehicleCard).join("")
      : `<div class="empty-state"><h3>Aucun véhicule ne correspond</h3><p class="muted">Élargissez vos critères ou contactez-nous : nous recherchons aussi des véhicules sur demande.</p><button type="button" class="btn btn-outline" data-reset>Réinitialiser les filtres</button></div>`;

    // Apparition échelonnée
    results.querySelectorAll(".car-card").forEach((el, i) => (el.style.transitionDelay = Math.min(i, 8) * 60 + "ms"));
    PA.observeReveal(results);
    syncUrl(s);
  }

  function reset() {
    brandSel.value = "";
    price.value = maxPrice;
    km.value = maxKm;
    fuelBox.querySelectorAll("input").forEach((i) => (i.checked = false));
    sortSel.value = "featured";
    render();
  }

  $("filter-form").addEventListener("input", render);
  $("filter-form").addEventListener("change", render);
  sortSel.addEventListener("change", render);
  $("reset").addEventListener("click", reset);
  results.addEventListener("click", (e) => { if (e.target.closest("[data-reset]")) reset(); });

  // Tiroir de filtres (mobile)
  const openF = (o) => document.body.classList.toggle("filters-open", o);
  $("filters-open").addEventListener("click", () => openF(true));
  $("filters-apply").addEventListener("click", () => { openF(false); results.scrollIntoView({ behavior: "smooth", block: "start" }); });
  $("filters-backdrop").addEventListener("click", () => openF(false));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") openF(false); });

  applyDefaults();
  render();
})();
