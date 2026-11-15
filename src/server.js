//initial starting point of the backend
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

//Functions from other files

//read repo function import
import 
{
  getClassCode,
  getStudentsByClass,
  getSubjectList,
  checkAttendanceRecord
} 
from "./repositories/readDBRepo.js";

//write repo function import
import
{
  addAttendance
}
from './repositories/writeDBRepo.js'


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
//Other Route should come here..................................................................

//Fetching Students list from DB based on "Department,Section, and Year"
app.get("/api/students/:dept/:sec/:year",async(req,res)=>{
  const {dept,sec,year} = req.params;
  const classCode = await getClassCode(dept,sec,year);
  if(classCode.rowCount <= 0)return res.status(400).json({error:"Class not exist"});

  const studentsList = await getStudentsByClass(classCode.rows[0].classcode);
  return res.status(200).json({list:studentsList.rows,classCode:classCode.rows});
});

//Fetching all subject list from DB
app.get("/api/subjects",async(req,res)=>{
  const subjectList = await getSubjectList();
  return res.status(200).json(subjectList);
})

//Mark attendance
app.post("/api/mark/attendance",async(req,res)=>{
  const {studentsData,subjectCode,classCode} = req.body
  
  //Mark the attendance for each student in the class
  for(let i=0;i<studentsData.length;i++){
    const reg = studentsData[i].registerno;
    const status = studentsData[i].status;
    await addAttendance(classCode,reg,status,subjectCode);
  }

  return res.status(201).json({message:"Attendance marked Successfully"});
})

//Is Attendance Already marked?
app.get("/api/verify/attendance/:subjectCode/:classCode",async(req,res)=>{
  const {subjectCode,classCode} = req.params;
  const attendanceChecker = await checkAttendanceRecord(subjectCode,classCode);
  if(attendanceChecker.rows[0].count === '0'){
    return res.status(200).json({message:"No attendance marked"});
  }
    return res.status(400).json({message:"Attendance is already marked"});
})

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