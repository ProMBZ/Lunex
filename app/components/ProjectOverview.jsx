import Link from "next/link";
import DemoWalkthrough from "./DemoWalkthrough";
import { LUNAR_SITES } from "@/lib/mission-data";

function formatCoordinate(value, axis) {
  const direction = axis === "latitude"
    ? value < 0 ? "S" : "N"
    : value < 0 ? "W" : "E";
  return Math.abs(value).toFixed(2) + "° " + direction;
}

const sources = [
  {
    number: "01",
    type: "IN THE PROTOTYPE",
    title: "NASA LRO / LOLA global Moon model",
    description:
      "The interactive 3D Moon provides global colour and height context for orientation. It is not a local south-pole elevation model and cannot establish terrain clearance.",
    link: "https://svs.gsfc.nasa.gov/14959/",
    linkLabel: "NASA model source",
    tone: "source-used",
  },
  {
    number: "02",
    type: "IN THE PROTOTYPE",
    title: "USGS Gazetteer of Planetary Nomenclature",
    description:
      "Named lunar reference features, their feature-centre coordinates and catalogue dimensions supply the locations used by the comparison interface.",
    link: "https://planetarynames.wr.usgs.gov/",
    linkLabel: "USGS lunar records",
    tone: "source-used",
  },
  {
    number: "03",
    type: "REFERENCE TOOLS",
    title: "NASA Moon Trek & LROC QuickMap",
    description:
      "These external tools provide lunar imagery, map layers and terrain-inspection context. They are reference resources, not live map layers embedded in this prototype.",
    link: "https://trek.nasa.gov/moon/",
    linkLabel: "Open Moon Trek",
    secondaryLink: "https://quickmap.lroc.asu.edu/",
    secondaryLabel: "Open LROC QuickMap",
    tone: "source-reference",
  },
  {
    number: "04",
    type: "REQUIRED FOR NEXT STAGE",
    title: "JPL Horizons / NAIF SPICE",
    description:
      "Observer-specific Sun and Earth direction over time requires validated ephemerides, reference frames, a defined observer and a documented time standard. This integration is not connected yet.",
    link: "https://ssd.jpl.nasa.gov/horizons/",
    linkLabel: "JPL Horizons",
    secondaryLink: "https://naif.jpl.nasa.gov/naif/",
    secondaryLabel: "NAIF SPICE",
    tone: "source-planned",
  },
  {
    number: "05",
    type: "REQUIRED FOR NEXT STAGE",
    title: "Regional LOLA elevation data",
    description:
      "A region-matched digital elevation model and a local skyline solver are needed to determine whether the Sun or Earth clears nearby terrain from a specific observer point.",
    link: "https://ode.rsl.wustl.edu/moon/",
    linkLabel: "Lunar Orbiter Data Explorer",
    tone: "source-planned",
  },
];

function SiteGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 3.5v17M3.5 12h17M7 7l10 10M17 7 7 17" />
      <circle cx="12" cy="12" r="2.2" />
    </svg>
  );
}

function TimeGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5l3.5 2" />
      <path d="M12 1.5v2M22.5 12h-2" />
    </svg>
  );
}

function CompareGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="5" width="7" height="14" rx="1" />
      <rect x="13.5" y="5" width="7" height="14" rx="1" />
      <path d="M10.5 9h3M10.5 15h3" />
    </svg>
  );
}

const workflow = [
  {
    number: "01",
    icon: <SiteGlyph />,
    title: "Choose a lunar site",
    description:
      "Start with a named south-polar reference feature or enter your own latitude and longitude. The listed feature centre is a reference coordinate, not a surveyed landing point.",
    detail: "USGS FEATURE RECORDS + CUSTOM COORDINATES",
  },
  {
    number: "02",
    icon: <TimeGlyph />,
    title: "Select a date and time",
    description:
      "Set an observation date and UTC hour. These inputs define the scenario you want to examine; they do not yet trigger live Sun or Earth ephemeris calculations.",
    detail: "DATE INPUT + 24-HOUR UTC CONTROL",
  },
  {
    number: "03",
    icon: <CompareGlyph />,
    title: "Compare the conditions",
    description:
      "Compare two locations or two dates, inspect their coordinates and see which scientific outputs still need validated ephemeris and local terrain data.",
    detail: "SITE / DATE COMPARISON · NO SUITABILITY SCORE",
  },
];

