import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

//chech if the refresh token is valid and generate a new access token
async function refreshToken(req, res) {
  const refreshToken = req.cookies.refreshToken;
  if (refreshToken) {
    jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Invalid or expired refresh token' });
      }
        const tokenPayload = { email: user.email };
        const accessToken = jwt.sign(tokenPayload, process.env.ACCESS_JWT_SECRET, { expiresIn: '15m' });
        res.status(200).json({ accessToken });
    });
  } else {
    res.status(403).json({ error: 'No refresh token provided' });
  }
}

export default refreshToken;