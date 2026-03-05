import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  Award,
  Briefcase,
  CheckCheck,
  ChevronDown,
  ChevronUp,
  Code2,
  FolderOpen,
  Inbox,
  LogOut,
  Mail,
  Plus,
  RefreshCw,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { ContactMessage } from "../backend.d";
import type {
  Certification,
  Experience,
  Project,
  Skill,
} from "../data/portfolio";
import {
  useCertifications,
  useExperiences,
  useProjects,
  useSkills,
} from "../hooks/usePortfolioData";
import {
  useAllMessages,
  useDeleteMessage,
  useMarkMessageAsRead,
  useUnreadCount,
} from "../hooks/useQueries";

// ─── Auth helpers ─────────────────────────────────────────────────
const CREDS_KEY = "portfolio_admin_creds";

function hashPw(pw: string): string {
  return `${btoa(pw)}_kph`;
}

function getStoredCreds(): { username: string; passwordHash: string } | null {
  try {
    const raw = localStorage.getItem(CREDS_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

// ─── Main component ───────────────────────────────────────────────
type AdminTab =
  | "messages"
  | "projects"
  | "skills"
  | "experience"
  | "certifications";

export default function AdminPanel() {
  const navigate = useNavigate();

  // Auth state
  const [isSetup, setIsSetup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>("messages");

  // Setup form
  const [setupUsername, setSetupUsername] = useState("");
  const [setupPassword, setSetupPassword] = useState("");
  const [setupConfirm, setSetupConfirm] = useState("");
  const [setupError, setSetupError] = useState("");

  // Login form
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    const creds = getStoredCreds();
    setIsSetup(!!creds);
    const session = sessionStorage.getItem("admin_logged_in");
    setIsLoggedIn(session === "true");
  }, []);

  const handleSetup = () => {
    setSetupError("");
    if (!setupUsername.trim() || !setupPassword.trim()) {
      setSetupError("Username and password are required.");
      return;
    }
    if (setupPassword.length < 4) {
      setSetupError("Password must be at least 4 characters.");
      return;
    }
    if (setupPassword !== setupConfirm) {
      setSetupError("Passwords do not match.");
      return;
    }
    const creds = {
      username: setupUsername.trim(),
      passwordHash: hashPw(setupPassword),
    };
    localStorage.setItem(CREDS_KEY, JSON.stringify(creds));
    setIsSetup(true);
    sessionStorage.setItem("admin_logged_in", "true");
    setIsLoggedIn(true);
  };

  const handleLogin = () => {
    setLoginError("");
    const creds = getStoredCreds();
    if (!creds) {
      setLoginError("No admin account found.");
      return;
    }
    if (
      loginUsername.trim() !== creds.username ||
      hashPw(loginPassword) !== creds.passwordHash
    ) {
      setLoginError("Invalid username or password.");
      return;
    }
    sessionStorage.setItem("admin_logged_in", "true");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_logged_in");
    setIsLoggedIn(false);
    setLoginUsername("");
    setLoginPassword("");
  };

  // ── Render setup screen ──
  if (!isSetup) {
    return (
      <AuthScreen>
        <div
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            background: "rgba(0,255,136,0.08)",
            border: "2px solid rgba(0,255,136,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
          }}
        >
          <ShieldCheck size={32} style={{ color: "var(--neon)" }} />
        </div>

        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: 800,
            color: "var(--text-primary)",
            marginBottom: "8px",
            textAlign: "center",
          }}
        >
          Create Admin Account
        </h2>
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "0.875rem",
            textAlign: "center",
            marginBottom: "28px",
            lineHeight: 1.65,
          }}
        >
          Set your admin credentials. This can only be done once.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <FormInput
            placeholder="Choose a username"
            value={setupUsername}
            onChange={setSetupUsername}
            data-ocid="admin.setup_username_input"
          />
          <FormInput
            type="password"
            placeholder="Choose a password (min 4 chars)"
            value={setupPassword}
            onChange={setSetupPassword}
            data-ocid="admin.setup_password_input"
          />
          <FormInput
            type="password"
            placeholder="Confirm password"
            value={setupConfirm}
            onChange={setSetupConfirm}
            onEnter={handleSetup}
            data-ocid="admin.setup_confirm_input"
          />

          {setupError && <ErrorBanner message={setupError} />}

          <button
            type="button"
            className="btn-neon"
            onClick={handleSetup}
            data-ocid="admin.setup_submit_button"
            style={{ width: "100%", justifyContent: "center", padding: "12px" }}
          >
            <ShieldCheck size={16} style={{ marginRight: 8 }} />
            Create Account
          </button>
        </div>
      </AuthScreen>
    );
  }

  // ── Render login screen ──
  if (!isLoggedIn) {
    return (
      <AuthScreen>
        <div
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            background: "rgba(0,255,136,0.08)",
            border: "2px solid rgba(0,255,136,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
          }}
        >
          <ShieldCheck size={32} style={{ color: "var(--neon)" }} />
        </div>

        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: 800,
            color: "var(--text-primary)",
            marginBottom: "8px",
            textAlign: "center",
          }}
        >
          Admin Login
        </h2>
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "0.875rem",
            textAlign: "center",
            marginBottom: "28px",
          }}
        >
          Sign in to manage your portfolio.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <FormInput
            placeholder="Username"
            value={loginUsername}
            onChange={setLoginUsername}
            data-ocid="admin.login_username_input"
          />
          <FormInput
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={setLoginPassword}
            onEnter={handleLogin}
            data-ocid="admin.login_password_input"
          />

          {loginError && <ErrorBanner message={loginError} />}

          <button
            type="button"
            className="btn-neon"
            onClick={handleLogin}
            data-ocid="admin.login_button"
            style={{ width: "100%", justifyContent: "center", padding: "12px" }}
          >
            Login
          </button>
        </div>
      </AuthScreen>
    );
  }

  // ── Render dashboard ──
  return (
    <div
      data-ocid="admin.section"
      style={{
        minHeight: "100vh",
        paddingTop: "88px",
        paddingBottom: "60px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div className="section-container">
        {/* Back button */}
        <button
          type="button"
          onClick={() => navigate({ to: "/" })}
          className="back-btn"
          data-ocid="admin.back_button"
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
            marginBottom: "32px",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          <ArrowLeft size={16} />
          Back to Portfolio
        </button>

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "36px",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <ShieldCheck size={28} style={{ color: "var(--neon)" }} />
            <div>
              <h1
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 800,
                  color: "var(--text-primary)",
                  margin: 0,
                  letterSpacing: "-0.02em",
                }}
              >
                Admin Dashboard
              </h1>
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "0.875rem",
                  margin: "2px 0 0",
                }}
              >
                Manage your portfolio content
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            data-ocid="admin.logout_button"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(255,80,80,0.08)",
              border: "1px solid rgba(255,80,80,0.2)",
              borderRadius: "8px",
              padding: "8px 16px",
              color: "#ff6b6b",
              fontSize: "0.875rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            <LogOut size={15} /> Logout
          </button>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: "4px",
            flexWrap: "wrap",
            marginBottom: "32px",
            background: "rgba(255,255,255,0.03)",
            borderRadius: "12px",
            padding: "6px",
          }}
        >
          {(
            [
              { id: "messages", label: "Messages", icon: Mail },
              { id: "projects", label: "Projects", icon: FolderOpen },
              { id: "skills", label: "Skills", icon: Code2 },
              { id: "experience", label: "Experience", icon: Briefcase },
              { id: "certifications", label: "Certifications", icon: Award },
            ] as const
          ).map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              data-ocid={`admin.${id}_tab`}
              onClick={() => setActiveTab(id)}
              style={{
                flex: 1,
                minWidth: "100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                padding: "10px 16px",
                borderRadius: "8px",
                border: "none",
                background: activeTab === id ? "var(--neon)" : "transparent",
                color: activeTab === id ? "#0d0d0d" : "var(--text-secondary)",
                fontSize: "0.85rem",
                fontWeight: activeTab === id ? 700 : 500,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === "messages" && <MessagesTab />}
        {activeTab === "projects" && <ProjectsTab />}
        {activeTab === "skills" && <SkillsTab />}
        {activeTab === "experience" && <ExperienceTab />}
        {activeTab === "certifications" && <CertificationsTab />}
      </div>

      <style>{`
        .back-btn:hover { border-color: var(--neon) !important; color: var(--neon) !important; }
        .admin-form-input:focus { border-color: var(--neon) !important; outline: none; }
        .admin-delete-btn:hover { background: rgba(255,80,80,0.2) !important; }
      `}</style>
    </div>
  );
}

