import express from 'express';
import axios from 'axios';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Send email using EmailJS
    const response = await axios.post(
      'https://api.emailjs.com/api/v1.0/email/send',
      {
        service_id: process.env.EMAILJS_SERVICE_ID,
        template_id: process.env.EMAILJS_TEMPLATE_ID,
        user_id: process.env.EMAILJS_USER_ID,
        accessToken: process.env.EMAILJS_PRIVATE_KEY,
        template_params: {
          from_name: name,
          from_email: email,
          message: message,
          to_name: 'Admin',
          reply_to: email
        },
      }
    );

    if (response.status === 200) {
      res.json({ message: 'Message sent successfully' });
    } else {
      throw new Error('Failed to send message');
    }
  } catch (error) {
    console.error('Contact form error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

export default router; 