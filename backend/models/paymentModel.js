import mongoose from 'mongoose';
/**
 * @author Ting-chun Pan
 * @reference https://github.com/jaewonhimnae/react-shop-app/blob/master/server/models/Payment.js
 */
const paymentSchema = new mongoose.Schema(
  {
    user: { type: Array, default: [] },
    data: { type: Array, default: [] },
    product: { type: Array, default: [] },
  },
  {
    timestamps: true,
  }
);
const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;