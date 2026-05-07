import React, { useState } from "react";
import axios from "axios";
import ContactForm from "../components/ContactForm.jsx";
import EmailPreview from "../components/EmailPreview.jsx";

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-16 font-sans">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-18 items-start">
        <ContactForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          loading={loading}
          status={status}
        />
        <EmailPreview formData={formData} />
      </div>
    </div>
  );
};

export default ContactPage;