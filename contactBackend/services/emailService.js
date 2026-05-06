import nodemailer from 'nodemailer';
import { Config } from '../models/Config.js';

const createTransporter = () =>
  nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

const buildHtmlContent = (template, { name, email, message, targetEmail }) => {
  const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return template
    .replace(/{{name}}/g, name)
    .replace(/{{email}}/g, email)
    .replace(/{{message}}/g, message)
    .replace(/{{targetEmail}}/g, targetEmail)
    .replace(/{{date}}/g, date);
};

export const sendContactEmail = async ({ name, email, message }) => {
  const targetEmail = process.env.RECIPIENT_EMAILS;
  if (!targetEmail) throw new Error('Recipient configuration missing in .env');

  const templateConfig = await Config.findOne({ key: 'email_template' });
  if (!templateConfig) throw new Error('Email template not found');

  const htmlContent = buildHtmlContent(templateConfig.template, {
    name, email, message, targetEmail,
  });

  const transporter = createTransporter();

  await transporter.sendMail({
    from: `"Contact Form" <${process.env.EMAIL_USER}>`,
    to: targetEmail,
    subject: `New Message from ${name}`,
    html: htmlContent,
  });
};