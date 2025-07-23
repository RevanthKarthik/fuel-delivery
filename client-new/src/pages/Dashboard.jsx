import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [orders, setOrders] = useState([]);

  const fetchUserOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://fuel-delivery-backend-98bj.onrender.com/api/orders', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(res.data.orders);
    } catch (err) {
      console.error('Failed to fetch user orders:', err);
      alert('❌ Could not load your orders');
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, []);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>📋 My Orders</h2>
        <Link to="/order" className="btn btn-success">
          ➕ Place New Order
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="alert alert-info text-center">
          You haven't placed any orders yet. Click "Place New Order" to get started!
        </div>
      ) : (
        <div className="row">
          {orders.map(order => (
            <div key={order._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card shadow-sm border-primary">
                <div className="card-body">
                  <h5 className="card-title text-primary">{order.fuelType} ({order.quantity} L)</h5>
                  <p className="card-text">
                    <strong>📍 Address:</strong> {order.address}<br />
                    <strong>📅 Date:</strong> {new Date(order.createdAt).toLocaleDateString()}<br />
                    <strong>⏰ Time:</strong> {new Date(order.createdAt).toLocaleTimeString()}
                  </p>
                  <span className={`badge 
                    ${order.status === 'Pending' ? 'bg-warning text-dark' : ''}
                    ${order.status === 'Approved' ? 'bg-info text-dark' : ''}
                    ${order.status === 'Cancelled' ? 'bg-danger' : ''}
                    ${order.status === 'Delivered' ? 'bg-success' : ''}
                    ${order.status === 'Dispatched' ? 'bg-primary' : ''}
                  `}>
                    {order.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
