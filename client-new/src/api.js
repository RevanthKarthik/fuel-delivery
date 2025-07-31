// src/api.js
export const API_BASE_URL = 'https://fuel-delivery-backend-98bj.onrender.com';
export const loginUser = async (credentials) => {
  const resi = await fetch("${API_BASE_URL}/auth/login", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  return resi.json();
};

export const registerUser = async (userData) => {
  const res = await fetch("${API_BASE_URL}/auth/register", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return res.json();
};
