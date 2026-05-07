import { sendContactEmail } from '../services/emailService.js';
import { validateEmail } from '../services/emailValidatorService.js';
import { ContactMessage } from '../models/ContactMessage.js';

export const handleSendEmail = async (req, res) => {
  const { name, email, message } = req.body;

  const { valid, reason } = await validateEmail(email);
  if (!valid) {
    return res.status(400).json({ error: reason });
  }

  const contactMessage = await ContactMessage.create({
    name,
    email,
    message,
    status: 'pending',
  });

  try {
    await sendContactEmail({ name, email, message });

    await ContactMessage.findByIdAndUpdate(contactMessage._id, {
      status: 'sent',
      failureReason: null,
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email error:', error.message);

    await ContactMessage.findByIdAndUpdate(contactMessage._id, {
      status: 'failed',
      failureReason: error.message,
    });

    const status = error.message.includes('not found') ? 404 : 500;
    res.status(status).json({ error: error.message || 'Failed to send message.' });
  }
};