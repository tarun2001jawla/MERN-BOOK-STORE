import axios from "axios";

interface OrderItem {
    bookId: string;
    title: string;
    price: number;
    quantity: number;
}

const apiUrl = "http://localhost:5000/api/orders";

export const createOrder = async (items:OrderItem[])=>{
    try {
        const response = await axios.post(apiUrl, { items});
       return response.data;
    } catch (error) {
        console.log(error);
    
    }

};

export const updateBookQuantity = async(bookId: string, newQuantity: number)=>{
    try {
        const response = await axios.put(`${apiUrl}/update-quantity`, { bookId, newQuantity });
        return response.data;
    
} catch(err){
    
    console.error('Error updating book quantity:', err);
}
};