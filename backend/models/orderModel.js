const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  // Link the Order to the User
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users', 
    required: [true, 'Order must belong to a user']
  },

  // The list of products
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products', 
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity cannot be less than 1.']
      }
    }
  ],

  // Financial tracking
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },

  // PAYMENT STATUS (Kept as requested)
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed'],
    default: 'Pending'
  },

  shippingAddress: {
    type: String,
    required: true
  }
}, { timestamps: true });

const orderModel = mongoose.model('orders', orderSchema);
module.exports = orderModel;