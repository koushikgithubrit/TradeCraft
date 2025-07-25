import express, { Request, Response } from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import PurchasedCourse from '../models/PurchasedCourse.js';
import verifyToken from '../middleware/auth.js';

// Extend Express Request type
interface AuthRequest extends Request {
  user: {
    userId: string;
  }
}

dotenv.config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16'
});

// Create payment intent
router.post('/create-payment-intent', verifyToken, async (req: Request, res: Response) => {
  try {
    const { courseId, amount } = req.body;
    const userId = (req as AuthRequest).user.userId;

    if (!courseId || !amount) {
      return res.status(400).json({ error: 'Course ID and amount are required' });
    }

    // Check if user has already purchased this course
    const existingPurchase = await PurchasedCourse.findOne({ userId, courseId });
    if (existingPurchase) {
      return res.status(400).json({ error: 'You have already purchased this course' });
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
  } catch (error: any) {
    console.error('Payment intent creation error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Webhook to handle successful payments
router.post('/webhook', express.raw({ type: 'application/json' }), async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'];

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig || '',
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const { courseId, userId } = paymentIntent.metadata;
      
      // Record the purchase
      await PurchasedCourse.create({
        userId,
        courseId,
        paymentIntentId: paymentIntent.id,
        amount: paymentIntent.amount / 100, // Convert from cents back to dollars
      });

      console.log('Payment succeeded and purchase recorded for course:', courseId);
    }

    res.json({ received: true });
  } catch (error: any) {
    console.error('Webhook error:', error);
    res.status(400).json({ error: error.message });
  }
});

// Get user's purchased courses
router.get('/purchased-courses', verifyToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthRequest).user.userId;
    const purchasedCourses = await PurchasedCourse.find({ userId });
    res.json(purchasedCourses);
  } catch (error: any) {
    console.error('Error fetching purchased courses:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router; 