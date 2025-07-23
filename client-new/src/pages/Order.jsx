import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Order = () => {
  const [form, setForm] = useState({
    fuelType: '',
    quantity: '',
    address: ''
  });
  
const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('https://fuel-delivery-backend-98bj.onrender.com/api/orders', form, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      alert('✅ Order placed successfully!');
      navigate('/dashboard');
      setForm({ fuelType: '', quantity: '', address: '' }); // Reset form
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('❌ Failed to place order.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h2 className="mb-4 text-center">Place Fuel Order</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Fuel Type</label>
            <select
              name="fuelType"
              className="form-select"
              onChange={handleChange}
              value={form.fuelType}
              required
            >
              <option value="">Select Fuel</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Quantity (Liters)</label>
            <input
              type="number"
              name="quantity"
              className="form-control"
              placeholder="Enter quantity"
              onChange={handleChange}
              value={form.quantity}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Delivery Address</label>
            <input
              type="text"
              name="address"
              className="form-control"
              placeholder="Enter delivery address"
              onChange={handleChange}
              value={form.address}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Order;
