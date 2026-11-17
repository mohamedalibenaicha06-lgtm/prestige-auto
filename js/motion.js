/* BEST OF PINS — Mouvements liés au défilement (GSAP + ScrollTrigger, auto-hébergés).
   Sans GSAP ou avec « Réduire les animations », le site reste complet et statique. */
(function () {
  if (!window.gsap || !window.ScrollTrigger || document.documentElement.classList.contains("lite")) return;
  gsap.registerPlugin(ScrollTrigger);
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
    // Accueil : le grand mot glisse derrière le buggy pendant le défilement (profondeur)
    const word = document.querySelector(".xrs-word");
    if (word) gsap.to(word, { xPercent: -16, ease: "none", scrollTrigger: { trigger: ".home-hero", start: "top top", end: "bottom top", scrub: 0.5 } });

    // Bandeau « piste » : les grands mots défilent au rythme du doigt
    document.querySelectorAll(".ghost-track").forEach((t) =>
      gsap.fromTo(t, { xPercent: -2 }, { xPercent: -40, ease: "none", scrollTrigger: { trigger: t.parentNode, start: "top bottom", end: "bottom top", scrub: 0.4 } })
    );

    // Grandes photos : léger décalage de profondeur
    document.querySelectorAll("[data-depth]").forEach((el) =>
      gsap.fromTo(el, { yPercent: -7 }, { yPercent: 7, ease: "none", scrollTrigger: { trigger: el.parentNode, start: "top bottom", end: "bottom top", scrub: true } })
    );

    // Showroom : le buggy avance en scène à l'approche
    const stage = document.querySelector(".sr-stage");
    if (stage) gsap.from(stage.querySelector(".sr-drive"), { xPercent: -14, ease: "none", scrollTrigger: { trigger: stage, start: "top 95%", end: "top 45%", scrub: 0.5 } });
  });
})();
