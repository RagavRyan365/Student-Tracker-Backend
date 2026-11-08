import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

//Functions from other files
import {getClassCode,getStudentsByClass} from "./repositories/readDBRepo.js";


const app = express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(express.json());
app.use(cors());

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'Student Tracker API is running' });
});

// Sample route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

//Other Route should come here...
app.get("/students/:dept/:sec/:year",async(req,res)=>{
  const {dept,sec,year} = req.params;
  const classCode = await getClassCode(dept,sec,year);
  if(classCode.rowCount <= 0)return res.status(400).json({error:"Class not exist"});

  const studentsList = await getStudentsByClass(classCode.rows[0].classcode);
  return res.status(200).json(studentsList.rows);
});

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