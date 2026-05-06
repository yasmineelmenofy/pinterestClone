import { Request, Response } from "express";
import UserModel from "../models/User.model";
import bycrpt from "bcrypt";
import generateToken from "../utils/generateToken";

export const RegisterUser = async (req: Request, res: Response): Promise<void> => {
    try{
  const { userName, email, password, profileImage } = req.body;
  const found = await UserModel.findOne({ email: email });
  if (found) {
    res.status(400).json({ message: "The user already exist" });
    return;
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
    res.status(400).json({ message: "User creation failed" });
    return;
  }
};
