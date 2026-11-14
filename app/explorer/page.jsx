import Link from "next/link";

export const metadata = {
  title: "Landing Explorer",
  description: "The LunaPath Landing Explorer is coming soon.",
};

function EarthArtwork() {
  return (
    <div className="destination-art destination-art-explorer" aria-hidden="true">
      <div className="destination-art-stars" />
      <div className="destination-orbit destination-orbit-one" />
      <div className="destination-orbit destination-orbit-two" />
      <div className="destination-earth">
        <svg viewBox="0 0 240 240" fill="none">
          <defs>
            <radialGradient id="dest-earth-fill" cx="36%" cy="28%" r="72%">
              <stop offset="0%" stopColor="#a8c9dc" />
              <stop offset="52%" stopColor="#527d9c" />
              <stop offset="100%" stopColor="#172c40" />
            </radialGradient>
            <clipPath id="dest-earth-mask"><circle cx="120" cy="120" r="104" /></clipPath>
          </defs>
          <circle cx="120" cy="120" r="104" fill="url(#dest-earth-fill)" />
          <g clipPath="url(#dest-earth-mask)" fill="#9fbca9" opacity=".76">
            <path d="M44 61 74 42l28 7 9 18-15 18-29-2-13 18-18-14z" />
            <path d="m115 28 26 3 13 20 28 7 7 23-17 20-27-3-9-20-23-9-16-18z" />
            <path d="m119 117 29-10 19 18-6 29-24 16-20-17-17-19z" />
            <path d="m58 139 22-9 16 18-7 28-21 7-17-24z" />
            <path d="m166 166 26-8 22 17-9 25-29 8-17-17z" />
          </g>
          <circle cx="120" cy="120" r="104" stroke="#c0d6e5" strokeOpacity=".55" />
          <path d="M48 80Q100 20 174 54" stroke="#e1eef7" strokeOpacity=".38" strokeWidth="3" />
        </svg>
      </div>
      <span className="destination-art-label label-earth">A CLOSER LOOK AT THE MOON</span>
      <span className="destination-art-label label-orbit">PLACE / TIME / TERRAIN</span>
      <span className="destination-orbit-dot" />
    </div>
  );
}

export default function ExplorerPage() {
  return (
    <main id="main-content" className="destination-page destination-page-explorer">
      <div className="destination-layout">
        <section className="destination-copy">
          <Link className="destination-back" href="/">
            <span aria-hidden="true">←</span> Back to Project Information
          </Link>
          <p className="destination-eyebrow">LUNAPATH / MISSION MODULE 01</p>
          <div className="destination-status">
            <span className="status-pulse" aria-hidden="true" />
            COMING SOON
          </div>
          <h1>Landing Explorer</h1>
          <p className="destination-description">
            A closer look at lunar landing locations. Explore the Moon, inspect
            the conditions around a place, and compare how the picture changes
            with time.
          </p>
          <p className="destination-small-note">
            The interactive exploration experience is being prepared for its
            public release.
          </p>
        </section>
        <EarthArtwork />
      </div>
    </main>
  );
}
