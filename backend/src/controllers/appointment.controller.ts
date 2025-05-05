import { Request, Response } from "express";
import { Appointment } from "../models/session.model";

/**
 * Book an appointment
 */
export const bookAppointment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, preference, date, time, message } = req.body;
    const uid = req.body.uid || "guest"; // Support for guest bookings or get from auth

    // Validate required fields
    if (!name || !email || !preference || !date || !time) {
      res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
      return;
    }

    // Create new appointment
    const appointment = new Appointment({
      uid,
      name,
      email,
      preference, // This maps to the preference field from the React form
      date,
      time,
      message: message || "", // Message is optional in the form
      sessionType: "appointment",
      status: "pending",
      createdAt: new Date(),
    });

    // Save the appointment
    await appointment.save();

    // Return success response
    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      data: appointment,
    });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to book appointment",
    });
  }
};

/**
 * Get all appointments for a user
 */
export const getUserAppointments = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { uid } = req.params;

    if (!uid) {
      res.status(400).json({ success: false, message: "User ID is required" });
      return;
    }

    // Find all appointments for the user
    const appointments = await Appointment.find({ uid })
      .select("-__v")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  } catch (error) {
    console.error("Error fetching user appointments:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user appointments",
    });
  }
};

/**
 * Cancel an appointment
 */
export const cancelAppointment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { uid } = req.body; // Get user ID from request body

    if (!id) {
      res.status(400).json({
        success: false,
        message: "Appointment ID is required",
      });
      return;
    }

    // Find the appointment
    const appointment = await Appointment.findById(id);

    if (!appointment) {
      res.status(404).json({ success: false, message: "Appointment not found" });
      return;
    }

    // If UID is provided, verify the appointment belongs to the user making the request
    if (uid && appointment.uid !== uid && appointment.uid !== "guest") {
      res.status(403).json({
        success: false,
        message: "Forbidden: You can only cancel your own appointments",
      });
      return;
    }

    // Delete the appointment
    await appointment.deleteOne();

    res.status(200).json({
      success: true,
      message: "Appointment cancelled successfully",
    });
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to cancel appointment",
    });
  }
};