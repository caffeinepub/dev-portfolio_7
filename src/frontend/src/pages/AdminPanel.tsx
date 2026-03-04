import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  CheckCheck,
  Inbox,
  LogIn,
  Mail,
  RefreshCw,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import type { ContactMessage } from "../backend.d";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useAllMessages,
  useDeleteMessage,
  useIsAdmin,
  useMarkMessageAsRead,
  useUnreadCount,
} from "../hooks/useQueries";

export default function AdminPanel() {
  const navigate = useNavigate();
  const { login, isLoggingIn, isLoginError } = useInternetIdentity();
  const {
    data: isAdmin,
    isLoading: checkingAdmin,
    refetch: recheckAdmin,
  } = useIsAdmin();
  const {
    data: messages = [],
    isLoading: loadingMessages,
    refetch: refetchMessages,
  } = useAllMessages();
  const { data: unreadCount } = useUnreadCount();
  const markReadMutation = useMarkMessageAsRead();
  const deleteMutation = useDeleteMessage();

  const [expandedId, setExpandedId] = useState<bigint | null>(null);

  const handleLogin = async () => {
    await login();
    recheckAdmin();
  };

  const handleMarkRead = async (id: bigint) => {
    await markReadMutation.mutateAsync(id);
  };

  const handleDelete = async (id: bigint) => {
    if (!window.confirm("Delete this message?")) return;
    await deleteMutation.mutateAsync(id);
  };

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
          className="back-btn"
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
                Manage contact form submissions
              </p>
            </div>
          </div>

          {isAdmin && (
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {/* Unread badge */}
              {unreadCount !== undefined && unreadCount > 0 && (
                <div
                  style={{
                    background: "rgba(0,255,136,0.1)",
                    border: "1px solid rgba(0,255,136,0.3)",
                    borderRadius: "20px",
                    padding: "4px 14px",
                    fontSize: "0.8rem",
                    color: "var(--neon)",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <Mail size={12} />
                  {unreadCount.toString()} unread
                </div>
              )}

              {/* Refresh */}
              <button
                type="button"
                onClick={() => refetchMessages()}
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  padding: "8px",
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                }}
                aria-label="Refresh messages"
                className="refresh-btn"
              >
                <RefreshCw size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Loading state */}
        {checkingAdmin && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "80px 0",
              gap: "12px",
              color: "var(--text-secondary)",
            }}
          >
            <div
              style={{
                width: 24,
                height: 24,
                border: "2px solid rgba(0,255,136,0.2)",
                borderTopColor: "var(--neon)",
                borderRadius: "50%",
                animation: "loader-spin 0.8s linear infinite",
              }}
            />
            Checking authentication...
          </div>
        )}

        {/* Not authenticated — login prompt */}
        {!checkingAdmin && !isAdmin && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "80px 20px",
              textAlign: "center",
              gap: "20px",
            }}
          >
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
              }}
            >
              <ShieldCheck size={32} style={{ color: "var(--neon)" }} />
            </div>

            <div>
              <h2
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  marginBottom: "8px",
                }}
              >
                Admin Access Required
              </h2>
              <p
                style={{
                  color: "var(--text-secondary)",
                  maxWidth: "360px",
                  lineHeight: 1.65,
                }}
              >
                Sign in with Internet Identity to access the admin dashboard.
                Only authorized accounts can view messages.
              </p>
            </div>

            {isLoginError && (
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
                  padding: "10px 16px",
                }}
              >
                <AlertCircle size={14} />
                Login failed. Please try again.
              </div>
            )}

            <button
              type="button"
              className="btn-neon"
              onClick={handleLogin}
              disabled={isLoggingIn}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 28px",
                opacity: isLoggingIn ? 0.8 : 1,
              }}
              data-ocid="admin.login_button"
            >
              {isLoggingIn ? (
                <>
                  <div
                    style={{
                      width: 16,
                      height: 16,
                      border: "2px solid rgba(13,13,13,0.3)",
                      borderTopColor: "#0d0d0d",
                      borderRadius: "50%",
                      animation: "loader-spin 0.8s linear infinite",
                    }}
                  />
                  Connecting...
                </>
              ) : (
                <>
                  <LogIn size={16} />
                  Sign in with Internet Identity
                </>
              )}
            </button>
          </div>
        )}

        {/* Admin dashboard */}
        {!checkingAdmin && isAdmin && (
          <div data-ocid="admin.messages_list">
            {/* Stats row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                gap: "16px",
                marginBottom: "32px",
              }}
            >
              {[
                { label: "Total Messages", value: messages.length, icon: Mail },
                {
                  label: "Unread",
                  value: Number(unreadCount ?? 0),
                  icon: Inbox,
                },
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
                    padding: "20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <Icon size={20} style={{ color: "var(--neon)" }} />
                  <div>
                    <div
                      style={{
                        fontSize: "1.4rem",
                        fontWeight: 800,
                        color: "var(--text-primary)",
                      }}
                    >
                      {value}
                    </div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {label}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Loading messages */}
            {loadingMessages && (
              <div
                style={{
                  textAlign: "center",
                  padding: "60px 0",
                  color: "var(--text-secondary)",
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    border: "2px solid rgba(0,255,136,0.2)",
                    borderTopColor: "var(--neon)",
                    borderRadius: "50%",
                    animation: "loader-spin 0.8s linear infinite",
                    margin: "0 auto 12px",
                  }}
                />
                Loading messages...
              </div>
            )}

            {/* Empty state */}
            {!loadingMessages && messages.length === 0 && (
              <div
                data-ocid="admin.empty_state"
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

            {/* Messages table/list */}
            {!loadingMessages && messages.length > 0 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
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
                    onMarkRead={() => handleMarkRead(msg.id)}
                    onDelete={() => handleDelete(msg.id)}
                    formatDate={formatDate}
                    isMarkingRead={markReadMutation.isPending}
                    isDeleting={deleteMutation.isPending}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        .back-btn:hover {
          border-color: var(--neon) !important;
          color: var(--neon) !important;
        }
        .refresh-btn:hover {
          border-color: var(--neon) !important;
          color: var(--neon) !important;
        }
      `}</style>
    </div>
  );
}

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
      {/* Row header */}
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
        {/* Unread indicator */}
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

        {/* Name */}
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

        {/* Subject */}
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

        {/* Date */}
        <div
          style={{
            fontSize: "0.75rem",
            color: "var(--text-secondary)",
            flexShrink: 0,
          }}
        >
          {formatDate(msg.timestamp)}
        </div>

        {/* Actions */}
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
              title="Mark as read"
            >
              <CheckCheck size={12} />
              Read
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
            title="Delete message"
          >
            <Trash2 size={12} />
          </button>
        </div>
      </button>

      {/* Expanded message */}
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
