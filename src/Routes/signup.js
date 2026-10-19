//Sign up route
import express from 'express';
const router = express.Router();

//sign up route
router.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  password = await hashPassword(password);
});

export default router;