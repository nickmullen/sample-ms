import { Request, Response, NextFunction, RequestHandler } from "express";
// import readBook from "../services/readBook";
import LOG from "../utils/log";
import BookService from "../services/book";
import { NotFoundError } from "../middleware/error";

const createBook = (req: Request, res: Response, next: NextFunction) => {
  const { author, names, descriptions } = req.body;

  BookService.createBook({ author, names, descriptions })
    .then((bookWithTranslations) => {
      return res.status(201).json({
        message: "Book created successfully",
        book: bookWithTranslations
      });
    })
    .catch((error: any) => {
      LOG.error("[BookConnector] createBook error:", error);
      return res.status(500).send({ message: "Failed to create book" });
    });
};

const deleteBook = (req: Request, res: Response, next: NextFunction) => {
  const bookId = req.params.id;

  BookService.deleteBook(bookId).then((result) => {
    return res.status(204).send(result);
  });
};

const getBooks = (req: Request, res: Response, next: NextFunction) => {
  BookService.getBooks()
    .then((books) => {
      return res.status(200).json({
        message: "Found books",
        books: books
      });
    })
    .catch((error: any) => {
      LOG.error("[BookConnector] read error:", error);
      return res.status(500).send({ message: "Failed to read book" });
    });
};

const readBook = (req: Request, res: Response, next: NextFunction) => {
  const bookId = req.params.id;

  BookService.readBook(bookId)
    .then((bookWithTranslations) => {
      return res.status(200).json({
        message: "Found book",
        book: bookWithTranslations
      });
    })
    .catch((error: any) => {
      if (error instanceof NotFoundError) {
        return res.status(404).send({ message: "Not found: " + bookId });
      }
      LOG.error("[BookConnector] read error:", error);
      return res.status(500).send({ message: "Failed to read book" });
    });
};

export default { createBook, deleteBook, getBooks, readBook };
