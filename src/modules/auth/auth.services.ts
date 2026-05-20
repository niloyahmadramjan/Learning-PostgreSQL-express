import bcrypt from "bcryptjs";
import { pool } from "../../db";
import jwt, { type JwtPayload } from "jsonwebtoken";
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
    role: user.role,
    is_active: user.is_active,
  };
  const accessToken = jwt.sign(jwtpayload, config.jwtsecret as string, {
    expiresIn: "5d",
  });
  const refreshToken = jwt.sign(jwtpayload, config.refreshasecrect as string, {
    expiresIn: "5d",
  });

  return { accessToken, refreshToken };
};

const generateAccessToken = async (token: string) => {
  if (!token) {
    throw new Error("Unathorized access!");
  }

  const decoded = jwt.verify(
    token as string,
    config.refreshasecrect as string,
  ) as JwtPayload;
  const userData = await pool.query(
    `
    SELECT * FROM users WHERE email = $1
    `,
    [decoded.email],
  );
  const user = userData.rows[0];
  if (userData.rows.length === 0) {
   throw new Error("User not found")
    }
  
  if (!user.is_active) {
    throw new Error(" User not active ")
  }

  const jwtpayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    is_active: user.is_active,
  };
  const accessToken = jwt.sign(jwtpayload, config.jwtsecret as string, {
    expiresIn: "5d",
  });
  return {accessToken};
};

export const authservice = { loginsevice, generateAccessToken };
