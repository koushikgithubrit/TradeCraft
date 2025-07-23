import express from 'express';
import axios from 'axios';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Update these keys to match your EmailJS template
    const response = await axios.post(
      'https://api.emailjs.com/api/v1.0/email/send',
      {
        service_id: process.env.EMAILJS_SERVICE_ID,
        template_id: process.env.EMAILJS_TEMPLATE_ID,
        user_id: process.env.EMAILJS_USER_ID, // <-- this line is required!
        template_params: {
          from_name: name,
          from_email: email,
          message: message,
          to_name: 'Admin',
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.EMAILJS_PRIVATE_KEY}`,
        }
      }
    );

    if (response.status === 200) {
      res.json({ message: 'Message sent successfully' });
    } else {
      throw new Error('Failed to send message');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('EmailJS error:', error.response?.data || error.message);
    } else {
      console.error('Contact form error:', error);
    }
    res.status(500).json({ error: 'Failed to send message' });
  }
});

export default router;