export default function ProjectOverview() {
  return (
    <div className="project-overview">
      <DemoWalkthrough />

      <section className="story-section how-section" id="how-it-works" aria-labelledby="how-title">
        <div className="section-shell">
          <div className="section-heading" data-reveal="up">
            <div>
              <span className="section-kicker">01 / HOW IT WORKS</span>
              <h2 id="how-title">A clear route from<br /><em>place to comparison.</em></h2>
            </div>
            <p>
              LunaPath turns three simple inputs into a structured mission
              scenario: a location, an observation time and a comparison.
            </p>
          </div>
          <div className="workflow-grid">
            {workflow.map((item) => (
              <article className="workflow-card" key={item.number} data-reveal="up">
                <div className="workflow-card-top">
                  <span className="workflow-number">{item.number}</span>
                  <span className="workflow-icon">{item.icon}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span className="workflow-detail">{item.detail}</span>
              </article>
            ))}
          </div>
          <div className="section-action-row">
            <span>TRY THE ACTUAL CONTROLS</span>
            <Link href="/explorer" className="text-link">Open the Lunar Navigator <b>↗</b></Link>
          </div>
        </div>
      </section>

      <section className="story-section evidence-section" id="results" aria-labelledby="results-title">
        <div className="section-shell">
          <div className="section-heading" data-reveal="up">
            <div>
              <span className="section-kicker">02 / REFERENCE POINTS</span>
              <h2 id="results-title">Real lunar locations.<br /><em>Traceable coordinates.</em></h2>
            </div>
            <p>
              These are catalogue records used by the prototype, not invented
              scores or landing recommendations. Each position links to its
              original USGS feature record.
            </p>
          </div>
          <div className="reference-grid">
            {LUNAR_SITES.map((site, index) => (
              <article className="reference-card" key={site.id} data-reveal="up">
                <div className="reference-card-top">
                  <span>REFERENCE FEATURE / 0{index + 1}</span>
                  <span className="reference-dot" aria-hidden="true" />
                </div>
                <h3>{site.name}</h3>
                <p className="reference-region">{site.featureType} · {site.region}</p>
                <div className="coordinate-pair">
                  <div>
                    <span>LATITUDE</span>
                    <b>{formatCoordinate(site.latitude, "latitude")}</b>
                  </div>
                  <div>
                    <span>LONGITUDE</span>
                    <b>{formatCoordinate(site.longitude, "longitude")}</b>
                  </div>
                </div>
                <div className="reference-dimension">
                  <span>"LISTED DIAMETER"</span>
                  <b>{site.diameterKm.toFixed(2)} km</b>
                </div>
                <a href={site.sourceUrl} target="_blank" rel="noreferrer" className="reference-source">
                  {site.usgsId} <span>↗</span>
                </a>
              </article>
            ))}
          </div>
          <p className="evidence-caveat">
            Catalogue centres and dimensions describe named features. They do
            not establish a safe landing zone, local slope, illumination
            duration or communications availability.
          </p>
        </div>
      </section>

      <section className="story-section science-section" id="science" aria-labelledby="science-title">
        <div className="section-shell">
          <div className="section-heading" data-reveal="up">
            <div>
              <span className="section-kicker">03 / SCIENCE & SOURCES</span>
              <h2 id="science-title">Every result needs<br /><em>a source and a method.</em></h2>
            </div>
            <p>
              We distinguish data already represented in the prototype from
              the sources and calculations still needed for scientific
              visibility windows.
            </p>
          </div>

          <div className="method-flow" data-reveal="up">
            <div className="method-node">
              <span>INPUT 01</span>
              <b>Observer coordinates</b>
              <small>USGS feature record or user-defined point</small>
            </div>
            <i aria-hidden="true">→</i>
            <div className="method-node">
              <span>INPUT 02</span>
              <b>Ephemeris</b>
              <small>Sun and Earth direction at the selected UTC time</small>
            </div>
            <i aria-hidden="true">→</i>
            <div className="method-node">
              <span>INPUT 03</span>
              <b>Local terrain</b>
              <small>Elevation model and observer horizon profile</small>
            </div>
            <i aria-hidden="true">→</i>
            <div className="method-node method-node-output">
              <span>OUTPUT</span>
              <b>Visibility windows</b>
              <small>Geometric visibility, with provenance and uncertainty</small>
            </div>
          </div>

          <div className="result-definition-grid" aria-label="What each scientific output represents">
            <article className="result-definition-card" data-reveal="up">
              <div><span>01 / SUN GEOMETRY</span><b>NOT CALCULATED</b></div>
              <h3>Solar azimuth & elevation</h3>
              <p>The Sun's direction and angle above or below the observer's local horizontal plane. A positive elevation alone does not prove the Sun clears nearby terrain.</p>
              <small>NEEDS EPHEMERIS + LOCAL HORIZON</small>
            </article>
            <article className="result-definition-card" data-reveal="up">
              <div><span>02 / EARTH GEOMETRY</span><b>NOT CALCULATED</b></div>
              <h3>Earth elevation & visibility</h3>
              <p>The apparent direction of Earth from the selected observer. Geometric visibility only means a clear line of sight in the model, not a working radio link.</p>
              <small>NEEDS EPHEMERIS + LOCAL HORIZON</small>
            </article>
            <article className="result-definition-card" data-reveal="up">
              <div><span>03 / TERRAIN</span><b>NOT CALCULATED</b></div>
              <h3>Local horizon clearance</h3>
              <p>Compares the Sun or Earth direction with the skyline formed by nearby terrain around a defined observer point and height.</p>
              <small>NEEDS REGIONAL DEM + SKYLINE SOLVER</small>
            </article>
            <article className="result-definition-card" data-reveal="up">
              <div><span>04 / TIME</span><b>NOT CALCULATED</b></div>
              <h3>Visibility windows</h3>
              <p>UTC intervals when a target remains above the required geometric or terrain-aware horizon threshold, including the chosen sampling and uncertainty.</p>
              <small>NEEDS TIME SAMPLING + VALIDATED GEOMETRY</small>
            </article>
            <article className="result-definition-card" data-reveal="up">
              <div><span>05 / POWER</span><b>NOT CALCULATED</b></div>
              <h3>Solar energy context</h3>
              <p>Potential panel energy requires irradiance, incidence angle, array orientation, efficiency, temperature, shadowing and the system's electrical assumptions.</p>
              <small>NEEDS SOLAR-ARRAY + ENERGY MODEL</small>
            </article>
            <article className="result-definition-card" data-reveal="up">
              <div><span>06 / COMMUNICATION</span><b>NOT CALCULATED</b></div>
              <h3>Direct-to-Earth link</h3>
              <p>A usable link also depends on frequency, antenna gains, transmit power, pointing, losses and required margin. Earth visibility by itself is not enough.</p>
              <small>NEEDS RF LINK BUDGET</small>
            </article>
          </div>

          <div className="source-grid">
            {sources.map((source) => (
              <article className={"source-card " + source.tone} key={source.number} data-reveal="up">
                <div className="source-card-top">
                  <span>{source.number} / {source.type}</span>
                  <i aria-hidden="true" />
                </div>
                <h3>{source.title}</h3>
                <p>{source.description}</p>
                <div className="source-card-links">
                  <a href={source.link} target="_blank" rel="noreferrer">{source.linkLabel} <b>↗</b></a>
                  {source.secondaryLink && (
                    <a href={source.secondaryLink} target="_blank" rel="noreferrer">{source.secondaryLabel} <b>↗</b></a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="story-section transparency-section" id="transparency" aria-labelledby="transparency-title">
        <div className="section-shell">
          <div className="section-heading" data-reveal="up">
            <div>
              <span className="section-kicker">04 / PROJECT TRANSPARENCY</span>
              <h2 id="transparency-title">Show what works.<br /><em>Label what does not.</em></h2>
            </div>
            <p>
              A scientific interface should make its assumptions visible.
              LunaPath keeps prototype controls separate from calculated
              results and engineering claims.
            </p>
          </div>

          <div className="transparency-grid">
            <article className="transparency-card" data-reveal="up">
              <span className="transparency-label status-working">WORKING IN PROTOTYPE</span>
              <h3>What you can do today</h3>
              <ul>
                <li>Select named lunar reference features.</li>
                <li>Enter and validate custom coordinates.</li>
                <li>Choose an observation date and UTC hour.</li>
                <li>Compare site or date scenarios.</li>
                <li>Inspect the global Moon model for orientation.</li>
              </ul>
            </article>
            <article className="transparency-card" data-reveal="up">
              <span className="transparency-label status-pending">NOT YET CALCULATED</span>
              <h3>What still needs science</h3>
              <ul>
                <li>Observer-specific Sun and Earth ephemerides.</li>
                <li>Terrain-aware local horizon clearance.</li>
                <li>Actual illumination and visibility windows.</li>
                <li>Solar-array energy and battery modelling.</li>
                <li>RF link budgets and communication margins.</li>
              </ul>
            </article>
            <article className="transparency-card" data-reveal="up">
              <span className="transparency-label status-open">OPEN & DISCLOSED</span>
              <h3>Code, licence and AI use</h3>
              <p>
                The project source is public under Apache-2.0. AI-assisted
                implementation and the human review boundary are documented
                in the repository.
              </p>
              <div className="transparency-links">
                <a href="https://github.com/ProMBZ/LunaPath" target="_blank" rel="noreferrer">GitHub repository ↗</a>
                <a href="https://github.com/ProMBZ/LunaPath/blob/main/LICENSE" target="_blank" rel="noreferrer">Apache-2.0 licence ↗</a>
                <a href="https://github.com/ProMBZ/LunaPath/blob/main/AI_USAGE.md" target="_blank" rel="noreferrer">AI-use disclosure ↗</a>
                <a href="https://github.com/ProMBZ/LunaPath/blob/main/SOURCES.md" target="_blank" rel="noreferrer">Complete source register ↗</a>
              </div>
            </article>
          </div>

          <div className="independence-note" data-reveal="up">
            <span className="independence-mark" aria-hidden="true">L</span>
            <p>
              <b>Built by a family, inspired by lunar exploration.</b>
              <span>LunaPath is an independent educational project created for the 2026 NASA Space Apps Challenge, not an official NASA product.</span>
            </p>
            <Link href="/explorer" className="text-link">Explore the prototype <b>↗</b></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