// ─── Messages Tab ─────────────────────────────────────────────────
function MessagesTab() {
  const {
    data: messages = [],
    isLoading: loadingMessages,
    refetch: refetchMessages,
  } = useAllMessages();
  const { data: unreadCount } = useUnreadCount();
  const markReadMutation = useMarkMessageAsRead();
  const deleteMutation = useDeleteMessage();
  const [expandedId, setExpandedId] = useState<bigint | null>(null);

  const formatDate = (timestamp: bigint) => {
    const ms = Number(timestamp) / 1_000_000;
    return new Date(ms).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div>
      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: "14px",
          marginBottom: "28px",
        }}
      >
        {[
          { label: "Total", value: messages.length, icon: Mail },
          { label: "Unread", value: Number(unreadCount ?? 0), icon: Inbox },
          {
            label: "Read",
            value: messages.filter((m) => m.isRead).length,
            icon: CheckCheck,
          },
        ].map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="glass-card"
            style={{
              padding: "18px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Icon size={18} style={{ color: "var(--neon)" }} />
            <div>
              <div
                style={{
                  fontSize: "1.3rem",
                  fontWeight: 800,
                  color: "var(--text-primary)",
                }}
              >
                {value}
              </div>
              <div
                style={{ fontSize: "0.72rem", color: "var(--text-secondary)" }}
              >
                {label}
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() => refetchMessages()}
          data-ocid="admin.messages_refresh_button"
          style={{
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "12px",
            padding: "18px",
            color: "var(--text-secondary)",
            cursor: "pointer",
            transition: "all 0.2s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            fontSize: "0.8rem",
          }}
          className="back-btn"
        >
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {loadingMessages && (
        <div
          data-ocid="admin.messages_loading_state"
          style={{
            textAlign: "center",
            padding: "60px 0",
            color: "var(--text-secondary)",
          }}
        >
          <Spinner /> Loading messages...
        </div>
      )}

      {!loadingMessages && messages.length === 0 && (
        <div
          data-ocid="admin.messages_empty_state"
          style={{
            textAlign: "center",
            padding: "80px 20px",
            color: "var(--text-secondary)",
          }}
        >
          <Inbox
            size={48}
            style={{ color: "rgba(0,255,136,0.3)", marginBottom: "16px" }}
          />
          <h3
            style={{
              fontSize: "1.1rem",
              fontWeight: 600,
              marginBottom: "8px",
              color: "var(--text-primary)",
            }}
          >
            No messages yet
          </h3>
          <p style={{ fontSize: "0.875rem" }}>
            Contact form submissions will appear here.
          </p>
        </div>
      )}

      {!loadingMessages && messages.length > 0 && (
        <div
          data-ocid="admin.messages_list"
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          {messages.map((msg: ContactMessage, index: number) => (
            <MessageRow
              key={msg.id.toString()}
              msg={msg}
              index={index}
              isExpanded={expandedId === msg.id}
              onExpand={() =>
                setExpandedId(expandedId === msg.id ? null : msg.id)
              }
              onMarkRead={() => markReadMutation.mutateAsync(msg.id)}
              onDelete={() => {
                if (window.confirm("Delete this message?"))
                  deleteMutation.mutateAsync(msg.id);
              }}
              formatDate={formatDate}
              isMarkingRead={markReadMutation.isPending}
              isDeleting={deleteMutation.isPending}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Projects Tab ────────────────────────────────────────────────
function ProjectsTab() {
  const { projects, addProject, deleteProject, loading } = useProjects();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    shortDesc: "",
    description: "",
    image: "",
    techsRaw: "",
    liveUrl: "",
    repoUrl: "",
    featuresRaw: "",
    challenges: "",
    learned: "",
  });
  const [formError, setFormError] = useState("");

  const handleAdd = () => {
    setFormError("");
    if (
      !form.title.trim() ||
      !form.shortDesc.trim() ||
      !form.description.trim()
    ) {
      setFormError(
        "Title, short description, and full description are required.",
      );
      return;
    }
    addProject({
      title: form.title.trim(),
      shortDesc: form.shortDesc.trim(),
      description: form.description.trim(),
      image:
        form.image.trim() ||
        "/assets/generated/project-ecommerce.dim_600x400.jpg",
      techs: form.techsRaw
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      liveUrl: form.liveUrl.trim() || "#",
      repoUrl: form.repoUrl.trim() || "#",
      features: form.featuresRaw
        .split("\n")
        .map((f) => f.trim())
        .filter(Boolean),
      challenges: form.challenges.trim(),
      learned: form.learned.trim(),
    });
    setForm({
      title: "",
      shortDesc: "",
      description: "",
      image: "",
      techsRaw: "",
      liveUrl: "",
      repoUrl: "",
      featuresRaw: "",
      challenges: "",
      learned: "",
    });
    setShowForm(false);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h3
          style={{
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "var(--text-primary)",
            margin: 0,
          }}
        >
          Projects ({projects.length})
        </h3>
        <button
          type="button"
          className="btn-neon"
          onClick={() => setShowForm(!showForm)}
          data-ocid="admin.projects_open_modal_button"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "0.85rem",
            padding: "9px 18px",
          }}
        >
          {showForm ? <ChevronUp size={14} /> : <Plus size={14} />}
          {showForm ? "Cancel" : "Add New Project"}
        </button>
      </div>

      {showForm && (
        <div
          className="glass-card"
          data-ocid="admin.projects_dialog"
          style={{ padding: "24px", marginBottom: "24px" }}
        >
          <h4
            style={{
              color: "var(--neon)",
              fontWeight: 700,
              marginBottom: "18px",
              fontSize: "0.95rem",
            }}
          >
            New Project Details
          </h4>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
            }}
          >
            <AdminInput
              label="Title *"
              value={form.title}
              onChange={(v) => setForm((p) => ({ ...p, title: v }))}
              placeholder="e.g. E-Commerce App"
              data-ocid="admin.projects_title_input"
            />
            <AdminInput
              label="Short Description *"
              value={form.shortDesc}
              onChange={(v) => setForm((p) => ({ ...p, shortDesc: v }))}
              placeholder="One-line summary"
              data-ocid="admin.projects_shortdesc_input"
            />
            <AdminInput
              label="Tech Stack (comma-separated)"
              value={form.techsRaw}
              onChange={(v) => setForm((p) => ({ ...p, techsRaw: v }))}
              placeholder="React, Node.js, MongoDB"
              data-ocid="admin.projects_techs_input"
            />
            <AdminInput
              label="Image URL"
              value={form.image}
              onChange={(v) => setForm((p) => ({ ...p, image: v }))}
              placeholder="https://... (leave blank for default)"
              data-ocid="admin.projects_image_input"
            />
            <AdminInput
              label="Live URL"
              value={form.liveUrl}
              onChange={(v) => setForm((p) => ({ ...p, liveUrl: v }))}
              placeholder="https://..."
              data-ocid="admin.projects_liveurl_input"
            />
            <AdminInput
              label="GitHub URL"
              value={form.repoUrl}
              onChange={(v) => setForm((p) => ({ ...p, repoUrl: v }))}
              placeholder="https://github.com/..."
              data-ocid="admin.projects_repourl_input"
            />
          </div>
          <div style={{ marginTop: "12px" }}>
            <AdminTextarea
              label="Full Description *"
              value={form.description}
              onChange={(v) => setForm((p) => ({ ...p, description: v }))}
              placeholder="Detailed project description..."
              data-ocid="admin.projects_description_textarea"
            />
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "12px",
              marginTop: "12px",
            }}
          >
            <AdminTextarea
              label="Features (one per line)"
              value={form.featuresRaw}
              onChange={(v) => setForm((p) => ({ ...p, featuresRaw: v }))}
              placeholder="Feature 1&#10;Feature 2"
              rows={4}
              data-ocid="admin.projects_features_textarea"
            />
            <AdminTextarea
              label="Challenges Faced"
              value={form.challenges}
              onChange={(v) => setForm((p) => ({ ...p, challenges: v }))}
              placeholder="Describe challenges..."
              rows={4}
              data-ocid="admin.projects_challenges_textarea"
            />
            <AdminTextarea
              label="What I Learned"
              value={form.learned}
              onChange={(v) => setForm((p) => ({ ...p, learned: v }))}
              placeholder="Key takeaways..."
              rows={4}
              data-ocid="admin.projects_learned_textarea"
            />
          </div>
          {formError && <ErrorBanner message={formError} />}
          <button
            type="button"
            className="btn-neon"
            onClick={handleAdd}
            data-ocid="admin.projects_submit_button"
            style={{
              marginTop: "16px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "0.85rem",
            }}
          >
            <Plus size={14} /> Add Project
          </button>
        </div>
      )}

      {loading && <SkeletonList />}
      {!loading && projects.length === 0 && (
        <EmptyState
          icon={FolderOpen}
          message="No projects yet. Add your first project above."
          data-ocid="admin.projects_empty_state"
        />
      )}
      {!loading && (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {projects.map((p, i) => (
            <div
              key={p.id}
              data-ocid={`admin.projects_item.${i + 1}`}
              className="glass-card"
              style={{
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    fontSize: "0.9rem",
                    marginBottom: "6px",
                  }}
                >
                  {p.title}
                </div>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {p.techs.slice(0, 5).map((t) => (
                    <span
                      key={t}
                      className="tech-badge"
                      style={{ fontSize: "0.72rem" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <button
                type="button"
                className="admin-delete-btn"
                onClick={() => {
                  if (window.confirm(`Delete "${p.title}"?`))
                    deleteProject(p.id);
                }}
                data-ocid={`admin.projects_delete_button.${i + 1}`}
                style={{
                  background: "rgba(255,80,80,0.08)",
                  border: "1px solid rgba(255,80,80,0.2)",
                  borderRadius: "6px",
                  padding: "8px",
                  color: "#ff6b6b",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  flexShrink: 0,
                }}
                title="Delete project"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Skills Tab ───────────────────────────────────────────────────
function SkillsTab() {
  const { skills, addSkill, deleteSkill, loading } = useSkills();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", icon: "", proficiency: "80" });
  const [formError, setFormError] = useState("");

  const handleAdd = () => {
    setFormError("");
    if (!form.name.trim() || !form.icon.trim()) {
      setFormError("Skill name and icon URL are required.");
      return;
    }
    const prof = Number.parseInt(form.proficiency, 10);
    if (Number.isNaN(prof) || prof < 0 || prof > 100) {
      setFormError("Proficiency must be a number between 0 and 100.");
      return;
    }
    addSkill({
      name: form.name.trim(),
      icon: form.icon.trim(),
      proficiency: prof,
    } as Skill);
    setForm({ name: "", icon: "", proficiency: "80" });
    setShowForm(false);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h3
          style={{
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "var(--text-primary)",
            margin: 0,
          }}
        >
          Skills ({skills.length})
        </h3>
        <button
          type="button"
          className="btn-neon"
          onClick={() => setShowForm(!showForm)}
          data-ocid="admin.skills_open_modal_button"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "0.85rem",
            padding: "9px 18px",
          }}
        >
          {showForm ? <ChevronUp size={14} /> : <Plus size={14} />}
          {showForm ? "Cancel" : "Add New Skill"}
        </button>
      </div>

      {showForm && (
        <div
          className="glass-card"
          data-ocid="admin.skills_dialog"
          style={{ padding: "24px", marginBottom: "24px" }}
        >
          <h4
            style={{
              color: "var(--neon)",
              fontWeight: 700,
              marginBottom: "18px",
              fontSize: "0.95rem",
            }}
          >
            New Skill Details
          </h4>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "0.8rem",
              marginBottom: "14px",
            }}
          >
            Icon URL tip: use{" "}
            <code
              style={{
                color: "var(--neon)",
                background: "rgba(0,255,136,0.08)",
                padding: "1px 5px",
                borderRadius: "4px",
              }}
            >
              https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg
            </code>
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr 1fr",
              gap: "12px",
            }}
          >
            <AdminInput
              label="Skill Name *"
              value={form.name}
              onChange={(v) => setForm((p) => ({ ...p, name: v }))}
              placeholder="e.g. React.js"
              data-ocid="admin.skills_name_input"
            />
            <AdminInput
              label="Icon URL (devicons CDN) *"
              value={form.icon}
              onChange={(v) => setForm((p) => ({ ...p, icon: v }))}
              placeholder="https://cdn.jsdelivr.net/gh/devicons/..."
              data-ocid="admin.skills_icon_input"
            />
            <AdminInput
              label="Proficiency (0–100) *"
              value={form.proficiency}
              onChange={(v) => setForm((p) => ({ ...p, proficiency: v }))}
              placeholder="85"
              data-ocid="admin.skills_proficiency_input"
            />
          </div>
          {formError && <ErrorBanner message={formError} />}
          <button
            type="button"
            className="btn-neon"
            onClick={handleAdd}
            data-ocid="admin.skills_submit_button"
            style={{
              marginTop: "16px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "0.85rem",
            }}
          >
            <Plus size={14} /> Add Skill
          </button>
        </div>
      )}

      {loading && <SkeletonList count={4} />}
      {!loading && skills.length === 0 && (
        <EmptyState
          icon={Code2}
          message="No skills yet. Add your first skill above."
          data-ocid="admin.skills_empty_state"
        />
      )}
      {!loading && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "10px",
          }}
        >
          {skills.map((s, i) => (
            <div
              key={s.name}
              data-ocid={`admin.skills_item.${i + 1}`}
              className="glass-card"
              style={{
                padding: "14px 16px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <img
                src={s.icon}
                alt={s.name}
                style={{
                  width: 32,
                  height: 32,
                  objectFit: "contain",
                  filter: s.name === "GitHub" ? "invert(1)" : undefined,
                  flexShrink: 0,
                }}
                loading="lazy"
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    fontSize: "0.875rem",
                  }}
                >
                  {s.name}
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--neon)" }}>
                  {s.proficiency}%
                </div>
              </div>
              <button
                type="button"
                className="admin-delete-btn"
                onClick={() => {
                  if (window.confirm(`Delete skill "${s.name}"?`))
                    deleteSkill(s.name);
                }}
                data-ocid={`admin.skills_delete_button.${i + 1}`}
                style={{
                  background: "rgba(255,80,80,0.08)",
                  border: "1px solid rgba(255,80,80,0.2)",
                  borderRadius: "6px",
                  padding: "6px",
                  color: "#ff6b6b",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  flexShrink: 0,
                }}
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Experience Tab ───────────────────────────────────────────────
function ExperienceTab() {
  const { experiences, addExperience, deleteExperience, loading } =
    useExperiences();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    company: "",
    role: "",
    duration: "",
    responsibilitiesRaw: "",
    achievement: "",
  });
  const [formError, setFormError] = useState("");

  const handleAdd = () => {
    setFormError("");
    if (
      !form.company.trim() ||
      !form.role.trim() ||
      !form.duration.trim() ||
      !form.achievement.trim()
    ) {
      setFormError(
        "Company, role, duration, and key achievement are required.",
      );
      return;
    }
    addExperience({
      company: form.company.trim(),
      role: form.role.trim(),
      duration: form.duration.trim(),
      responsibilities: form.responsibilitiesRaw
        .split("\n")
        .map((r) => r.trim())
        .filter(Boolean),
      achievement: form.achievement.trim(),
    } as Omit<Experience, "id">);
    setForm({
      company: "",
      role: "",
      duration: "",
      responsibilitiesRaw: "",
      achievement: "",
    });
    setShowForm(false);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h3
          style={{
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "var(--text-primary)",
            margin: 0,
          }}
        >
          Experience ({experiences.length})
        </h3>
        <button
          type="button"
          className="btn-neon"
          onClick={() => setShowForm(!showForm)}
          data-ocid="admin.experience_open_modal_button"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "0.85rem",
            padding: "9px 18px",
          }}
        >
          {showForm ? <ChevronUp size={14} /> : <Plus size={14} />}
          {showForm ? "Cancel" : "Add New Experience"}
        </button>
      </div>

      {showForm && (
        <div
          className="glass-card"
          data-ocid="admin.experience_dialog"
          style={{ padding: "24px", marginBottom: "24px" }}
        >
          <h4
            style={{
              color: "var(--neon)",
              fontWeight: 700,
              marginBottom: "18px",
              fontSize: "0.95rem",
            }}
          >
            New Experience Details
          </h4>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
            }}
          >
            <AdminInput
              label="Company *"
              value={form.company}
              onChange={(v) => setForm((p) => ({ ...p, company: v }))}
              placeholder="e.g. Birat Global Academy"
              data-ocid="admin.experience_company_input"
            />
            <AdminInput
              label="Role *"
              value={form.role}
              onChange={(v) => setForm((p) => ({ ...p, role: v }))}
              placeholder="e.g. Frontend Trainer"
              data-ocid="admin.experience_role_input"
            />
            <AdminInput
              label="Duration *"
              value={form.duration}
              onChange={(v) => setForm((p) => ({ ...p, duration: v }))}
              placeholder="e.g. June 2025 – Aug 2025"
              data-ocid="admin.experience_duration_input"
            />
            <AdminInput
              label="Key Achievement *"
              value={form.achievement}
              onChange={(v) => setForm((p) => ({ ...p, achievement: v }))}
              placeholder="Your main accomplishment"
              data-ocid="admin.experience_achievement_input"
            />
          </div>
          <div style={{ marginTop: "12px" }}>
            <AdminTextarea
              label="Responsibilities (one per line)"
              value={form.responsibilitiesRaw}
              onChange={(v) =>
                setForm((p) => ({ ...p, responsibilitiesRaw: v }))
              }
              placeholder="Responsibility 1&#10;Responsibility 2&#10;Responsibility 3"
              data-ocid="admin.experience_responsibilities_textarea"
            />
          </div>
          {formError && <ErrorBanner message={formError} />}
          <button
            type="button"
            className="btn-neon"
            onClick={handleAdd}
            data-ocid="admin.experience_submit_button"
            style={{
              marginTop: "16px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "0.85rem",
            }}
          >
            <Plus size={14} /> Add Experience
          </button>
        </div>
      )}

      {loading && <SkeletonList />}
      {!loading && experiences.length === 0 && (
        <EmptyState
          icon={Briefcase}
          message="No experience yet. Add your first entry above."
          data-ocid="admin.experience_empty_state"
        />
      )}
      {!loading && (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {experiences.map((e, i) => (
            <div
              key={e.id}
              data-ocid={`admin.experience_item.${i + 1}`}
              className="glass-card"
              style={{
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    fontSize: "0.9rem",
                  }}
                >
                  {e.company}
                </div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--neon)",
                    fontWeight: 600,
                  }}
                >
                  {e.role}
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--text-secondary)",
                    marginTop: "2px",
                  }}
                >
                  {e.duration}
                </div>
              </div>
              <button
                type="button"
                className="admin-delete-btn"
                onClick={() => {
                  if (window.confirm(`Delete experience at "${e.company}"?`))
                    deleteExperience(e.id);
                }}
                data-ocid={`admin.experience_delete_button.${i + 1}`}
                style={{
                  background: "rgba(255,80,80,0.08)",
                  border: "1px solid rgba(255,80,80,0.2)",
                  borderRadius: "6px",
                  padding: "8px",
                  color: "#ff6b6b",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  flexShrink: 0,
                }}
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Certifications Tab ───────────────────────────────────────────
function CertificationsTab() {
  const { certifications, addCertification, deleteCertification, loading } =
    useCertifications();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    issuer: "",
    date: "",
    image: "",
    link: "",
  });
  const [formError, setFormError] = useState("");

  const handleAdd = () => {
    setFormError("");
    if (!form.title.trim() || !form.issuer.trim() || !form.date.trim()) {
      setFormError("Title, issuer, and date are required.");
      return;
    }
    addCertification({
      title: form.title.trim(),
      issuer: form.issuer.trim(),
      date: form.date.trim(),
      image:
        form.image.trim() || "/assets/generated/cert-webdev.dim_600x400.jpg",
      link: form.link.trim() || "#",
    } as Omit<Certification, "id">);
    setForm({ title: "", issuer: "", date: "", image: "", link: "" });
    setShowForm(false);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h3
          style={{
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "var(--text-primary)",
            margin: 0,
          }}
        >
          Certifications ({certifications.length})
        </h3>
        <button
          type="button"
          className="btn-neon"
          onClick={() => setShowForm(!showForm)}
          data-ocid="admin.certs_open_modal_button"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "0.85rem",
            padding: "9px 18px",
          }}
        >
          {showForm ? <ChevronUp size={14} /> : <Plus size={14} />}
          {showForm ? "Cancel" : "Add New Certification"}
        </button>
      </div>

      {showForm && (
        <div
          className="glass-card"
          data-ocid="admin.certs_dialog"
          style={{ padding: "24px", marginBottom: "24px" }}
        >
          <h4
            style={{
              color: "var(--neon)",
              fontWeight: 700,
              marginBottom: "18px",
              fontSize: "0.95rem",
            }}
          >
            New Certification Details
          </h4>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
            }}
          >
            <AdminInput
              label="Certificate Title *"
              value={form.title}
              onChange={(v) => setForm((p) => ({ ...p, title: v }))}
              placeholder="e.g. FullStack Development"
              data-ocid="admin.certs_title_input"
            />
            <AdminInput
              label="Issuing Organization *"
              value={form.issuer}
              onChange={(v) => setForm((p) => ({ ...p, issuer: v }))}
              placeholder="e.g. Udemy"
              data-ocid="admin.certs_issuer_input"
            />
            <AdminInput
              label="Date *"
              value={form.date}
              onChange={(v) => setForm((p) => ({ ...p, date: v }))}
              placeholder="e.g. 2025–Present"
              data-ocid="admin.certs_date_input"
            />
            <AdminInput
              label="Certificate Link"
              value={form.link}
              onChange={(v) => setForm((p) => ({ ...p, link: v }))}
              placeholder="https://..."
              data-ocid="admin.certs_link_input"
            />
          </div>
          <div style={{ marginTop: "12px" }}>
            <AdminInput
              label="Certificate Image URL"
              value={form.image}
              onChange={(v) => setForm((p) => ({ ...p, image: v }))}
              placeholder="https://... (leave blank for default)"
              data-ocid="admin.certs_image_input"
            />
          </div>
          {formError && <ErrorBanner message={formError} />}
          <button
            type="button"
            className="btn-neon"
            onClick={handleAdd}
            data-ocid="admin.certs_submit_button"
            style={{
              marginTop: "16px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "0.85rem",
            }}
          >
            <Plus size={14} /> Add Certification
          </button>
        </div>
      )}

      {loading && <SkeletonList count={2} />}
      {!loading && certifications.length === 0 && (
        <EmptyState
          icon={Award}
          message="No certifications yet. Add your first certification above."
          data-ocid="admin.certs_empty_state"
        />
      )}
      {!loading && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "10px",
          }}
        >
          {certifications.map((c, i) => (
            <div
              key={c.id}
              data-ocid={`admin.certs_item.${i + 1}`}
              className="glass-card"
              style={{
                padding: "16px 18px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <Award
                size={18}
                style={{ color: "var(--neon)", flexShrink: 0 }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    fontSize: "0.875rem",
                  }}
                >
                  {c.title}
                </div>
                <div
                  style={{
                    fontSize: "0.78rem",
                    color: "var(--neon)",
                    fontWeight: 600,
                  }}
                >
                  {c.issuer}
                </div>
                <div
                  style={{
                    fontSize: "0.72rem",
                    color: "var(--text-secondary)",
                  }}
                >
                  {c.date}
                </div>
              </div>
              <button
                type="button"
                className="admin-delete-btn"
                onClick={() => {
                  if (window.confirm(`Delete "${c.title}"?`))
                    deleteCertification(c.id);
                }}
                data-ocid={`admin.certs_delete_button.${i + 1}`}
                style={{
                  background: "rgba(255,80,80,0.08)",
                  border: "1px solid rgba(255,80,80,0.2)",
                  borderRadius: "6px",
                  padding: "8px",
                  color: "#ff6b6b",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  flexShrink: 0,
                }}
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Reusable sub-components ───────────────────────────────────────

function AuthScreen({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "88px",
        paddingBottom: "60px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        className="glass-card"
        style={{
          width: "100%",
          maxWidth: "440px",
          padding: "40px 36px",
          margin: "0 16px",
        }}
      >
        {children}
      </div>
    </div>
  );
}

interface FormInputProps {
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  onEnter?: () => void;
  "data-ocid"?: string;
}

function FormInput({
  type = "text",
  placeholder,
  value,
  onChange,
  onEnter,
  "data-ocid": ocid,
}: FormInputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && onEnter?.()}
      data-ocid={ocid}
      className="admin-form-input"
      style={{
        width: "100%",
        padding: "12px 16px",
        boxSizing: "border-box",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(0,255,136,0.25)",
        borderRadius: "10px",
        color: "var(--text-primary)",
        fontSize: "0.9rem",
        transition: "border-color 0.2s ease",
      }}
    />
  );
}

interface AdminInputProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  "data-ocid"?: string;
}

function AdminInput({
  label,
  value,
  onChange,
  placeholder,
  "data-ocid": ocid,
}: AdminInputProps) {
  const inputId = ocid ?? label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div>
      <label
        htmlFor={inputId}
        style={{
          display: "block",
          fontSize: "0.78rem",
          color: "var(--text-secondary)",
          marginBottom: "5px",
          fontWeight: 600,
        }}
      >
        {label}
      </label>
      <input
        id={inputId}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        data-ocid={ocid}
        className="admin-form-input"
        style={{
          width: "100%",
          padding: "10px 12px",
          boxSizing: "border-box",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(0,255,136,0.2)",
          borderRadius: "8px",
          color: "var(--text-primary)",
          fontSize: "0.85rem",
          transition: "border-color 0.2s ease",
        }}
      />
    </div>
  );
}

