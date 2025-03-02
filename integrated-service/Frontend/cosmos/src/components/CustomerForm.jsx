
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { createCustomer } from '../services/customerService';

export const CustomerForm = ({ loadCustomers }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCustomer = { name, email, address };

      await createCustomer(newCustomer).then(() => {
        setName('');
        setEmail('');
        setAddress('');
        loadCustomers();
        toast.success('Customer created successfully');
      }).catch((error)=>{
        toast.error(error.message);
      })

   
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <input className="submit-btn" type="submit" value="Create User" />
      </form>
    </div>
  );
};
