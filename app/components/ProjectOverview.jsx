import Image from "next/image";
import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Choose a place",
    description: "Look at a lunar location or enter coordinates of your own.",
  },
  {
    number: "02",
    title: "Pick a time",
    description: "Set the date and hour you want to explore.",
  },
  {
    number: "03",
    title: "Compare the view",
    description: "Put locations or times side by side and explore the differences.",
  },
];

export default function ProjectOverview() {
  return (
    <section
      className="overview-section"
      id="project-overview"
      aria-labelledby="overview-title"
    >
      <div className="overview-shell">
        <div className="overview-copy">
          <p className="section-eyebrow">
            <span aria-hidden="true" />
            WHAT IS LUNAPATH?
          </p>
          <h2 id="overview-title">
            Big Moon questions.
            <br />
            <em>Made easier to explore.</em>
          </h2>
          <p className="overview-lede">
            A Moon mission needs more than a place to land. It also needs the
            right view of the ground, the Sun and Earth. LunaPath brings those
            questions together in one simple experience, so people can explore
            lunar places, try different times and compare scenarios.
          </p>

          <div className="overview-steps">
            {steps.map((step) => (
              <article className="overview-step" key={step.number}>
                <span className="overview-step-number">{step.number}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </article>
            ))}
          </div>

          <Link className="overview-link" href="/explorer">
            <span>Open Mission Explorer</span>
            <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <div className="overview-visual" aria-label="Astronaut and satellite floating above the Moon">
          <div className="visual-glow" aria-hidden="true" />
          <div className="visual-orbit visual-orbit-one" aria-hidden="true" />
          <div className="visual-orbit visual-orbit-two" aria-hidden="true" />
          <div className="visual-orbit-dot" aria-hidden="true" />
          <span className="visual-label">LUNAR EXPLORATION / 01</span>
          <span className="visual-coordinate" aria-hidden="true">SOUTH POLE</span>

          <Image
            className="satellite-art"
            src="/satellite.png"
            alt="Satellite floating above the Moon"
            width={420}
            height={300}
            sizes="(max-width: 760px) 34vw, 280px"
          />
          <Image
            className="astronaut-art"
            src="/astronaut.jpg"
            alt="Astronaut floating in space"
            width={620}
            height={760}
            sizes="(max-width: 760px) 58vw, 430px"
          />
          <div className="visual-caption">
            <span className="caption-mark" aria-hidden="true" />
            EXPLORE · COMPARE · DISCOVER
          </div>
        </div>
      </div>
    </section>
  );
}
