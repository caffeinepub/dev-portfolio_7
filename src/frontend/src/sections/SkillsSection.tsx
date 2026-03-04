import { skills } from "../data/portfolio";
import { useScrollReveal } from "../hooks/useScrollReveal";

// Duplicate array for seamless marquee loop
const marqueeSkills = [...skills, ...skills];

// Top 6 skills for proficiency bars
const topSkills = skills.slice(0, 6);

export default function SkillsSection() {
  const [headingRef, headingVisible] = useScrollReveal(0.2);
  const [barsRef, barsVisible] = useScrollReveal(0.2);

  return (
    <section
      id="skills"
      data-ocid="skills.section"
      className="section-padding"
      style={{
        position: "relative",
        zIndex: 1,
        background: "rgba(0,0,0,0.2)",
      }}
    >
      <div className="section-container">
        <div
          ref={headingRef}
          className={`reveal-hidden ${headingVisible ? "reveal-visible" : ""}`}
          style={{ textAlign: "center", marginBottom: "60px" }}
        >
          <h2 className="section-heading" style={{ display: "inline-block" }}>
            My Skills
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              marginTop: "20px",
              maxWidth: "500px",
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: 1.7,
            }}
          >
            Technologies I work with daily to build robust, scalable
            applications.
          </p>
        </div>

        {/* Marquee */}
        <div
          style={{
            overflow: "hidden",
            marginBottom: "70px",
            padding: "8px 0",
            maskImage:
              "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
          }}
          className="skills-marquee-container"
        >
          <div
            style={{
              display: "flex",
              gap: "16px",
              width: "max-content",
              animation: "marquee 22s linear infinite",
            }}
            className="skills-track"
          >
            {marqueeSkills.map((skill, index) => (
              <div
                key={`${skill.name}-${index}`}
                className="glass-card skill-card"
                style={{
                  padding: "22px 28px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "12px",
                  minWidth: "130px",
                  cursor: "default",
                  flexShrink: 0,
                }}
              >
                <img
                  src={skill.icon}
                  alt={skill.name}
                  style={{
                    width: "48px",
                    height: "48px",
                    objectFit: "contain",
                    filter: skill.name === "GitHub" ? "invert(1)" : undefined,
                  }}
                  loading="lazy"
                />
                <span
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    color: "var(--text-secondary)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Proficiency bars */}
        <div
          ref={barsRef}
          className={`reveal-hidden ${barsVisible ? "reveal-visible" : ""}`}
        >
          <h3
            style={{
              fontSize: "1.2rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "32px",
              textAlign: "center",
            }}
          >
            Proficiency Overview
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
            }}
          >
            {topSkills.map((skill) => (
              <div
                key={skill.name}
                className="glass-card"
                style={{ padding: "20px" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      style={{
                        width: "24px",
                        height: "24px",
                        objectFit: "contain",
                        filter:
                          skill.name === "GitHub" ? "invert(1)" : undefined,
                      }}
                      loading="lazy"
                    />
                    <span
                      style={{
                        fontWeight: 600,
                        color: "var(--text-primary)",
                        fontSize: "0.9rem",
                      }}
                    >
                      {skill.name}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      color: "var(--neon)",
                    }}
                  >
                    {skill.proficiency}%
                  </span>
                </div>
                <div className="proficiency-bar">
                  <div
                    className="proficiency-fill"
                    style={{
                      width: barsVisible ? `${skill.proficiency}%` : "0%",
                      transitionDelay: "0.1s",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .skills-track:hover {
          animation-play-state: paused;
        }
        .skill-card:hover {
          box-shadow: 0 0 20px rgba(0,255,136,0.25) !important;
          border-color: var(--neon) !important;
          transform: scale(1.06) translateY(-3px) !important;
          animation: bounce-in 0.3s ease forwards !important;
        }
        .skill-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
      `}</style>
    </section>
  );
}
