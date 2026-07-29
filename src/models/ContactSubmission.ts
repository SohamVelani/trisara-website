import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IContactSubmission extends Document {
  name: string;
  email: string;
  company: string;
  message: string;
  createdAt: Date;
}

const ContactSubmissionSchema = new Schema<IContactSubmission>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name must be 100 characters or fewer'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      maxlength: [254, 'Email must be 254 characters or fewer'],
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please provide a valid email address',
      ],
    },
    company: {
      type: String,
      trim: true,
      maxlength: [200, 'Company name must be 200 characters or fewer'],
      default: '',
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      maxlength: [2000, 'Message must be 2000 characters or fewer'],
    },
  },
  {
    // Automatically manages createdAt and updatedAt fields
    timestamps: { createdAt: true, updatedAt: false },
  }
);

// Prevent OverwriteModelError during Next.js hot reloads
const ContactSubmission =
  (models.ContactSubmission as mongoose.Model<IContactSubmission>) ||
  model<IContactSubmission>('ContactSubmission', ContactSubmissionSchema);

export default ContactSubmission;
