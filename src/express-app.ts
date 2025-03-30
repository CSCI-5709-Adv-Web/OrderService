import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import orderRoutes from "./routes/order.routes";
import { httpLogger, HandleErrorWithLogger } from "./utils";
import { InitializeBroker } from "./service/broker.service";
import { logger } from "./utils";

export const ExpressApp = async () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(httpLogger);

  try {
    // Initialize the message broker
    await InitializeBroker();
    logger.info("Message broker initialized successfully");
  } catch (error) {
    logger.error(`Failed to initialize message broker: ${error.message}`);
    // Continue app startup even if broker fails - we can handle messages later
  }

  app.use("/order", orderRoutes);

  app.use("/", (req: Request, res: Response, _: NextFunction) => {
    res.status(200).json({ message: "I am healthy!" });
  });

  app.use(HandleErrorWithLogger);

  return app;
};