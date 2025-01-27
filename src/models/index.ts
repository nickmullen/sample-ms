import { Sequelize } from "sequelize";
import { CONFIG } from "../config/config";

// Quick check to ensure all needed vars are present
if (
  !CONFIG.DATABASE.HOST ||
  !CONFIG.DATABASE.PORT ||
  !CONFIG.DATABASE.USERNAME ||
  !CONFIG.DATABASE.PASSWORD ||
  !CONFIG.DATABASE.NAME
) {
  throw new Error("Missing required environment variables for database configuration");
}

// Create the Sequelize instance
export const sequelize = new Sequelize(CONFIG.DATABASE.NAME, CONFIG.DATABASE.USERNAME, CONFIG.DATABASE.PASSWORD, {
  host: CONFIG.DATABASE.HOST,
  port: CONFIG.DATABASE.PORT,
  dialect: "mysql",
  logging: false // or console.log if you want SQL logs
});

// Import each model *after* exporting sequelize, so each model
// can safely import { sequelize } from this file without circular references
import Book from "./book";
import Film from "./film";
import Translation from "./translatableItem";

// Finally, export all models
export { Book, Film, Translation };
