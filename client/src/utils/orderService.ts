import axios from "axios";

interface OrderItem {
  bookId: string;
  title: string;
  price: number;
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

const apiUrl = "http://localhost:5000/api/orders";

// Function to create an order
export const createOrder = async (
  items: OrderItem[],
  addressData: AddressData
) => {
  try {
    const orderData = {
      items,
      address: addressData,
    };
    const response = await axios.post(apiUrl, orderData);
    return response.data;
  } catch (error) {
    console.log(error);
    // Handle error
  }
};

// Function to update book quantity
export const updateBookQuantity = async (
  bookId: string,
  newQuantity: number
) => {
  try {
    const response = await axios.put(`${apiUrl}/update-quantity`, {
      bookId,
      newQuantity,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating book quantity:", error);
    // Handle error
  }
};