import mongoose, { Document, Schema } from "mongoose";

interface OrderItem {
  bookId: string;
  quantity: number;
}

interface AddressData {
  name: string;
  phone: string;
  street: string;
  city: string;
  pincode: string;
  country: string;
  email: string;
}

interface OrderDocument extends Document {
  items: OrderItem[];
  totalPrice: number;
  address: AddressData;
}

const addressSchema = new Schema<AddressData>({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const orderSchema = new Schema<OrderDocument>({
  items: [
    {
      bookId: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  address: { type: addressSchema, required: true },
});

const Order = mongoose.model<OrderDocument>("Order", orderSchema);

export default Order;
