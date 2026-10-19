//Sign in route
import express from 'express';
import hashPassword from "../helper/hashPassword.js";
const router = express.Router();

//sign in route
router.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  // Handle sign-in logic here
});

export default router;