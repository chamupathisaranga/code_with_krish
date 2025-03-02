import React, { useEffect, useState } from 'react'
import { createOrder, getOrders } from '../services/orderService';
import { toast } from 'react-toastify';

export const OrderForm = ({fetchData}) => {
    const [customerId, setcustomerId] = useState("");
    const [productId, setproductId] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");

    useEffect(() => {
        fetchData()
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(customerId);
        console.log(productId);
        console.log(quantity);
        console.log(price);

        const order = {
            customerId,
            items: [{
                productId: productId,
                price: price,
                quantity: quantity
            }]
        };

        try {
            await createOrder(order);
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
                <label>Customer ID</label>
                <input onChange={(e) => setcustomerId(e.target.value)} type="text" id="cusid" name="cusid" required value={customerId} />
            </div>
            <div className="form-group">
                <label>Product ID</label>
                <input onChange={(e) => setproductId(e.target.value)} type="text" id="prodname" name="prodname" required value={productId} />
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