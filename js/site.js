document.addEventListener("DOMContentLoaded", () => {
  const path = document.querySelector(".nurture-path");
  if (!path) return;

  const stages = [
    {
      number: "01",
      title: "Maternal context",
      measure:
        "Maternal metabolic, inflammatory, environmental, and psychosocial context.",
      meaning:
        "These are potentially modifiable influences that begin the developmental pathway.",
    },
    {
      number: "02",
      title: "Placenta",
      measure:
        "Placental structure, perfusion, oxygenation, exchange, and molecular signaling.",
      meaning:
        "The placenta is a dynamic mediator between maternal health and fetal development.",
    },
    {
      number: "03",
      title: "Fetal circulation",
      measure:
        "Blood flow, cardiovascular adaptation, hemodynamics, and oxygen delivery.",
      meaning:
        "Fetal physiology connects placental function to the environment reaching the brain.",
    },
    {
      number: "04",
      title: "Developing brain",
      measure:
        "Brain structure, tissue maturation, connectivity, and region-specific growth.",
      meaning:
        "Quantitative phenotypes can reveal emerging developmental differences early in life.",
    },
    {
      number: "05",
      title: "Early neurobehavior",
      measure:
        "Regulation, attention, social communication, and other early behavioral outcomes.",
      meaning:
        "Behavior links early biology with outcomes that matter to children and families.",
    },
  ];
  const stageButtons = path.querySelectorAll(".nurture-stage-button");
  const stageLabel = path.querySelector(".nurture-detail-stage");
  const stageMeasure = path.querySelector(".nurture-detail-measure");
  const stageMeaning = path.querySelector(".nurture-detail-meaning");

  stageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.stage);
      const stage = stages[index];
      if (!stage || !stageLabel || !stageMeasure || !stageMeaning) return;

      stageButtons.forEach((candidate) => {
        candidate.setAttribute(
          "aria-pressed",
          candidate === button ? "true" : "false",
        );
      });
      stageLabel.textContent = `${stage.number} · ${stage.title}`;
      stageMeasure.textContent = stage.measure;
      stageMeaning.textContent = stage.meaning;
    });
  });

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (reducedMotion || !("IntersectionObserver" in window)) {
    return;
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      path.classList.add("is-visible");
      observer.disconnect();
    },
    {
      threshold: 0.28,
      rootMargin: "0px 0px -8% 0px",
    },
  );

  path.classList.add("is-motion-ready");
  observer.observe(path);
});
