import type { Response } from "express";

type TSendResponse<T> = {
  statusCode: number;
  status: boolean;
  message: string;
  data?: T;
  error?: any;
};

const sentResponse = <T>(res: Response, data: TSendResponse<T>) => {
  res.status(data.statusCode).json({
    status: data.status,
    message: data.message,
    data: data.data,
    error: data.error,
  });
};

export default sentResponse;
