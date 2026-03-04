import { ChevronDown, Download, Eye, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { useTypingEffect } from "../hooks/useTypingEffect";

const typingStrings = [
  "C++ Developer",
  "MERN Stack Expert",
  "Problem Solver",
  "Open Source Contributor",
  "Full Stack Engineer",
];

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const typedText = useTypingEffect(typingStrings);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="home"
      data-ocid="hero.section"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        zIndex: 1,
        paddingTop: "80px",
      }}
    >
      <div className="section-container" style={{ width: "100%" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "60px",
            alignItems: "center",
          }}
          className="hero-grid"
        >
          {/* Left content */}
          <div
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateX(0)" : "translateX(-60px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            {/* Available badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(0,255,136,0.08)",
                border: "1px solid rgba(0,255,136,0.2)",
                borderRadius: "20px",
                padding: "6px 14px",
                marginBottom: "24px",
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "var(--neon)",
                  display: "inline-block",
                  animation: "glow-pulse 1.5s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontSize: "0.8rem",
                  color: "var(--neon)",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                }}
              >
                Available for Work
              </span>
            </div>

            {/* Main heading */}
            <h1
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                fontWeight: 800,
                color: "var(--text-primary)",
                margin: "0 0 12px",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
              }}
            >
              Hi, I'm{" "}
              <span style={{ color: "var(--neon)", display: "inline-block" }}>
                Kundan Patel
              </span>
            </h1>

            {/* Subtitle */}
            <h2
              style={{
                fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
                fontWeight: 500,
                color: "var(--text-secondary)",
                margin: "0 0 20px",
                letterSpacing: "0.01em",
              }}
            >
              Full Stack Developer &amp; Software Engineer
            </h2>

            {/* Typing effect */}
            <div
              style={{
                fontSize: "clamp(1rem, 2.2vw, 1.25rem)",
                fontWeight: 600,
                color: "var(--neon)",
                marginBottom: "24px",
                minHeight: "1.6em",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span>{typedText}</span>
              <span className="typing-cursor" />
            </div>

            {/* Bio */}
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "1rem",
                lineHeight: 1.75,
                maxWidth: "540px",
                marginBottom: "40px",
              }}
            >
              FullStack Developer Fresher from Nepal, skilled in C++, MERN
              Stack, DSA, and Cyber Security. Passionate about building
              real-world web applications and mentoring others. Let's build
              something remarkable together.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <button
                type="button"
                className="btn-neon"
                onClick={() => handleScroll("projects")}
                data-ocid="hero.view_projects_button"
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <Eye size={16} />
                View Projects
              </button>
              <a
                href="/assets/uploads/Screenshot-2026-03-03-155516-1-2.png"
                download="Kundan_Patel_Resume.png"
                className="btn-outline-neon"
                data-ocid="hero.download_resume_button"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  textDecoration: "none",
                }}
              >
                <Download size={16} />
                Download Resume
              </a>
              <button
                type="button"
                className="btn-ghost-neon"
                onClick={() => handleScroll("contact")}
                data-ocid="hero.contact_button"
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <Mail size={16} />
                Contact Me
              </button>
            </div>
          </div>

          {/* Right — profile image */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateX(0)" : "translateX(60px)",
              transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
            }}
          >
            {/* Glow halo behind image */}
            <div
              style={{
                position: "relative",
                display: "inline-block",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: "-30px",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(0,255,136,0.18) 0%, transparent 70%)",
                  animation: "glow-pulse 3s ease-in-out infinite",
                }}
              />

              {/* Profile image circle */}
              <div
                style={{
                  width: "clamp(240px, 30vw, 340px)",
                  height: "clamp(240px, 30vw, 340px)",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "3px solid var(--neon)",
                  position: "relative",
                  animation:
                    "float 4s ease-in-out infinite, pulse-glow 3s ease-in-out infinite",
                  flexShrink: 0,
                }}
              >
                <img
                  src="/assets/uploads/kp-pp-1-1.jpeg"
                  alt="Kundan Patel - Full Stack Developer"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center top",
                  }}
                  loading="eager"
                />
              </div>

              {/* Floating badge — experience */}
              <div
                style={{
                  position: "absolute",
                  bottom: "10px",
                  left: "-30px",
                  background: "rgba(13,13,13,0.95)",
                  border: "1px solid rgba(0,255,136,0.25)",
                  borderRadius: "10px",
                  padding: "8px 14px",
                  backdropFilter: "blur(12px)",
                  animation: "float 4s ease-in-out infinite 1s",
                }}
              >
                <div
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 800,
                    color: "var(--neon)",
                    lineHeight: 1,
                  }}
                >
                  2+
                </div>
                <div
                  style={{
                    fontSize: "0.7rem",
                    color: "var(--text-secondary)",
                    marginTop: 2,
                  }}
                >
                  Internships
                </div>
              </div>

              {/* Floating badge — projects */}
              <div
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "-30px",
                  background: "rgba(13,13,13,0.95)",
                  border: "1px solid rgba(0,255,136,0.25)",
                  borderRadius: "10px",
                  padding: "8px 14px",
                  backdropFilter: "blur(12px)",
                  animation: "float 4s ease-in-out infinite 2s",
                }}
              >
                <div
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 800,
                    color: "var(--neon)",
                    lineHeight: 1,
                  }}
                >
                  3+
                </div>
                <div
                  style={{
                    fontSize: "0.7rem",
                    color: "var(--text-secondary)",
                    marginTop: 2,
                  }}
                >
                  Projects
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        type="button"
        style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          animation: "chevron-bounce 1.8s ease-in-out infinite",
          color: "var(--neon)",
          opacity: 0.7,
          background: "transparent",
          border: "none",
          padding: 0,
        }}
        onClick={() => handleScroll("about")}
        aria-label="Scroll down"
      >
        <ChevronDown size={28} />
      </button>

      <style>{`
        @media (min-width: 768px) {
          .hero-grid {
            grid-template-columns: 3fr 2fr !important;
          }
        }
      `}</style>
    </section>
  );
}
