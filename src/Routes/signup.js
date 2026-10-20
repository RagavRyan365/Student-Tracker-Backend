//Sign up route
import express from 'express';
const router = express.Router();

//helper functions
import generateUniqueId from '../helper/idGenerator.js';
import hashPassword from '../helper/hashPassword.js';

//validator functions
import {checkUserEmail} from '../helper/validator/checkUserEmail.js';

//database operations
import userRepo from '../repositories/userRepo.js';

//sign up route
router.post('/', checkUserEmail, async (req, res) => {
  const {email, password} = req.body;
  const id = await generateUniqueId();
  const hashedPassword = await hashPassword(password);
  userRepo.createUser(id, email, hashedPassword)
    .then((user) => {
      res.status(201).json({ message: 'User created successfully', user });
    })
    .catch((error) => {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

export default router;