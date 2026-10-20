import bcrypt from "bcryptjs";
import userRepo from "../../repositories/userRepo.js";


//check if the user is provided with valid email and password
async function checkUserAuth(req, res, next) {
  const { email, password } = req.body;
  const user = await userRepo.getUserByEmail(email);

  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
//   req.user = user;
  next();
}

export default checkUserAuth;