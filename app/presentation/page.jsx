import ComingSoonPage from "../components/ComingSoonPage";

export const metadata = {
  title: "Watch 30 Seconds",
  description: "The LunaPath 30-second walkthrough is coming soon.",
};

export default function PresentationPage() {
  return (
    <ComingSoonPage
      eyebrow="LUNAPATH / QUICK INTRODUCTION"
      title="See the idea in 30 seconds."
      description="The short walkthrough is coming soon. It will show how LunaPath brings lunar places, observation times and mission questions together."
    />
  );
}
