import app from "./app";
import dotenv from "dotenv";
import connectDB from "./config/db";

dotenv.config();
const port = process.env.PORT ?? 5000;

const startServer = async (): Promise<void> => {
  await connectDB();

  app.listen(port, () => {
    console.log(`Iam listening on port ${port}`);
  });
};


startServer();