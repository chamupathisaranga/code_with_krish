import React, { useEffect, useState } from 'react'
import { getOrders } from '../services/orderService';
import { toast } from 'react-toastify';
import { OrderForm } from '../components/OrderForm';
import { OrderTable } from '../components/OrderTable';

export const OrdersPage = () => {
  const [orders, setOrders] = useState([])

  const fetchData = () => {
    getOrders().then(response => {
      setOrders(response.data)
    }).catch(error => {
      toast.error(error.message);
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (

    <div className="container">
      <h3 className="title">Create Order</h3>
      <OrderForm fetchData={fetchData} />
      <OrderTable orders={orders} fetchData={fetchData}/>

    </div>

  )
}