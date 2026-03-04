import { useEffect, useState } from "react";

/**
 * Thin scroll progress bar fixed at the top of the viewport.
 */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress((scrollY / docHeight) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      data-ocid="scroll.progress_panel"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: 3,
        width: `${progress}%`,
        background: "linear-gradient(90deg, #00ff88, #00c864)",
        zIndex: 10000,
        transition: "width 0.1s linear",
        boxShadow: "0 0 8px rgba(0,255,136,0.5)",
      }}
      aria-hidden="true"
    />
  );
}
