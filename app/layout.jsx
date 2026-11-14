import "./globals.css";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import Starfield from "./components/Starfield";
import CustomCursor from "./components/CustomCursor";
import RevealObserver from "./components/RevealObserver";

export const metadata = {
  title: { default: "Lunex — Lunar Landing Site Navigator", template: "%s | Lunex" },
  description: "Explore the Moon in 3D, examine lunar south-polar locations, and compare the place-and-time factors behind mission planning.",
  applicationName: "Lunex",
  icons: { icon: "/favicon.png", shortcut: "/favicon.png", apple: "/favicon.png" },
  keywords: ["Lunex", "Lunar Landing Site Navigator", "NASA Space Apps Challenge 2026", "lunar south pole", "lunar mission planning"],
  openGraph: {
    title: "Lunex — Lunar Landing Site Navigator",
    description: "Explore the Moon in 3D and examine the location, terrain, sunlight, Earth-view and time factors behind lunar mission planning.",
    type: "website",
    siteName: "Lunex",
  },
};

export const viewport = {
  themeColor: "#0B3D91",
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
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
