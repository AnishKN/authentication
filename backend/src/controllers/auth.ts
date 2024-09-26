import { Request, Response } from 'express';
import User from '../models/userModel';
import transporter from '../config/mailConfig';
import { hashPassword, comparePassword, generateToken } from '../middlewares/authVerify';
import { generateOtp } from '../utils/otpGenerator';
import dotenv from 'dotenv';

dotenv.config();

// Signup Controller
export const signup = async (req: Request, res: Response) => {
  console.log(req.body); // Log the incoming request body

  const { firstName, lastName, password, contactMode, email } = req.body;

  if (!req.body) {
    return res.status(400).json({ message: "Request body is required." });
  }
  try {

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await hashPassword(password);

    // Generate a 4-digit OTP
    const otp = generateOtp();

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      contactMode,
      otp, // Save OTP for verification
      otpVerified: false, // Set OTP verified status
    });

    await user.save();

    // Send OTP via email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify Your Email',
      text: `Your OTP is: ${otp}`,
    });

    res.status(200).json({ message: 'OTP sent to your email.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Verify OTP Controller
export const verifyOtp = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (user.otp === otp) {
      user.otpVerified = true; // Mark OTP as verified
      user.otp = undefined; // Clear OTP after verification
      await user.save();

      return res.status(200).json({ message: 'OTP Verified, proceed to login.', otpVerified: true });
    } else {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Sign-in Controller
export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    if (!user.otpVerified) {
      return res.status(400).json({ message: 'Please verify your email first.' });
    }

    const token = generateToken(user._id.toString());
    const userData = user;
    res.status(200).json({ token:token, user:userData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
