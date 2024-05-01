import { Request, Response } from "express";
import Book from "../models/Book";
import { CustomRequest } from "../types";

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
    const { title, author, price, description, isbn, CoverImageURL } = req.body;
    const newBook = new Book({
      title,
      author,
      price,
      description,
      isbn,
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
  createBook,
  getBookById,
  deleteBook
}