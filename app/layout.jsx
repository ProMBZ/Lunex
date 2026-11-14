import "./globals.css";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import Starfield from "./components/Starfield";
import CustomCursor from "./components/CustomCursor";
import RevealObserver from "./components/RevealObserver";

export const metadata = {
  title: {
    default: "LunaPath — Lunar Landing Site Navigator",
    template: "%s | LunaPath",
  },
  description:
    "Explore lunar south-pole reference sites, choose an observation date, and understand how terrain, sunlight, Earth visibility and time shape mission planning.",
  applicationName: "LunaPath",
  icons: { icon: "/favicon.svg" },
  keywords: [
    "LunaPath",
    "Lunar Landing Site Navigator",
    "NASA Space Apps Challenge 2026",
    "lunar south pole",
    "lunar landing site comparison",
  ],
  openGraph: {
    title: "LunaPath — Lunar Landing Site Navigator",
    description:
      "Explore lunar south-pole reference sites and the science behind sunlight, Earth visibility, terrain and time.",
    type: "website",
    siteName: "LunaPath",
  },
};

export const viewport = {
  themeColor: "#05070b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Starfield />
        <CustomCursor />
        <RevealObserver />
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
