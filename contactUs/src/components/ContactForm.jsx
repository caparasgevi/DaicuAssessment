import React from "react";

const ContactForm = ({ formData, onChange, onSubmit, loading, status, s }) => (
  <div>
    <div style={{ marginBottom: "36px" }}>
      <h1 style={{ ...s.h1, color: "#1a1a1a" }}>Get in touch.</h1>
      <p
        style={{
          ...s.subtitle,
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: "20px",
            height: "1.5px",
            background: "#ff9800",
          }}
        />
        Fill out the form and we'll be in touch shortly.
      </p>
    </div>

    {/* Name Input */}
    <form
      onSubmit={onSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "28px" }}
    >
      <div style={{ position: "relative" }}>
        <label style={{ ...s.lbl, color: "#ff9800" }}>Name</label>
        <input
          name="name"
          value={formData.name}
          onChange={onChange}
          required
          style={{
            ...s.input,
            borderBottomColor: formData.name ? "#ff9800" : "#ebebeb",
            transition: "border-color 0.2s ease",
          }}
          placeholder="Enter your name"
        />
      </div>

      {/* Email Input */}
      <div style={{ position: "relative" }}>
        <label style={{ ...s.lbl, color: "#ff9800" }}>Email</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={onChange}
          required
          style={{
            ...s.input,
            borderBottomColor: formData.email ? "#ff9800" : "#ebebeb",
            transition: "border-color 0.2s ease",
          }}
          placeholder="Enter your email"
        />
      </div>

      {/* Message Area */}
      <div style={{ position: "relative" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "6px",
          }}
        >
          <label style={{ ...s.lbl, color: "#ff9800", marginBottom: 0 }}>
            Message
          </label>
          <span
            style={{
              fontSize: "10px",
              color: formData.message.length > 1000 ? "#ef4444" : "#ccc",
              letterSpacing: "0.05em",
            }}
          >
            {formData.message.length} / 1000
          </span>
        </div>
        <textarea
          name="message"
          value={formData.message}
          onChange={onChange}
          required
          maxLength={1000}
          rows={4}
          style={{
            ...s.input,
            borderBottomColor: formData.message ? "#ff9800" : "#ebebeb",
            transition: "border-color 0.2s ease",
          }}
          placeholder="Write your message…"
        />
      </div>

      {/* Status Feedback: Displays Success or Error notifications */}
      {status.text && (
        <div
          style={{
            padding: "12px 16px",
            backgroundColor: status.type === "error" ? "#fef2f2" : "#fff7ed",
            borderLeft: `3px solid ${status.type === "error" ? "#ef4444" : "#ff9800"}`,
            borderRadius: "0 4px 4px 0",
          }}
        >
          <span
            style={{
              fontSize: "13px",
              fontWeight: 500,
              color: status.type === "error" ? "#991b1b" : "#9a3412",
              letterSpacing: "0.02em",
            }}
          >
            {status.type === "success" ? "✓ " : "✕ "}
            {status.text}
          </span>
        </div>
      )}

      <div
        style={{
          ...s.formFooter,
          borderTop: "1px solid #f5f5f5",
          paddingTop: "20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background:
                formData.name && formData.email && formData.message
                  ? "#ff9800"
                  : "#e5e5e5",
              transition: "background 0.3s",
            }}
          />
          <span
            style={{ fontSize: "11px", color: "#ccc", letterSpacing: "0.05em" }}
          >
            {formData.name && formData.email && formData.message
              ? "Ready to send"
              : "Fill all fields"}
          </span>
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            ...s.btn,
            background: loading ? "#ccc" : "#ff9800",
            padding: "12px 40px",
            transition: "background 0.2s, transform 0.1s",
            boxShadow: loading ? "none" : "0 4px 12px rgba(255,152,0,0.3)",
          }}
        >
          {loading ? "Sending…" : "Send →"}
        </button>
      </div>
    </form>
  </div>
);

export default ContactForm;
