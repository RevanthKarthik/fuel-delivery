import express from 'express';
import { placeOrder, getUserOrders, updateOrderStatus,getAllOrders } from '../controllers/orderController.js';
import auth from '../middleware/auth.js';
import { isAdmin, requireAuth } from '../middleware/auth.js';
const router = express.Router();

router.use(auth);

// User routes
router.post('/', requireAuth, placeOrder);
router.get('/', requireAuth, getUserOrders);

//router.get('/api/orders', requireAuth, getUserOrders);
// ✅ Admin route — This is the one causing 404 if missing
router.get('/all', requireAuth, isAdmin, getAllOrders);

// ✅ Update status route
router.put('/update/:id', requireAuth, isAdmin, updateOrderStatus);

export default router;
