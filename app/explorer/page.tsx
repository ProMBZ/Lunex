import ComingSoonPage from "../components/ComingSoonPage";

export const metadata = {
  title: "Mission Explorer",
  description: "Explore lunar south-polar locations, define an observation scenario and compare mission-planning factors.",
};

export default function ExplorerPage() {
  return (
    <ComingSoonPage
      eyebrow="LUNEX / MISSION EXPLORER"
      title="Your next stop: the Moon."
      description="Explore lunar south-polar locations, define an observation scenario and compare the factors that mission teams need to study."
      variant="explorer"
    />
  );
}
