import bcrypt from "bcryptjs";
import { pool } from "../../db";
import jwt from "jsonwebtoken";
import config from "../../config";

const loginsevice = async (payload: { email: string; password: string }) => {
  const { email, password } = payload;
  const result = await pool.query(
    `
        SELECT * FROM users WHERE email = $1
        `,
    [email],
  );

  if (result.rows.length === 0) {
    throw new Error("invalid credentails");
  }
  const user = result.rows[0];
  const matchPassword = bcrypt.compare(password, user.password);
  if (!matchPassword) {
    throw new Error("invalid credentails");
  }
  const jwtpayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    is_active: user.is_active,
  };
  const accessToken = jwt.sign(jwtpayload, config.jwtsecret as string, {
    expiresIn: "5d",
  });

  return { accessToken };
};

export const authservice = { loginsevice };
