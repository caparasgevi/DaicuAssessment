import dns from 'dns/promises';
import validator from 'validator';

const DISPOSABLE_DOMAINS = [
  'mailinator.com', 'tempmail.com', 'guerrillamail.com',
  'throwaway.email', 'yopmail.com', 'sharklasers.com',
  'trashmail.com', '10minutemail.com', 'fakeinbox.com',
];

const MESSAGES = {
  regex: "Please enter a valid email address (e.g. yourname@gmail.com).",
  disposable: "Disposable or temporary email addresses are not allowed. Please use your real email.",
  mx: "The email domain doesn't exist or can't receive emails. Please double-check your email address.",
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

export const validateEmail = async (email) => {
  if (!checkFormat(email))
    return { valid: false, reason: MESSAGES.regex };

  if (!checkDisposable(email))
    return { valid: false, reason: MESSAGES.disposable };

  const mxValid = await checkMX(email);
  if (!mxValid)
    return { valid: false, reason: MESSAGES.mx };

  return { valid: true, reason: null };
};