import { Model, DataTypes, Optional, HasManyGetAssociationsMixin } from "sequelize";
import { sequelize } from "./index";
import TranslatableItem from "./translatableItem";

// Define the attributes of the Book model
interface BookAttributes {
  id: string;
  author: string;
  TranslatableItems?: TranslatableItem[];
}

// Define the optional attributes for creating a Book
interface BookCreationAttributes extends Optional<BookAttributes, "id"> {}

// Extend the Sequelize Model class
class Book extends Model<BookAttributes, BookCreationAttributes> implements BookAttributes {
  public id!: string; // `id` is required and non-nullable
  public author!: string; // `author` is required and non-nullable

  // Association: Define TranslatableItems as an array
  public TranslatableItems?: TranslatableItem[];

  // Sequelize mixins for association methods
  public getTranslatableItems!: HasManyGetAssociationsMixin<TranslatableItem>;

  // Timestamps (automatically added by Sequelize if `timestamps: true`)
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
Book.hasMany(TranslatableItem, {
  foreignKey: "recordId",
  constraints: false, // disable foreign key constraint as also related to films
  scope: {
    recordType: "book" // ensure we only get translations of type 'book'
  }
});

// because of that polymorphism, we have to handle "delete" cascades ourself.   We _could_ handle this explitly in the service class if we preferred.
Book.beforeDestroy(async (book, options) => {
  await TranslatableItem.destroy({
    where: {
      recordId: book.dataValues.id,
      recordType: "book"
    }
  });
});

// Conversely, translation belongs to a "Book" in the sense that recordType='book'
TranslatableItem.belongsTo(Book, {
  foreignKey: "recordId",
  constraints: false
});

export default Book;
