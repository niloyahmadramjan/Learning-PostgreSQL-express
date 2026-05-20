import { Router, type Request, type Response } from "express";
import {
  createUser,
  deleteUser,
  getAllUser,
  getSingleUser,
  updateUser,
} from "./user.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../../types/role";
const router = Router();

router.post("/", createUser);
router.get("/", auth(USER_ROLE.admin, USER_ROLE.agent), getAllUser);
router.get("/:id", getSingleUser);
router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

export const userRoute = router;
