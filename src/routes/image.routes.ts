import { Router } from "express";
import {
  uploadImage,
  getImages,
  getImageById,
  deleteImage,
  updateImage,
  getAllImages,
} from "../controllers/image.controller";
import protect from "../middlewares/protect";
import upload from "../config/multer";

const router = Router();

router.post("/", protect, upload.single("image"), uploadImage);
router.get("/me", protect, getImages);
router.get("/:id", protect, getImageById);
router.delete("/:id", protect, deleteImage);
router.patch("/:id", protect, updateImage);
router.get("/",getAllImages);
export default router;
