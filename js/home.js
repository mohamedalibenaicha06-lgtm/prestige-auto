/* PRESTIGE AUTO — Page d'accueil */
(function () {
  const hero = PA.getVehicle("castellan-monza");
  const heroBox = document.getElementById("hero-car");
  if (hero && heroBox) heroBox.insertAdjacentHTML("beforeend", PA.carSVG(hero, { title: "Castellan Monza Coupé (véhicule fictif)" }));

  const brands = [...new Set(VEHICLES.map((v) => v.brand))];
  const marquee = document.getElementById("marquee");
  if (marquee) {
    const items = brands.map((b) => `<span>${PA.escape(b)}</span>`).join("");
    marquee.innerHTML = items + items + items + items; // boucle continue
  }

  const featured = document.getElementById("featured");
  if (featured) {
    featured.innerHTML = VEHICLES.filter((v) => v.featured).slice(0, 6).map(PA.vehicleCard).join("");
  }

  document.querySelectorAll(".js-wa").forEach((a) => (a.href = PA.waLink()));
})();
