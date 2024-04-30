import mongoose, { Document, Schema } from "mongoose";

interface IBook extends Document {
  title: string;
  author: string;
  price: number;
  description: string;
  ISBN: number;
  CoverImageURL: string;
  createdBy: string | number;
}

const bookScehma: Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isbn: {
      type: Number,
      required: true,
    },
    CoverImageURL: {
      type: String,
      required: true,
    },
    createdBy: {  
      type: Schema.Types.ObjectId,
      ref: "user", 
  },
  },
  { timestamps: true }
);

const Book = mongoose.model<IBook>("Book", bookScehma);

export default Book;