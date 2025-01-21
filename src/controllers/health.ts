import { NextFunction, Request, Response } from "express";
import { sequelize } from "../models";
import LOG from "../utils/log";

const healthCheck = async (req: Request, res: Response, next: NextFunction) => {
  // return handleResponse(res, 200, "Success", {
  //   status: "UP",
  //   uptime: process.uptime()
  // });
  res.status(200).json({
    status: "UP",
    uptime: process.uptime()
  });
  return;
};

const readinessCheck = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // do whatever checks you need to to ensure that you are prepared to handle live traffic
    // this could be just a db, but also validating an external service is up

    await sequelize.query("SELECT 1+1 AS RESULT;");
    res.status(200).json({
      status: "UP",
      reasons: ["DB OK"]
    });
  } catch (err) {
    LOG.error(err);
    res.status(500).json({
      status: "DOWN",
      reasons: ["Unable to connect with DB"]
    });
  }
};

export default { healthCheck, readinessCheck };
