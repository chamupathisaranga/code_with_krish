import axios from "axios";

export const getCustomers = async () => {
    const url = "http://localhost:3002/customers";
    const result = await axios.get(url);
    return result;
}

export const createCustomer = async (customer) => {
    const url = "http://localhost:3002/customers";
    const result = await axios.post(url, customer);
    return result;
}