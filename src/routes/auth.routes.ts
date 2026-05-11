import { Router } from "express";
import {
  LoginUser,
  RegisterUser,
  LogoutUser,
  getMe,
  updateMe,
} from "../controllers/auth.controller";
import protect from "../middlewares/protect";
const router = Router();

router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.post("/logout", LogoutUser);
router.get("/me", protect, getMe);
router.patch("/me", protect, updateMe);
export default router;
