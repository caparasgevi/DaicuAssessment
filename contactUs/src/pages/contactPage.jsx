import React, { useState } from 'react';
import axios from 'axios';
import ContactForm from '../components/ContactForm.jsx';
import EmailPreview from '../components/EmailPreview.jsx';
import { getStyles } from '../styles/contactStyles.js';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ text: '', type: '' });
    try {
      await axios.post('http://localhost:5000/api/send-email', formData);
      setStatus({ text: 'Message sent.', type: 'success' });
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setStatus({ text: 'Something went wrong.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const s = getStyles({
    loading,
    hasContent: formData.name || formData.email || formData.message,
    hasMessage: !!formData.message,
  });

  return (
    <div style={s.page}>
      <div style={s.grid}>
        <ContactForm formData={formData} onChange={handleChange} onSubmit={handleSubmit} loading={loading} status={status} s={s} />
        <EmailPreview formData={formData} s={s} />
      </div>
    </div>
  );
};

export default ContactUs;