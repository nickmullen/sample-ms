// models/translation.ts
import { Model, DataTypes, Optional, Association, NonAttribute } from "sequelize";
import { sequelize } from "./index"; // your Sequelize instance
import Book from "./book";
import Film from "./film";

interface TranslationAttributes {
  id: string;
  recordId: string; // the PK of the parent (Book or Film)
  recordType: string; // either 'book' or 'film'
  language: string; // e.g. 'en', 'fr', etc.
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type TranslationCreationAttributes = Optional<TranslationAttributes, "id" | "createdAt" | "updatedAt">;

class Translation extends Model<TranslationAttributes, TranslationCreationAttributes> implements TranslationAttributes {
  public id!: string;
  public recordId!: string;
  public recordType!: string;
  public language!: string;
  public name!: string;
  public description!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // If you need them, you can declare possible associations here:
  // e.g. Book or Film as needed. But it's not strictly required in polymorphic setups.
  public static associations: {
    // e.g. translationsOfBook: Association<Translation, Book>
    // but we typically do the belongsTo association inside Book or Film
  };
}

Translation.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    recordId: {
      type: DataTypes.UUIDV4,
      allowNull: false
    },
    recordType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    tableName: "translations",
    timestamps: true,
    sequelize
  }
);

export default Translation;
