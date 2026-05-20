import type { Request, Response } from "express";
import { authservice } from "./auth.services";
import sentResponse from "../../utils/sendResponse";

const userlogin = async (req: Request, res: Response) => {
  try {
    const resutl = await authservice.loginsevice(req.body);

    const { refreshToken } = resutl;

    res.cookie("refresh_token", refreshToken, {
      secure: false, // production will be treue
      httpOnly: true,
      sameSite: "lax",
    });

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

const refreshtoken = async (req: Request, res: Response) => {
  try {
    const refreshtoken = req.cookies.refresh_token;
    const result = await authservice.generateAccessToken(refreshtoken);
    sentResponse(res, {
      statusCode: 200,
      status: true,
      message: "Access token generated",
      data: result,
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
  refreshtoken,
};
