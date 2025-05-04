import mongoose, { Schema, Document } from 'mongoose';

// Common interface for session bookings
export interface ISession extends Document {
  uid: string;
  name: string;
  email: string;
  date: string;
  time: string;
  message: string;
  createdAt: Date;
  sessionType: 'expert' | 'techLearning';
}

// Expert session specific fields
export interface IExpertSession extends ISession {
  techArea: string;
  specificTech?: string;
}

// Tech Learning session specific fields
export interface ITechLearningSession extends ISession {
  techInterest: string;
  techSpecifics?: string;
}

// Base schema with common fields
const sessionSchema = new Schema({
  uid: { 
    type: String, 
    required: true,
    index: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  date: { 
    type: String, 
    required: true 
  },
  time: { 
    type: String, 
    required: true 
  },
  message: { 
    type: String, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  sessionType: { 
    type: String, 
    enum: ['expert', 'techLearning'], 
    required: true 
  }
});

// Expert session schema
const expertSessionSchema = new Schema({
  techArea: { 
    type: String, 
    required: true 
  },
  specificTech: { 
    type: String
  }
});

// Tech learning session schema
const techLearningSessionSchema = new Schema({
  techInterest: { 
    type: String, 
    required: true 
  },
  techSpecifics: { 
    type: String 
  }
});

// Create discriminator models
const Session = mongoose.model<ISession>('Session', sessionSchema);
export const ExpertSession = Session.discriminator<IExpertSession>(
  'ExpertSession',
  expertSessionSchema
);
export const TechLearningSession = Session.discriminator<ITechLearningSession>(
  'TechLearningSession',
  techLearningSessionSchema
);

export default Session;