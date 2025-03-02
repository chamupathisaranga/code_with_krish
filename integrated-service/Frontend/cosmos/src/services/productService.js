import axios from "axios";

export const getProducts = async () => {
    const url = "http://localhost:3001/products";
    const result = await axios.get(url);
    console.log(result.data)
    return result;
}

export const createProduct = async (product) => {
    const url = "http://localhost:3001/products";
    const result = await axios.post(url, product);
    return result;
}