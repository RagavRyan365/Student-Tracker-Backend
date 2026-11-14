//Write Operation in this repo
import pool from "../config/connectDB.js";

async function addAttendance(classCode,reg,status,subject) {
    //insert into attendance values('ITC2026',1234567890123456,'P','ITHS02',NOW()::date, NOW()::time);
    const insertAttendance = "INSERT INTO attendance VALUES($1,$2,$3,$4,NOW()::date, NOW()::time)";
    await pool.query(insertAttendance,[classCode,reg,status,subject]);
    return;
}

export {
    addAttendance
}