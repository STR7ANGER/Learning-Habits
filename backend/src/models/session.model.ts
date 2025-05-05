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
  status?: string;
  sessionType: 'expert' | 'techLearning' | 'appointment' | 'jobSupport';
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

// Appointment specific fields
export interface IAppointment extends ISession {
  preference: string; // Maps to 'Area of Interest' in the form
}

// Job Support specific fields
export interface IJobSupport extends ISession {
  preference: string;
  experienceLevel: string;
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
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  sessionType: { 
    type: String, 
    enum: ['expert', 'techLearning', 'appointment', 'jobSupport'], 
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

// Appointment schema
const appointmentSchema = new Schema({
  preference: {
    type: String,
    required: true
  }
});

// Job Support schema
const jobSupportSchema = new Schema({
  preference: {
    type: String,
    required: true
  },
  experienceLevel: {
    type: String,
    required: true
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
export const Appointment = Session.discriminator<IAppointment>(
  'Appointment',
  appointmentSchema
);
export const JobSupport = Session.discriminator<IJobSupport>(
  'JobSupport',
  jobSupportSchema
);

export default Session;