import { Router } from "express";
import {
  uploadImage,
  getImages,
  getImageById,
  deleteImage,
} from "../controllers/image.controller";
import protect from "../middlewares/protect";
import upload from "../config/multer";

const router = Router();

router.post("/", protect, upload.single("image"), uploadImage);
router.get("/", protect, getImages);
router.get("/:id", protect, getImageById);
router.delete("/:id", protect,deleteImage);

export default router;
