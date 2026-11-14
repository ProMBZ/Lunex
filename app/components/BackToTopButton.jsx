"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpIcon } from "@/components/ui/arrow-up-icon";

export default function BackToTopButton() {
  const handleBackToTop = () => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label="Back to top"
      title="Back to top"
      onClick={handleBackToTop}
    >
      <ArrowUpIcon />
    </Button>
  );
}
