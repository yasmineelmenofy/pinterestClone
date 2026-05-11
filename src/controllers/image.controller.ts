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

export const getImages = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.user) {
      throw new ApiError("not Authorized", 401);
    }
    const userId = req.user._id;
    const images = await imageModel.find({ user: userId }).populate("user");
    res.status(200).json({
      message: "The images fetched successfully",
      images,
    });
  } catch (error) {
    next(error);
  }
};

export const getImageById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.user) {
      throw new ApiError("not Authorized", 401);
    }
    const userId = req.user._id;
    if (!req.params.id) {
      throw new ApiError("Please Enter the Id", 400);
    }
    const imageId = req.params.id;
    const image = await imageModel.findById(imageId).populate("user");
    if (!image) {
      throw new ApiError("Image not found", 404);
    }
    if (image.user.toString() !== userId.toString()) {
      throw new ApiError("Not authorized to access this image", 403);
    }
    res.status(200).json({
      message: "Image fetched successfully",
      image: {
        title: image.title,
        description: image.description,
        imageUrl: image.imageUrl,
        user: image.user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteImage = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.user) {
      throw new ApiError("not Authorized", 401);
    }
    const userId = req.user._id;
    if (!req.params.id) {
      throw new ApiError("Please Enter Id", 400);
    }
    const imageId = req.params.id;
    const image = await imageModel.findById(imageId);
    if (!image) {
      throw new ApiError("The image is not found", 404);
    }
    if (image.user.toString() !== userId.toString()) {
      throw new ApiError("Not authorized to access this image", 403);
    }
    await imageModel.findByIdAndDelete(imageId);
    res.status(200).json({
      message: "Image deleted successfully",
      image: {
        title: image.title,
        description: image.description,
        imageUrl: image.imageUrl,
        user: image.user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateImage = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.user) {
      throw new ApiError("not Authorized", 401);
    }
    const userId = req.user._id;
    if (!req.params.id) {
      throw new ApiError("Please Enter id", 400);
    }
    const imageId = req.params.id;
    const image = await imageModel.findById(imageId);
    if (!image) {
      throw new ApiError("The image is not found", 404);
    }
    if (image.user.toString() !== userId.toString()) {
      throw new ApiError("Not authorized to access this image", 403);
    }
    const { title, description } = req.body;
    const updatedImage = await imageModel.findByIdAndUpdate(
      imageId,
      {
        title,
        description,
      },
      { new: true },
    );
    if (!updatedImage) {
      throw new ApiError("Failed to update image", 500);
    }
    res.status(200).json({
      message: "Image updated successfully",
      image: {
        title: updatedImage.title,
        description: updatedImage.description,
        imageUrl: image.imageUrl,
        user: image.user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getAllImages = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const images = await imageModel.find().populate("user");
    res.status(200).json({
      message: "The images fetched successfully",
      images,
    });
  } catch (error) {
    next(error);
  }
};
