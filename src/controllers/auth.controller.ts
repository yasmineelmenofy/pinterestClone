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
