// services/bookService.ts
import { v4 as uuidv4 } from "uuid";
import Film from "../models/film";
import Translation from "../models/translatableItem";
import { NotFoundError } from "../middleware/error";

class ReadFilm {
  id: string;
  constructor(id: string) {
    this.id = id;
  }

  public async read() {
    const film = await Film.findByPk(this.id, {
      include: [Translation]
    });

    if (!film) throw new NotFoundError("Film with this ID not found");

    // turn the translations into something better.  We're doing it longhand here, but look in the book model to see how to do this with hooks.

    return film;
  }
}

export default ReadFilm;
