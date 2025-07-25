import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import { verifyToken } from './auth.js';

dotenv.config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-06-30.basil'
});

// Create payment intent
router.post('/create-payment-intent', verifyToken, async (req, res) => {
  try {
    const { courseId, amount } = req.body;
    const userId = req.user.userId;

    if (!courseId || !amount) {
      return res.status(400).json({ error: 'Course ID and amount are required' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: 'usd',
      metadata: {
        courseId,
        userId: userId.toString(),
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Payment intent creation error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Webhook to handle successful payments
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig || '',
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      const { courseId, userId } = paymentIntent.metadata;
      
      console.log('Payment succeeded for course:', courseId);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).json({ error: error.message });
  }
});

export default router; 