import ComingSoonPage from "../components/ComingSoonPage";

export const metadata = {
  title: "Watch 30 Seconds",
  description: "The Lunex 30-second walkthrough is coming soon.",
};

export default function PresentationPage() {
  return (
    <ComingSoonPage
      eyebrow="LUNEX / QUICK INTRODUCTION"
      title="See the idea in 30 seconds."
      description="The short walkthrough is coming soon. It will show how Lunex brings lunar places, observation times and mission questions together."
    />
  );
}
