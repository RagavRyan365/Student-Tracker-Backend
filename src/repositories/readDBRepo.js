//Get data from this repo
import pool from "../config/connectDB.js";

//get class code by departmaent,section and year from db
async function getClassCode(department,section,year){
    const selectClassCodeQuery = "SELECT classcode FROM classes WHERE department = $1 AND section = $2 AND year = $3";
    const classCode = await pool.query(selectClassCodeQuery,[department,section,year])
    return classCode;
}

//get students details by class code from db
async function getStudentsByClass(classCode){
    const selectStudentsByClassQuery = "SELECT name,reg AS registerno,rollno FROM students WHERE class = $1 ORDER BY gender DESC,name ASC";
    const students = await pool.query(selectStudentsByClassQuery,[classCode]);
    return students;
}

//get subject name
async function getSubjectList(){
    const selectAllSubjectQuery = "SELECT subjectCode,subjectname FROM subjects";
    const subjects = await pool.query(selectAllSubjectQuery);
    return subjects;
}

async function checkAttendanceRecord(subjectCode,classCode){
    const selectAttendanceRecordQuery = "SELECT COUNT(reg) FROM attendance WHERE subject = $1 AND classcode = $2 AND date_ = NOW()::date"
    const attendanceRecord = await pool.query(selectAttendanceRecordQuery,[subjectCode,classCode]);
    return attendanceRecord;
}

export{
    getClassCode,
    getStudentsByClass,
    getSubjectList,
    checkAttendanceRecord
}