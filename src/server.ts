import { ExpressApp } from "./express-app";
import { logger } from "./utils";
import { ConnectWithDB } from "./db";

const PORT = process.env.APP_PORT || 9002;

export const StartServer = async () => {
  const expressApp = await ExpressApp();
  expressApp.listen(PORT, () => {
    logger.info(`App is listening to ${PORT}`);
  });

  // Connect to MongoDB database
  ConnectWithDB();

  process.on("uncaughtException", async (err) => {
    logger.error(err);
    process.exit(1);
  });
};

StartServer().then(() => {
  logger.info("server is up");
});
