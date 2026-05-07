import React from "react";

const EmailPreview = ({ formData }) => (
  <div className="md:sticky md:top-10">
    <p className="text-[11px] tracking-[0.2em] uppercase text-[#aaa] mb-4">
      Email Preview
    </p>

    <div className="border border-[#eee] rounded-sm overflow-hidden bg-white flex flex-col max-h-[calc(100vh-100px)]">
      
      {/* Header */}
      <div className="px-5 py-6 border-b border-[#f5f5f5]">
        <p className="text-[10px] tracking-[0.2em] uppercase text-[#ff9800] font-bold mb-3">
          Incoming Inquiry
        </p>
        <p className="text-lg text-[#333] font-medium break-words">
          {formData.name || "Your name"}
        </p>
        <p className="text-[13px] text-[#888] mt-1 break-all">
          {formData.email || "Your email"}
        </p>
      </div>

      {/* Message */}
      <div className="px-5 py-7 min-h-[140px] overflow-y-auto flex-grow">
        <p className={`text-sm leading-relaxed whitespace-pre-wrap break-words border-l-2 border-[#ebebeb] pl-3.5 ${
          formData.message ? "text-[#666]" : "text-[#ccc]"
        }`}>
          {formData.message || "Start typing to see your message…"}
        </p>
      </div>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-[#f5f5f5] bg-[#fafafa]">
        <p className="text-[9px] tracking-[0.15em] uppercase text-[#bbb] mb-1">To</p>
        <p className="text-[12px] text-[#999]">
          {import.meta.env.VITE_RECIPIENT_EMAILS}
        </p>
      </div>
    </div>
  </div>
);

export default EmailPreview;