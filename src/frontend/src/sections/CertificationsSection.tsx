import { Award, ExternalLink } from "lucide-react";
import { certifications } from "../data/portfolio";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function CertificationsSection() {
  const [headingRef, headingVisible] = useScrollReveal(0.1);
  const [gridRef, gridVisible] = useScrollReveal(0.05);

  return (
    <section
      id="certifications"
      data-ocid="certs.section"
      className="section-padding"
      style={{
        position: "relative",
        zIndex: 1,
        background: "rgba(0,0,0,0.15)",
      }}
    >
      <div className="section-container">
        <div
          ref={headingRef}
          className={`reveal-hidden ${headingVisible ? "reveal-visible" : ""}`}
          style={{ textAlign: "center", marginBottom: "60px" }}
        >
          <h2 className="section-heading" style={{ display: "inline-block" }}>
            Certifications
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
            Verified credentials from industry-recognized platforms.
          </p>
        </div>

        <div
          ref={gridRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
            maxWidth: "960px",
            margin: "0 auto",
          }}
          className={`reveal-hidden ${gridVisible ? "reveal-visible" : ""}`}
        >
          {certifications.map((cert, index) => (
            <a
              key={cert.id}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid={`certs.card.${index + 1}`}
              className="glass-card cert-card"
              style={{
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                textDecoration: "none",
                cursor: "pointer",
              }}
              aria-label={`View ${cert.title} certificate`}
            >
              {/* Certificate image */}
              <div
                style={{
                  position: "relative",
                  height: "160px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={cert.image}
                  alt={cert.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.4s ease",
                  }}
                  className="cert-thumb"
                  loading="lazy"
                />
                {/* Open icon overlay */}
                <div
                  className="cert-overlay"
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    background: "rgba(0,255,136,0.85)",
                    borderRadius: "50%",
                    width: "32px",
                    height: "32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                    color: "#0d0d0d",
                  }}
                >
                  <ExternalLink size={14} />
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: "18px 20px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    marginBottom: "8px",
                  }}
                >
                  <Award
                    size={16}
                    style={{
                      color: "var(--neon)",
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  />
                  <h3
                    style={{
                      fontSize: "0.95rem",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      lineHeight: 1.35,
                    }}
                  >
                    {cert.title}
                  </h3>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--neon)",
                      fontWeight: 600,
                    }}
                  >
                    {cert.issuer}
                  </span>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--text-secondary)",
                      background: "rgba(255,255,255,0.06)",
                      padding: "2px 10px",
                      borderRadius: "10px",
                    }}
                  >
                    {cert.date}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        .cert-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .cert-card:hover {
          transform: scale(1.04) translateY(-6px) !important;
          box-shadow: 0 20px 40px rgba(0,255,136,0.2) !important;
          border-color: rgba(0,255,136,0.4) !important;
          animation: bounce-in 0.3s ease forwards !important;
        }
        .cert-card:hover .cert-thumb {
          transform: scale(1.08);
        }
        .cert-card:hover .cert-overlay {
          opacity: 1 !important;
        }
      `}</style>
    </section>
  );
}
