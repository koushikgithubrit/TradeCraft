import mongoose from 'mongoose';

export interface ICourse extends mongoose.Document {
  title: string;
  description: string;
  modules: {
    title: string;
    content: string;
    pdfPath: string;
    order: number;
  }[];
  isFree: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  modules: [{
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    pdfPath: {
      type: String,
      required: true
    },
    order: {
      type: Number,
      required: true
    }
  }],
  isFree: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model<ICourse>('Course', courseSchema);
