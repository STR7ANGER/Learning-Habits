import mongoose, { Document, Schema } from "mongoose";

// Interface to define the Learner document structure
export interface ILearner extends Document {
  _id: mongoose.Types.ObjectId;  // Explicitly define _id type
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  status: "student" | "job";
  schoolName?: string;
  companyName?: string;
  preferences: string[];
  projects: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const LearnerSchema = new Schema<ILearner>(
  {
    name: { 
      type: String, 
      required: [true, "Name is required"] 
    },
    email: { 
      type: String, 
      required: [true, "Email is required"], 
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"]
    },
    phoneNumber: { 
      type: String, 
      required: [true, "Phone number is required"], 
      unique: true 
    },
    password: { 
      type: String, 
      required: [true, "Password is required"],
      minlength: [6, "Password should be at least 6 characters"]
    },
    status: {
      type: String,
      enum: ["student", "job"],
      required: [true, "Status is required"]
    },
    schoolName: { 
      type: String,
      required: function(this: ILearner) {
        return this.status === "student";
      }
    },
    companyName: { 
      type: String,
      required: function(this: ILearner) {
        return this.status === "job";
      }
    },
    preferences: {
      type: [String],
      required: [true, "At least one preference is required"],
      validate: {
        validator: function(v: string[]) {
          return v.length > 0;
        },
        message: "At least one preference must be selected"
      }
    },
    projects: {
      type: [Schema.Types.ObjectId],
      ref: 'Course',
      default: []
    }
  },
  { 
    timestamps: true 
  }
);

const LearnerModel = mongoose.models.Learner as mongoose.Model<ILearner> || 
  mongoose.model<ILearner>("Learner", LearnerSchema);

export default LearnerModel;