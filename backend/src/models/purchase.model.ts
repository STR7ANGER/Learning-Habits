import mongoose, { Document, Schema } from "mongoose";

export interface IPurchase extends Document {
  learnerId: mongoose.Types.ObjectId;
  projectId: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  phone: string;
  amount: number;
  paymentMethod: "razorpay" | "upi";
  paymentStatus: "pending" | "completed" | "failed";
  paymentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PurchaseSchema = new Schema<IPurchase>(
  {
    learnerId: {
      type: Schema.Types.ObjectId,
      ref: "Learner",
      required: [true, "Learner ID is required"]
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: [true, "Project ID is required"]
    },
    firstName: {
      type: String,
      required: [true, "First name is required"]
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"]
    },
    street: {
      type: String,
      required: [true, "Street address is required"]
    },
    city: {
      type: String,
      required: [true, "City is required"]
    },
    state: {
      type: String,
      required: [true, "State is required"]
    },
    zipcode: {
      type: String,
      required: [true, "Zipcode is required"]
    },
    country: {
      type: String,
      required: [true, "Country is required"]
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"]
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"]
    },
    paymentMethod: {
      type: String,
      enum: ["razorpay", "upi"],
      required: [true, "Payment method is required"]
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending"
    },
    paymentId: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const PurchaseModel = mongoose.models.Purchase as mongoose.Model<IPurchase> ||
  mongoose.model<IPurchase>("Purchase", PurchaseSchema);

export default PurchaseModel;