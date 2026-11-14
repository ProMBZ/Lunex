import "./globals.css";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import Starfield from "./components/Starfield";

export const metadata = {
  title: {
    default: "LunaPath — Lunar Landing Site Navigator",
    template: "%s | LunaPath",
  },
  description:
    "Explore the Moon in 3D, look at lunar south-polar locations, and understand the place-and-time questions behind a landing mission.",
  applicationName: "LunaPath",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  keywords: [
    "LunaPath",
    "Lunar Landing Site Navigator",
    "NASA Space Apps Challenge 2026",
    "lunar south pole",
    "lunar exploration",
  ],
  openGraph: {
    title: "LunaPath — Lunar Landing Site Navigator",
    description:
      "Explore the Moon in 3D and understand the place-and-time questions behind a lunar landing mission.",
    type: "website",
    siteName: "LunaPath",
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
