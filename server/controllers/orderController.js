import Order from '../models/Order.js';

// Place a new order
export const placeOrder = async (req, res) => {
  try {
    const { fuelType, quantity, address } = req.body;

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Unauthorized: Missing user info' });
    }

    const newOrder = new Order({
      fuelType,
      quantity,
      address, // ✅ MATCHES schema
      status: 'Pending',
      user: req.user._id // ✅ MUST come from middleware
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    console.error('Order placement failed:', error);
    res.status(500).json({ message: 'Failed to place order' });
  }
};


// Get all orders for a logged-in user
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('user', 'name email').sort({ createdAt: -1 }); 
  res.json({ orders, user: req.user });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
};

// Admin: Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });;
    res.status(200).json(orders);
  } catch (error) {
    console.error('Failed to fetch all orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

/// server/controllers/orderController.js

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    console.log('Updating order:', id, 'to status:', status);

    // ✅ Await is required here to get the actual document
    const orderDoc = await Order.findById(id);

    if (!orderDoc) {
      return res.status(404).json({ message: 'Order not found' });
    }

    orderDoc.status = status;

    // ✅ Only Mongoose documents have .save()
    const updatedOrder = await orderDoc.save();

    res.json({ message: 'Order status updated successfully', order: updatedOrder });
  } catch (error) {
    console.error('Error in updateOrderStatus:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
};
