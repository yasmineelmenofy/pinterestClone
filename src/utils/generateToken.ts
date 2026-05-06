import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined");

const generateToken = (id: string): string => {
  try {
    return jwt.sign({ id }, JWT_SECRET, {
      expiresIn: "7d",
    });
  } catch (error) {
    throw new Error("Token generation failed");
  }
};

export default generateToken;
