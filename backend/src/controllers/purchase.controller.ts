import { Request, Response } from "express";
import PurchaseModel from "../models/purchase.model";
import LearnerModel from "../models/learner.model";
import mongoose from "mongoose";

export const createPurchase = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const learnerId = (req.body as { userId: string }).userId;
    const {
      projectId,
      firstName,
      lastName,
      email,
      street,
      city,
      state,
      zipcode,
      country,
      phone,
      amount,
      paymentMethod,
    } = req.body;

    if (
      !projectId ||
      !firstName ||
      !lastName ||
      !email ||
      !amount ||
      !paymentMethod
    ) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    // Check if learner already has this project
    const existingLearner = await LearnerModel.findById(learnerId);
    if (!existingLearner) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(404)
        .json({ success: false, message: "Learner not found" });
    }

    // Check if learner already purchased this project
    if (existingLearner.projects.includes(projectId)) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        success: false,
        message: "You have already purchased this project",
      });
    }

    // Check if there's an existing purchase record
    const existingPurchase = await PurchaseModel.findOne({
      learnerId,
      projectId,
      paymentStatus: "completed",
    });

    if (existingPurchase) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        success: false,
        message: "You have already purchased this project",
      });
    }

    const newPurchase = await PurchaseModel.create(
      [
        {
          learnerId,
          projectId,
          firstName,
          lastName,
          email,
          street,
          city,
          state,
          zipcode,
          country,
          phone,
          amount,
          paymentMethod,
          paymentStatus: "completed",
          paymentId: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        },
      ],
      { session }
    );

    const updatedLearner = await LearnerModel.findByIdAndUpdate(
      learnerId,
      { $addToSet: { projects: projectId } },
      { new: true, session }
    );

    if (!updatedLearner) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(404)
        .json({ success: false, message: "Learner not found" });
    }

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({
      success: true,
      data: newPurchase[0],
      message:
        "Purchase completed successfully and project added to your account",
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error creating purchase:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing your purchase",
    });
  }
};
