import { Request, Response } from "express";
import { JobSupport } from "../models/session.model";

/**
 * Book a job support session
 */
export const bookJobSupport = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, preference, experienceLevel, date, time, message } = req.body;
    const uid = req.body.uid || "guest"; // Support for guest bookings or get from auth

    // Validate required fields
    if (!name || !email || !preference || !experienceLevel || !date || !time) {
      res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
      return;
    }

    // Create new job support session
    const jobSupport = new JobSupport({
      uid,
      name,
      email,
      preference,
      experienceLevel,
      date,
      time,
      message: message || "", // Message is optional in the form
      sessionType: "jobSupport",
      status: "pending",
      createdAt: new Date(),
    });

    // Save the job support session
    await jobSupport.save();

    // Return success response
    res.status(201).json({
      success: true,
      message: "Job support session scheduled successfully",
      data: jobSupport,
    });
  } catch (error) {
    console.error("Error booking job support session:", error);
    res.status(500).json({
      success: false,
      message: "Failed to schedule job support session",
    });
  }
};

/**
 * Get all job support sessions for a user
 */
export const getUserJobSupports = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { uid } = req.params;

    if (!uid) {
      res.status(400).json({ success: false, message: "User ID is required" });
      return;
    }

    // Find all job support sessions for the user
    const jobSupports = await JobSupport.find({ uid, sessionType: "jobSupport" })
      .select("-__v")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: jobSupports.length,
      data: jobSupports,
    });
  } catch (error) {
    console.error("Error fetching user job support sessions:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user job support sessions",
    });
  }
};

/**
 * Cancel a job support session
 */
export const cancelJobSupport = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { uid } = req.body; // Get user ID from request body

    if (!id) {
      res.status(400).json({
        success: false,
        message: "Job support session ID is required",
      });
      return;
    }

    // Find the job support session
    const jobSupport = await JobSupport.findById(id);

    if (!jobSupport) {
      res.status(404).json({ success: false, message: "Job support session not found" });
      return;
    }

    // Verify this is a job support session
    if (jobSupport.sessionType !== "jobSupport") {
      res.status(400).json({
        success: false,
        message: "Invalid session type",
      });
      return;
    }

    // If UID is provided, verify the session belongs to the user making the request
    if (uid && jobSupport.uid !== uid && jobSupport.uid !== "guest") {
      res.status(403).json({
        success: false,
        message: "Forbidden: You can only cancel your own job support sessions",
      });
      return;
    }

    // Update status to cancelled
    jobSupport.status = "cancelled";
    await jobSupport.save();

    res.status(200).json({
      success: true,
      message: "Job support session cancelled successfully",
    });
  } catch (error) {
    console.error("Error cancelling job support session:", error);
    res.status(500).json({
      success: false,
      message: "Failed to cancel job support session",
    });
  }
};