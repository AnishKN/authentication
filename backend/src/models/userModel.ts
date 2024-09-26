import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true, required: true },
  password: String,
  contactMode: String,
  otp: String, // Store OTP for verification
  otpVerified: { type: Boolean, default: false }, // Whether OTP is verified
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
