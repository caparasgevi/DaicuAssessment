import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema({
  name:          { type: String, required: true },
  email:         { type: String, required: true },
  message:       { type: String, required: true },
  status:        { type: String, enum: ['pending', 'sent', 'failed'], default: 'pending' },
  failureReason: { type: String, default: null },
  submittedAt:   { type: Date, default: Date.now },
});

export const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);