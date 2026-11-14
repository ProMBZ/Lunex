import Link from "next/link";

export default function ComingSoonPage({ eyebrow, title, description }) {
  return (
    <main id="main-content" className="destination-page">
      <section className="destination-card" aria-labelledby="destination-title">
        <div className="destination-copy">
          <p className="destination-eyebrow">
            <span aria-hidden="true" />
            {eyebrow}
          </p>
          <div className="destination-status">
            <i aria-hidden="true" />
            COMING SOON
          </div>
          <h1 id="destination-title">{title}</h1>
          <p className="destination-description">{description}</p>
          <Link className="destination-back" href="/">
            <span aria-hidden="true">←</span>
            Back to Project Information
          </Link>
        </div>

        <div className="destination-art" aria-hidden="true">
          <div className="destination-planet" />
          <div className="destination-orbit destination-orbit-one" />
          <div className="destination-orbit destination-orbit-two" />
          <div className="destination-orbit destination-orbit-three" />
          <span className="destination-star destination-star-one" />
          <span className="destination-star destination-star-two" />
          <span className="destination-star destination-star-three" />
          <span className="destination-art-caption">MISSION CONTROL / LUNAPATH</span>
        </div>
      </section>
    </main>
  );
}
