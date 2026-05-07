import mongoose from 'mongoose';

const emailVerificationCacheSchema = new mongoose.Schema({
  email:     { type: String, required: true, unique: true },
  isValid:   { type: Boolean, required: true },
  reason:    { type: String, required: true },
  checkedAt: { type: Date, required: true },
});

export const EmailVerificationCache = mongoose.model('EmailVerificationCache', emailVerificationCacheSchema);