interface AdminTextareaProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
  "data-ocid"?: string;
}

function AdminTextarea({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
  "data-ocid": ocid,
}: AdminTextareaProps) {
  const textareaId = ocid ?? label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div>
      <label
        htmlFor={textareaId}
        style={{
          display: "block",
          fontSize: "0.78rem",
          color: "var(--text-secondary)",
          marginBottom: "5px",
          fontWeight: 600,
        }}
      >
        {label}
      </label>
      <textarea
        id={textareaId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        data-ocid={ocid}
        className="admin-form-input"
        style={{
          width: "100%",
          padding: "10px 12px",
          boxSizing: "border-box",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(0,255,136,0.2)",
          borderRadius: "8px",
          color: "var(--text-primary)",
          fontSize: "0.85rem",
          resize: "vertical",
          lineHeight: 1.55,
          transition: "border-color 0.2s ease",
          fontFamily: "inherit",
        }}
      />
    </div>
  );
}

function ErrorBanner({ message }: { message: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        color: "#ff6b6b",
        fontSize: "0.875rem",
        background: "rgba(255,80,80,0.08)",
        border: "1px solid rgba(255,80,80,0.2)",
        borderRadius: "8px",
        padding: "10px 14px",
        marginTop: "4px",
      }}
    >
      <AlertCircle size={14} style={{ flexShrink: 0 }} />
      {message}
    </div>
  );
}

