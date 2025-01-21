import Book from "../models/book";
import Translation from "../models/translation";

class ReadBook {
  public static async read(id: string) {
    const bookWithTranslations = await Book.findByPk(id, {
      include: [Translation]
    });

    return bookWithTranslations; // Or just 'book' if you prefer
  }
}

export default ReadBook;
