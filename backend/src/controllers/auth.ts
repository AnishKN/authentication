import { Request, Response } from 'express';
import User from '../models/userModel';
const { hashPassword, comparePassword, generateToken } = require('../middlewares/authVerify');

export const signup = async (req: Request, res: Response) => {
  const { firstName, lastName, password, retypePassword, contactMode, email } = req.body;
  
  try {
    const hashedPassword = await hashPassword(password);
    const user = new User({ 
      firstName,
      lastName,
      email, 
      password: hashedPassword,
      contactMode
    });
    await user.save();
    res.status(200).json({ message: 'OTP sent to your email.' });
  } catch (error) {
    console.log(error);
  }
};

export const verifyOtp = (req: Request, res: Response) => {
//   Verify OTP logic here
  res.json({ message: 'OTP Verified, proceed to login.' });
};
