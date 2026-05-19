import type { NextFunction, Request, Response } from "express";
import fs from "fs";

export const logstracker = (req: Request, res: Response, next: NextFunction) => {
  const log = `\nMethod --> ${req.method} -- Time--> ${Date.now()} -- URL --> ${req.url}\n`;
  fs.appendFile("loger.txt", log, (err) => {
    console.log(err);
  });
  next();
};
