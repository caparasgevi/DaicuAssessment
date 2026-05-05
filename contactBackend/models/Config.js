import mongoose from 'mongoose';

const configSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  recipientEmail: { type: String },
  template: { type: String },
});

export const Config = mongoose.model('Config', configSchema);