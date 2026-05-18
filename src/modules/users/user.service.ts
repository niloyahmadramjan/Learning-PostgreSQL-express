import bcrypt from "bcryptjs";
import { pool } from "../../db";
import type { IUser } from "./user.interface";

const createUser = async (payload: IUser) => {
  const { name, email, password, age } = payload;

  const hashPass = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `
    INSERT INTO users( name, email, password, age) VALUES($1,$2,$3,$4) RETURNING *
  `,
    [name, email, hashPass, age],
  );
  delete result.rows[0].password;
  
  return result;
};

const getAlluserData = async () => {
  const user = await pool.query(`
      SELECT * FROM Users
      `);
      const usersWithoutPassword = user.rows.map((user)=> delete user.password)
  return user;
};

const getSingleUserData = async (id: string) => {
  const result = await pool.query(
    `
     SELECT * FROM users WHERE id=$1 
     `,
    [id],
  );
  delete result.rows[0].password
  return result;
};

const updateSingleUserData = async (payload: IUser, id: string) => {
  const { name, age, email, password, is_active } = payload;
  const result = await pool.query(
    `
     UPDATE users SET
      name = COALESCE($1, name),
      age=COALESCE($2, age),
      email = COALESCE($3, email) ,
      password= COALESCE($4,password),
      is_active = COALESCE($5, is_active )

     WHERE id=$6 RETURNING *
     `,
    [name, age, email, password, is_active, id],
  );
  delete result.rows[0].password
  return result;
};

const deleteUser = async (id: string) => {
  const result = await pool.query(
    `
     DELETE FROM users 
     WHERE id=$1 RETURNING *
     `,
    [id],
  );
  return result;
};

export const userService = {
  createUser,
  getAlluserData,
  getSingleUserData,
  updateSingleUserData,
  deleteUser,
};
