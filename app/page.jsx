import Link from "next/link";
import MoonPortal from "@/components/mission/moon-portal";
import ProjectOverview from "./components/ProjectOverview";

export const metadata = {
  title: "LunaPath — Explore the Moon",
  description:
    "Explore lunar south-polar locations, choose an observation time, and compare the questions that shape a lunar landing mission.",
};

export default function HomePage() {
  return (
    <main id="main-content" className="home-page">
      <section className="hero-main" aria-labelledby="hero-title">
        <div className="hero-layout">
          <div className="hero-copy">
            <p className="hero-eyebrow">
              <span className="eyebrow-mark" aria-hidden="true" />
              LUNAR LANDING SITE NAVIGATOR
            </p>
            <h1 id="hero-title">
              Explore the Moon.
              <br />
              <span>Think beyond the landing.</span>
            </h1>
            <p className="hero-description">
              LunaPath helps you explore places near the Moon’s south pole.
              Look around the Moon in 3D, choose a place and a time, and compare
              the details that matter when planning a mission.
            </p>

            <div className="hero-actions">
              <Link className="action-button action-button-primary" href="/explorer">
                <span>Open Mission Explorer</span>
                <span className="button-arrow" aria-hidden="true">↗</span>
              </Link>
              <Link className="action-button action-button-secondary" href="/presentation">
                <span className="button-play" aria-hidden="true">▶</span>
                <span>Watch 30 Seconds</span>
              </Link>
            </div>

            <div className="hero-proofline" aria-label="What LunaPath brings together">
              <span>MOON IN 3D</span>
              <i aria-hidden="true" />
              <span>PLACE & TIME</span>
              <i aria-hidden="true" />
              <span>SCENARIO COMPARISON</span>
            </div>
            <p className="hero-footnote">
              One place to explore the surface, the sunlight and the view of Earth.
            </p>
          </div>

          <div className="moon-column" aria-label="Interactive three-dimensional Moon model">
            <div className="moon-aura" aria-hidden="true" />
            <div className="moon-orbit moon-orbit-one" aria-hidden="true" />
            <div className="moon-orbit moon-orbit-two" aria-hidden="true" />
            <div className="moon-object">
              <MoonPortal compact />
            </div>
            <div className="moon-caption">
              <span>NASA LRO / LOLA</span>
              <i aria-hidden="true" />
              <span>GLOBAL MOON MODEL</span>
            </div>
          </div>
        </div>

        <a className="hero-scroll-cue" href="#project-overview">
          <span>DISCOVER LUNAPATH</span>
          <i aria-hidden="true" />
        </a>
      </section>

      <ProjectOverview />
    </main>
  );
}
