/* PRESTIGE AUTO — Fiche véhicule */
(function () {
  const root = document.getElementById("vehicle-root");
  const id = new URLSearchParams(location.search).get("id");
  const v = id && PA.getVehicle(id);

  if (!v) {
    document.title = "Véhicule introuvable — PRESTIGE AUTO";
    root.innerHTML = `
      <section class="page-hero">
        <div class="container">
          <p class="eyebrow">Erreur</p>
          <h1>Véhicule <em>introuvable</em></h1>
          <p>Ce véhicule n'existe pas ou n'est plus disponible.</p>
          <a class="btn btn-gold" href="catalogue.html">Retour au catalogue</a>
        </div>
      </section>`;
    return;
  }

  const name = `${v.brand} ${v.model}`;
  document.title = `${name} — PRESTIGE AUTO`;

  // Simulation de financement purement indicative (paramètres fictifs)
  const apport = 0.2, months = 60, rate = 0.059 / 12;
  const capital = v.price * (1 - apport);
  const monthly = Math.round((capital * rate) / (1 - Math.pow(1 + rate, -months)));

  const swatches = [v.hex, "#1a1a1d", "#e9e6df", "#8f1d1f", "#1f3a5f", "#b8954a"].filter(
    (c, i, a) => a.indexOf(c) === i
  );

  const waMsg = `Bonjour PRESTIGE AUTO, je suis intéressé(e) par le véhicule ${name} (${v.year}, ${PA.fmtKm(v.km)}) affiché à ${PA.fmtPrice(v.price)}. Est-il toujours disponible ?`;

  const similar = VEHICLES.filter((x) => x.id !== v.id)
    .map((x) => ({ x, score: (x.body === v.body ? 2 : 0) + (x.brand === v.brand ? 1 : 0) - Math.abs(x.price - v.price) / 100000 }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((o) => o.x);

  const rows = [
    ["Marque", v.brand],
    ["Modèle", v.model],
    ["Carrosserie", v.bodyLabel],
    ["Année", v.year],
    ["Kilométrage", PA.fmtKm(v.km)],
    ["Énergie", v.fuel],
    ["Puissance", `${v.power} ch`],
    ["Boîte de vitesses", v.transmission],
    ["0 à 100 km/h", `${String(v.accel).replace(".", ",")} s`],
    ["Vitesse maximale", `${v.topSpeed} km/h`],
    ["Places / portes", `${v.seats} / ${v.doors}`],
    ["Couleur", v.color],
    ["Référence", v.id.toUpperCase()],
  ];

  root.innerHTML = `
    <section class="vehicle-hero">
      <div class="container">
        <nav class="breadcrumb" aria-label="Fil d'Ariane">
          <a href="index.html">Accueil</a><span>/</span><a href="catalogue.html">Catalogue</a><span>/</span><span aria-current="page">${PA.escape(name)}</span>
        </nav>
        <div class="vehicle-top">
          <div>
            <div class="vehicle-stage" id="stage">
              <span class="badge">${v.year}</span>
              <span class="badge badge-fuel" data-fuel="${PA.escape(v.fuel)}">${PA.escape(v.fuel)}</span>
              <div id="stage-car">${PA.carSVG(v)}</div>
            </div>
            <div class="color-switch" role="group" aria-label="Visualiser une autre teinte">
              <small>Teinte</small>
              ${swatches
                .map(
                  (c, i) =>
                    `<button type="button" class="swatch" style="background:${c}" data-color="${c}" aria-pressed="${i === 0}" aria-label="${i === 0 ? "Teinte d'origine : " + PA.escape(v.color) : "Aperçu teinte " + c}"></button>`
                )
                .join("")}
            </div>
          </div>
          <div class="vehicle-info">
            <p class="car-brand rise">${PA.escape(v.brand)} · ${PA.escape(v.bodyLabel)}</p>
            <h1 class="rise d1">${PA.escape(v.model)}</h1>
            <p class="muted rise d2">${PA.escape(v.description)}</p>
            <p class="rise d2"><span class="demo-flag">Véhicule fictif — démonstration</span></p>
            <div class="vehicle-price rise d3">${PA.fmtPrice(v.price)}</div>
            <p class="vehicle-monthly rise d3">ou environ <b style="color:var(--white)">${PA.fmtPrice(monthly)}/mois</b>*</p>
            <div class="vehicle-actions rise d4">
              <a class="btn btn-wa" href="${PA.waLink(waMsg)}" target="_blank" rel="noopener">${PA.waIcon} Discuter sur WhatsApp</a>
              <a class="btn btn-gold" href="contact.html?vehicule=${encodeURIComponent(v.id)}">Demander un essai</a>
              <a class="btn btn-outline" href="catalogue.html">← Retour au catalogue</a>
            </div>
          </div>
        </div>

        <div class="key-specs reveal">
          <div><small>Kilométrage</small><b>${PA.fmtKm(v.km)}</b></div>
          <div><small>Puissance</small><b>${v.power} ch</b></div>
          <div><small>0 – 100 km/h</small><b>${String(v.accel).replace(".", ",")} s</b></div>
          <div><small>Énergie</small><b>${PA.escape(v.fuel)}</b></div>
        </div>
      </div>
    </section>

    <section class="section" style="padding-top:40px">
      <div class="container vehicle-details">
        <div class="reveal">
          <p class="eyebrow">Caractéristiques</p>
          <h2>Fiche <em>technique</em></h2>
          <table class="spec-table">
            <tbody>${rows.map(([k, val]) => `<tr><th scope="row">${k}</th><td>${PA.escape(val)}</td></tr>`).join("")}</tbody>
          </table>
        </div>
        <div>
          <div class="reveal">
            <p class="eyebrow">Équipements</p>
            <h2>Points <em>forts</em></h2>
            <ul class="equip">${v.equipment.map((e) => `<li>${PA.escape(e)}</li>`).join("")}</ul>
          </div>
          <div class="panel reveal" style="margin-top:30px">
            <h2>L'engagement <em>Prestige</em></h2>
            <ul class="guarantees">
              <li>Expertise 150 points réalisée</li>
              <li>Garantie 12 mois minimum</li>
              <li>Historique et entretien vérifiés</li>
              <li>Reprise de votre véhicule possible</li>
              <li>Livraison à domicile sur demande</li>
            </ul>
            <p class="muted" style="font-size:.78rem;margin:20px 0 0">* Simulation indicative et non contractuelle : apport de 20 %, 60 mois, taux fictif de 5,9 %. Aucune offre de crédit réelle.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section" style="padding-top:0">
      <div class="container">
        <div class="section-head reveal">
          <div>
            <p class="eyebrow">Vous aimerez aussi</p>
            <h2>Véhicules <em>similaires</em></h2>
          </div>
        </div>
        <div class="car-grid">${similar.map(PA.vehicleCard).join("")}</div>
      </div>
    </section>`;

  // Changement de teinte (aperçu)
  const stageCar = document.getElementById("stage-car");
  root.querySelectorAll(".swatch").forEach((btn) =>
    btn.addEventListener("click", () => {
      root.querySelectorAll(".swatch").forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
      stageCar.innerHTML = PA.carSVG({ ...v, hex: btn.dataset.color }, { className: "recolor" });
    })
  );
})();
