import { useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle,
  ExternalLink,
  Github,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { projects } from "../data/portfolio";

export default function ProjectDetail() {
  const { id } = useParams({ from: "/project/$id" });
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  const project = projects.find((p) => p.id === id);

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally reset on id change
  useEffect(() => {
    window.scrollTo(0, 0);
    setMounted(false);
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, [id]);

  if (!project) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",
          zIndex: 1,
          position: "relative",
        }}
      >
        <h1 style={{ fontSize: "2rem", color: "var(--neon)" }}>
          Project Not Found
        </h1>
        <button
          type="button"
          className="btn-outline-neon"
          onClick={() => navigate({ to: "/" })}
        >
          Back to Portfolio
        </button>
      </div>
    );
  }

  return (
    <div
      data-ocid="project_detail.section"
      style={{
        minHeight: "100vh",
        position: "relative",
        zIndex: 1,
        paddingTop: "88px",
        paddingBottom: "80px",
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
    >
      <div className="section-container" style={{ maxWidth: "900px" }}>
        {/* Back button */}
        <button
          type="button"
          data-ocid="project_detail.back_button"
          onClick={() => navigate({ to: "/" })}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            color: "var(--text-secondary)",
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "8px",
            padding: "8px 16px",
            fontSize: "0.875rem",
            fontWeight: 500,
            marginBottom: "36px",
            transition: "all 0.2s ease",
            cursor: "pointer",
          }}
          className="back-btn"
        >
          <ArrowLeft size={16} />
          Back to Portfolio
        </button>

        {/* Hero image */}
        <div
          style={{
            borderRadius: "12px",
            overflow: "hidden",
            marginBottom: "40px",
            border: "1px solid rgba(0,255,136,0.12)",
            boxShadow: "0 0 40px rgba(0,255,136,0.1)",
          }}
        >
          <img
            src={project.image}
            alt={project.title}
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "420px",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>

        {/* Title & meta */}
        <div style={{ marginBottom: "32px" }}>
          <h1
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 800,
              color: "var(--text-primary)",
              marginBottom: "12px",
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
            }}
          >
            {project.title}
          </h1>

          {/* Tech badges */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              marginBottom: "20px",
            }}
          >
            {project.techs.map((tech) => (
              <span key={tech} className="tech-badge">
                {tech}
              </span>
            ))}
          </div>

          {/* CTA buttons */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="project_detail.demo_button"
              className="btn-neon"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                textDecoration: "none",
              }}
            >
              <ExternalLink size={16} />
              Live Demo
            </a>
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="project_detail.repo_button"
              className="btn-outline-neon"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                textDecoration: "none",
              }}
            >
              <Github size={16} />
              GitHub Repo
            </a>
          </div>
        </div>

        {/* Description */}
        <div
          className="glass-card"
          style={{ padding: "28px", marginBottom: "24px" }}
        >
          <h2
            style={{
              fontSize: "1.1rem",
              fontWeight: 700,
              color: "var(--neon)",
              marginBottom: "14px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <BookOpen size={16} /> Overview
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              lineHeight: 1.8,
              fontSize: "0.95rem",
            }}
          >
            {project.description}
          </p>
        </div>

        {/* Features */}
        <div
          className="glass-card"
          style={{ padding: "28px", marginBottom: "24px" }}
        >
          <h2
            style={{
              fontSize: "1.1rem",
              fontWeight: 700,
              color: "var(--neon)",
              marginBottom: "14px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Zap size={16} /> Key Features
          </h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {project.features.map((feature, i) => (
              <li
                key={feature}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  padding: "8px 0",
                  borderBottom:
                    i < project.features.length - 1
                      ? "1px solid rgba(255,255,255,0.05)"
                      : "none",
                  color: "var(--text-secondary)",
                  fontSize: "0.9rem",
                  lineHeight: 1.6,
                }}
              >
                <CheckCircle
                  size={14}
                  style={{ color: "var(--neon)", flexShrink: 0, marginTop: 3 }}
                />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Two columns — Challenges + Learned */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
          }}
          className="detail-cols"
        >
          <div className="glass-card" style={{ padding: "28px" }}>
            <h2
              style={{
                fontSize: "1rem",
                fontWeight: 700,
                color: "var(--neon)",
                marginBottom: "12px",
              }}
            >
              🧩 Challenges Faced
            </h2>
            <p
              style={{
                color: "var(--text-secondary)",
                lineHeight: 1.75,
                fontSize: "0.9rem",
              }}
            >
              {project.challenges}
            </p>
          </div>

          <div className="glass-card" style={{ padding: "28px" }}>
            <h2
              style={{
                fontSize: "1rem",
                fontWeight: 700,
                color: "var(--neon)",
                marginBottom: "12px",
              }}
            >
              💡 What I Learned
            </h2>
            <p
              style={{
                color: "var(--text-secondary)",
                lineHeight: 1.75,
                fontSize: "0.9rem",
              }}
            >
              {project.learned}
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .detail-cols {
            grid-template-columns: 1fr !important;
          }
        }
        .back-btn:hover {
          border-color: var(--neon) !important;
          color: var(--neon) !important;
        }
      `}</style>
    </div>
  );
}
