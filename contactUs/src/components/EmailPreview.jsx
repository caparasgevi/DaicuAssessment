import React from 'react';

const EmailPreview = ({ formData, s }) => (
  <div style={{ position: 'sticky', top: '40px' }}>
    <p style={s.previewLabel}>Email Preview</p>
    <div style={s.emailCard}>

      <div style={{ background: '#f9f9f9', padding: '16px 20px', borderBottom: '1px solid #ebebeb' }}>
        <p style={{ ...s.emailTag, color: '#bbb' }}>New Submission</p>
        <p style={{ ...s.emailName, color: '#111' }}>{formData.name || '—'}</p>
        <p style={{ ...s.emailAddr, color: '#aaa' }}>{formData.email || '—'}</p>
      </div>

      <div style={{ padding: '20px' }}>
        <p style={s.emailMessage}>
          {formData.message || 'Start typing to see your message…'}
        </p>
      </div>

      <div style={{ padding: '14px 20px', borderTop: '1px solid #f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <p style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#ccc', margin: 0 }}>To</p>
          <p style={{ fontSize: '12px', color: '#999', fontWeight: 300, margin: '2px 0 0' }}>nicomarc.reyes@bulsu.edu.ph</p>
        </div>
      </div>

    </div>
  </div>
);

export default EmailPreview;