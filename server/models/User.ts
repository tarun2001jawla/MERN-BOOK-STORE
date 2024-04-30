import mongoose, { Document, Schema } from "mongoose";

// Define the interface for the User document
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  mob_number: number | string;
  role: string; 
}

// Define the schema for the User document
const userSchema: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    mob_number: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "user", // Set the default role to "user"
    },
  },
  { timestamps: true }
);

// Create a model for the User document
const User = mongoose.model<IUser>("User", userSchema);

// Export the User model
export default User;