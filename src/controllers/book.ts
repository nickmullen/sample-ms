import { Request, Response, NextFunction, RequestHandler } from "express";
// import readBook from "../services/readBook";
import LOG from "../utils/log";
import BookService from "../services/book";

const create = (req: Request, res: Response, next: NextFunction) => {
  const { author, translations } = req.body;

  BookService.createBook({ author, translations })
    .then((bookWithTranslations) => {
      return res.status(201).json({
        message: "Book created successfully",
        book: bookWithTranslations
      });
    })
    .catch((error: any) => {
      LOG.error("[BookConnector] createBook error:", error);
      return res.status(500).json({ error: "Failed to create book" });
    });
};

const read = (req: Request, res: Response, next: NextFunction) => {
  const bookId = req.params.id;

  BookService.readBook(bookId)
    .then((bookWithTranslations) => {
      return res.status(200).json({
        message: "Found book",
        book: bookWithTranslations
      });
    })
    .catch((error: any) => {
      LOG.error("[BookConnector] read error:", error);
      return res.status(500).json({ error: "Failed to read book" });
    });
};

export default { create, read };
