// server/controllers/authController.js
import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid user' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id,   email: user.email,name: user.name, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
      res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role, // ✅ this is important
      },
    });
  } catch (err) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' }); }
};
export const checkAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user && user.role === 'admin') {
      return res.json({ ok: true });
    } else {
      return res.status(403).json({ ok: false, message: 'Access denied' });
    }
  } catch (error) {
    return res.status(500).json({ ok: false, message: 'Something went wrong' });
  }
};
