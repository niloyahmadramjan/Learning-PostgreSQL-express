import type { Request, Response } from "express";
import { userService } from "./user.service";

export const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.createUser(req.body);
    res.status(201).json({
      status: "successfull",
      message: "User created!",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      errro: error,
    });
  }
};

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.getAlluserData();
    res.status(200).json({
      status: true,
      messasge: "user data retrived successfully",
      data: user.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: error.message,
      error,
    });
  }
};

export const getSingleUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await userService.getSingleUserData(id as string);
    if (result.rows.length === 0) {
      return res.status(404).json({
        status: false,
        message: "user not found",
        data: result.rows,
      });
    }
    res.status(200).json({
      status: true,
      message: "user found",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: error.message,
      error,
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, age, is_active, email, password } = req.body;
  try {
    const result = await userService.updateSingleUserData(
      req.body,
      id as string,
    );
    if (result.rows.length === 0) {
      return res.status(404).json({
        status: false,
        message: "user not found",
        data: result.rows,
      });
    }
    console.log(result);
    res.status(200).json({
      status: true,
      message: "user updated",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: error.message,
      error,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await userService.deleteUser(id as string);

    if (result.rowCount === 0) {
      return res.status(404).json({
        status: false,
        message: "user not found",
        data: result.rows,
      });
    }
    console.log(result);
    res.status(200).json({
      status: true,
      message: "user deleted",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: error.message,
      error,
    });
  }
};