function Spinner() {
  return (
    <div
      style={{
        display: "inline-block",
        width: 20,
        height: 20,
        border: "2px solid rgba(0,255,136,0.2)",
        borderTopColor: "var(--neon)",
        borderRadius: "50%",
        animation: "loader-spin 0.8s linear infinite",
        marginRight: 8,
        verticalAlign: "middle",
      }}
    />
  );
}

const SKELETON_KEYS = ["sk-a", "sk-b", "sk-c", "sk-d", "sk-e", "sk-f"];

function SkeletonList({ count = 3 }: { count?: number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {SKELETON_KEYS.slice(0, count).map((k) => (
        <div
          key={k}
          className="glass-card"
          style={{
            padding: "16px 20px",
            height: "60px",
            animation: "pulse 1.5s ease-in-out infinite",
            opacity: 0.5,
          }}
        />
      ))}
    </div>
  );
}

function EmptyState({
  icon: Icon,
  message,
  "data-ocid": ocid,
}: { icon: React.ElementType; message: string; "data-ocid"?: string }) {
  return (
    <div
      data-ocid={ocid}
      style={{
        textAlign: "center",
        padding: "60px 20px",
        color: "var(--text-secondary)",
      }}
    >
      <Icon
        size={44}
        style={{ color: "rgba(0,255,136,0.3)", marginBottom: "12px" }}
      />
      <p style={{ fontSize: "0.875rem", lineHeight: 1.6 }}>{message}</p>
    </div>
  );
}

