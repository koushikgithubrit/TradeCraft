import express from 'express';
import axios from 'axios';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Log the request data for debugging
    console.log('Contact form submission:', { name, email, messageLength: message?.length });
    console.log('EmailJS Config:', {
      serviceId: process.env.EMAILJS_SERVICE_ID,
      templateId: process.env.EMAILJS_TEMPLATE_ID,
      userId: process.env.EMAILJS_USER_ID
    });

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

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
      console.log('Email sent successfully');
      res.json({ message: 'Message sent successfully' });
    } else {
      console.error('Unexpected response:', response.status, response.data);
      throw new Error('Failed to send message');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('EmailJS error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      res.status(error.response?.status || 500).json({ 
        error: 'Failed to send message',
        details: error.response?.data || error.message
      });
    } else {
      console.error('Contact form error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

export default router;
