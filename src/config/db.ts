import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined in the environment variables");
}

const connectDB = async (): Promise<void> => {
  try {
    const connect = await mongoose.connect(MONGO_URI);
    console.log("Mongodb connected", connect.connection.host);
  } catch (error) {
    console.error(`Mongodb connection error ${error}`);
    process.exit(1);
  }
};

export default connectDB;
