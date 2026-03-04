import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  opacity: number;
  color: string;
}

/**
 * Canvas-based background effect:
 * - Radial glow that follows the mouse cursor
 * - Floating green particles that drift upward
 */
export default function BackgroundEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -500, y: -500 });
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);
  const opacityRef = useRef(0.7);
  const opacityDirRef = useRef(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize canvas
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Init particles
    const initParticles = () => {
      particlesRef.current = Array.from({ length: 22 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.5 + 0.5,
        speedY: Math.random() * 0.6 + 0.2,
        opacity: Math.random() * 0.5 + 0.2,
        color: Math.random() > 0.5 ? "#00ff88" : "#00c864",
      }));
    };
    initParticles();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Pulse canvas opacity
      opacityRef.current += opacityDirRef.current * 0.003;
      if (opacityRef.current >= 1) opacityDirRef.current = -1;
      if (opacityRef.current <= 0.5) opacityDirRef.current = 1;

      ctx.globalAlpha = opacityRef.current;

      // Draw mouse glow
      const { x, y } = mouseRef.current;
      if (x > 0 && y > 0) {
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 320);
        gradient.addColorStop(0, "rgba(0, 255, 136, 0.07)");
        gradient.addColorStop(0.4, "rgba(0, 255, 136, 0.025)");
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Draw static ambient glow spots
      const ambientGradient = ctx.createRadialGradient(
        canvas.width * 0.15,
        canvas.height * 0.3,
        0,
        canvas.width * 0.15,
        canvas.height * 0.3,
        canvas.width * 0.35,
      );
      ambientGradient.addColorStop(0, "rgba(0, 255, 136, 0.025)");
      ambientGradient.addColorStop(1, "transparent");
      ctx.fillStyle = ambientGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const ambientGradient2 = ctx.createRadialGradient(
        canvas.width * 0.85,
        canvas.height * 0.7,
        0,
        canvas.width * 0.85,
        canvas.height * 0.7,
        canvas.width * 0.3,
      );
      ambientGradient2.addColorStop(0, "rgba(0, 200, 100, 0.02)");
      ambientGradient2.addColorStop(1, "transparent");
      ctx.fillStyle = ambientGradient2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      for (const p of particlesRef.current) {
        ctx.globalAlpha = p.opacity * opacityRef.current;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Soft glow
        const pGlow = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.size * 4,
        );
        pGlow.addColorStop(0, `${p.color}40`);
        pGlow.addColorStop(1, "transparent");
        ctx.fillStyle = pGlow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fill();

        // Move upward
        p.y -= p.speedY;

        // Reset when out of view
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
          p.opacity = Math.random() * 0.5 + 0.2;
        }
      }

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(render);
    };

    animationRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
