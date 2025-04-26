import { Request, Response } from "express";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import ProjectModel from "../models/project.model";

// Get all projects
export const getAllProject = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const projects = await ProjectModel.find({});
    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve projects",
    });
  }
};

// Get a project by ID
export const getProjectById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const projectId = req.params.id;

    // Validate if ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      res.status(400).json({
        success: false,
        message: "Invalid project ID format"
      });
      return;
    }

    const project = await ProjectModel.findById(projectId);
    
    if (!project) {
      res.status(404).json({
        success: false,
        message: "Project not found"
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error("Error retrieving project:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve project",
      error: error instanceof Error ? error.message : String(error)
    });
  }
};

// Add a new project with image upload and PDF URL
export const addProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, description, duration, location, price, pdfUrl } = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    // Validate required fields
    if (!location) {
      res.status(400).json({
        success: false,
        message: "Location is required",
      });
      return;
    }

    // Check if image file is uploaded
    if (!files?.image || files.image.length === 0) {
      res.status(400).json({
        success: false,
        message: "Image file is required",
      });
      return;
    }

    // Check if PDF URL is provided
    if (!pdfUrl) {
      res.status(400).json({
        success: false,
        message: "PDF URL is required",
      });
      return;
    }

    // Upload image to Cloudinary
    const imageResult = await cloudinary.uploader.upload(files.image[0].path, {
      resource_type: "image",
    });

    const projectData = {
      name,
      description,
      duration,
      location,
      image: imageResult.secure_url,
      pdfFile: pdfUrl,
      price,
    };

    const newProject = new ProjectModel(projectData);
    const savedProject = await newProject.save();

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: savedProject,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.errors,
      });
    } else {
      console.error("Error creating project:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create project",
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }
};

// Update a project
export const updateProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, description, duration, location, price, pdfUrl } = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const projectId = req.params.id;

    // Find current project
    const project = await ProjectModel.findById(projectId);
    if (!project) {
      res.status(404).json({
        success: false,
        message: "Project not found",
      });
      return;
    }

    // Prepare update data
    const updateData: any = {
      name: name || project.name,
      description: description || project.description,
      duration: duration || project.duration,
      location: location || project.location,
      price: price || project.price,
    };

    // Update PDF URL if provided
    if (pdfUrl) {
      updateData.pdfFile = pdfUrl;
    }

    // Handle image upload if provided
    if (files?.image && files.image.length > 0) {
      const imageResult = await cloudinary.uploader.upload(
        files.image[0].path,
        {
          resource_type: "image",
        }
      );
      updateData.image = imageResult.secure_url;
    }

    // Update the project
    const updatedProject = await ProjectModel.findByIdAndUpdate(
      projectId,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: updatedProject,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.errors,
      });
    } else {
      console.error("Error updating project:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update project",
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }
};

// Delete a project
export const deleteProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const project = await ProjectModel.findByIdAndDelete(req.params.id);
    if (!project) {
      res.status(404).json({
        success: false,
        message: "Project not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete project",
    });
  }
};
