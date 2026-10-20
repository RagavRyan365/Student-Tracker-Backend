//Sign in route
import express from 'express';
import jwt from 'jsonwebtoken';
const router = express.Router();

//helper functions
import {checkUserExists} from '../helper/validator/checkUserEmail.js';
import checkUserAuth from '../helper/auth/checkUserAuth.js';

//sign in route
router.post('/', checkUserExists, checkUserAuth, async (req, res) => {
  const {email} = req.body;
  // Generate JWT tokens
  const tokenPayload = { email };

  const accessToken = jwt.sign(tokenPayload, process.env.ACCESS_JWT_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign(tokenPayload, process.env.REFRESH_JWT_SECRET, { expiresIn: '7d' });
  
  //configure cookie options
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);
  res.status(200).json({ accessToken });
  
});

export default router;