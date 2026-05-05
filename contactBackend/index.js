import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Config } from './models/Config.js';

dotenv.config();
const app = express();

// Middleware configuration
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection error:', err));

// Contact Endpoint
app.post('/api/send-email', async (req, res) => {
  try {
    const adminConfig = await Config.findOne({ key: 'admin_contact' });
    const targetEmail = adminConfig.recipientEmail; // nicomarc.reyes@bulsu.edu.ph

    res.status(200).json({ message: 'Ready to send email' });
  } catch (error) {
    res.status(500).json({ error: 'Server error during retrieval' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));