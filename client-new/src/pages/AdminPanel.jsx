import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://fuel-delivery-backend-98bj.onrender.com/api/orders/all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(res.data);
    } catch (err) {
      console.error('Failed to fetch orders', err);
      alert('❌ Failed to load orders');
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/orders/update/${orderId}`, { status }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchOrders(); // Refresh list
    } catch (err) {
      alert('❌ Failed to update status');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">🛠 Admin Panel - Manage Orders</h2>
      {orders.length === 0 ? (
        <p className="text-center">No orders found.</p>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>User</th>
              <th>Fuel Type</th>
              <th>Quantity</th>
              <th>Address</th>
              <th>Status</th>
              <th>Change Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order.user?.name || 'Unknown'}</td>
                <td>{order.fuelType}</td>
                <td>{order.quantity} L</td>
                <td>{order.address}</td>
                <td>{order.status}</td>
                <td>
                  <select
  className="form-select"
  value={order.status}
  onChange={(e) => updateStatus(order._id, e.target.value)}
>
  <option value="Pending">Pending</option>
  <option value="Approved">Approved</option>
  <option value="Cancelled">Cancelled</option>
  <option value="Dispatched">Dispatched</option>
  <option value="Delivered">Delivered</option>
</select>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPanel;
