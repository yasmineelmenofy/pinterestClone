import { Router } from "express";
import { uploadImage, getImages,getImageById } from "../controllers/image.controller";
import protect from "../middlewares/protect";
import upload from "../config/multer";

const router = Router();

router.post("/", protect, upload.single("image"), uploadImage);
router.get("/", protect, getImages);
router.get("/:id", protect, getImageById);


export default router;
