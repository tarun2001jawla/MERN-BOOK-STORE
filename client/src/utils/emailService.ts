//* eslint-disable @typescript-eslint/no-unused-vars */
import emailjs from '@emailjs/browser';

const serviceId = '';
const templateId = '';
const publicKey = '';

interface OrderDetails {
  items: { bookId: string; title: string; price: number; quantity: number }[];
  address: {
    name: string;
    phone: string;
    street: string;
    city: string;
    pincode: string;
    country: string;
    email: string;
  };
  totalPrice: number;
}

export const sendOrderConfirmationEmail = async (orderDetails: OrderDetails, toEmail: string) => {
  const { items, address, totalPrice } = orderDetails;

  // Generate a string representation of the items list
  const itemsString = items
    .map(
      (item) =>
        `<li>
          <strong>${item.title}</strong> (${item.quantity} x $${item.price}) = $${item.quantity * item.price}
        </li>`
    )
    .join('');

  const templateParams = {
    to_email: toEmail,
    to_name: address.name,
    address,
    items: {
      raw: itemsString, 
    },
    totalPrice,
  };

  try {
    await emailjs.send(serviceId, templateId, templateParams, publicKey);
    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};