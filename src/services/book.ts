// A single service class isn't best practice.
// We would rather each method was it's own class - otherwise this file could become very big

import Book from "../models/book";
import TranslatableItem from "../models/translatableItem";
import { v4 as uuidv4 } from "uuid";
import { NotFoundError } from "../middleware/error";

interface TranslationInput {
  language: string;
  value: string;
}

interface CreateBookInput {
  author: string;
  names: TranslationInput[];
  descriptions: TranslationInput[];
}

function filterTranslations(translations: Array<TranslatableItem>, keyWanted: string) {
  return translations
    .filter((translation) => translation.dataValues.key === keyWanted)
    .map((translation) => {
      return { language: translation.dataValues.language, value: translation.dataValues.value };
    });
}

class BookService {
  public static async createBook(data: CreateBookInput) {
    console.log("<<<<<<", data);
    // 1. Create the Book
    const bookId: string = uuidv4();

    const book = await Book.create({
      id: bookId,
      author: data.author
    });

    // 2. Create Translations
    const translationNamePromises = data.names.map((t) => {
      return TranslatableItem.create({
        id: uuidv4(),
        recordId: bookId,
        recordType: "book",
        language: t.language,
        key: "name",
        value: t.value
      });
    });
    const translationDescriptionPromises = data.descriptions.map((t) => {
      return TranslatableItem.create({
        id: uuidv4(),
        recordId: bookId,
        recordType: "book",
        language: t.language,
        key: "description",
        value: t.value
      });
    });
    await Promise.all(translationNamePromises);
    await Promise.all(translationDescriptionPromises);

    return this.readBook(bookId); // Or just 'book' if you prefer
  }

  public static async getBooks() {
    const books = await Book.findAll({
      include: [{ model: TranslatableItem, as: "TranslatableItems", attributes: ["language", "key", "value"] }]
    });
    return books.map((book) => {
      // Separate "name" and "description" into distinct arrays
      let names: Array<any> = [];
      let descriptions: Array<any> = [];

      if (book.dataValues.TranslatableItems) {
        names = filterTranslations(book.dataValues.TranslatableItems, "name");
        descriptions = filterTranslations(book.dataValues.TranslatableItems, "description");
      }
      return {
        id: book.dataValues.id,
        author: book.dataValues.author,
        names,
        descriptions
      };
    });
  }

  public static async readBook(id: string) {
    const book = await Book.findByPk(id, {
      include: [{ model: TranslatableItem, as: "TranslatableItems", attributes: ["language", "key", "value"] }]
    });

    if (!book) throw new NotFoundError();

    // Separate "name" and "description" into distinct arrays
    let names: Array<any> = [];
    let descriptions: Array<any> = [];

    if (book.dataValues.TranslatableItems) {
      names = filterTranslations(book.dataValues.TranslatableItems, "name");
      descriptions = filterTranslations(book.dataValues.TranslatableItems, "description");
    }
    return {
      id: book.dataValues.id,
      author: book.dataValues.author,
      names,
      descriptions
    };
  }

  public static async deleteBook(id: string) {
    const bookToDestroy = await Book.findByPk(id);
    if (bookToDestroy) {
      await bookToDestroy.destroy(); // this triggers hooks in the Book model
    } else {
      throw new NotFoundError("Book with that id wasn't found");
    }
  }
}

export default BookService;
