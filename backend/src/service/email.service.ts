import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { format } from 'date-fns';

// Ensure environment variables are loaded
dotenv.config();

// Email configuration
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Verify transporter configuration
transporter.verify(function(error, success) {
  if (error) {
    console.error('SMTP connection error:', error);
  } else {
    console.log('SMTP session service is ready to send messages');
  }
});

// Company and owner emails from environment variables
const COMPANY_EMAIL = process.env.COMPANY_EMAIL || '';
const OWNER_EMAIL = process.env.OWNER_EMAIL || '';
const EMAIL_FROM = process.env.EMAIL_FROM || 'info@learninghabits.world';

// Common email header and footer
const emailHeader = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
  <div style="text-align: center; margin-bottom: 20px;">
    <h1 style="color: #4a5568;">Learning Habits</h1>
  </div>
`;

const emailFooter = `
  <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #718096; font-size: 12px;">
    <p>This is an automated message, please do not reply directly to this email.</p>
    <p>© ${new Date().getFullYear()} Learning Habits. All rights reserved.</p>
  </div>
</div>
`;

// Common types
interface SessionBase {
  name: string;
  email: string;
  date: string | Date;
  time: string;
  message?: string;
  status?: string;
}

export interface ExpertSessionData extends SessionBase {
  techArea: string;
  specificTech?: string;
  sessionType: 'expert';
}

export interface TechLearningSessionData extends SessionBase {
  techInterest: string;
  techSpecifics?: string;
  sessionType: 'techLearning';
}

export interface AppointmentData extends SessionBase {
  preference: string;
  sessionType: 'appointment';
}

export interface JobSupportData extends SessionBase {
  preference: string;
  experienceLevel: string;
  sessionType: 'jobSupport';
}

export type SessionData = ExpertSessionData | TechLearningSessionData | AppointmentData | JobSupportData;

/**
 * Format date and time for email display
 */
const formatDateTime = (date: string | Date, time: string): string => {
  const sessionDate = typeof date === 'string' ? new Date(date) : date;
  return `${format(sessionDate, 'MMMM d, yyyy')} at ${time}`;
};

/**
 * Get session type specific details for email
 */
const getSessionSpecificDetails = (session: SessionData): { title: string, details: string } => {
  switch(session.sessionType) {
    case 'expert':
      return {
        title: 'Expert Consultation Session',
        details: `
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Tech Area</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${session.techArea}</td>
          </tr>
          ${session.specificTech ? `
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Specific Technology</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${session.specificTech}</td>
          </tr>` : ''}
        `
      };
    case 'techLearning':
      return {
        title: 'Technology Learning Session',
        details: `
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Tech Interest</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${session.techInterest}</td>
          </tr>
          ${session.techSpecifics ? `
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Tech Specifics</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${session.techSpecifics}</td>
          </tr>` : ''}
        `
      };
    case 'appointment':
      return {
        title: 'General Appointment',
        details: `
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Preference</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${session.preference}</td>
          </tr>
        `
      };
    case 'jobSupport':
      return {
        title: 'Job Support Session',
        details: `
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Preference</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${session.preference}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Experience Level</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${session.experienceLevel}</td>
          </tr>
        `
      };
    default:
      return {
        title: 'Session',
        details: ''
      };
  }
};

/**
 * Send confirmation email to user after booking a session
 */
export const sendSessionConfirmationEmail = async (session: SessionData): Promise<void> => {
  try {
    const { title, details } = getSessionSpecificDetails(session);
    const formattedDateTime = formatDateTime(session.date, session.time);
    
    // Email content for user
    const mailOptions = {
      from: EMAIL_FROM,
      to: session.email,
      subject: `Your ${title} Confirmation`,
      html: `
        ${emailHeader}
        <h2>Thank you for booking a ${title}, ${session.name}!</h2>
        <p>Your session has been successfully scheduled with the following details:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Session Type</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${title}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Date & Time</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${formattedDateTime}</td>
          </tr>
          ${details}
          ${session.message ? `
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Your Message</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${session.message}</td>
          </tr>` : ''}
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Status</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${session.status || 'Pending'}</td>
          </tr>
        </table>
        
        <p>We will prepare the best resources for your session. Please be available 5 minutes before your scheduled time.</p>
        <p>If you need to reschedule or cancel your session, you can do so from your account dashboard.</p>
        
        <div style="text-align: center; margin-top: 25px; margin-bottom: 25px;">
          <a href="https://learninghabits.world/dashboard" 
             style="background-color: #4299e1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">
            View Your Dashboard
          </a>
        </div>
        
        <p>If you have any questions before your session, please feel free to contact us.</p>
        <p>We look forward to speaking with you!</p>
        ${emailFooter}
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Session confirmation email sent to ${session.email}`);
  } catch (error) {
    console.error('Failed to send session confirmation email:', error);
    throw error;
  }
};

/**
 * Send notification email to company and owner about new session booking
 */
export const sendSessionNotificationEmail = async (session: SessionData): Promise<void> => {
  try {
    const { title, details } = getSessionSpecificDetails(session);
    const formattedDateTime = formatDateTime(session.date, session.time);
    
    // Email content for company and owner
    const mailOptions = {
      from: EMAIL_FROM,
      to: COMPANY_EMAIL,
      cc: OWNER_EMAIL,
      subject: `New ${title} Booking`,
      html: `
        ${emailHeader}
        <h2>New ${title} Booking</h2>
        <p>A new session has been booked with the following details:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Name</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${session.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Email</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${session.email}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Session Type</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${title}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Date & Time</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${formattedDateTime}</td>
          </tr>
          ${details}
          ${session.message ? `
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>User Message</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${session.message}</td>
          </tr>` : ''}
        </table>
        
        <p style="margin-top: 20px;">Please review this booking and make necessary preparations.</p>
        <p><strong>Action Required:</strong> Please confirm this session by updating its status in the admin dashboard.</p>
        
        <div style="text-align: center; margin-top: 25px; margin-bottom: 25px;">
          <a href="https://learninghabits.world/admin/dashboard" 
             style="background-color: #4299e1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">
            Go to Admin Dashboard
          </a>
        </div>
        ${emailFooter}
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Notification email sent to ${COMPANY_EMAIL} and ${OWNER_EMAIL}`);
  } catch (error) {
    console.error('Failed to send notification email:', error);
    throw error;
  }
};

/**
 * Send cancellation confirmation email to user
 */
export const sendCancellationEmail = async (session: SessionData): Promise<void> => {
  try {
    const { title } = getSessionSpecificDetails(session);
    const formattedDateTime = formatDateTime(session.date, session.time);
    
    // Email content for cancellation
    const mailOptions = {
      from: EMAIL_FROM,
      to: session.email,
      subject: `${title} Cancellation Confirmation`,
      html: `
        ${emailHeader}
        <h2>Session Cancellation Confirmation</h2>
        <p>Hello ${session.name},</p>
        <p>We're confirming that your ${title} scheduled for ${formattedDateTime} has been cancelled.</p>
        <p>If you'd like to reschedule, you can do so anytime through our platform.</p>
        
        <div style="text-align: center; margin-top: 25px; margin-bottom: 25px;">
          <a href="https://learninghabits.world/book-session" 
             style="background-color: #4299e1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">
            Book Another Session
          </a>
        </div>
        
        <p>If you have any questions or need assistance, please don't hesitate to contact us.</p>
        <p>Thank you for your interest in our services.</p>
        ${emailFooter}
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Cancellation email sent to ${session.email}`);
  } catch (error) {
    console.error('Failed to send cancellation email:', error);
    throw error;
  }
};

/**
 * Send cancellation notification to company and owner
 */
export const sendCancellationNotificationEmail = async (session: SessionData): Promise<void> => {
  try {
    const { title } = getSessionSpecificDetails(session);
    const formattedDateTime = formatDateTime(session.date, session.time);
    
    // Email content for company and owner
    const mailOptions = {
      from: EMAIL_FROM,
      to: COMPANY_EMAIL,
      cc: OWNER_EMAIL,
      subject: `${title} Cancellation Notice`,
      html: `
        ${emailHeader}
        <h2>Session Cancellation Notice</h2>
        <p>A session has been cancelled with the following details:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Name</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${session.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Email</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${session.email}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Session Type</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${title}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Cancelled Date & Time</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${formattedDateTime}</td>
          </tr>
        </table>
        
        <p style="margin-top: 20px;">Please update your schedule accordingly.</p>
        ${emailFooter}
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Cancellation notification sent to ${COMPANY_EMAIL} and ${OWNER_EMAIL}`);
  } catch (error) {
    console.error('Failed to send cancellation notification:', error);
    throw error;
  }
};

/**
 * Send all session booking notifications
 * - Confirmation to the user
 * - Notification to company with owner in CC
 */
export const sendSessionBookingNotifications = async (session: SessionData): Promise<void> => {
  try {
    console.log(`Sending notifications for ${session.sessionType} booking from: ${session.email}`);
    
    // Send confirmation to user
    try {
      await sendSessionConfirmationEmail(session);
      console.log('User confirmation email sent successfully');
    } catch (confirmError: any) {
      console.error('Failed to send user confirmation email:', confirmError.message);
      throw confirmError;
    }
    
    // Send notification to company and owner
    try {
      await sendSessionNotificationEmail(session);
      console.log('Admin notification email sent successfully');
    } catch (notifyError: any) {
      console.error('Failed to send admin notification:', notifyError.message);
      throw notifyError;
    }
    
    console.log('All session booking notifications sent successfully');
  } catch (error: any) {
    console.error('Session notification service error:', error.message);
    throw new Error(`Session notification sending failed: ${error.message}`);
  }
};

/**
 * Handle all cancellation notifications
 */
export const sendCancellationNotifications = async (session: SessionData): Promise<void> => {
  try {
    console.log(`Sending cancellation notifications for ${session.sessionType} from: ${session.email}`);
    
    // Send cancellation confirmation to user
    try {
      await sendCancellationEmail(session);
      console.log('User cancellation email sent successfully');
    } catch (cancelError: any) {
      console.error('Failed to send user cancellation email:', cancelError.message);
      throw cancelError;
    }
    
    // Send cancellation notification to company and owner
    try {
      await sendCancellationNotificationEmail(session);
      console.log('Admin cancellation notification sent successfully');
    } catch (notifyError: any) {
      console.error('Failed to send admin cancellation notification:', notifyError.message);
      throw notifyError;
    }
    
    console.log('All cancellation notifications sent successfully');
  } catch (error: any) {
    console.error('Cancellation notification service error:', error.message);
    throw new Error(`Cancellation notification sending failed: ${error.message}`);
  }
};

// Export the existing learner notification functions too
export interface LearnerData {
  name: string;
  email: string;
  phoneNumber: string;
  status: string;
  schoolName?: string;
  companyName?: string;
  preferences: string[];
}

/**
 * Send welcome email to learner after registration
 */
export const sendLearnerWelcomeEmail = async (learner: LearnerData): Promise<void> => {
  try {
    // Email content for learner
    const mailOptions = {
      from: EMAIL_FROM,
      to: learner.email,
      subject: 'Welcome to Our Learning Platform!',
      html: `
        ${emailHeader}
        <h2>Welcome ${learner.name}!</h2>
        <p>Thank you for registering with our learning platform. We're excited to have you on board!</p>
        <p>Your account has been successfully created with the following details:</p>
        <ul style="padding-left: 20px; line-height: 1.6;">
          <li><strong>Email:</strong> ${learner.email}</li>
          <li><strong>Status:</strong> ${learner.status === 'student' ? 'Student' : 'Working Professional'}</li>
          ${learner.status === 'student' ? `<li><strong>School:</strong> ${learner.schoolName}</li>` : ''}
          ${learner.status === 'job' ? `<li><strong>Company:</strong> ${learner.companyName}</li>` : ''}
          <li><strong>Selected Technologies:</strong> ${learner.preferences.join(', ')}</li>
        </ul>
        
        <p>You can now log in to your account and start exploring our courses!</p>
        
        <div style="text-align: center; margin-top: 25px; margin-bottom: 25px;">
          <a href="https://learninghabits.world/dashboard" 
             style="background-color: #4299e1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">
            Go to Dashboard
          </a>
        </div>
        
        <p>If you have any questions, please don't hesitate to contact our support team.</p>
        <p>Best regards,<br>The Learning Platform Team</p>
        ${emailFooter}
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Welcome email sent to ${learner.email}`);
  } catch (error) {
    console.error('Failed to send welcome email to learner:', error);
    throw error;
  }
};

/**
 * Send notification email to company and owner about new learner registration
 */
export const sendNewLearnerNotification = async (learner: LearnerData): Promise<void> => {
  try {
    // Email content for company and owner
    const mailOptions = {
      from: EMAIL_FROM,
      to: COMPANY_EMAIL,
      cc: OWNER_EMAIL,
      subject: 'New Learner Registration',
      html: `
        ${emailHeader}
        <h2>New Learner Registration</h2>
        <p>A new learner has registered on the platform with the following details:</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Name</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${learner.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Email</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${learner.email}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone Number</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${learner.phoneNumber}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Status</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${learner.status === 'student' ? 'Student' : 'Working Professional'}</td>
          </tr>
          ${learner.status === 'student' ? `
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>School</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${learner.schoolName}</td>
          </tr>` : ''}
          ${learner.status === 'job' ? `
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Company</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${learner.companyName}</td>
          </tr>` : ''}
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Selected Technologies</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${learner.preferences.join(', ')}</td>
          </tr>
        </table>
        <p style="margin-top: 20px;">Please ensure to follow up with this learner if needed.</p>
        ${emailFooter}
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Notification email sent to ${COMPANY_EMAIL} and ${OWNER_EMAIL}`);
  } catch (error) {
    console.error('Failed to send notification email:', error);
    throw error;
  }
};

/**
 * Send all registration notifications
 * - Welcome email to the learner
 * - Notification to company with owner in CC
 */
export const sendRegistrationNotifications = async (learnerData: LearnerData): Promise<void> => {
  try {
    console.log('Attempting to send registration notifications for:', learnerData.email);
    
    // Send welcome email to learner
    try {
      await sendLearnerWelcomeEmail(learnerData);
      console.log('Welcome email sent successfully');
    } catch (welcomeError: any) {
      console.error('Failed to send welcome email:', welcomeError.message);
      throw welcomeError;
    }
    
    // Send notification to company and owner
    try {
      await sendNewLearnerNotification(learnerData);
      console.log('Notification email sent successfully');
    } catch (notificationError: any) {
      console.error('Failed to send company notification:', notificationError.message);
      throw notificationError;
    }
    
    console.log('All registration notifications sent successfully');
  } catch (error: any) {
    console.error('Notification service error:', error.message);
    throw new Error(`Notification sending failed: ${error.message}`);
  }
};