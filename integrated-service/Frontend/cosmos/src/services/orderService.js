import axios from "axios";

export const createOrder = async (order) => {
    const url = "http://localhost:3000/orders/createOrder";
    const result = await axios.post(url, order);
    console.log(result.data)
    return result;
}

export const updateOrderStatus = async (id, status) => {
    const url = `http://localhost:3000/orders/${id}/status`;
    const result = await axios.patch(url, status);
    return result;
}
export const getOrders = async () => {
    const url = "http://localhost:3000/orders";
    const result = await axios.get(url);
    console.log(result.data)
    return result;
}

export const getCustomerById = async (id) => {
    const url = `http://localhost:3002/customers/${id}`;
    const result = await axios.get(url);
    console.log(result.data)
    return result;
}