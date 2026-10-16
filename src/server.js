import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

// Import routes
import signupRoute from './Routes/signup.js';
import signinRoute from './Routes/Signin.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Use the imported routes
app.use('/api/signup', signupRoute);
app.use('/api/signin', signinRoute);

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'Student Tracker API is running' });
});

// Sample route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

//Other Route should come here...


// Catch-all 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});