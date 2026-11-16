/* BEST OF PINS — Page Contact */
(function () {
  const form = document.getElementById("contact-form");
  const success = document.getElementById("form-success");
  const subject = form.elements.subject;
  const model = form.elements.model;
  const message = form.elements.message;
  const counter = document.getElementById("counter");

  document.getElementById("wa-icon").innerHTML = PA.waIcon;
  const c = window.SITE_CONFIG;
  document.getElementById("info-list").innerHTML = [["Téléphone", c.phone], ["E-mail", c.email], ["Adresse", c.address]]
    .filter(([, v]) => v)
    .map(([k, v]) => `<li><small>${k}</small><span>${PA.escape(v)}</span></li>`)
    .join("");

  model.insertAdjacentHTML("beforeend", MODELS.map((m) => `<option value="${m.id}">${PA.escape(m.name)}</option>`).join(""));

  // Préremplissage depuis une annonce ou la page Raids (?sujet=achat&modele=…)
  const q = new URLSearchParams(location.search);
  if ([...subject.options].some((o) => o.value === q.get("sujet"))) subject.value = q.get("sujet");
  const m = PA.getModel(q.get("modele"));
  if (m) {
    model.value = m.id;
    message.value = `Bonjour, je souhaite des informations sur le ${m.name}.`;
  } else if (q.get("sujet") === "raid") {
    message.value = "Bonjour, je souhaite me renseigner sur le Royal Raid Maroc (dates, participation).";
  }
  const toggleModel = () => (document.getElementById("model-field").hidden = !["achat", "vente"].includes(subject.value));
  subject.addEventListener("change", toggleModel);
  toggleModel();

  const updateCounter = () => (counter.textContent = `${message.value.length} / 1000`);
  message.addEventListener("input", updateCounter);
  form.addEventListener("reset-ui", () => { updateCounter(); toggleModel(); });
  updateCounter();

  const R = PA.rules;
  PA.setupForm(
    form,
    {
      name: R.name,
      phone: (v, el, f) => R.phone(v, el) || (!v.trim() && !f.elements.email.value.trim() ? "Indiquez au moins un téléphone ou un e-mail." : ""),
      email: R.email,
      subject: R.select,
      message: R.message,
      consent: R.consent,
    },
    (data) => {
      const label = subject.options[subject.selectedIndex].text;
      const mod = PA.getModel(data.get("model"));
      document.getElementById("success-name").textContent = data.get("name").trim().split(" ")[0];
      PA.showSuccess(
        form,
        success,
        `Bonjour BEST OF PINS,\nSujet : ${label}${mod ? "\nModèle : " + mod.name : ""}\n${data.get("message").trim()}\n— ${data.get("name").trim()}${data.get("phone") ? " · " + data.get("phone") : ""}${data.get("email") ? " · " + data.get("email") : ""}`
      );
    }
  );
})();
