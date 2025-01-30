import { v4 as uuidv4 } from "uuid";
import Film from "../models/film";
import TranslatableItem from "../models/translatableItem";
import { NotFoundError } from "../middleware/error";

class ReadFilm {
  id: string;
  constructor(id: string) {
    this.id = id;
  }

  public async read() {
    const film = await Film.findByPk(this.id, {
      include: [{ model: TranslatableItem, as: "TranslatableItems", attributes: ["language", "key", "value"] }]
    });

    if (!film) throw new NotFoundError("Film with this ID not found");

    // Separate "name" and "description" into distinct arrays
    const names: Array<{ language: string; value: string }> = [];
    const descriptions: Array<{ language: string; value: string }> = [];
    if (film.dataValues.TranslatableItems) {
      film.dataValues.TranslatableItems.forEach((item) => {
        if (item.dataValues.key === "name") {
          names.push({ language: item.dataValues.language, value: item.dataValues.value ?? "" });
        } else if (item.dataValues.key === "description") {
          descriptions.push({ language: item.dataValues.language, value: item.dataValues.value ?? "" });
        }
      });
    }
    return {
      id: film.dataValues.id,
      author: film.dataValues.director,
      names,
      descriptions
    };

    return film;
  }
}

export default ReadFilm;
