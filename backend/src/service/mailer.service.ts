import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Ensure environment variables are loaded
dotenv.config();

// Log email configuration for debugging
console.log('Email Configuration:');
console.log(`- HOST: ${process.env.EMAIL_HOST}`);
console.log(`- PORT: ${process.env.EMAIL_PORT}`);
console.log(`- SECURE: ${process.env.EMAIL_SECURE}`);
console.log(`- USER: ${process.env.EMAIL_USER}`);
console.log(`- FROM: ${process.env.EMAIL_FROM || 'no-reply@learninghabits.world'}`);

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
    console.log('SMTP server is ready to send messages');
  }
});

// Company and owner emails from environment variables
const COMPANY_EMAIL = process.env.COMPANY_EMAIL || '';
const OWNER_EMAIL = process.env.OWNER_EMAIL || '';

interface LearnerData {
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
      from: process.env.EMAIL_FROM || 'no-reply@learninghabits.world',
      to: learner.email,
      subject: 'Welcome to Our Learning Platform!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Welcome ${learner.name}!</h2>
          <p>Thank you for registering with our learning platform. We're excited to have you on board!</p>
          <p>Your account has been successfully created with the following details:</p>
          <ul>
            <li><strong>Email:</strong> ${learner.email}</li>
            <li><strong>Status:</strong> ${learner.status === 'student' ? 'Student' : 'Working Professional'}</li>
            ${learner.status === 'student' ? `<li><strong>School:</strong> ${learner.schoolName}</li>` : ''}
            ${learner.status === 'job' ? `<li><strong>Company:</strong> ${learner.companyName}</li>` : ''}
            <li><strong>Selected Technologies:</strong> ${learner.preferences.join(', ')}</li>
          </ul>
          <p>You can now log in to your account and start exploring our courses!</p>
          <p>If you have any questions, please don't hesitate to contact our support team.</p>
          <p>Best regards,<br>The Learning Platform Team</p>
        </div>
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
      from: process.env.EMAIL_FROM || 'no-reply@learninghabits.world',
      to: COMPANY_EMAIL,
      cc: OWNER_EMAIL,
      subject: 'New Learner Registration',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
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
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Notification email sent to ${COMPANY_EMAIL} and ${OWNER_EMAIL}`);
  } catch (error) {
    console.error('Failed to send notification email:', error);
    throw error;
  }
};