import { sendLearnerWelcomeEmail, sendNewLearnerNotification } from './mailer.service';

export interface LearnerNotificationData {
  name: string;
  email: string;
  phoneNumber: string;
  status: string;
  schoolName?: string;
  companyName?: string;
  preferences: string[];
}

/**
 * Send all registration notifications
 * - Welcome email to the learner
 * - Notification to company with owner in CC
 */
export const sendRegistrationNotifications = async (learnerData: LearnerNotificationData): Promise<void> => {
  try {
    console.log('Attempting to send registration notifications for:', learnerData.email);
    
    // Send welcome email to learner
    try {
      await sendLearnerWelcomeEmail(learnerData);
      console.log('Welcome email sent successfully');
    } catch (welcomeError: any) {
      console.error('Failed to send welcome email:', welcomeError.message);
      // Re-throw to be handled by the caller
      throw welcomeError;
    }
    
    // Send notification to company and owner
    try {
      await sendNewLearnerNotification(learnerData);
      console.log('Notification email sent successfully');
    } catch (notificationError: any) {
      console.error('Failed to send company notification:', notificationError.message);
      // Re-throw to be handled by the caller
      throw notificationError;
    }
    
    console.log('All registration notifications sent successfully');
  } catch (error: any) {
    console.error('Notification service error:', error.message);
    throw new Error(`Notification sending failed: ${error.message}`);
  }
};