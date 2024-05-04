import mongoose, { Document, Schema } from "mongoose";

interface IOrderItem {
  bookId: string;
  title: string;
  price: number;
  quantity: number;
}

interface OrderDocument extends Document {
  items: IOrderItem[];
  totalPrice: number;
}

const orderSchema = new Schema({
  items: [
    {
      bookId: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
});

const Order = mongoose.model<OrderDocument>('Order', orderSchema);

export default Order;