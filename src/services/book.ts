// A single service class isn't best practice.

import Book from "../models/book";
import Translation from "../models/translatableItem";
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

class BookService {
  public static async createBook(data: CreateBookInput) {
    // 1. Create the Book
    const bookId: string = uuidv4();

    const book = await Book.create({
      id: bookId,
      author: data.author
    });

    // 2. Create Translations
    const translationNamePromises = data.names.map((t) => {
      console.log("****", t);
      return Translation.create({
        id: uuidv4(),
        recordId: bookId,
        recordType: "book",
        language: t.language,
        key: "name",
        value: t.value
      });
    });
    const translationDescriptionPromises = data.descriptions.map((t) => {
      console.log("****", t);
      return Translation.create({
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

  public static async readBook(id: string) {
    const bookWithTranslations = await Book.findByPk(id, {
      include: [Translation]
    });

    if (!bookWithTranslations) throw new NotFoundError();

    return bookWithTranslations; // Or just 'book' if you prefer
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
