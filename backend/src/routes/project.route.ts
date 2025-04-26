import { Router } from "express";
import { getAllProject, addProject, updateProject, deleteProject } from "../controllers/project.controller";
import upload from "../middlewares/upload.middleware";

const projectrouter = Router();

// Get all projects
projectrouter.get("/all", getAllProject);

// Add a new project with image upload only (PDF URL in request body)
projectrouter.post("/add", upload.fields([
  { name: "image", maxCount: 1 }
]), addProject);

// Update project
projectrouter.put("/update/:id", upload.fields([
  { name: "image", maxCount: 1 }
]), updateProject);

// Delete project
projectrouter.delete("/delete/:id", deleteProject);

export default projectrouter;