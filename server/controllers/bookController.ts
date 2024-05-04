import { Request, Response } from "express";
import Book from "../models/Book";
import { CustomRequest } from "../types";
import multer from 'multer';
import path from "path";
import fs from 'fs';

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define the upload folder path
    const uploadFolder = path.resolve(__dirname, '..//../server/public');
        

    // Set the upload folder
    cb(null, uploadFolder);

    // Check if the directory exists, if not, create it
    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder, { recursive: true });
    }
  },
  filename: (req, file, cb) => {
    // Generate a unique filename based on current timestamp
    const extension = path.extname(file.originalname);
    const timestamp = Date.now();
    const filename = `book-cover-${timestamp}${extension}`;
    cb(null, filename);
  }
});

// Initialize multer with storage options
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 20 } // Limit file size to 20MB
});

// Get all books
const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find();
    console.log("All books fetched successfully");
    res.json(books);
    return books;
  } catch (err) {
    console.error("Error fetching all books:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new book

const createBook = async (req: CustomRequest, res: Response) => {
  try {
    console.log('req.user in createBook:', req.user); 
    const { title, author, price, description,quantity, isbn } = req.body;
    console.log("req body",req.body);
    console.log('Uploaded file:', req.file);
    const CoverImageURL = req.file ? `/images/${req.file.filename}` : '';
    console.log('URL:', CoverImageURL);// Get the uploaded file path

    const newBook = new Book({
      title,
      author,
      price,
      description,
      isbn,
      quantity,
      CoverImageURL,
    });

    const book = await newBook.save();
    console.log("New book created successfully:", book);
    res.status(201).json(book);
  } catch (err) {
    console.error("Error creating a new book:", err);
    res.status(500).json({ message: 'Error creating a new book' });
  }
};

// Get book by id
const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.id).populate("title");
    if (!book) {
      console.log("Book not found");
      return res.status(404).json({ message: 'Book not found' });
    }
    console.log("Book fetched by id:", book);
    res.json(book);
  } catch (err) {
    console.error("Error fetching book by id:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete book by id
const deleteBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      console.log("Book not found");
      return res.status(404).json({ message: 'Book not found' });
    }
    console.log("Book deleted successfully");
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    console.error("Error deleting book by id:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

export default {
  getAllBooks,
  createBook, // Use multer's upload.single middleware for file upload
  getBookById,
  deleteBook
};