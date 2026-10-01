"use client";

import { useEffect, useRef, useState } from "react";

type NurturePathStage = {
  number: string;
  title: string;
  detail: string;
  measure: string;
  meaning: string;
};

type NurturePathProps = {
  stages: NurturePathStage[];
};

export default function NurturePath({ stages }: NurturePathProps) {
  const pathRef = useRef<HTMLElement>(null);
  const [motionReady, setMotionReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  useEffect(() => {
    const path = pathRef.current;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!path || reducedMotion || !("IntersectionObserver" in window)) {
      return;
    }

    setMotionReady(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      {
        threshold: 0.28,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    observer.observe(path);
    return () => observer.disconnect();
  }, []);

  const motionClass = motionReady
    ? ` is-motion-ready${visible ? " is-visible" : ""}`
    : "";
  const activeStage = stages[activeStageIndex];

  return (
    <section
      ref={pathRef}
      className={`site-frame nurture-path${motionClass}`}
      aria-labelledby="nurture-path-title"
    >
      <header className="nurture-path-intro">
        <p>The Nurture Map</p>
        <h2 id="nurture-path-title">One connected developmental story.</h2>
        <span>Choose a stage to follow what we measure and why it matters.</span>
      </header>
      <div className="nurture-path-explorer">
        <ol>
          {stages.map((stage, index) => (
            <li key={stage.number}>
              <button
                className="nurture-stage-button"
                type="button"
                aria-controls="nurture-stage-detail"
                aria-pressed={index === activeStageIndex}
                onClick={() => setActiveStageIndex(index)}
              >
                <span className="path-point" aria-hidden="true">
                  {stage.number}
                </span>
                <strong>{stage.title}</strong>
                <small>{stage.detail}</small>
              </button>
            </li>
          ))}
        </ol>

        <div
          className="nurture-path-detail"
          id="nurture-stage-detail"
          aria-live="polite"
        >
          <p className="nurture-detail-stage">
            {activeStage.number} · {activeStage.title}
          </p>
          <dl>
            <div>
              <dt>What we measure</dt>
              <dd>{activeStage.measure}</dd>
            </div>
            <div>
              <dt>Why it matters</dt>
              <dd>{activeStage.meaning}</dd>
            </div>
          </dl>
          <a className="text-arrow-link" href="#research">
            See related research <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
