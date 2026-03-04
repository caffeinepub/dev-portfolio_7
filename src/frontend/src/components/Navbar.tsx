import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "#home", ocid: "nav.home_link" },
  { label: "About", href: "#about", ocid: "nav.about_link" },
  { label: "Skills", href: "#skills", ocid: "nav.skills_link" },
  { label: "Projects", href: "#projects", ocid: "nav.projects_link" },
  { label: "Experience", href: "#experience", ocid: "nav.experience_link" },
  {
    label: "Certifications",
    href: "#certifications",
    ocid: "nav.certifications_link",
  },
  { label: "Contact", href: "#contact", ocid: "nav.contact_link" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection observer for active section highlighting
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.slice(1));
    const observers: IntersectionObserver[] = [];

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.3 },
      );
      obs.observe(el);
      observers.push(obs);
    }

    return () => {
      for (const o of observers) o.disconnect();
    };
  }, []);

  const handleNavClick = (href: string) => {
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMenuOpen(false);
  };

  const handleHireMe = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9000,
        background: scrolled ? "rgba(13,13,13,0.92)" : "rgba(13,13,13,0.3)",
        backdropFilter: scrolled ? "blur(16px)" : "blur(4px)",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "blur(4px)",
        borderBottom: scrolled
          ? "1px solid rgba(0,255,136,0.08)"
          : "1px solid transparent",
        transition: "all 0.4s ease",
      }}
    >
      <nav
        className="section-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 68,
        }}
      >
        {/* Logo */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("#home");
          }}
          style={{
            fontFamily: "monospace",
            fontSize: "1.25rem",
            fontWeight: 700,
            color: "var(--neon)",
            textDecoration: "none",
            letterSpacing: "0.04em",
          }}
        >
          &lt;KundanPatel /&gt;
        </a>

        {/* Desktop nav links */}
        <ul
          style={{
            display: "flex",
            gap: "4px",
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
          className="hidden md:flex"
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                data-ocid={link.ocid}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                style={{
                  color:
                    activeSection === link.href.slice(1)
                      ? "var(--neon)"
                      : "var(--text-secondary)",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  padding: "6px 10px",
                  borderRadius: 6,
                  transition: "color 0.2s ease, background 0.2s ease",
                  background:
                    activeSection === link.href.slice(1)
                      ? "rgba(0,255,136,0.08)"
                      : "transparent",
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Hire Me CTA */}
        <button
          type="button"
          className="btn-neon hidden md:block"
          onClick={handleHireMe}
          style={{ padding: "8px 20px", fontSize: "0.875rem" }}
          data-ocid="nav.hire_button"
        >
          Hire Me
        </button>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          style={{
            background: "transparent",
            border: "none",
            color: "var(--text-primary)",
            padding: "8px",
            borderRadius: "6px",
          }}
          data-ocid="nav.menu_toggle"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        style={{
          overflow: "hidden",
          maxHeight: menuOpen ? "480px" : "0",
          transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          background: "rgba(13,13,13,0.97)",
          borderBottom: menuOpen ? "1px solid rgba(0,255,136,0.1)" : "none",
        }}
        className="md:hidden"
      >
        <div
          className="section-container"
          style={{ padding: "12px 24px 24px" }}
        >
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  data-ocid={`${link.ocid}_mobile`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  style={{
                    display: "block",
                    color:
                      activeSection === link.href.slice(1)
                        ? "var(--neon)"
                        : "var(--text-secondary)",
                    textDecoration: "none",
                    padding: "12px 0",
                    fontSize: "1rem",
                    fontWeight: 500,
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    transition: "color 0.2s ease",
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="btn-neon"
            onClick={handleHireMe}
            style={{ marginTop: "16px", width: "100%" }}
            data-ocid="nav.hire_button_mobile"
          >
            Hire Me
          </button>
        </div>
      </div>
    </header>
  );
}
