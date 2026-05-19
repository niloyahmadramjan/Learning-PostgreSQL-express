import type { NextFunction, Request, Response } from "express";
import Jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../db";
const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        res.status(401).json({
          status: false,
          message: "unauthorize access!",
        });
      }

      const decoded = Jwt.verify(
        token as string,
        config.jwtsecret as string,
      ) as JwtPayload;
      console.log(decoded);
      const userData = await pool.query(
        `
    SELECT * FROM users WHERE email = $1
    `,
        [decoded.email],
      );
      const user = userData.rows[0];
      if (userData.rows.length === 0) {
        res.status(404).json({
          status: false,
          message: "user cloud't find!",
        });
      }
      if (!user.is_active) {
        res.status(400).json({
          status: false,
          message: "Unauthorize user!",
        });
      }
      req.user = decoded;
    } catch (error: any) {
      res.status(500).json({
        status: false,
        message: error.message,
      });
    }
    next();
  };
};

export default auth;
