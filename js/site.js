document.addEventListener("DOMContentLoaded", () => {
  const path = document.querySelector(".nurture-path");
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (!path || reducedMotion || !("IntersectionObserver" in window)) {
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
