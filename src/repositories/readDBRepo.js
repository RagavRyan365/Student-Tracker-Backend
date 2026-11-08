//Get data from this repo
import pool from "../config/connectDB.js";

async function getClassCode(department,section,year){
    const selectClassCodeQuery = "SELECT classcode FROM classes WHERE department = $1 AND section = $2 AND year = $3";
    const classCode = await pool.query(selectClassCodeQuery,[department,section,year])
    return classCode;
}

async function getStudentsByClass(classCode){
    const selectStudentsByClassQuery = "SELECT name,reg AS registerno,rollno AS rollno FROM students WHERE class = $1";
    const students = await pool.query(selectStudentsByClassQuery,[classCode]);
    return students;
}

export{
    getClassCode,
    getStudentsByClass
}