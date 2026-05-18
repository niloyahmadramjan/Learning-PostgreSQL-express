import type { Request, Response } from "express";
import { profileServices } from "./profile.services";

export const createUserProfile = async (req: Request, res: Response) => {
  try {
    const result = await profileServices.createUserProfile(req.body);

    res.status(201).json({
      status: true,
      message: "user data created ",
      data: result.rows[0]
    });
  } catch (error) {
    console.log(error);
  }
};
