import type { Request, Response } from "express";
import { authservice } from "./auth.services";

const userlogin = async (req: Request, res: Response) => {
  try {
    const resutl = await authservice.loginsevice(req.body);
    res.status(200).json({
      status: true,
      message: "Access token generated",
      data: resutl,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error,
    });
  }
};

export const loginController = {
  userlogin,
};
