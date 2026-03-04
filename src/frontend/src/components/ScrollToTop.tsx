import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Floating scroll-to-top button that appears after scrolling 400px.
 */
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      style={{
        position: "fixed",
        bottom: "32px",
        right: "32px",
        width: "46px",
        height: "46px",
        borderRadius: "50%",
        background: "var(--neon)",
        color: "#0d0d0d",
        border: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9000,
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0.7)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
        pointerEvents: visible ? "auto" : "none",
        boxShadow: "0 0 20px rgba(0,255,136,0.4), 0 4px 12px rgba(0,0,0,0.4)",
        cursor: "pointer",
      }}
    >
      <ChevronUp size={20} strokeWidth={2.5} />
    </button>
  );
}
