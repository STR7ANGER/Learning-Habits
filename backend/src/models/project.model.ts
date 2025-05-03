import mongoose, { Document, Schema } from "mongoose";

export interface IProject extends Document {
  name: string;
  description: string;
  duration: string;
  location: string;
  image: string;
  pdfFile: string;
  price: string;
  createdAt: Date;
  updatedAt: Date;
  internationalPrice: string;
}

const ProjectSchema = new Schema<IProject>(
  {
    // Using MongoDB's default _id field - no custom id field needed
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    duration: {
      type: String,
      required: [true, "Duration is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
    },
    pdfFile: {
      type: String,
      required: [true, "PDF URL is required"],
    },
    price: {
      type: String,
      required: [true, "Price is required"],
    },
    internationalPrice: {
      type: String,
      required: [true, "International Price is required"],
    },
  },
  {
    timestamps: true,
  }
);

// Fix the model name inconsistency
const ProjectModel =
  mongoose.models.Project ||
  mongoose.model<IProject>("Project", ProjectSchema);

export default ProjectModel;