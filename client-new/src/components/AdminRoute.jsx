// components/AdminRoute.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const [ok, setOk] = useState(null);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/auth/admin', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOk(res.data.ok);
      } catch (error) {
        setOk(false);
      }
    };

    checkAdmin();
  }, []);

  if (ok === null) return <div>Loading...</div>;
  return ok ? children : <Navigate to="/login" />;
};

export default AdminRoute;
