import React from "react";

const ContactForm = ({ formData, onChange, onSubmit, loading, status }) => {
  const allFilled = formData.name && formData.email && formData.message;

  return (
    <div>
      {/* Header */}
      <div className="mb-9">
        <h1 className="font-serif text-3xl font-medium tracking-tight text-[#1a1a1a] leading-tight mb-2">
          Get in touch.
        </h1>
        <p className="flex items-center gap-2 text-[13px] text-[#aaa] font-light">
          <span className="inline-block w-5 h-px bg-[#ff9800]" />
          Fill out the form and we'll be in touch shortly.
        </p>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-7">
        {/* Name */}
        <div>
          <label className="block text-[10px] font-medium tracking-[0.14em] uppercase text-[#ff9800] mb-1.5">
            Name
          </label>
          <input
            name="name"
            value={formData.name}
            onChange={onChange}
            required
            placeholder="Enter your name"
            className={`w-full bg-transparent border-b pb-2 pt-1 text-sm font-light text-[#111] outline-none transition-colors duration-200 placeholder:text-[#ccc] ${
              formData.name ? "border-[#ff9800]" : "border-[#ebebeb]"
            }`}
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-[10px] font-medium tracking-[0.14em] uppercase text-[#ff9800] mb-1.5">
            Email
          </label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={onChange}
            required
            placeholder="Enter your email"
            className={`w-full bg-transparent border-b pb-2 pt-1 text-sm font-light text-[#111] outline-none transition-colors duration-200 placeholder:text-[#ccc] ${
              formData.email ? "border-[#ff9800]" : "border-[#ebebeb]"
            }`}
          />
        </div>

        {/* Message */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-[10px] font-medium tracking-[0.14em] uppercase text-[#ff9800]">
              Message
            </label>
            <span className={`text-[10px] tracking-wide ${formData.message.length > 1000 ? "text-red-500" : "text-[#ccc]"}`}>
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
            placeholder="Write your message…"
            className={`w-full bg-transparent border-b pb-2 pt-1 text-sm font-light text-[#111] outline-none resize-none transition-colors duration-200 placeholder:text-[#ccc] ${
              formData.message ? "border-[#ff9800]" : "border-[#ebebeb]"
            }`}
          />
        </div>

        {/* Status */}
        {status.text && (
          <div className={`px-4 py-3 rounded-r border-l-[3px] ${
            status.type === "error"
              ? "bg-red-50 border-red-400"
              : "bg-orange-50 border-[#ff9800]"
          }`}>
            <span className={`text-[13px] font-medium tracking-wide ${
              status.type === "error" ? "text-red-800" : "text-orange-900"
            }`}>
              {status.type === "success" ? "✓ " : "✕ "}
              {status.text}
            </span>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-[#f5f5f5] pt-5">
          <div className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
              allFilled ? "bg-[#ff9800]" : "bg-[#e5e5e5]"
            }`} />
            <span className="text-[11px] text-[#ccc] tracking-wide">
              {allFilled ? "Ready to send" : "Fill all fields"}
            </span>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`text-white text-[11px] font-medium tracking-[0.12em] uppercase px-10 py-3 transition-all duration-200 ${
              loading
                ? "bg-[#ccc] cursor-default shadow-none"
                : "bg-[#ff9800] cursor-pointer shadow-[0_4px_12px_rgba(255,152,0,0.3)]"
            }`}
          >
            {loading ? "Sending…" : "Send →"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;