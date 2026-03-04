import { useScrollReveal } from "../hooks/useScrollReveal";

const socials = [
  {
    name: "GitHub",
    ocid: "about.github_link",
    url: "https://github.com/Kundan3930",
    target: "_blank",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        width="22"
        height="22"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "Gmail",
    ocid: "about.gmail_link",
    url: "mailto:kuntel3930@gmail.com",
    target: "_self",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        width="22"
        height="22"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    ocid: "about.linkedin_link",
    url: "https://www.linkedin.com/in/kundan-patel",
    target: "_blank",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        width="22"
        height="22"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    ocid: "about.facebook_link",
    url: "https://www.facebook.com/kundan.patel.988784/",
    target: "_blank",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        width="22"
        height="22"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "LeetCode",
    ocid: "about.leetcode_link",
    url: "https://leetcode.com/u/Kundan2120/",
    target: "_blank",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        width="22"
        height="22"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    ocid: "about.youtube_link",
    url: "https://www.youtube.com/@CodeFire-2120",
    target: "_blank",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        width="22"
        height="22"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export default function AboutSection() {
  const [textRef, textVisible] = useScrollReveal(0.1);
  const [socialRef, socialVisible] = useScrollReveal(0.1);

  return (
    <section
      id="about"
      data-ocid="about.section"
      className="section-padding"
      style={{ position: "relative", zIndex: 1 }}
    >
      <div className="section-container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "60px",
            alignItems: "start",
          }}
          className="about-grid"
        >
          {/* Left — text content */}
          <div
            ref={textRef}
            className={`reveal-hidden ${textVisible ? "reveal-visible" : ""}`}
          >
            <h2 className="section-heading" style={{ marginBottom: "32px" }}>
              About Me
            </h2>

            <p
              style={{
                color: "var(--text-secondary)",
                lineHeight: 1.85,
                marginBottom: "20px",
                fontSize: "1rem",
              }}
            >
              I'm{" "}
              <strong style={{ color: "var(--text-primary)" }}>
                Kundan Patel
              </strong>
              , a FullStack Developer Fresher from Nepal, currently pursuing
              B.Tech in Computer Science &amp; Engineering at Geeta University,
              Panipat. I have a strong foundation in C, C++, and the MERN stack,
              and hands-on experience as a trainer at Birat Global Academy and
              Ocean Institute.
            </p>

            <p
              style={{
                color: "var(--text-secondary)",
                lineHeight: 1.85,
                marginBottom: "20px",
                fontSize: "1rem",
              }}
            >
              My journey started with a passion for technology and problem
              solving. I enjoy building real-world web applications, mentoring
              students, and continuously improving my skills in DSA and
              cybersecurity. I have developed projects using HTML, CSS,
              JavaScript, React.js, Node.js, and MongoDB.
            </p>

            <p
              style={{
                color: "var(--text-secondary)",
                lineHeight: 1.85,
                marginBottom: "32px",
                fontSize: "1rem",
              }}
            >
              <strong style={{ color: "var(--neon)" }}>
                Career Objective:
              </strong>{" "}
              To join an innovative team where I can apply my full-stack skills,
              grow as a developer, and contribute to meaningful products. I am
              eager to learn, lead, and deliver high-quality solutions.
            </p>

            {/* Quick stats */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "16px",
                maxWidth: "400px",
              }}
            >
              {[
                { value: "3+", label: "Projects" },
                { value: "2+", label: "Internships" },
                { value: "2", label: "Certifications" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="glass-card"
                  style={{ padding: "16px", textAlign: "center" }}
                >
                  <div
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: 800,
                      color: "var(--neon)",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--text-secondary)",
                      marginTop: 4,
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — social links */}
          <div
            ref={socialRef}
            className={`reveal-hidden ${socialVisible ? "reveal-visible" : ""}`}
          >
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: "24px",
              }}
            >
              Connect With Me
            </h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, auto)",
                gap: "16px",
                justifyContent: "start",
              }}
            >
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target={social.target}
                  rel={
                    social.target === "_blank"
                      ? "noopener noreferrer"
                      : undefined
                  }
                  data-ocid={social.ocid}
                  aria-label={`Connect on ${social.name}`}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                    padding: "16px 20px",
                    textDecoration: "none",
                  }}
                  className="glass-card social-link-card"
                >
                  <span
                    style={{
                      color: "var(--text-secondary)",
                      transition: "color 0.25s ease",
                    }}
                  >
                    {social.icon}
                  </span>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--text-secondary)",
                      fontWeight: 500,
                      transition: "color 0.25s ease",
                    }}
                  >
                    {social.name}
                  </span>
                </a>
              ))}
            </div>

            {/* Additional info */}
            <div
              className="glass-card"
              style={{ padding: "20px", marginTop: "32px" }}
            >
              <div
                style={{
                  fontSize: "0.85rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.8,
                }}
              >
                <div
                  style={{ display: "flex", gap: "8px", marginBottom: "8px" }}
                >
                  <span style={{ color: "var(--neon)" }}>📍</span>
                  <span>Nepal (Remote Available)</span>
                </div>
                <div
                  style={{ display: "flex", gap: "8px", marginBottom: "8px" }}
                >
                  <span style={{ color: "var(--neon)" }}>📧</span>
                  <span>kuntel3930@gmail.com</span>
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <span style={{ color: "var(--neon)" }}>🎓</span>
                  <span>B.Tech Computer Science & Eng. – Geeta University</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .about-grid {
            grid-template-columns: 3fr 2fr !important;
          }
        }
        .social-link-card:hover {
          box-shadow: 0 0 20px rgba(0,255,136,0.25) !important;
          border-color: rgba(0,255,136,0.35) !important;
          transform: translateY(-4px) scale(1.04) !important;
        }
        .social-link-card:hover span {
          color: var(--neon) !important;
        }
      `}</style>
    </section>
  );
}
