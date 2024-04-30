import mongoose, { Document, Schema } from "mongoose";

// Define the interface for the User document
interface IUser extends Document {
  name: string;

  email: string;

  password: string;

  mob_number: number | string;
}

// Define the schema for the User document
const userScehma: Schema = new mongoose.Schema({
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
});

// Create a model for the User document
const User = mongoose.model<IUser>("User", userScehma);

// Export the User model
export default User;
