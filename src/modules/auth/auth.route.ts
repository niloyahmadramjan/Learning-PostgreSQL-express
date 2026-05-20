import { Router } from "express";
import { loginController } from "./auth.controller";

const router = Router();

router.post("/login", loginController.userlogin);
router.post("/refresh-token", loginController.refreshtoken);

export const authRouter = router;
