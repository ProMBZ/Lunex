import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
export const metadata: Metadata = {
  title: { default: "Lunex — Lunar Landing Site Navigator", template: "%s | Lunex" },
  description: "Explore the Moon in 3D, examine lunar south-polar locations, and compare the place-and-time factors behind mission planning.",
  applicationName: "Lunex"
};
export const viewport: Viewport = {
  themeColor: "#0B3D91", colorScheme: "dark", width: "device-width", initialScale: 1
};
export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}