"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LUNAR_SITES } from "@/lib/mission-data";

function formatCoordinate(value, axis) {
  const direction = axis === "latitude"
    ? value < 0 ? "S" : "N"
    : value < 0 ? "W" : "E";
  return Math.abs(value).toFixed(2) + "° " + direction;
}

const chapters = [
  { number: "01", title: "Choose a site", subtitle: "Start with a traceable lunar reference feature." },
  { number: "02", title: "Set a date", subtitle: "Choose an observation day and UTC hour." },
  { number: "03", title: "Compare conditions", subtitle: "Inspect the scenario inputs and honest data status." },
];

export default function DemoWalkthrough() {
  const [activeStep, setActiveStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return undefined;
    const timer = window.setTimeout(() => {
      if (activeStep === chapters.length - 1) {
        setPlaying(false);
      } else {
        setActiveStep((current) => current + 1);
      }
    }, 10000);
    return () => window.clearTimeout(timer);
  }, [playing, activeStep]);

  const startWalkthrough = () => {
    if (playing) {
      setPlaying(false);
      return;
    }
    if (activeStep === chapters.length - 1) setActiveStep(0);
    setPlaying(true);
  };

  const selectStep = (index) => {
    setActiveStep(index);
    setPlaying(false);
  };

  const primarySite = LUNAR_SITES[0];
  const secondarySite = LUNAR_SITES[1];

  return (
    <section className="demo-section" id="demo" aria-labelledby="demo-title">
      <div className="section-shell">
        <div className="demo-heading" data-reveal="up">
          <div>
            <span className="section-kicker">00 / THE 30-SECOND WALKTHROUGH</span>
            <h2 id="demo-title">See how the navigator<br /><em>turns inputs into a scenario.</em></h2>
          </div>
          <p>
            A short guided tour of the working prototype controls. It uses
            real reference coordinates and never invents Sun or Earth readings.
          </p>
        </div>

        <div className="demo-console" data-reveal="up">
          <div className="demo-console-top">
            <span><i /> INTERACTIVE WALKTHROUGH</span>
            <span>3 CHAPTERS · 10 SECONDS EACH</span>
          </div>

          <div className="demo-tabs" role="tablist" aria-label="Walkthrough chapters">
            {chapters.map((chapter, index) => (
              <button
                className={activeStep === index ? "demo-tab is-active" : "demo-tab"}
                type="button"
                role="tab"
                aria-selected={activeStep === index}
                key={chapter.number}
                onClick={() => selectStep(index)}
              >
                <span>{chapter.number}</span>
                <b>{chapter.title}</b>
                <i className={playing && activeStep === index ? "demo-tab-progress is-running" : "demo-tab-progress"} key={activeStep + "-" + index} />
              </button>
            ))}
          </div>

          <div className="demo-stage" aria-live="polite">
            <div className="demo-stage-copy">
              <span className="demo-stage-kicker">CHAPTER {chapters[activeStep].number} / 03</span>
              <h3>{chapters[activeStep].title}</h3>
              <p>{chapters[activeStep].subtitle}</p>
              {activeStep === 0 && (
                <div className="demo-site-list">
                  {LUNAR_SITES.map((site, index) => (
                    <div className={index === 0 ? "demo-site is-selected" : "demo-site"} key={site.id}>
                      <span>0{index + 1}</span>
                      <b>{site.name}</b>
                      <small>{formatCoordinate(site.latitude, "latitude")} / {formatCoordinate(site.longitude, "longitude")}</small>
                    </div>
                  ))}
                </div>
              )}
              {activeStep === 1 && (
                <div className="demo-time-controls">
                  <div className="demo-input-card">
                    <span>OBSERVATION DATE</span>
                    <b>Choose a calendar date</b>
                    <small>Date control · editable in the navigator</small>
                  </div>
                  <div className="demo-input-card">
                    <span>TIME STANDARD</span>
                    <b>00:00 — 23:00 UTC</b>
                    <small>Hour slider · one-hour increments</small>
                  </div>
                </div>
              )}
              {activeStep === 2 && (
                <div className="demo-comparison">
                  {[primarySite, secondarySite].map((site, index) => (
                    <div className="demo-comparison-card" key={site.id}>
                      <span>SCENARIO {index === 0 ? "A" : "B"}</span>
                      <b>{site.name}</b>
                      <small>{formatCoordinate(site.latitude, "latitude")} / {formatCoordinate(site.longitude, "longitude")}</small>
                      <i>Sun visibility · NOT CALCULATED</i>
                      <i>Earth visibility · NOT CALCULATED</i>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="demo-stage-aside">
              <div className="demo-aside-index">LUNAPATH / 2026</div>
              {activeStep === 0 && (
                <div className="demo-coordinate-plate">
                  <span>SELECTED FEATURE</span>
                  <b>SHACKLETON CRATER</b>
                  <div className="demo-crosshair" aria-hidden="true"><i /><i /><b /></div>
                  <small>USGS / IAU FEATURE 5450</small>
                  <strong>89.67° S<br />129.78° E</strong>
                </div>
              )}
              {activeStep === 1 && (
                <div className="demo-time-plate">
                  <span>INPUT CONTROLS</span>
                  <strong>DATE</strong>
                  <div className="demo-time-dial"><b>12</b><small>UTC HOUR</small></div>
                  <p>Changing the date or hour updates the selected scenario, not a live ephemeris result.</p>
                </div>
              )}
              {activeStep === 2 && (
                <div className="demo-status-plate">
                  <span>OUTPUT STATUS</span>
                  <b>NOT CALCULATED</b>
                  <p>Sun / Earth geometry, terrain clearance, power and radio outputs require validated science integrations.</p>
                  <div><i /> SOURCE-TRACEABLE INPUTS</div>
                </div>
              )}
            </div>
          </div>

          <div className="demo-console-bottom">
            <button className="demo-play-button" type="button" onClick={startWalkthrough}>
              <span aria-hidden="true">{playing ? "Ⅱ" : activeStep === 2 ? "↻" : "▶"}</span>
              {playing ? "Pause walkthrough" : activeStep === 2 ? "Replay walkthrough" : "Play 30-second walkthrough"}
            </button>
            <span className="demo-step-status">{playing ? "PLAYING" : "MANUAL PREVIEW"} · {activeStep + 1} / 3</span>
            <Link href="/explorer" className="demo-open-link">Open the full navigator <b>↗</b></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
