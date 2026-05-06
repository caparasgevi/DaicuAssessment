import React, { useState, useEffect } from "react";
import axios from "axios";
import ContactForm from "../components/ContactForm.jsx";
import EmailPreview from "../components/EmailPreview.jsx";
import { getStyles } from "../styles/contactStyles.js";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false,
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setStatus({ text: "", type: "" });
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ text: "", type: "" });
    try {
      await axios.post("http://localhost:5000/api/send-email", formData);
      setStatus({ text: "Message sent.", type: "success" });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      const msg = error.response?.data?.error || "Something went wrong.";
      setStatus({ text: msg, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const s = getStyles({
    loading,
    hasContent: !!(formData.name || formData.email || formData.message),
    hasMessage: !!formData.message,
    isMobile,
  });

  return (
    <div style={s.page}>
      <div style={s.grid}>
        <ContactForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          loading={loading}
          status={status}
          s={s}
        />
        <EmailPreview formData={formData} s={s} />
      </div>
    </div>
  );
};

export default ContactPage;
