import dotenv from "dotenv";
dotenv.config();
import mongoose, { ConnectOptions } from "mongoose";
import { logger } from "../utils";

const DB_URL = process.env.DB_URL || "";

export const ConnectWithDB = () => {
  logger.info(DB_URL);
  mongoose
    .connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions)
    .then(() => logger.info("MongoDB connected in order service..."))
    .catch((err) => logger.error(err));
};

export * from "./Models/Order";
