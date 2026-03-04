import AboutSection from "../sections/AboutSection";
import CertificationsSection from "../sections/CertificationsSection";
import ContactSection from "../sections/ContactSection";
import ExperienceSection from "../sections/ExperienceSection";
import HeroSection from "../sections/HeroSection";
import ProjectsSection from "../sections/ProjectsSection";
import SkillsSection from "../sections/SkillsSection";

const footerSocials = [
  {
    name: "GitHub",
    ocid: "footer.github_link",
    url: "https://github.com/Kundan3930",
    target: "_blank",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        width="20"
        height="20"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    ocid: "footer.linkedin_link",
    url: "https://www.linkedin.com/in/kundan-patel",
    target: "_blank",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        width="20"
        height="20"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "LeetCode",
    ocid: "footer.leetcode_link",
    url: "https://leetcode.com/u/Kundan2120/",
    target: "_blank",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        width="20"
        height="20"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    ocid: "footer.facebook_link",
    url: "https://www.facebook.com/kundan.patel.988784/",
    target: "_blank",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        width="20"
        height="20"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "Gmail",
    ocid: "footer.gmail_link",
    url: "mailto:kuntel3930@gmail.com",
    target: "_self",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        width="20"
        height="20"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    ocid: "footer.youtube_link",
    url: "https://www.youtube.com/@CodeFire-2120",
    target: "_blank",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        width="20"
        height="20"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export default function Home() {
  const currentYear = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined"
      ? encodeURIComponent(window.location.hostname)
      : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`;

  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <CertificationsSection />
      <ContactSection />

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid rgba(0,255,136,0.08)",
          padding: "40px 0 28px",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="section-container">
          {/* Social icons row */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "12px",
              flexWrap: "wrap",
              marginBottom: "24px",
            }}
          >
            {footerSocials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target={social.target}
                rel={
                  social.target === "_blank" ? "noopener noreferrer" : undefined
                }
                data-ocid={social.ocid}
                aria-label={social.name}
                className="footer-social-icon"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "5px",
                  padding: "12px 14px",
                  borderRadius: "10px",
                  border: "1px solid rgba(0,255,136,0.12)",
                  background: "rgba(0,255,136,0.04)",
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  transition:
                    "color 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease, transform 0.25s ease",
                  backdropFilter: "blur(8px)",
                }}
              >
                {social.icon}
                <span
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 500,
                    letterSpacing: "0.03em",
                  }}
                >
                  {social.name}
                </span>
              </a>
            ))}
          </div>

          {/* Divider */}
          <div
            style={{
              width: "60px",
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, rgba(0,255,136,0.4), transparent)",
              margin: "0 auto 20px",
            }}
          />

          {/* Copyright */}
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "0.875rem",
              margin: 0,
            }}
          >
            © {currentYear} Kundan Patel. Built with ❤️ using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "var(--neon)",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              caffeine.ai
            </a>
          </p>
        </div>

        <style>{`
          .footer-social-icon:hover {
            color: var(--neon) !important;
            box-shadow: 0 0 18px rgba(0,255,136,0.3) !important;
            border-color: rgba(0,255,136,0.4) !important;
            transform: translateY(-3px) !important;
          }
          .footer-social-icon:hover span {
            color: var(--neon) !important;
          }
        `}</style>
      </footer>
    </>
  );
}
