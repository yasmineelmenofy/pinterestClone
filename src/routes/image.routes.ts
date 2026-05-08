import { Router } from "express";
import { uploadImage, getImages } from "../controllers/image.controller";
import protect from "../middlewares/protect";
import upload from "../config/multer";

const router = Router();

router.post("/", protect, upload.single("image"), uploadImage);
router.get("/", protect, getImages);

export default router;
