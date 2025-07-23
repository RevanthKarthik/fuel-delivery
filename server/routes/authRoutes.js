// server/routes/authRoutes.js
import express from 'express';
import { checkAdmin } from '../controllers/authController.js';
import { register, login } from '../controllers/authController.js';
const router = express.Router();
router.get('/test', (req, res) => {
  res.json({ message: 'Auth route working ✅' })
})

router.get('/admin', checkAdmin);
router.post('/register', register);
router.post('/login', login);

export default router;
