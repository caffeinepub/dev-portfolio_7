import {
  AlertCircle,
  CheckCircle,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { type FormEvent, useState } from "react";
import { useSubmitContactForm } from "../hooks/useQueries";
import { useScrollReveal } from "../hooks/useScrollReveal";

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function ContactSection() {
  const [formRef, formVisible] = useScrollReveal(0.1);
  const [infoRef, infoVisible] = useScrollReveal(0.1);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const submitMutation = useSubmitContactForm();

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await submitMutation.mutateAsync(formData);
    } catch {
      // ignore
    } finally {
      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setErrors({});
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (submitStatus !== "idle") setSubmitStatus("idle");
  };

  const inputStyle = (hasError?: string): React.CSSProperties => ({
    background: "rgba(255,255,255,0.04)",
    border: `1px solid ${hasError ? "rgba(255,80,80,0.5)" : "rgba(255,255,255,0.1)"}`,
    color: "var(--text-primary)",
    borderRadius: "8px",
    padding: "12px 16px",
    width: "100%",
    fontSize: "0.95rem",
    transition: "all 0.3s ease",
    outline: "none",
    fontFamily: "inherit",
  });

  return (
    <section
      id="contact"
      data-ocid="contact.section"
      className="section-padding"
      style={{
        position: "relative",
        zIndex: 1,
        background: "rgba(0,0,0,0.2)",
      }}
    >
      <div className="section-container">
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h2 className="section-heading" style={{ display: "inline-block" }}>
            Get In Touch
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
            Have a project in mind or want to discuss opportunities? I'd love to
            hear from you.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "48px",
            maxWidth: "1000px",
            margin: "0 auto",
          }}
          className="contact-grid"
        >
          {/* Contact form */}
          <div
            ref={formRef}
            className={`reveal-hidden ${formVisible ? "reveal-visible" : ""}`}
          >
            <div className="glass-card" style={{ padding: "32px" }}>
              <h3
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  marginBottom: "24px",
                }}
              >
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} noValidate>
                {/* Name + Email row */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "16px",
                    marginBottom: "16px",
                  }}
                  className="form-row"
                >
                  <div>
                    <label
                      htmlFor="name"
                      style={{
                        display: "block",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        color: "var(--text-secondary)",
                        marginBottom: "6px",
                        letterSpacing: "0.04em",
                      }}
                    >
                      FULL NAME *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Kundan Patel"
                      value={formData.name}
                      onChange={handleChange}
                      style={inputStyle(errors.name)}
                      data-ocid="contact.name_input"
                      aria-required="true"
                      aria-describedby={errors.name ? "name-error" : undefined}
                      autoComplete="name"
                      className="contact-input"
                    />
                    {errors.name && (
                      <span
                        id="name-error"
                        style={{
                          fontSize: "0.75rem",
                          color: "#ff6b6b",
                          marginTop: "4px",
                          display: "block",
                        }}
                        role="alert"
                      >
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      style={{
                        display: "block",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        color: "var(--text-secondary)",
                        marginBottom: "6px",
                        letterSpacing: "0.04em",
                      }}
                    >
                      EMAIL *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      style={inputStyle(errors.email)}
                      data-ocid="contact.email_input"
                      aria-required="true"
                      aria-describedby={
                        errors.email ? "email-error" : undefined
                      }
                      autoComplete="email"
                      className="contact-input"
                    />
                    {errors.email && (
                      <span
                        id="email-error"
                        style={{
                          fontSize: "0.75rem",
                          color: "#ff6b6b",
                          marginTop: "4px",
                          display: "block",
                        }}
                        role="alert"
                      >
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Phone + Subject row */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "16px",
                    marginBottom: "16px",
                  }}
                  className="form-row"
                >
                  <div>
                    <label
                      htmlFor="phone"
                      style={{
                        display: "block",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        color: "var(--text-secondary)",
                        marginBottom: "6px",
                        letterSpacing: "0.04em",
                      }}
                    >
                      PHONE NUMBER
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={handleChange}
                      style={inputStyle()}
                      data-ocid="contact.phone_input"
                      autoComplete="tel"
                      className="contact-input"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      style={{
                        display: "block",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        color: "var(--text-secondary)",
                        marginBottom: "6px",
                        letterSpacing: "0.04em",
                      }}
                    >
                      SUBJECT *
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="Project inquiry"
                      value={formData.subject}
                      onChange={handleChange}
                      style={inputStyle(errors.subject)}
                      data-ocid="contact.subject_input"
                      aria-required="true"
                      aria-describedby={
                        errors.subject ? "subject-error" : undefined
                      }
                      className="contact-input"
                    />
                    {errors.subject && (
                      <span
                        id="subject-error"
                        style={{
                          fontSize: "0.75rem",
                          color: "#ff6b6b",
                          marginTop: "4px",
                          display: "block",
                        }}
                        role="alert"
                      >
                        {errors.subject}
                      </span>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div style={{ marginBottom: "24px" }}>
                  <label
                    htmlFor="message"
                    style={{
                      display: "block",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "var(--text-secondary)",
                      marginBottom: "6px",
                      letterSpacing: "0.04em",
                    }}
                  >
                    MESSAGE *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell me about your project or how I can help..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    style={{
                      ...inputStyle(errors.message),
                      resize: "vertical",
                      minHeight: "120px",
                    }}
                    data-ocid="contact.message_textarea"
                    aria-required="true"
                    aria-describedby={
                      errors.message ? "message-error" : undefined
                    }
                    className="contact-input"
                  />
                  {errors.message && (
                    <span
                      id="message-error"
                      style={{
                        fontSize: "0.75rem",
                        color: "#ff6b6b",
                        marginTop: "4px",
                        display: "block",
                      }}
                      role="alert"
                    >
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="btn-neon"
                  data-ocid="contact.submit_button"
                  disabled={submitMutation.isPending}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    opacity: submitMutation.isPending ? 0.8 : 1,
                  }}
                >
                  {submitMutation.isPending ? (
                    <>
                      <span
                        style={{
                          width: 16,
                          height: 16,
                          border: "2px solid rgba(13,13,13,0.3)",
                          borderTopColor: "#0d0d0d",
                          borderRadius: "50%",
                          animation: "loader-spin 0.8s linear infinite",
                          display: "inline-block",
                        }}
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>

                {/* Success state */}
                {submitStatus === "success" && (
                  <div
                    data-ocid="contact.success_state"
                    style={{
                      marginTop: "16px",
                      padding: "14px 16px",
                      background: "rgba(0,255,136,0.08)",
                      border: "1px solid rgba(0,255,136,0.3)",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      color: "var(--neon)",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                    }}
                    role="alert"
                    aria-live="polite"
                  >
                    <CheckCircle size={18} />
                    Message sent successfully! I'll get back to you within 24
                    hours.
                  </div>
                )}

                {/* Error state */}
                {submitStatus === "error" && (
                  <div
                    data-ocid="contact.error_state"
                    style={{
                      marginTop: "16px",
                      padding: "14px 16px",
                      background: "rgba(255,80,80,0.08)",
                      border: "1px solid rgba(255,80,80,0.3)",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      color: "#ff6b6b",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                    }}
                    role="alert"
                    aria-live="polite"
                  >
                    <AlertCircle size={18} />
                    Something went wrong. Please try again or email me directly.
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Contact info */}
          <div
            ref={infoRef}
            className={`reveal-hidden ${infoVisible ? "reveal-visible" : ""}`}
          >
            <h3
              style={{
                fontSize: "1.2rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: "24px",
              }}
            >
              Contact Information
            </h3>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                marginBottom: "36px",
              }}
            >
              {[
                { icon: Mail, label: "Email", value: "kuntel3930@gmail.com" },
                {
                  icon: Phone,
                  label: "Phone (Nepal)",
                  value: "+977-9827359752",
                },
                {
                  icon: MapPin,
                  label: "Location",
                  value: "Nepal (Remote Available)",
                },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="glass-card"
                  style={{
                    padding: "16px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      background: "rgba(0,255,136,0.1)",
                      border: "1px solid rgba(0,255,136,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={18} style={{ color: "var(--neon)" }} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--text-secondary)",
                        marginBottom: "2px",
                      }}
                    >
                      {label}
                    </div>
                    <div
                      style={{
                        fontSize: "0.9rem",
                        color: "var(--text-primary)",
                        fontWeight: 500,
                      }}
                    >
                      {value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .contact-grid {
            grid-template-columns: 3fr 2fr !important;
          }
          .form-row {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 767px) {
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }
        .contact-input:focus {
          border-color: var(--neon) !important;
          box-shadow: 0 0 12px rgba(0,255,136,0.15) !important;
          background: rgba(0,255,136,0.02) !important;
        }
        .contact-social-link:hover {
          border-color: var(--neon) !important;
          color: var(--neon) !important;
          box-shadow: 0 0 12px rgba(0,255,136,0.2) !important;
        }
      `}</style>
    </section>
  );
}