// ─── MessageRow (same as before) ──────────────────────────────────
interface MessageRowProps {
  msg: ContactMessage;
  index: number;
  isExpanded: boolean;
  onExpand: () => void;
  onMarkRead: () => void;
  onDelete: () => void;
  formatDate: (ts: bigint) => string;
  isMarkingRead: boolean;
  isDeleting: boolean;
}

function MessageRow({
  msg,
  index,
  isExpanded,
  onExpand,
  onMarkRead,
  onDelete,
  formatDate,
  isMarkingRead,
  isDeleting,
}: MessageRowProps) {
  return (
    <div
      data-ocid={`admin.message_item.${index + 1}`}
      className="glass-card"
      style={{
        overflow: "hidden",
        background: !msg.isRead ? "rgba(0,255,136,0.03)" : undefined,
        borderColor: !msg.isRead ? "rgba(0,255,136,0.18)" : undefined,
      }}
    >
      <button
        type="button"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "16px 20px",
          cursor: "pointer",
          background: "transparent",
          border: "none",
          width: "100%",
          textAlign: "left",
        }}
        onClick={onExpand}
        aria-expanded={isExpanded}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: !msg.isRead ? "var(--neon)" : "transparent",
            border: !msg.isRead ? "none" : "1px solid rgba(255,255,255,0.2)",
            flexShrink: 0,
          }}
        />
        <div style={{ flex: "0 0 160px", overflow: "hidden" }}>
          <div
            style={{
              fontSize: "0.875rem",
              fontWeight: !msg.isRead ? 700 : 500,
              color: "var(--text-primary)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {msg.name}
          </div>
          <div
            style={{
              fontSize: "0.75rem",
              color: "var(--text-secondary)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {msg.email}
          </div>
        </div>
        <div
          style={{
            flex: 1,
            fontSize: "0.875rem",
            color: "var(--text-secondary)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {msg.subject}
        </div>
        <div
          style={{
            fontSize: "0.75rem",
            color: "var(--text-secondary)",
            flexShrink: 0,
          }}
        >
          {formatDate(msg.timestamp)}
        </div>
        <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
          {!msg.isRead && (
            <button
              type="button"
              data-ocid={`admin.mark_read_button.${index + 1}`}
              onClick={onMarkRead}
              disabled={isMarkingRead}
              style={{
                background: "rgba(0,255,136,0.1)",
                border: "1px solid rgba(0,255,136,0.2)",
                borderRadius: "6px",
                padding: "5px 10px",
                color: "var(--neon)",
                fontSize: "0.75rem",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                transition: "all 0.2s ease",
                whiteSpace: "nowrap",
              }}
            >
              <CheckCheck size={12} /> Read
            </button>
          )}
          <button
            type="button"
            data-ocid={`admin.delete_button.${index + 1}`}
            onClick={onDelete}
            disabled={isDeleting}
            style={{
              background: "rgba(255,80,80,0.08)",
              border: "1px solid rgba(255,80,80,0.2)",
              borderRadius: "6px",
              padding: "5px 8px",
              color: "#ff6b6b",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              transition: "all 0.2s ease",
            }}
          >
            <Trash2 size={12} />
          </button>
        </div>
        <div style={{ flexShrink: 0, color: "var(--text-secondary)" }}>
          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </div>
      </button>

      {isExpanded && (
        <div
          style={{
            padding: "0 20px 20px",
            borderTop: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div style={{ paddingTop: "16px" }}>
            {msg.phone && (
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "var(--text-secondary)",
                  marginBottom: "8px",
                }}
              >
                <span style={{ color: "var(--neon)" }}>Phone: </span>
                {msg.phone}
              </p>
            )}
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                borderRadius: "8px",
                padding: "14px",
                color: "var(--text-secondary)",
                fontSize: "0.875rem",
                lineHeight: 1.7,
                whiteSpace: "pre-wrap",
              }}
            >
              {msg.message}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
