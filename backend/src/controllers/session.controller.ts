import { Request, Response } from "express";
import { ExpertSession, TechLearningSession } from "../models/session.model";
import { sendSessionBookingNotifications } from "../service/email.service";

/**
 * Book an expert session
 */
export const bookExpertSession = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { uid, name, email, techArea, specificTech, date, time, message } =
      req.body;

    // Validate required fields
    if (!uid || !name || !email || !techArea || !date || !time || !message) {
      res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
      return;
    }

    // Create new expert session
    const session = new ExpertSession({
      uid,
      name,
      email,
      techArea,
      specificTech,
      date,
      time,
      message,
      sessionType: "expert",
      status: "pending",
      createdAt: new Date(),
    });

    // Save the session
    await session.save();

    // Send email notifications
    try {
      await sendSessionBookingNotifications({
        name,
        email,
        techArea,
        specificTech,
        date,
        time,
        message,
        sessionType: "expert",
        status: "pending"
      });
    } catch (emailError) {
      console.error("Error sending email notifications:", emailError);
      // Continue with response even if email fails
    }

    // Return success response
    res.status(201).json({
      success: true,
      message: "Expert session booked successfully",
      data: session,
    });
  } catch (error) {
    console.error("Error booking expert session:", error);
    res.status(500).json({
      success: false,
      message: "Failed to book expert session",
    });
  }
};

/**
 * Book a tech learning session
 */
export const bookTechLearningSession = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      uid,
      name,
      email,
      techInterest,
      techSpecifics,
      date,
      time,
      message,
    } = req.body;

    // Validate required fields
    if (
      !uid ||
      !name ||
      !email ||
      !techInterest ||
      !date ||
      !time ||
      !message
    ) {
      res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
      return;
    }

    // Create new tech learning session
    const session = new TechLearningSession({
      uid,
      name,
      email,
      techInterest,
      techSpecifics,
      date,
      time,
      message,
      sessionType: "techLearning",
      status: "pending",
      createdAt: new Date(),
    });

    // Save the session
    await session.save();

    // Send email notifications
    try {
      await sendSessionBookingNotifications({
        name,
        email,
        techInterest,
        techSpecifics,
        date,
        time,
        message,
        sessionType: "techLearning",
        status: "pending"
      });
    } catch (emailError) {
      console.error("Error sending email notifications:", emailError);
      // Continue with response even if email fails
    }

    // Return success response
    res.status(201).json({
      success: true,
      message: "Tech learning session booked successfully",
      data: session,
    });
    return;
  } catch (error) {
    console.error("Error booking tech learning session:", error);
    res.status(500).json({
      success: false,
      message: "Failed to book tech learning session",
    });
    return;
  }
};
/**
 * Get all sessions for a user
 */
export const getUserSessions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { uid } = req.params;

    if (!uid) {
      res.status(400).json({ success: false, message: "User ID is required" });
      return;
    }

    // Find all sessions for the user
    const sessions = await TechLearningSession.find({ uid })
      .select("-__v")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: sessions.length,
      data: sessions,
    });
    return;
  } catch (error) {
    console.error("Error fetching user sessions:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user sessions",
    });
    return;
  }
};

/**
 * Cancel a session
 */
export const cancelSession = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { uid } = req.body; // Get user ID from request body

    if (!id || !uid) {
      res.status(400).json({
        success: false,
        message: "Session ID and user ID are required",
      });
      return;
    }

    // Find the session
    const session = await TechLearningSession.findById(id);

    if (!session) {
      res.status(404).json({ success: false, message: "Session not found" });
      return;
    }

    // Verify the session belongs to the user making the request
    if (session.uid !== uid) {
      res.status(403).json({
        success: false,
        message: "Forbidden: You can only cancel your own sessions",
      });
      return;
    }

    // Delete the session
    await session.deleteOne();

    res.status(200).json({
      success: true,
      message: "Session cancelled successfully",
    });
    return;
  } catch (error) {
    console.error("Error cancelling session:", error);
    res.status(500).json({
      success: false,
      message: "Failed to cancel session",
    });
    return;
  }
};
