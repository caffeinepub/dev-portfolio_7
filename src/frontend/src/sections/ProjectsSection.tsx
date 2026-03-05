import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, ExternalLink, FolderOpen, Github } from "lucide-react";
import { useProjects } from "../hooks/usePortfolioData";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function ProjectsSection() {
  const navigate = useNavigate();
  const { projects, loading } = useProjects();
  const [headingRef, headingVisible] = useScrollReveal(0.1);
  const [gridRef, gridVisible] = useScrollReveal(0.05);

  const handleViewDetails = (id: string) => {
    navigate({ to: "/project/$id", params: { id } });
  };

  return (
    <section
      id="projects"
      data-ocid="projects.section"
      className="section-padding"
      style={{ position: "relative", zIndex: 1 }}
    >
      <div className="section-container">
        <div
          ref={headingRef}
          className={`reveal-hidden ${headingVisible ? "reveal-visible" : ""}`}
          style={{ textAlign: "center", marginBottom: "60px" }}
        >
          <h2 className="section-heading" style={{ display: "inline-block" }}>
            Featured Projects
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              marginTop: "20px",
              maxWidth: "500px",
              margin: "20px auto 0",
              lineHeight: 1.7,
            }}
          >
            A selection of projects that showcase my technical depth and
            problem-solving approach.
          </p>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "24px",
            }}
          >
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="glass-card"
                style={{
                  height: "340px",
                  animation: "pulse 1.5s ease-in-out infinite",
                  opacity: 0.5,
                }}
              />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && projects.length === 0 && (
          <div
            data-ocid="projects.empty_state"
            style={{
              textAlign: "center",
              padding: "80px 20px",
              color: "var(--text-secondary)",
            }}
          >
            <FolderOpen
              size={48}
              style={{ color: "rgba(0,255,136,0.3)", marginBottom: "16px" }}
            />
            <p style={{ fontSize: "0.875rem" }}>
              No projects yet. Add projects in the admin panel.
            </p>
          </div>
        )}

        <div
          ref={gridRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
          }}
          className={`reveal-hidden ${gridVisible ? "reveal-visible" : ""}`}
        >
          {projects.map((project, index) => (
            <article
              key={project.id}
              data-ocid={`projects.card.${index + 1}`}
              className="glass-card project-card"
              style={{
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {/* Thumbnail */}
              <div
                style={{
                  position: "relative",
                  overflow: "hidden",
                  height: "200px",
                }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.4s ease",
                  }}
                  className="project-thumb"
                  loading="lazy"
                />
                {/* Overlay on hover */}
                <div
                  className="project-overlay"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(0,255,136,0.08)",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      background: "var(--neon)",
                      color: "#0d0d0d",
                      padding: "8px 20px",
                      borderRadius: "20px",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    View Details <ArrowRight size={14} />
                  </span>
                </div>
              </div>

              {/* Content */}
              <div
                style={{
                  padding: "20px 22px",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    marginBottom: "8px",
                  }}
                >
                  {project.title}
                </h3>

                <p
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "0.875rem",
                    lineHeight: 1.65,
                    marginBottom: "16px",
                    flex: 1,
                  }}
                >
                  {project.shortDesc}
                </p>

                {/* Tech badges */}
                <div
                  style={{
                    display: "flex",
                    gap: "6px",
                    flexWrap: "wrap",
                    marginBottom: "16px",
                  }}
                >
                  {project.techs.slice(0, 4).map((tech) => (
                    <span key={tech} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action links */}
                <div
                  style={{ display: "flex", gap: "10px", alignItems: "center" }}
                >
                  <button
                    type="button"
                    className="btn-neon"
                    onClick={() => handleViewDetails(project.id)}
                    style={{
                      fontSize: "0.8rem",
                      padding: "8px 14px",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    Details <ArrowRight size={12} />
                  </button>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Live demo"
                    style={{
                      color: "var(--text-secondary)",
                      transition: "color 0.2s",
                    }}
                    className="project-icon-link"
                  >
                    <ExternalLink size={18} />
                  </a>
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub repository"
                    style={{
                      color: "var(--text-secondary)",
                      transition: "color 0.2s",
                    }}
                    className="project-icon-link"
                  >
                    <Github size={18} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .project-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .project-card:hover {
          transform: translateY(-10px) !important;
          box-shadow: 0 20px 50px rgba(0,255,136,0.2), 0 0 30px rgba(0,255,136,0.1) !important;
          border-color: rgba(0,255,136,0.3) !important;
        }
        .project-card:hover .project-thumb {
          transform: scale(1.06);
        }
        .project-card:hover .project-overlay {
          opacity: 1 !important;
        }
        .project-icon-link:hover {
          color: var(--neon) !important;
        }
      `}</style>
    </section>
  );
}
