// models/film.ts
import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "./index";
import Translation from "./translation";

interface FilmAttributes {
  id: string;
  director: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type FilmCreationAttributes = Optional<FilmAttributes, "id" | "createdAt" | "updatedAt">;

class Film extends Model<FilmAttributes, FilmCreationAttributes> implements FilmAttributes {
  public id!: string;
  public director!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Film.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    director: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: "films",
    timestamps: true,
    sequelize
  }
);

// Polymorphic association: Film can have many translations
Film.hasMany(Translation, {
  foreignKey: "recordId",
  constraints: false,
  scope: {
    recordType: "film"
  }
});

Translation.belongsTo(Film, {
  foreignKey: "recordId",
  constraints: false
});

export default Film;
