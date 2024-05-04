import mongoose, { Document, Schema } from "mongoose";

interface IBook extends Document {
  title: string;
  author: string;
  price: number;
  description: string;
  isbn: number;
  quantity: number;
  CoverImageURL: string;
  
}

const bookSchema: Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 100,
    },
    author: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 100,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 1000,
    },
    isbn: {
      type: Number,
      required: true,
      unique: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    CoverImageURL: {
      type: String,
      required: false,
      trim: true,
    },
   
  },
  { timestamps: true }
);

bookSchema.path("price").validate(function (value) {
  return value >= 0;
}, "Price must be a non-negative number");

const Book = mongoose.model<IBook>("Book", bookSchema);

export default Book;