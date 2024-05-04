import { Request, Response } from "express";
import Order from "../models/Order";
import Book from "../models/Book";

const createOrder = async (req: Request, res: Response) => {
  try {
    const { items } = req.body;

    // Calculate total price of the order
    const totalPrice = items.reduce(
      (total: number, item: { price: number, quantity: number }) => {
        return total + item.price * item.quantity;
      },
      0
    );

    // Create a new order instance
    const order = new Order({ items, totalPrice });

    // Save the order to the database
    await order.save();

    // Update the quantity of each book in the order
    const updatedBooks = await Promise.all(
      items.map(async (item: { bookId: any; quantity: number; }) => {
        // Find the book by its ID
        const book = await Book.findById(item.bookId);

        // Check if book is found
        if (book) {
          // Deduct the quantity of the book based on the quantity ordered
          book.quantity -= item.quantity;

          // Save the updated book back to the database
          await book.save();

          return book;
        } else {
          // Handle the case where the book is not found
          console.error(`Book with ID ${item.bookId} not found`);
          return null;
        }
      })
    );

    // Send the updated book data to the frontend
    res.status(200).json({ updatedBooks: updatedBooks.filter(Boolean) });
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update book quantity
const updateBookQuantity = async (req: Request, res: Response) => {
    try {
      const { bookId, newQuantity } = req.body;
      const updatedBook = await Book.findByIdAndUpdate(bookId, { quantity: newQuantity }, { new: true });
  
      if (updatedBook) {
        res.status(200).json({ book: updatedBook });
      } else {
        res.status(404).json({ error: "Book not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to update book quantity" });
    }
  };
  
export default {
  createOrder,
  updateBookQuantity,
};