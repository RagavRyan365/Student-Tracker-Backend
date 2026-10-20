import userRepo from '../../repositories/userRepo.js';

export async function checkUserEmail(req, res, next) {
  const { email } = req.body;
  const user = await userRepo.getUserByEmail(email);
  if (user) {
    return res.status(400).json({ error: 'User with this email already exists' });
  }
  next();
}

export async function checkUserExists(req, res, next) {
  const { email } = req.body;
  const user = await userRepo.getUserByEmail(email);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
//   req.user = user;
  next();
}

export default {checkUserEmail, checkUserExists};