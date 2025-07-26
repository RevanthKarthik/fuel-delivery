import  { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';
<h1> hi</h1>
const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
       await axios.post('${API_BASE_URL}/auth/register', {
        name: user.name,
        email: user.email,
        password: user.password
      });

      alert("✅ Registered successfully");
      window.location.href = '/login';
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "❌ Registration failed");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '450px' }}>
        <h3 className="text-center mb-4">Create an Account</h3>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={user.name}
              onChange={handleChange}
              required
              placeholder="Jon Snow"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
              placeholder="jon@gmail.com"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleChange}
              required
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="btn btn-success w-100">Register</button>

          <div className="text-center mt-3">
            <small>Already have an account? <a href="/login">Login</a></small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
