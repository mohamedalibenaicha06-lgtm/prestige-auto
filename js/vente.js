/* BEST OF PINS — Page Vente : un particulier propose son buggy */
(function () {
  const form = document.getElementById("sell-form");
  const success = document.getElementById("form-success");
  const input = form.elements.photos;
  const previews = document.getElementById("previews");
  const MAX_FILES = 8, MAX_MB = 10;
  const year = new Date().getFullYear();

  form.elements.model.insertAdjacentHTML(
    "afterbegin",
    MODELS.map((m) => `<option value="${PA.escape(m.name)}">${PA.escape(m.name)}</option>`).join("")
  );
  form.elements.model.insertAdjacentHTML("afterbegin", '<option value="">Choisir…</option>');
  form.elements.model.value = "";
  form.elements.year.max = year + 1;

  // Aperçu des photos (restent sur l'appareil : rien n'est téléversé)
  let urls = [];
  function renderPreviews() {
    urls.forEach(URL.revokeObjectURL);
    urls = [...input.files].slice(0, MAX_FILES).map((f) => URL.createObjectURL(f));
    previews.innerHTML = urls.map((u, i) => `<img src="${u}" alt="Aperçu photo ${i + 1}">`).join("");
  }
  input.addEventListener("change", renderPreviews);
  form.addEventListener("reset-ui", renderPreviews);

  const R = PA.rules;
  PA.setupForm(
    form,
    {
      model: R.select,
      modelOther: (v, el, f) => (f.elements.model.value === "Autre" && !v.trim() ? "Précisez le modèle." : ""),
      year: (v) => (!v ? "Indiquez l'année." : +v < 1990 || +v > year + 1 ? `Année entre 1990 et ${year + 1}.` : ""),
      price: (v) => (!v ? "Indiquez le prix souhaité." : +v < 500 ? "Prix non valide." : ""),
      photos: (_, el) => {
        const files = [...el.files];
        if (!files.length) return "Ajoutez au moins une photo.";
        if (files.length > MAX_FILES) return `${MAX_FILES} photos maximum.`;
        if (files.some((f) => !f.type.startsWith("image/"))) return "Seules les images sont acceptées.";
        if (files.some((f) => f.size > MAX_MB * 1024 * 1024)) return `Chaque photo doit faire moins de ${MAX_MB} Mo.`;
        return "";
      },
      name: R.name,
      phone: (v, el) => R.phone(v, el),
      email: R.email,
      consent: R.consent,
    },
    (d) => {
      const model = d.get("model") === "Autre" ? d.get("modelOther") : d.get("model");
      const price = Number(d.get("price")).toLocaleString("fr-FR");
      document.getElementById("success-name").textContent = d.get("name").trim().split(" ")[0];
      PA.showSuccess(
        form,
        success,
        `Bonjour BEST OF PINS, je souhaite vendre mon buggy.\nModèle : ${model}\nAnnée : ${d.get("year")}\nPrix souhaité : ${price} ${d.get("currency")}\n` +
          (d.get("hours") ? `Heures / km : ${d.get("hours")}\n` : "") +
          (d.get("details").trim() ? `Détails : ${d.get("details").trim()}\n` : "") +
          `— ${d.get("name").trim()} · ${d.get("phone")}${d.get("email") ? " · " + d.get("email") : ""}\n(Je joins mes photos ci-dessous.)`
      );
    }
  );

  // Modèles étudiés en reprise (pas d'annonce, pas de prix)
  document.getElementById("sell-models").innerHTML = MODELS.map(
    (m) => `<button type="button" class="sell-model reveal zoom" data-model="${PA.escape(m.name)}">
      <span class="sell-model-img">${PA.carVisual(m)}</span>
      <b>${PA.escape(m.short)}</b><span>Proposer ce modèle →</span></button>`
  ).join("");
  document.getElementById("sell-models").addEventListener("click", (e) => {
    const b = e.target.closest("[data-model]");
    if (!b) return;
    form.elements.model.value = b.dataset.model;
    form.elements.model.dispatchEvent(new Event("change"));
    form.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => form.elements.year.focus({ preventScroll: true }), 600);
  });

  const other = document.getElementById("other-field");
  const toggleOther = () => (other.hidden = form.elements.model.value !== "Autre");
  form.elements.model.addEventListener("change", toggleOther);
  form.addEventListener("reset-ui", toggleOther);
  toggleOther();
})();
