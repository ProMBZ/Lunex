import ComingSoonPage from "../components/ComingSoonPage";

export const metadata = {
  title: "Mission Explorer",
  description: "The LunaPath Mission Explorer destination is coming soon.",
};

export default function ExplorerPage() {
  return (
    <ComingSoonPage
      eyebrow="LUNAPATH / MISSION EXPLORER"
      title="Your next stop: the Moon."
      description="The Mission Explorer experience is coming soon. You’ll be able to return here from the project page whenever you’re ready to explore."
    />
  );
}
