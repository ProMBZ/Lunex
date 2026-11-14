import Link from "next/link";
import MoonPortal from "@/components/mission/moon-portal";
import ProjectOverview from "./components/ProjectOverview";

export const metadata = {
  title: "LunaPath — Find your place on the Moon",
  description:
    "LunaPath helps people compare lunar landing locations and understand how sunlight and a clear view of Earth change with place and time.",
};

export default function HomePage() {
  return (
    <main id="main-content" className="home-page">
      <section className="hero-main">
        <div className="hero-layout">
          <div className="hero-copy">
            <p className="hero-eyebrow">
              <span className="eyebrow-mark" aria-hidden="true" />
              NASA SPACE APPS CHALLENGE · 2026
            </p>
            <h1>
              Choose a place
              <br />
              on the <span>Moon.</span>
            </h1>
            <p className="hero-description">
              LunaPath helps you compare lunar landing locations and understand
              how sunlight and a clear view of Earth can change with place and
              time.
            </p>
            <Link className="hero-action" href="/explorer">
              <span>Explore Landing Explorer</span>
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M4.5 10h10.75M10 4.75 15.25 10 10 15.25" />
              </svg>
            </Link>
            <p className="hero-footnote">
              One place. Different conditions. Better questions.
            </p>
          </div>
          <div className="moon-column" aria-label="Interactive 3D Moon model">
            <div className="moon-aura" aria-hidden="true" />
            <div className="moon-orbit moon-orbit-one" aria-hidden="true" />
            <div className="moon-orbit moon-orbit-two" aria-hidden="true" />
            <div className="moon-object">
              <MoonPortal compact />
            </div>
          </div>
        </div>
      </section>
      <ProjectOverview />
    </main>
  );
}
