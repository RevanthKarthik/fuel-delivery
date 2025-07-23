// server/models/orderModel.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fuelType: { type: String, required: true },
  quantity: { type: Number, required: true },
  address: { type: String, required: true },
  status: {
  type: String,
  enum: ['Pending', 'Approved', 'Dispatched', 'Cancelled','Delivered'], // ✅ include Delivered
  default: 'Pending'
}
}, {
  timestamps: true,
});

export default mongoose.model('Order', orderSchema);
