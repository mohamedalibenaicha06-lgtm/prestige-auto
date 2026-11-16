/* PRESTIGE AUTO — Validation de formulaires (réutilisée par Vente et Contact)
   Site statique : aucune donnée n'est envoyée à un serveur. Après validation,
   l'utilisateur peut transmettre sa demande par WhatsApp (message prérempli). */
(function () {
  PA.rules = {
    name: (v) => (v.trim().length < 2 ? "Indiquez votre nom (2 caractères minimum)." : /[0-9<>]/.test(v) ? "Le nom contient des caractères non valides." : ""),
    email: (v, el) => {
      if (!v.trim()) return el.required ? "Indiquez votre e-mail." : "";
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Adresse e-mail non valide (ex. nom@domaine.com).";
    },
    phone: (v, el) => {
      if (!v.trim()) return el.required ? "Indiquez votre téléphone." : "";
      return /^(\+\d{8,15}|0\d{9})$/.test(v.replace(/[\s.\-()]/g, "")) ? "" : "Numéro non valide (ex. 06 12 34 56 78 ou +212 6 12 34 56 78).";
    },
    required: (v) => (!v.trim() ? "Ce champ est obligatoire." : ""),
    select: (v) => (!v ? "Faites un choix." : ""),
    message: (v) => (v.trim().length < 10 ? `Votre message doit contenir au moins 10 caractères (${v.trim().length}/10).` : ""),
    consent: (_, el) => (!el.checked ? "Votre accord est nécessaire pour traiter la demande." : ""),
  };

  /**
   * @param {HTMLFormElement} form
   * @param {Object<string, Function>} rules  nom du champ → règle (v, el, form) => message d'erreur
   * @param {Function} onValid  appelé avec FormData si tout est valide
   */
  PA.setupForm = function (form, rules, onValid) {
    function check(name) {
      const el = form.elements[name];
      const err = rules[name](el.value, el, form);
      const field = el.closest(".field");
      const out = field && field.querySelector(".field-error");
      field.classList.toggle("invalid", !!err);
      field.classList.toggle("valid", !err && (el.type === "checkbox" ? el.checked : el.type === "file" ? el.files.length > 0 : !!el.value.trim()));
      if (out) { out.textContent = err; out.id = out.id || name + "-error"; el.setAttribute("aria-describedby", out.id); }
      el.setAttribute("aria-invalid", String(!!err));
      return !err;
    }
    PA.checkField = check;

    Object.keys(rules).forEach((name) => {
      const el = form.elements[name];
      const instant = el.type === "checkbox" || el.type === "file" || el.tagName === "SELECT";
      el.addEventListener("blur", () => { el.dataset.touched = "1"; check(name); });
      el.addEventListener(instant ? "change" : "input", () => { if (instant || el.dataset.touched) check(name); });
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const names = Object.keys(rules);
      const ok = names.map((n) => { form.elements[n].dataset.touched = "1"; return check(n); });
      const bad = names.find((_, i) => !ok[i]);
      if (bad) { form.elements[bad].focus(); return; }
      onValid(new FormData(form));
    });
  };

  PA.resetForm = function (form) {
    form.reset();
    form.querySelectorAll(".field").forEach((f) => f.classList.remove("valid", "invalid"));
    form.querySelectorAll(".field-error").forEach((p) => (p.textContent = ""));
    form.querySelectorAll("[data-touched]").forEach((el) => delete el.dataset.touched);
    form.querySelectorAll("[aria-invalid]").forEach((el) => el.removeAttribute("aria-invalid"));
  };

  /** Bascule formulaire → écran de confirmation (avec bouton WhatsApp prérempli). */
  PA.showSuccess = function (form, box, waMessage) {
    box.querySelector(".js-success-wa").href = PA.waLink(waMessage);
    form.hidden = true;
    box.classList.add("show");
    box.focus();
    box.querySelector(".js-new").onclick = () => {
      PA.resetForm(form);
      form.dispatchEvent(new Event("reset-ui"));
      box.classList.remove("show");
      form.hidden = false;
    };
  };
})();
