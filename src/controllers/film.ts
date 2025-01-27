import { Request, Response, NextFunction, RequestHandler } from "express";
import LOG from "../utils/log";
import ReadFilm from "../services/readFilm";
import { NotFoundError } from "../middleware/error";

const readFilm = (req: Request, res: Response, next: NextFunction) => {
  const filmId = req.params.id;

  new ReadFilm(filmId)
    .read()
    .then((film) => {
      return res.status(200).json({
        message: "Found film",
        film: film
      });
    })
    .catch((error: any) => {
      if (error instanceof NotFoundError) {
        return res.status(404).send({ message: "Not found: " + filmId });
      }
      LOG.error("[BookConnector] read error:", error);
      return res.status(500).send({ message: "Failed to read film" });
    });
};

export default { readFilm };
