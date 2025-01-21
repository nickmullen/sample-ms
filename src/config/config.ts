import dotenv from "dotenv-safe";

dotenv.config();

const DB_HOST = process.env.DB_HOST || "";
const DB_USERNAME = process.env.DB_USERNAME || "";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_DATABASE = process.env.DB_DATABASE || "";
const DB_PORT = process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306;
const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1337;
const SERVICE_NAME = process.env.SERVICE_NAME || "";
const LOG_LEVEL = process.env.LOG_LEVEL || "info";
const LANGUAGES = process.env.LANGUAGES || "";

export type ProjectConfiguration = {
  DATABASE: {
    HOST: string;
    PORT: number;
    USERNAME: string;
    PASSWORD: string;
    NAME: string;
  };

  PORT: number;
  SERVICE_NAME: string;
  LOG_LEVEL: string;
  LANGUAGES: string;
};

// this will contain global configs for the project
export const CONFIG: ProjectConfiguration = {
  DATABASE: {
    HOST: DB_HOST,
    PORT: DB_PORT,
    USERNAME: DB_USERNAME,
    PASSWORD: DB_PASSWORD,
    NAME: DB_DATABASE
  },
  PORT: SERVER_PORT,
  SERVICE_NAME,
  LOG_LEVEL,
  LANGUAGES
};
