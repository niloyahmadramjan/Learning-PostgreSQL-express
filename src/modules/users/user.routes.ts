import { Router, type Request, type Response } from "express";
import {
  createUser,
  deleteUser,
  getAllUser,
  getSingleUser,
  updateUser,
} from "./user.controller";
const router = Router();

router.post("/", createUser);
router.get("/", getAllUser);
router.get("/:id", getSingleUser);
router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

export const userRoute = router;
