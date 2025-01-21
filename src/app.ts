// app.ts
import { sequelize } from "./models"; // Import your Sequelize instance
import createServer from "./server";
import { CONFIG } from "./config/config";
import LOG from "./utils/log";

const app = createServer();

// Test the database connection
const ConnectToDB = async () => {
  await sequelize
    .authenticate()
    .then(() => {
      LOG.info("Database connected!");
    })
    .catch((err: Error) => {
      LOG.error("Unable to connect to the database:", err);
    });
};

/** Start Server */
const StartServer = () => {
  LOG.info("Server is starting");

  app.listen(CONFIG.PORT, () => LOG.info(`Server is running on port ${CONFIG.PORT}`));
};

/** Start the server */
StartServer();

/** Establish connection to the database */
ConnectToDB();
