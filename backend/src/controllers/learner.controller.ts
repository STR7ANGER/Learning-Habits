import { Request, Response } from "express";
import LearnerModel from "../models/learner.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Generate JWT Token
const generateToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });
};

export const registerLearner = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      name,
      email,
      phoneNumber,
      password,
      status,
      schoolName,
      companyName,
      preferences,
    } = req.body;

    // Check if learner already exists
    const learnerExists = await LearnerModel.findOne({ email });

    if (learnerExists) {
      res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
      return;
    }

    // Check phone number
    const phoneExists = await LearnerModel.findOne({ phoneNumber });
    if (phoneExists) {
      res.status(400).json({
        success: false,
        message: "User already exists with this phone number",
      });
      return;
    }

    // Validate required fields based on status
    if (status === "student" && !schoolName) {
      res.status(400).json({
        success: false,
        message: "School name is required for students",
      });
      return;
    }

    if (status === "job" && !companyName) {
      res.status(400).json({
        success: false,
        message: "Company name is required for working professionals",
      });
      return;
    }

    // Validate preferences
    if (!preferences || preferences.length === 0) {
      res.status(400).json({
        success: false,
        message: "At least one preference is required",
      });
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create learner
    const learner = await LearnerModel.create({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
      status,
      schoolName: status === "student" ? schoolName : undefined,
      companyName: status === "job" ? companyName : undefined,
      preferences,
    });

    res.status(201).json({
      success: true,
      data: {
        _id: learner._id,
        name: learner.name,
        email: learner.email,
        status: learner.status,
        preferences: learner.preferences,
        token: generateToken(learner._id.toString()),
      },
    });
  } catch (error: any) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message,
    });
  }
};

export const loginLearner = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find learner by email and ensure it's properly typed
    const learner = await LearnerModel.findOne({ email }).exec();

    if (!learner) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
      return;
    }

    // Check if password matches
    const isPasswordMatch = await bcrypt.compare(password, learner.password);

    if (!isPasswordMatch) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        _id: learner._id,
        name: learner.name,
        email: learner.email,
        status: learner.status,
        preferences: learner.preferences,
        token: generateToken(learner._id.toString()),
      },
    });
  } catch (error: any) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
};

export const myproject = async (req: Request, res: Response): Promise<void> => {
  try {
    // Get learner ID from params
    const learnerId = req.params.id;

    if (!learnerId) {
      res.status(400).json({
        success: false,
        message: "Learner ID is required",
      });
      return;
    }

    // Find learner by ID and select only the projects field
    const learner = await LearnerModel.findById(learnerId)
      .select("projects")
      .exec();

    if (!learner) {
      res.status(404).json({
        success: false,
        message: "Learner not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        projects: learner.projects || [],
      },
    });
  } catch (error: any) {
    console.error("Get projects error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve projects",
      error: error.message,
    });
  }
};
