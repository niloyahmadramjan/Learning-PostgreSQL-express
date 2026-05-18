import { Router } from "express";
import { loginController } from "./auth.controller";

const router = Router();

router.post("/", loginController.userlogin)

export const authRouter = router