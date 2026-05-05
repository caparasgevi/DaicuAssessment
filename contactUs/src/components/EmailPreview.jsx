import React from 'react';

const EmailPreview = ({ formData, s }) => (
  <div style={{ position: 'sticky', top: '40px' }}>
    <p style={{ 
      ...s.previewLabel, 
      fontSize: '11px', 
      letterSpacing: '0.2em', 
      color: '#aaaaaa', 
      textTransform: 'uppercase',
      marginBottom: '16px'
    }}>
      Email Preview
    </p>
    
    <div style={{ 
      ...s.emailCard, 
      border: '1px solid #eeeeee', 
      borderRadius: '2px', 
      overflow: 'hidden',
      backgroundColor: '#ffffff',
      maxHeight: 'calc(100vh - 100px)', 
      display: 'flex',
      flexDirection: 'column'
    }}>

      {/* Header Section */}
      <div style={{ background: '#ffffff', padding: '24px 20px', borderBottom: '1px solid #f5f5f5', flexShrink: 0 }}>
        <p style={{ 
          fontSize: '10px', 
          letterSpacing: '0.2em', 
          textTransform: 'uppercase', 
          color: '#ff9800', 
          fontWeight: '700', 
          margin: '0 0 12px 0' 
        }}>
          Incoming Inquiry
        </p>
        <p style={{ 
          fontSize: '18px', 
          color: '#333333', 
          margin: '0', 
          fontWeight: '500',
          wordBreak: 'break-word' 
        }}>
          {formData.name || '—'}
        </p>
        <p style={{ 
          fontSize: '13px', 
          color: '#888888', 
          margin: '4px 0 0', 
          fontWeight: '400',
          wordBreak: 'break-all' 
        }}>
          {formData.email || '—'}
        </p>
      </div>

      {/* Message Section */}
      <div style={{ 
        padding: '30px 20px', 
        minHeight: '140px', 
        borderTop: '1px solid #f5f5f5',
        overflowY: 'auto', 
        flexGrow: 1 
      }}>
        <p style={{ 
          ...s.emailMessage, 
          color: '#666666', 
          fontStyle: 'normal', 
          lineHeight: '1.8', 
          fontSize: '14px',
          margin: 0,
          whiteSpace: 'pre-wrap', 
          wordBreak: 'break-word' 
        }}>
          {formData.message || 'Start typing to see your message…'}
        </p>
      </div>

      {/* Footer */}
      <div style={{ padding: '18px 20px', borderTop: '1px solid #f5f5f5', backgroundColor: '#fafafa', flexShrink: 0 }}>
        <p style={{ fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#bbbbbb', margin: '0 0 4px 0' }}>To</p>
        <p style={{ fontSize: '12px', color: '#999999', margin: 0, fontWeight: '400' }}>
          nicomarc.reyes@bulsu.edu.ph
        </p>
      </div>

    </div>
  </div>
);

export default EmailPreview;