import Link from "next/link";
import MoonPortal from "@/components/mission/moon-portal";
import ProjectOverview from "./components/ProjectOverview";

export const metadata = {
  title: "LunaPath — Lunar Landing Site Navigator",
  description:
    "Explore lunar south-pole reference sites, choose an observation date, and understand how terrain, sunlight, Earth visibility and time shape mission planning.",
};

export default function HomePage() {
  return (
    <main id="main-content" className="home-page">
      <section className="hero-main" aria-labelledby="hero-title">
        <div className="hero-layout">
          <div className="hero-copy" data-reveal="left">
            <p className="hero-eyebrow">
              <span className="eyebrow-mark" aria-hidden="true" />
              LUNAR LANDING SITE NAVIGATOR
            </p>
            <h1 id="hero-title">
              Find the right place
              <br />
              <span>and time on the Moon.</span>
            </h1>
            <p className="hero-description">
              Explore lunar south-pole reference sites, select an observation
              date, and inspect the conditions that matter to a mission:
              terrain, sunlight and a view of Earth.
            </p>
            <div className="hero-actions">
              <Link className="hero-action" href="/explorer">
                <span>Open the Lunar Navigator</span>
                <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M4.5 10h10.75M10 4.75 15.25 10 10 15.25" />
                </svg>
              </Link>
              <Link className="hero-action-secondary" href="#demo">
                <span className="play-mark" aria-hidden="true">▶</span>
                Watch the 30-second demo
              </Link>
            </div>
            <div className="hero-proofline" aria-label="Prototype capabilities">
              <span>REFERENCE LOCATIONS</span>
              <i />
              <span>DATE & UTC CONTROLS</span>
              <i />
              <span>SCENARIO COMPARISON</span>
            </div>
            <p className="hero-footnote">
              A landing site is more than a point. It is a relationship between
              terrain, light, Earth and time.
            </p>
          </div>

          <div className="moon-column" aria-label="Interactive 3D Moon model">
            <div className="moon-aura" aria-hidden="true" />
            <div className="moon-orbit moon-orbit-one" aria-hidden="true" />
            <div className="moon-orbit moon-orbit-two" aria-hidden="true" />
            <div className="moon-object">
              <MoonPortal compact />
            </div>
            <div className="moon-caption">
              <span>NASA LRO / LOLA</span>
              <i />
              <span>GLOBAL ORIENTATION MODEL</span>
            </div>
          </div>
        </div>
        <a className="hero-scroll-cue" href="#demo" aria-label="Scroll to the walkthrough">
          <span>SCROLL TO EXPLORE</span>
          <i aria-hidden="true" />
        </a>
      </section>

      <ProjectOverview />
    </main>
  );
}
