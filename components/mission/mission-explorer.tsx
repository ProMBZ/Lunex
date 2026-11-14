"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import MoonPortal from "@/components/mission/moon-portal";
import SouthPoleMap from "@/components/mission/south-pole-map";
import HorizonPreview from "@/components/mission/horizon-preview";
import { CONDITION_STATES, LUNAR_SITES, isSouthPolarCoordinate, type LunarSite } from "@/lib/mission-data";

type CompareMode = "site" | "date";

function defaultObservationDate(offsetDays = 0) {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + offsetDays);
  return date.toISOString().slice(0, 10);
}

function coord(value: number, axis: "lat" | "lon") {
  return Math.abs(value).toFixed(2) + "° " + (axis === "lat" ? (value < 0 ? "S" : "N") : (value < 0 ? "W" : "E"));
}

export default function MissionExplorer() {
  const [siteId, setSiteId] = useState("shackleton");
  const [compareSiteId, setCompareSiteId] = useState("de-gerlache");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [customApplied, setCustomApplied] = useState(false);
  const [date, setDate] = useState("2026-11-14");
  const [compareDate, setCompareDate] = useState("2026-11-21");
  const [hour, setHour] = useState(12);
  const [playing, setPlaying] = useState(false);
  const [compareMode, setCompareMode] = useState<CompareMode>("site");
  const [view, setView] = useState<"moon" | "map">("map");
  const [inputError, setInputError] = useState("");

  const selected = LUNAR_SITES.find((site) => site.id === siteId) ?? LUNAR_SITES[0];
  const compareSite = LUNAR_SITES.find((site) => site.id === compareSiteId) ?? LUNAR_SITES[1];

  const customValues = useMemo(() => {
    const lat = Number(latitude);
    const lon = Number(longitude);
    const valid = latitude.trim() !== "" && longitude.trim() !== "" && isSouthPolarCoordinate(lat, lon);
    return { lat, lon, valid, withinSouthPolarView: valid && lat <= -70 };
  }, [latitude, longitude]);

  const activeSite: LunarSite | null = customApplied && customValues.valid ? {
    id: "custom",
    name: "Custom observer point",
    featureType: "Observer coordinate",
    latitude: customValues.lat,
    longitude: customValues.lon,
    diameterKm: 0,
    region: "User-defined lunar coordinate",
    terrainNote: customValues.lat <= -70
      ? "A custom point in the current south-polar latitude band. A matching local DEM and observer-height definition are still required."
      : "Valid lunar coordinate, but outside the current south-polar map focus. Change the map extent before interpreting this point.",
    missionContext: "Custom input supplied in the Mission Explorer.",
    usgsId: "USER INPUT / NOT A NAMED FEATURE",
    sourceUrl: "https://quickmap.lroc.asu.edu/"
  } : selected;

  useEffect(() => {
    setDate(defaultObservationDate(0));
    setCompareDate(defaultObservationDate(7));
  }, []);

  useEffect(() => {
    if (!playing) return undefined;
    const timer = window.setInterval(() => {
      setHour((current) => (current + 1) % 24);
    }, 900);
    return () => window.clearInterval(timer);
  }, [playing]);

  useEffect(() => {
    if (customApplied && !customValues.valid) setCustomApplied(false);
  }, [customApplied, customValues.valid]);

  const applyCustom = () => {
    if (!customValues.valid) {
      setInputError("Enter a valid latitude from -90° to +90° and longitude from -180° to +180°.");
      setCustomApplied(false);
      return;
    }
    setInputError("");
    setCustomApplied(true);
  };

  const pickSite = (site: LunarSite) => {
    setSiteId(site.id);
    setCustomApplied(false);
    setCompareSiteId((current) => current === site.id
      ? (LUNAR_SITES.find((other) => other.id !== site.id)?.id ?? "de-gerlache")
      : current
    );
  };

  const displayDateTime = date + " · " + String(hour).padStart(2, "0") + ":00 UTC";

  return (
    <main id="main-content" className="mission-explorer-page">
      <section className="explorer-intro wrap">
        <div>
          <div className="eyebrow"><span className="status-dot" /> LUNAPATH / MISSION EXPLORER</div>
          <h1>One site.<br /><em>One mission window.</em></h1>
          <p>Choose a named south-polar feature or enter a custom observer coordinate. Then move through time and compare the questions a mission team needs to answer.</p>
        </div>
        <div className="prototype-stamp">
          <span>DATA STATUS</span>
          <b>INTERACTIVE V1</b>
          <small>Reference features and demonstrator controls. No live ephemeris or terrain-horizon engine is connected.</small>
        </div>
      </section>

      <section className="explorer-console wrap">
        <div className="console-topbar">
          <span>MISSION SCENARIO / A</span>
          <span>REFERENCE FRAME / PLANETOGRAPHIC</span>
          <span>TIME STANDARD / UTC</span>
        </div>

        <div className="console-layout">
          <aside className="console-sidebar">
            <div className="sidebar-block">
              <div className="block-heading"><span>01</span><label>SELECT A REFERENCE FEATURE</label></div>
              <div className="site-select-list">
                {LUNAR_SITES.map((site, index) => (
                  <button type="button" className={"site-select-option" + (!customApplied && site.id === siteId ? " is-active" : "")} key={site.id} onClick={() => pickSite(site)}>
                    <span className="site-option-index">0{index + 1}</span>
                    <span><b>{site.name}</b><small>{site.featureType} / {site.region}</small></span>
                    <i aria-hidden="true">↗</i>
                  </button>
                ))}
              </div>
            </div>

            <div className="sidebar-divider" />

            <div className="sidebar-block">
              <div className="block-heading"><span>02</span><label>DEFINE AN OBSERVER POINT</label></div>
              <p className="input-explainer">Feature centres are reference points, not recommended landing coordinates. Enter a surveyed or study coordinate to define a custom observer.</p>
              <div className="coordinate-fields">
                <label>LATITUDE <input type="number" min="-90" max="90" step="0.0001" placeholder="-89.5000" value={latitude} onChange={(event) => setLatitude(event.target.value)} /></label>
                <label>LONGITUDE <input type="number" min="-180" max="180" step="0.0001" placeholder="120.0000" value={longitude} onChange={(event) => setLongitude(event.target.value)} /></label>
              </div>
              <button className="subtle-action" type="button" onClick={applyCustom}>Use custom coordinate <span>↗</span></button>
              {inputError && <p className="field-error" role="alert">{inputError}</p>}
              {customApplied && <p className="field-success">Custom point active. No local terrain is inferred from this coordinate.</p>}
            </div>

            <div className="sidebar-divider" />

            <div className="sidebar-block">
              <div className="block-heading"><span>03</span><label>OBSERVATION DATE</label></div>
              <input className="date-input" type="date" value={date} onChange={(event) => setDate(event.target.value)} />
              <div className="time-input-row">
                <label>UTC HOUR <b>{String(hour).padStart(2, "0")}:00</b></label>
                <input type="range" min="0" max="23" step="1" value={hour} onChange={(event) => { setHour(Number(event.target.value)); setPlaying(false); }} aria-label="Observation hour in UTC" />
                <div className="range-ticks"><span>00</span><span>06</span><span>12</span><span>18</span><span>23</span></div>
              </div>
            </div>

            <div className="sidebar-divider" />

            <div className="sidebar-block">
              <div className="block-heading"><span>04</span><label>SCENARIO COMPARISON</label></div>
              <div className="compare-mode" role="group" aria-label="Comparison type">
                <button type="button" className={compareMode === "site" ? "selected" : ""} onClick={() => setCompareMode("site")}>Different site</button>
                <button type="button" className={compareMode === "date" ? "selected" : ""} onClick={() => setCompareMode("date")}>Different date</button>
              </div>
              {compareMode === "site" ? (
                <label className="compare-field">SECOND REFERENCE FEATURE
                  <select value={compareSiteId} onChange={(event) => setCompareSiteId(event.target.value)}>
                    {LUNAR_SITES.filter((site) => site.id !== activeSite?.id).map((site) => <option key={site.id} value={site.id}>{site.name}</option>)}
                  </select>
                </label>
              ) : (
                <label className="compare-field">ALTERNATIVE OBSERVATION DATE
                  <input type="date" value={compareDate} onChange={(event) => setCompareDate(event.target.value)} />
                </label>
              )}
            </div>
          </aside>

          <div className="console-main">
            <div className="scene-toolbar">
              <div><span>SPATIAL CONTEXT</span><b>{activeSite.name.toUpperCase()}</b></div>
              <div className="scene-tabs" role="group" aria-label="Spatial view">
                <button type="button" className={view === "map" ? "active" : ""} onClick={() => setView("map")}>POLAR MAP</button>
                <button type="button" className={view === "moon" ? "active" : ""} onClick={() => setView("moon")}>3D MOON</button>
              </div>
            </div>
            <div className={"scene-workspace scene-" + view}>
              {view === "map" ? (
                <SouthPoleMap
                  selectedId={customApplied ? "" : selected.id}
                  onSelect={pickSite}
                  customPoint={customApplied && customValues.valid ? { latitude: customValues.lat, longitude: customValues.lon } : null}
                />
              ) : (
                <div className="explorer-model-stage">
                  <MoonPortal compact label="GLOBAL MOON / ORIENTATION MODEL" />
                  <div className="model-caption">NASA LRO / LOLA · GLOBAL COLOUR + HEIGHT MODEL · NOT A LOCAL DEM</div>
                </div>
              )}
            </div>
            <div className="selected-feature-strip">
              <div><span>FEATURE / OBSERVER</span><b>{activeSite.name}</b></div>
              <div><span>LATITUDE</span><b>{coord(activeSite.latitude, "lat")}</b></div>
              <div><span>LONGITUDE</span><b>{coord(activeSite.longitude, "lon")}</b></div>
              <div><span>OBSERVATION</span><b>{displayDateTime}</b></div>
            </div>

            <div className="feature-context">
              <div><span className="technical-label">TERRAIN / FEATURE CONTEXT</span><p>{activeSite.terrainNote}</p></div>
              <a href={activeSite.sourceUrl} target="_blank" rel="noreferrer">SOURCE RECORD ↗</a>
            </div>
          </div>
        </div>
      </section>

      <section className="explorer-readouts wrap">
        <div className="readout-section-head">
          <div><span className="section-index">05 / CONDITION READOUT</span><h2>What the scenario<br /><em>still needs to tell us.</em></h2></div>
          <p>These are the outputs the challenge calls for. They remain blank until the correct ephemeris and local terrain datasets are connected.</p>
        </div>
        <div className="readout-grid">
          {CONDITION_STATES.map((condition) => (
            <article className="readout-item" key={condition.id}>
              <div className="readout-heading"><span>{condition.label}</span><b>NOT CALCULATED</b></div>
              <p>{condition.detail}</p>
              <small>{condition.state}</small>
              <div className="readout-track"><i /></div>
            </article>
          ))}
        </div>
      </section>

      <section className="timeline-section section-space">
        <div className="wrap">
          <div className="timeline-head">
            <div><span className="section-index">06 / MISSION TIMELINE</span><h2>Move through<br /><em>the observation day.</em></h2></div>
            <div className="timeline-date-readout"><span>SELECTED OBSERVATION</span><b>{displayDateTime}</b></div>
          </div>
          <HorizonPreview hour={hour} siteName={activeSite.name} />
          <div className="timeline-controls">
            <button type="button" className="timeline-play" onClick={() => setPlaying((value) => !value)} aria-pressed={playing}>
              <span>{playing ? "Ⅱ" : "▶"}</span>{playing ? "PAUSE PREVIEW" : "PLAY PREVIEW"}
            </button>
            <input type="range" min="0" max="23" value={hour} onChange={(event) => { setHour(Number(event.target.value)); setPlaying(false); }} aria-label="Scrub the 24-hour conceptual timeline" />
            <div className="timeline-endpoints"><span>00:00 UTC</span><span>06:00</span><span>12:00</span><span>18:00</span><span>23:00</span></div>
            <p>Timeline playback moves an illustrative diagram only. It does not represent a calculated lunar day, solar cycle or communication schedule.</p>
          </div>
        </div>
      </section>

      <section className="comparison-section section-space">
        <div className="wrap">
          <div className="comparison-head">
            <div><span className="section-index">07 / SCENARIO COMPARISON</span><h2>Same questions.<br /><em>Different inputs.</em></h2></div>
            <span>REFERENCE FEATURES / NO RANKING</span>
          </div>
          <div className="scenario-comparison-board">
            <div className="scenario-column">
              <span>SCENARIO A / CURRENT</span>
              <h3>{activeSite.name}</h3>
              <p>{date} · {String(hour).padStart(2, "0")}:00 UTC</p>
              <div><span>Feature centre</span><b>{coord(activeSite.latitude, "lat")} / {coord(activeSite.longitude, "lon")}</b></div>
              <div><span>Solar visibility</span><b>NOT CALCULATED</b></div>
              <div><span>Earth visibility</span><b>NOT CALCULATED</b></div>
              <div><span>Local horizon</span><b>DEM REQUIRED</b></div>
            </div>
            <div className="comparison-divider"><span>VS</span></div>
            <div className="scenario-column">
              <span>SCENARIO B / ALTERNATIVE</span>
              <h3>{compareMode === "site" ? compareSite.name : activeSite.name}</h3>
              <p>{compareMode === "site" ? date + " · same UTC time" : compareDate + " · same location"}</p>
              <div><span>{compareMode === "site" ? "Feature centre" : "Observer point"}</span><b>{compareMode === "site" ? coord(compareSite.latitude, "lat") + " / " + coord(compareSite.longitude, "lon") : coord(activeSite.latitude, "lat") + " / " + coord(activeSite.longitude, "lon")}</b></div>
              <div><span>Solar visibility</span><b>NOT CALCULATED</b></div>
              <div><span>Earth visibility</span><b>NOT CALCULATED</b></div>
              <div><span>Local horizon</span><b>DEM REQUIRED</b></div>
            </div>
          </div>
          <p className="comparison-footnote">Feature coordinates and diameters are read from the USGS Gazetteer of Planetary Nomenclature. No suitability score, sunlight duration or communications window is inferred from the feature record.</p>
        </div>
      </section>

      <section className="explorer-next wrap">
        <div><span className="section-index">NEXT / UNDERSTAND THE METHOD</span><h2>Evidence before<br /><em>conclusions.</em></h2></div>
        <div><p>Read how celestial positions, local terrain and geometric visibility need to be combined, and where power and RF analysis begin.</p><Link className="button button-primary" href="/#science">Read the science <span>↗</span></Link></div>
      </section>
    </main>
  );
}
