import Link from "next/link";

export const metadata = {
  title: "Presentation",
  description: "The LunaPath project presentation is in progress.",
};

function BriefingArtwork() {
  return (
    <div className="destination-art destination-art-presentation" aria-hidden="true">
      <div className="briefing-orbit briefing-orbit-one" />
      <div className="briefing-orbit briefing-orbit-two" />
      <div className="briefing-sheet briefing-sheet-back"><span /><span /><span /></div>
      <div className="briefing-sheet briefing-sheet-front">
        <div className="briefing-sheet-kicker">LUNAPATH / FIELD BRIEF</div>
        <div className="briefing-sheet-title">The lunar<br />landing question.</div>
        <div className="briefing-sheet-rule" />
        <div className="briefing-sheet-line line-long" />
        <div className="briefing-sheet-line line-medium" />
        <div className="briefing-sheet-line line-short" />
        <div className="briefing-sheet-footer">PLACE · LIGHT · COMMUNICATION</div>
      </div>
      <span className="destination-art-label briefing-label">PROJECT BRIEFING</span>
      <span className="briefing-crosshair" />
    </div>
  );
}

export default function PresentationPage() {
  return (
    <main id="main-content" className="destination-page destination-page-presentation">
      <div className="destination-layout">
        <section className="destination-copy">
          <Link className="destination-back" href="/">
            <span aria-hidden="true">←</span> Back to Project Information
          </Link>
          <p className="destination-eyebrow">LUNAPATH / PROJECT BRIEFING</p>
          <div className="destination-status status-in-progress">
            <span className="status-pulse" aria-hidden="true" />
            IN PROGRESS
          </div>
          <h1>Presentation</h1>
          <p className="destination-description">
            We’re shaping a clear walkthrough of the challenge, the idea behind
            LunaPath, and the work that has gone into the prototype.
          </p>
          <p className="destination-small-note">The presentation experience is being prepared.</p>
        </section>
        <BriefingArtwork />
      </div>
    </main>
  );
}
