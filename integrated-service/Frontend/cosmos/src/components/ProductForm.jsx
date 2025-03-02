import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { createProduct } from '../services/productService';

export const ProductForm = ({fetchData}) => {
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name: productName,
      price: price,
      quantity: quantity
    };

    try {
      await createProduct(product);
      fetchData()
      toast.success("Successfully Ordered");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unknown error occurred.");
      }
    }

    console.log("Order submit");
  }

  return (
    <form onSubmit={handleSubmit} className="order-form">
      <div className="form-group">
        <label>Product Name</label>
        <input onChange={(e) => setProductName(e.target.value)} type="text" id="prodname" name="prodname" required value={productName} />
      </div>
      <div className="form-group">
        <label>Price</label>
        <input onChange={(e) => setPrice(e.target.value)} type="text" id="price" name="price" required value={price} />
      </div>
      <div className="form-group">
        <label>Quantity</label>
        <input onChange={(e) => setQuantity(e.target.value)} type="text" id="qty" name="qty" required value={quantity} />
      </div>
      <input className="submit-btn" type="submit" value="Submit" />
    </form>

  )
}