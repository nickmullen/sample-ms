// models/book.ts
import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "./index";
import Translation from "./translation"; // single translations model

interface BookAttributes {
  id: string;
  author: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type BookCreationAttributes = Optional<BookAttributes, "id" | "createdAt" | "updatedAt">;

class Book extends Model<BookAttributes, BookCreationAttributes> implements BookAttributes {
  public id!: string;
  public author!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Book.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: "books",
    sequelize
  }
);

// Polymorphic association: Book can have many translations
Book.hasMany(Translation, {
  foreignKey: "recordId",
  constraints: false, // disable foreign key constraint if you want pure polymorphic
  scope: {
    recordType: "book" // ensure we only get translations of type 'book'
  }
});

// Conversely, translation belongs to a "Book" in the sense that recordType='book'
Translation.belongsTo(Book, {
  foreignKey: "recordId",
  constraints: false
});

export default Book;
