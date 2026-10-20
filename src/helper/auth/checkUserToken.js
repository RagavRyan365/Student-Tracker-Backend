import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

//check if the access token is valid
async function checkUserToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  jwt.verify(token, process.env.ACCESS_JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    // req.user = user;
    next();
  });
}

export default checkUserToken;