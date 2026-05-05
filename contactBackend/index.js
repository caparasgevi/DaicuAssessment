import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import mongoose from 'mongoose';
import { Config } from './models/Config.js';

dotenv.config();
const app = express();

// Middleware configuration
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection error:', err));

// Contact Endpoint
app.post('/api/send-email', async (req, res) => {
  const { name, email, message } = req.body;
  console.log('Request received:', { name, email, message });
  try {
    const adminConfig = await Config.findOne({ key: 'admin_contact' });
    if (!adminConfig) return res.status(404).json({ error: 'Recipient email not found' });

    const templateConfig = await Config.findOne({ key: 'email_template' });
    if (!templateConfig) return res.status(404).json({ error: 'Email template not found' });

    console.log('Admin config:', adminConfig);
    console.log('Template config:', templateConfig);

    const targetEmail = adminConfig.recipientEmail;
    const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    console.log('Target email:', targetEmail);
    console.log('Sending email...');

    const htmlContent = templateConfig.template
      .replace(/{{name}}/g, name)
      .replace(/{{email}}/g, email)
      .replace(/{{message}}/g, message)
      .replace(/{{targetEmail}}/g, targetEmail)
      .replace(/{{date}}/g, date);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Contact Form" <${process.env.EMAIL_USER}>`,
      to: targetEmail,
      subject: `New Message from ${name}`,
      html: htmlContent,
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Full error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));