import imageModel from "../models/Image.model";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";

export const uploadImage = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.user) {
      throw new ApiError("Not authorized", 401);
    }
    const userId = req.user._id;
    if (!req.file) {
      throw new ApiError("Please upload an image", 400);
    }
    const imageUrl = req.file.filename as string;
    const { title, description } = req.body;

    const image = await imageModel.create({
      title,
      description,
      user: userId,
      imageUrl,
    });
    res.status(201).json({
      message: "The image uploaded successfully",
      image: {
        title: image.title,
        description: image.description,
        user: image.user,
        imageUrl: image.imageUrl,
      },
    });
  } catch (error) {
    next(error);
  }
};


export const getImages = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
   try{ if (!req.user) {
        throw new ApiError("not Authorized", 401);
    }
    const userId = req.user._id;
    const images = await imageModel.find({ user: userId }).populate("user");
    res.status(200).json({
        message: "The images fetched successfully",
        images
    })
   } catch (error) {
       next(error);
    }
}