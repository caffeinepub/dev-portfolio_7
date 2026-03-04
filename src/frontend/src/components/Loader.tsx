import { useEffect, useState } from "react";

interface LoaderProps {
  onDone: () => void;
}

/**
 * Full-screen loader animation shown on first mount.
 * Auto-dismisses after 1.8s with a fade-out effect.
 */
export default function Loader({ onDone }: LoaderProps) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 1400);
    const doneTimer = setTimeout(() => onDone(), 1900);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div
      data-ocid="loader.loading_state"
      style={{
        position: "fixed",
        inset: 0,
        background: "#0d0d0d",
        zIndex: 100000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "24px",
        opacity: fading ? 0 : 1,
        transition: "opacity 0.5s ease",
        pointerEvents: fading ? "none" : "all",
      }}
    >
      {/* Spinning ring */}
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          border: "3px solid rgba(0,255,136,0.15)",
          borderTopColor: "var(--neon)",
          animation: "loader-spin 0.9s linear infinite",
        }}
      />

      {/* Logo / name */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span
          style={{
            fontFamily: "monospace",
            fontSize: "1.4rem",
            fontWeight: 700,
            color: "var(--neon)",
            letterSpacing: "0.08em",
          }}
        >
          &lt;KundanPatel /&gt;
        </span>
        <span
          style={{
            color: "rgba(160,160,160,0.8)",
            fontSize: "0.8rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          Loading...
        </span>
      </div>
    </div>
  );
}
