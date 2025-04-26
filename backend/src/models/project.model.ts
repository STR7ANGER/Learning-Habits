import mongoose, { Document, Schema } from "mongoose";

export interface IProject extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  description: string;
  duration: string;
  location: string;
  image: string;
  pdfFile: string; // This will now store a URL directly
  price: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
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
  },
  {
    timestamps: true,
  }
);

const ProjectModel =
  (mongoose.models.Course as mongoose.Model<IProject>) ||
  mongoose.model<IProject>("Course", ProjectSchema);

export default ProjectModel;