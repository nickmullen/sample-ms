// services/bookService.ts
import { v4 as uuidv4 } from "uuid";
import Book from "../models/book";
import Translation from "../models/translation";

interface TranslationInput {
  language: string;
  name: string;
  description: string;
}

interface CreateBookInput {
  author: string;
  translations: TranslationInput[];
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
    const translationPromises = data.translations.map((t) => {
      return Translation.create({
        id: uuidv4(),
        recordId: book.id,
        recordType: "book",
        language: t.language,
        name: t.name,
        description: t.description
      });
    });
    await Promise.all(translationPromises);

    // 3. Optionally, fetch the Book with its translations and return that.
    const bookWithTranslations = await Book.findByPk(book.id, {
      include: [Translation]
    });

    return bookWithTranslations; // Or just 'book' if you prefer
  }

  public static async readBook(id: string) {
    const bookWithTranslations = await Book.findByPk(id, {
      include: [Translation]
    });

    return bookWithTranslations; // Or just 'book' if you prefer
  }
}

export default BookService;
