//Sign up and sign in Db operations centered here
import pool from "../config/connectDB.js";

async function createUser(name, email, hashedPassword) {
  const query = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *';
  const values = [name, email, hashedPassword];
    try {
    const result = await pool.query(query, values);
    return result.rows[0]; // Return the created user
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

async function getUserByEmail(email) {
  const query = 'SELECT * FROM users WHERE email = $1';
  const values = [email];

  try {
    const result = await pool.query(query, values);
    return result.rows[0]; // Return the user if found
  } catch (error) {
    console.error('Error fetching user by email:', error);
    throw error;
  }
}

export default {
  createUser,
  getUserByEmail,
};
