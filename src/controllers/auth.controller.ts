import { Request, Response, NextFunction } from "express";
import UserModel from "../models/User.model";
import bycrpt from "bcrypt";
import generateToken from "../utils/generateToken";
import { ApiError } from "../utils/ApiError";

export const RegisterUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { userName, email, password, profileImage } = req.body;
    const found = await UserModel.findOne({ email: email });
    if (found) {
      throw new ApiError("The user already exist", 400);
    }
    const hash = await bycrpt.hash(password, 10);
    const user = await UserModel.create({
      userName: userName,
      email: email,
      password: hash,
      profileImage: profileImage,
    });

    const token = generateToken(user.id);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const LoginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { password, email } = req.body;
    const found = await UserModel.findOne({ email: email });
    if (!found) {
      throw new ApiError("No account found register first", 401);
    }
    const comp = await bycrpt.compare(password, found.password);
    if (!comp) {
      throw new ApiError("Password is not correct", 401);
    }
    const token = generateToken(found.id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      message: "User logged successfully",
      user: {
        id: found._id,
        userName: found.userName,
        email: found.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const LogoutUser = (req: Request, res: Response) => {
  res.clearCookie("token");
  res.status(200).json({ message: "logged out successfully" });
};

export const getMe = (req: Request, res: Response) => {
  if (!req.user) {
    throw new ApiError("Not Authorized", 401);
  }
  const user = req.user;
  const { userName, email, profileImage } = user;
  res.status(200).json({
    message: "User fetched successfully",
    user: {
      userName,
      email,
      profileImage,
    },
  });
};

export const updateMe = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.user) {
      throw new ApiError("Not Authorized", 401);
    }
    const userId = req.user._id;
    const { userName, email, profileImage } = req.body;
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { userName, email, profileImage },
      { new: true },
    );

    if (!updatedUser) {
      throw new ApiError("Failed to update user", 500);
    }
    res.status(200).json({
      message: "information updated successfully",
      user: {
        userName,
        email,
        profileImage,
      },
    });
  } catch (error) {
    next(error);
  }
};
