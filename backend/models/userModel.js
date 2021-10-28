import mongoose from 'mongoose';
/**
 * @author Ting-chin Pan
 * @reference https://github.com/basir/amazona/blob/master/backend/models/userModel.js
 */
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    postCode: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model('User', userSchema);
export default User;
