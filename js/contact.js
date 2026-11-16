/* PRESTIGE AUTO — Formulaire de contact avec validation */
(function () {
  const form = document.getElementById("contact-form");
  const success = document.getElementById("form-success");
  const vehicleSel = document.getElementById("vehicle");
  const subject = document.getElementById("subject");
  const message = document.getElementById("message");
  const counter = document.getElementById("counter");
  const c = window.SITE_CONFIG;

  // Coordonnées (fictives) et lien WhatsApp
  document.getElementById("info-list").innerHTML = [
    ["Adresse", c.address],
    ["Téléphone", c.phone],
    ["E-mail", c.email],
    ...c.hours.map(([d, h]) => [d, h]),
  ]
    .map(([k, v]) => `<li><small>${PA.escape(k)}</small><span>${PA.escape(v)}</span></li>`)
    .join("");
  document.querySelectorAll(".js-wa").forEach((a) => (a.href = PA.waLink()));

  // Liste des véhicules + préremplissage depuis une fiche
  vehicleSel.insertAdjacentHTML(
    "beforeend",
    VEHICLES.map((v) => `<option value="${v.id}">${PA.escape(v.brand + " " + v.model)} — ${PA.fmtPrice(v.price)}</option>`).join("")
  );
  const pre = new URLSearchParams(location.search).get("vehicule");
  if (pre && PA.getVehicle(pre)) {
    vehicleSel.value = pre;
    subject.value = "essai";
    const v = PA.getVehicle(pre);
    message.value = `Bonjour, je souhaite organiser un essai du véhicule ${v.brand} ${v.model} (${v.year}). Merci de me recontacter.`;
  }

  const updateCounter = () => (counter.textContent = `${message.value.length} / 1000`);
  message.addEventListener("input", updateCounter);
  updateCounter();

  const rules = {
    name: (v) => (v.trim().length < 2 ? "Veuillez indiquer votre nom (2 caractères minimum)." : /[0-9<>]/.test(v) ? "Le nom contient des caractères non valides." : ""),
    email: (v) => (!v.trim() ? "Veuillez indiquer votre e-mail." : !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "Adresse e-mail non valide (ex. nom@domaine.fr)." : ""),
    phone: (v) => {
      if (!v.trim()) return "";
      const digits = v.replace(/[\s.\-()]/g, "");
      return /^(\+\d{8,15}|0\d{9})$/.test(digits) ? "" : "Numéro non valide (ex. 06 00 00 00 00 ou +33 6 00 00 00 00).";
    },
    subject: (v) => (!v ? "Veuillez choisir un objet." : ""),
    message: (v) => (v.trim().length < 20 ? `Votre message doit contenir au moins 20 caractères (${v.trim().length}/20).` : ""),
    consent: (_, el) => (!el.checked ? "Votre accord est nécessaire pour traiter la demande." : ""),
  };

  function check(name, show = true) {
    const el = form.elements[name];
    const err = rules[name](el.value, el);
    const field = el.closest(".field");
    const out = document.getElementById(name + "-error");
    if (show) {
      field.classList.toggle("invalid", !!err);
      field.classList.toggle("valid", !err && (el.type === "checkbox" ? el.checked : !!el.value.trim()));
      if (out) out.textContent = err;
      el.setAttribute("aria-invalid", String(!!err));
      if (out) el.setAttribute("aria-describedby", out.id);
    }
    return !err;
  }

  // Validation en direct : au blur, puis à chaque saisie une fois le champ touché
  Object.keys(rules).forEach((name) => {
    const el = form.elements[name];
    el.addEventListener("blur", () => { el.dataset.touched = "1"; check(name); });
    el.addEventListener(el.type === "checkbox" || el.tagName === "SELECT" ? "change" : "input", () => {
      if (el.dataset.touched || el.type === "checkbox" || el.tagName === "SELECT") check(name);
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const names = Object.keys(rules);
    const results = names.map((n) => { form.elements[n].dataset.touched = "1"; return check(n); });
    const firstBad = names.find((_, i) => !results[i]);
    if (firstBad) {
      form.elements[firstBad].focus();
      return;
    }
    // Démo : aucun envoi réseau
    document.getElementById("success-name").textContent = form.elements.name.value.trim().split(" ")[0];
    form.style.display = "none";
    success.classList.add("show");
    success.focus();
  });

  document.getElementById("new-message").addEventListener("click", () => {
    form.reset();
    form.querySelectorAll(".field").forEach((f) => f.classList.remove("valid", "invalid"));
    form.querySelectorAll(".field-error").forEach((p) => (p.textContent = ""));
    form.querySelectorAll("[data-touched]").forEach((el) => delete el.dataset.touched);
    updateCounter();
    success.classList.remove("show");
    form.style.display = "";
  });
})();
