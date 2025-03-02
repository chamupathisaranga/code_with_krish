import moment from "moment";
import React, { useState } from "react";
import { getCustomerById, updateOrderStatus } from "../services/orderService";
import { toast } from "react-toastify";

export const OrderTable = ({ orders, fetchData }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStatusChange = (orderId, status) => {
    const newStatus = { status };
    updateOrderStatus(orderId, newStatus)
      .then(() => {
        fetchData();
        toast.success(`Order ${orderId} updated to ${newStatus.status}`);
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "An error occurred");
      });
  };

  const openModal = (id) => {
    getCustomerById(id).then((response)=>{
      setSelectedUser(response.data)
    })

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="order-table">
      <h3>All Orders</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer ID</th>
            <th>Order Date</th>
            <th>Order Status</th>
            <th>User Details</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const formattedDateTime = moment(order.createdAt).format(
              "YYYY-MM-DD HH:mm"
            );
            return (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customerId}</td>
                <td>{formattedDateTime}</td>
                <td>{order.status}</td>
                <td>
                  <button onClick={() => openModal(order.customerId)}>
                    User Details
                  </button>
                </td>
                <td>
                  <select
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    value={order.status}
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="CONFIRM">CONFIRM</option>
                    <option value="SHIPPED">SHIPPED</option>
                    <option value="DELIVERED">DELIVERED</option>
                    <option value="CANCELED">CANCELED</option>
                  </select>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {isModalOpen && selectedUser && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h3>User Details</h3>
            <p><strong>Name:</strong> {selectedUser.name}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Address:</strong> {selectedUser.address}</p>
          </div>
        </div>
      )}
    </div>
  );
};
