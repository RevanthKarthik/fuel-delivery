import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://fuel-delivery-backend-98bj.onrender.com/api/auth/register', formData);
      alert('✅ Registration successful. Please log in.');
      navigate('/login');
    } catch (err) {
      console.error('Registration error:', err);
      alert('❌ Registration failed.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Create an Account</h2>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label>Name</label>
          <input type="text" name="name" className="form-control" required onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" name="email" className="form-control" required onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" name="password" className="form-control" required onChange={handleChange} />
        </div>
        <button className="btn btn-primary w-100" type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
