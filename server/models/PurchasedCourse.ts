import mongoose from 'mongoose';

const purchasedCourseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  courseId: {
    type: String,
    required: true
  },
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  paymentIntentId: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['completed', 'refunded'],
    default: 'completed'
  }
});

// Create a compound index to prevent duplicate purchases
purchasedCourseSchema.index({ userId: 1, courseId: 1 }, { unique: true });

const PurchasedCourse = mongoose.model('PurchasedCourse', purchasedCourseSchema);

export default PurchasedCourse; 