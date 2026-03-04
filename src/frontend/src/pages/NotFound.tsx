import { useNavigate } from "@tanstack/react-router";
import { Home } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const MATRIX_CHARS =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF";

interface Column {
  x: number;
  y: number;
  speed: number;
  chars: string[];
  length: number;
}

export default function NotFound() {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const fontSize = 14;
    const cols: Column[] = [];

    const initCols = () => {
      cols.length = 0;
      const numCols = Math.floor(canvas.width / fontSize);
      for (let i = 0; i < numCols; i++) {
        cols.push({
          x: i * fontSize,
          y: Math.random() * -canvas.height,
          speed: Math.random() * 1.5 + 0.5,
          chars: Array.from(
            { length: 20 },
            () => MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)],
          ),
          length: Math.floor(Math.random() * 15) + 8,
        });
      }
    };
    initCols();

    let raf: number;

    const render = () => {
      ctx.fillStyle = "rgba(13,13,13,0.06)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (const col of cols) {
        for (let j = 0; j < col.length; j++) {
          const charY = col.y - j * fontSize;
          if (charY < 0 || charY > canvas.height) continue;

          const alpha = (col.length - j) / col.length;
          if (j === 0) {
            ctx.fillStyle = `rgba(200, 255, 220, ${alpha})`;
          } else {
            ctx.fillStyle = `rgba(0, 255, 136, ${alpha * 0.55})`;
          }
          ctx.fillText(col.chars[j % col.chars.length], col.x, charY);

          // Randomly change chars
          if (Math.random() < 0.01) {
            col.chars[j % col.chars.length] =
              MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
          }
        }

        col.y += col.speed;
        if (col.y - col.length * fontSize > canvas.height) {
          col.y = 0;
          col.speed = Math.random() * 1.5 + 0.5;
          col.length = Math.floor(Math.random() * 15) + 8;
        }
      }

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      data-ocid="not_found.section"
      style={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        zIndex: 1,
        padding: "24px",
      }}
    >
      {/* Matrix canvas behind content */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -1,
          opacity: 0.4,
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
          background: "rgba(13,13,13,0.85)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(0,255,136,0.15)",
          borderRadius: "20px",
          padding: "60px 48px",
          maxWidth: "480px",
          width: "100%",
        }}
      >
        {/* 404 */}
        <div
          style={{
            fontSize: "clamp(5rem, 15vw, 9rem)",
            fontWeight: 900,
            color: "var(--neon)",
            lineHeight: 1,
            letterSpacing: "-0.04em",
            textShadow:
              "0 0 30px rgba(0,255,136,0.5), 0 0 60px rgba(0,255,136,0.25)",
            marginBottom: "8px",
            fontFamily: "monospace",
          }}
        >
          404
        </div>

        <h1
          style={{
            fontSize: "1.3rem",
            fontWeight: 700,
            color: "var(--text-primary)",
            marginBottom: "12px",
          }}
        >
          Page Not Found
        </h1>

        <p
          style={{
            color: "var(--text-secondary)",
            lineHeight: 1.7,
            marginBottom: "32px",
            fontSize: "0.9rem",
          }}
        >
          The page you're looking for has vanished into the void. Let's get you
          back on track.
        </p>

        <button
          type="button"
          className="btn-neon"
          data-ocid="not_found.home_button"
          onClick={() => navigate({ to: "/" })}
          style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
        >
          <Home size={16} />
          Go Home
        </button>

        {/* Decorative mono text */}
        <div
          style={{
            marginTop: "32px",
            fontSize: "0.75rem",
            color: "rgba(0,255,136,0.4)",
            fontFamily: "monospace",
          }}
        >
          {"// ERROR: route_not_found"}
        </div>
      </div>
    </div>
  );
}
