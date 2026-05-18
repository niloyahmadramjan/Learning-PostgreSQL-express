import { Router } from "express";
import { createUserProfile } from "./profile.controller";
const router = Router();

router.post("/", createUserProfile)

export const userProfile = router;