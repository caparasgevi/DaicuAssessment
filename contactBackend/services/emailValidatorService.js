import dns from 'dns/promises';
import validator from 'validator';
import { EmailVerificationCache } from '../models/EmailVerificationCache.js';

const QUICK_EMAIL_VERIFICATION_URL = 'https://api.quickemailverification.com/v1/verify';
const DEFAULT_VALID_CACHE_TTL_MS   = 7 * 24 * 60 * 60 * 1000; // 7 days
const DEFAULT_INVALID_CACHE_TTL_MS = 24 * 60 * 60 * 1000;      // 1 day

const DISPOSABLE_DOMAINS = [
  'mailinator.com', 'tempmail.com', 'guerrillamail.com',
  'throwaway.email', 'yopmail.com', 'sharklasers.com',
  'trashmail.com', '10minutemail.com', 'fakeinbox.com',
];

const MESSAGES = {
  regex:      'Please enter a valid email address (e.g. yourname@gmail.com).',
  disposable: 'Disposable or temporary email addresses are not allowed. Please use your real email.',
  mx:         "The email domain doesn't exist or can't receive emails. Please double-check your email address.",
  invalid:    'This email address does not exist or cannot receive emails. Please use a real email address.',
  apiMissing: 'Email verification is unavailable. Please try again later.',
};

const checkFormat = (email) => validator.isEmail(email);

const checkDisposable = (email) => {
  const domain = email.split('@')[1].toLowerCase();
  return !DISPOSABLE_DOMAINS.includes(domain);
};

const checkMX = async (email) => {
  const domain = email.split('@')[1];
  try {
    const records = await dns.resolveMx(domain);
    return records && records.length > 0;
  } catch {
    return false;
  }
};

// QuickEmailVerification API + cache

const normalizeEmail = (email) => email.trim().toLowerCase();

const getCacheTtlMs = (isValid) => {
  const envValue = isValid
    ? process.env.EMAIL_VERIFICATION_VALID_CACHE_TTL_MS
    : process.env.EMAIL_VERIFICATION_INVALID_CACHE_TTL_MS;
  const parsed = Number(envValue);
  return Number.isFinite(parsed) && parsed > 0
    ? parsed
    : isValid ? DEFAULT_VALID_CACHE_TTL_MS : DEFAULT_INVALID_CACHE_TTL_MS;
};

const isFreshCache = (checkedAt, isValid) =>
  Date.now() - checkedAt.getTime() <= getCacheTtlMs(isValid);

const fetchEmailVerification = async (email) => {
  const apiKey = process.env.QUICKEMAILVERIFICATION_API_KEY;
  if (!apiKey) throw new Error(MESSAGES.apiMissing);

  const url = new URL(QUICK_EMAIL_VERIFICATION_URL);
  url.searchParams.set('email', email);
  url.searchParams.set('apikey', apiKey);

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok || data.success === false) {
    throw new Error(data.message || MESSAGES.apiMissing);
  }

  return {
    isValid: data.result === 'valid' && data.safe_to_send !== false,
    reason:  data.reason || data.result || 'unknown',
  };
};

const verifyWithCache = async (email) => {
  const normalized = normalizeEmail(email);

  const cached = await EmailVerificationCache.findOne({ email: normalized }).lean();
  if (cached && isFreshCache(cached.checkedAt, cached.isValid)) {
    return { isValid: cached.isValid, reason: cached.reason };
  }

  const result = await fetchEmailVerification(normalized);

  await EmailVerificationCache.findOneAndUpdate(
    { email: normalized },
    { email: normalized, isValid: result.isValid, reason: result.reason, checkedAt: new Date() },
    { upsert: true }
  );

  return result;
};

export const validateEmail = async (email) => {
  if (!checkFormat(email))
    return { valid: false, reason: MESSAGES.regex };

  if (!checkDisposable(email))
    return { valid: false, reason: MESSAGES.disposable };

  const mxValid = await checkMX(email);
  if (!mxValid)
    return { valid: false, reason: MESSAGES.mx };

  const { isValid } = await verifyWithCache(email);
  if (!isValid)
    return { valid: false, reason: MESSAGES.invalid };

  return { valid: true, reason: null };
};