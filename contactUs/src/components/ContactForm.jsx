import React from 'react';

const ContactForm = ({ formData, onChange, onSubmit, loading, status, s }) => (
  <div>
    <div style={{ marginBottom: '36px' }}>
      <h1 style={s.h1}>Get in touch.</h1>
      <p style={s.subtitle}>Fill out the form and we'll be in touch shortly.</p>
    </div>

    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      <div>
        <label style={s.lbl}>Name</label>
        <input name="name" value={formData.name} onChange={onChange}
          required style={s.input} placeholder="Enter your name" />
      </div>
      <div>
        <label style={s.lbl}>Email</label>
        <input name="email" type="email" value={formData.email} onChange={onChange}
          required style={s.input} placeholder="Enter your email" />
      </div>
      <div>
        <label style={s.lbl}>Message</label>
        <textarea name="message" value={formData.message} onChange={onChange}
          required rows={4} style={s.input} placeholder="Write your message…" />
      </div>

      <div style={s.formFooter}>
        <span style={{ fontSize: '12px', fontWeight: 300, color: status.type === 'error' ? '#ef4444' : '#22c55e' }}>
          {status.text}
        </span>
        <button type="submit" disabled={loading} style={s.btn}>
          {loading ? 'Sending…' : 'Send'}
        </button>
      </div>
    </form>
  </div>
);

export default ContactForm;