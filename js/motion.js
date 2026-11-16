/* BEST OF PINS — Mouvement GSAP : le buggy entre en scène dans le showroom.
   Sans GSAP (hors ligne) ou avec « Réduire les animations », le site reste complet et statique. */
(function () {
  const stage = document.querySelector(".sr-stage");
  if (!stage || !window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
    const wheels = () => stage.querySelectorAll(".bg-wheel");
    gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: stage,
        start: "top 90%",
        end: "center 55%",
        scrub: 0.6,
        // Les roues tournent au rythme du déplacement
        onUpdate: (self) => gsap.set(wheels(), { rotation: self.progress * 420, transformOrigin: "50% 50%" }),
      },
    })
      .from(stage.querySelector(".sr-drive"), { xPercent: -28 }, 0)
      .from(stage.querySelector(".stage-word"), { xPercent: 12, opacity: 0.3 }, 0)
      .from(stage.querySelector(".sr-floor"), { scaleX: 0.4, opacity: 0 }, 0);
  });
})();
