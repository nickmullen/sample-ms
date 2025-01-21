import { Request, Response, NextFunction } from "express";
import { LOG } from "../utils/log";

export default (req: Request, res: Response, next: NextFunction) => {
  /** Log the req */
  LOG(`Incoming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

  res.on("finish", () => {
    /** Log the res */
    LOG(
      `Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`
    );
  });

  next();
};
