import { Briefcase, Calendar, Star } from "lucide-react";
import { experiences } from "../data/portfolio";
import { useScrollReveal } from "../hooks/useScrollReveal";

interface ExperienceCardProps {
  company: string;
  role: string;
  duration: string;
  responsibilities: string[];
  achievement: string;
  index: number;
}

function ExperienceCard({
  company,
  role,
  duration,
  responsibilities,
  achievement,
  index,
}: ExperienceCardProps) {
  const [ref, visible] = useScrollReveal(0.15);

  return (
    <div
      ref={ref}
      className={`reveal-hidden ${visible ? "reveal-visible" : ""}`}
      style={{
        transitionDelay: `${index * 0.15}s`,
        display: "grid",
        gridTemplateColumns: "1fr 40px 1fr",
        alignItems: "start",
        gap: "0 0",
        position: "relative",
      }}
      data-ocid={`experience.item.${index + 1}`}
    >
      {/* Left side — content for even, empty for odd */}
      <div style={{ paddingRight: "32px", textAlign: "right" }}>
        {index % 2 === 0 ? (
          <ExperienceContent
            company={company}
            role={role}
            duration={duration}
            responsibilities={responsibilities}
            achievement={achievement}
          />
        ) : (
          <div />
        )}
      </div>

      {/* Center dot */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="timeline-dot" />
      </div>

      {/* Right side — content for odd, empty for even */}
      <div style={{ paddingLeft: "32px" }}>
        {index % 2 === 1 ? (
          <ExperienceContent
            company={company}
            role={role}
            duration={duration}
            responsibilities={responsibilities}
            achievement={achievement}
          />
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

interface ContentProps {
  company: string;
  role: string;
  duration: string;
  responsibilities: string[];
  achievement: string;
}

function ExperienceContent({
  company,
  role,
  duration,
  responsibilities,
  achievement,
}: ContentProps) {
  return (
    <div className="glass-card" style={{ padding: "24px" }}>
      {/* Company & role */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "6px",
          flexWrap: "wrap",
        }}
      >
        <Briefcase size={14} style={{ color: "var(--neon)", flexShrink: 0 }} />
        <h3
          style={{
            fontSize: "1rem",
            fontWeight: 700,
            color: "var(--text-primary)",
            margin: 0,
          }}
        >
          {company}
        </h3>
      </div>

      <div
        style={{
          fontSize: "0.875rem",
          color: "var(--neon)",
          fontWeight: 600,
          marginBottom: "6px",
        }}
      >
        {role}
      </div>

      {/* Duration badge */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "5px",
          background: "rgba(0,255,136,0.08)",
          border: "1px solid rgba(0,255,136,0.15)",
          borderRadius: "12px",
          padding: "3px 10px",
          fontSize: "0.75rem",
          color: "var(--text-secondary)",
          marginBottom: "14px",
        }}
      >
        <Calendar size={11} style={{ color: "var(--neon)" }} />
        {duration}
      </div>

      {/* Responsibilities */}
      <ul
        style={{
          padding: "0 0 0 16px",
          margin: "0 0 14px 0",
          listStyle: "none",
        }}
      >
        {responsibilities.map((resp) => (
          <li
            key={resp}
            style={{
              color: "var(--text-secondary)",
              fontSize: "0.85rem",
              marginBottom: "5px",
              lineHeight: 1.55,
              position: "relative",
              paddingLeft: "14px",
            }}
          >
            <span
              style={{
                position: "absolute",
                left: 0,
                top: "0.4em",
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: "var(--neon)",
                display: "inline-block",
              }}
            />
            {resp}
          </li>
        ))}
      </ul>

      {/* Key achievement */}
      <div
        style={{
          background: "rgba(0,255,136,0.05)",
          border: "1px solid rgba(0,255,136,0.15)",
          borderRadius: "8px",
          padding: "10px 12px",
          display: "flex",
          gap: "8px",
          alignItems: "flex-start",
        }}
      >
        <Star
          size={12}
          style={{ color: "var(--neon)", flexShrink: 0, marginTop: 2 }}
        />
        <span
          style={{ fontSize: "0.8rem", color: "var(--neon)", fontWeight: 500 }}
        >
          {achievement}
        </span>
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  const [headingRef, headingVisible] = useScrollReveal(0.1);

  return (
    <section
      id="experience"
      data-ocid="experience.section"
      className="section-padding"
      style={{ position: "relative", zIndex: 1 }}
    >
      <div className="section-container">
        <div
          ref={headingRef}
          className={`reveal-hidden ${headingVisible ? "reveal-visible" : ""}`}
          style={{ textAlign: "center", marginBottom: "70px" }}
        >
          <h2 className="section-heading" style={{ display: "inline-block" }}>
            Experience
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
            My professional journey and the impact I've made along the way.
          </p>
        </div>

        {/* Desktop timeline */}
        <div
          style={{ position: "relative", maxWidth: "900px", margin: "0 auto" }}
          className="timeline-desktop"
        >
          {/* Vertical line */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "10px",
              bottom: "10px",
              width: "2px",
              background:
                "linear-gradient(to bottom, transparent, var(--neon) 20%, var(--neon) 80%, transparent)",
              transform: "translateX(-50%)",
            }}
          />

          <div
            style={{ display: "flex", flexDirection: "column", gap: "50px" }}
          >
            {experiences.map((exp, index) => (
              <ExperienceCard key={exp.id} {...exp} index={index} />
            ))}
          </div>
        </div>

        {/* Mobile timeline */}
        <div className="timeline-mobile" style={{ display: "none" }}>
          <div
            style={{
              position: "relative",
              paddingLeft: "32px",
            }}
          >
            {/* Mobile vertical line */}
            <div
              style={{
                position: "absolute",
                left: "6px",
                top: "10px",
                bottom: "10px",
                width: "2px",
                background:
                  "linear-gradient(to bottom, transparent, var(--neon) 20%, var(--neon) 80%, transparent)",
              }}
            />

            <div
              style={{ display: "flex", flexDirection: "column", gap: "32px" }}
            >
              {experiences.map((exp, index) => (
                <div
                  key={exp.id}
                  data-ocid={`experience.item.${index + 1}`}
                  style={{ position: "relative" }}
                >
                  {/* Dot */}
                  <div
                    className="timeline-dot"
                    style={{
                      position: "absolute",
                      left: "-29px",
                      top: "20px",
                    }}
                  />
                  <ExperienceContent {...exp} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .timeline-desktop { display: none !important; }
          .timeline-mobile { display: block !important; }
        }
      `}</style>
    </section>
  );
}
