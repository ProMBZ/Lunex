import MissionExplorer from "@/components/mission/mission-explorer";

export const metadata = {
  title: "Lunar Navigator",
  description:
    "Select lunar south-polar reference features, set an observation date and UTC hour, inspect spatial context and compare scenarios.",
};

export default function ExplorerPage() {
  return <MissionExplorer />;
}
