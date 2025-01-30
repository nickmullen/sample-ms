import { Model, DataTypes, Optional, HasManyGetAssociationsMixin } from "sequelize";
import { sequelize } from "./index";
import TranslatableItem from "./translatableItem";

// Define the attributes of the Book model
interface FilmAttributes {
  id: string;
  director: string;
  TranslatableItems?: TranslatableItem[];
}

// Define the optional attributes for creating a Book
interface FilmCreationAttributes extends Optional<FilmAttributes, "id"> {}

class Film extends Model<FilmAttributes, FilmCreationAttributes> implements FilmAttributes {
  public id!: string; // `id` is required and non-nullable
  public director!: string; // `director` is required and non-nullable

  // Association: Define TranslatableItems as an array
  public TranslatableItems?: TranslatableItem[];

  // Sequelize mixins for association methods
  public getTranslatableItems!: HasManyGetAssociationsMixin<TranslatableItem>;

  // Timestamps (automatically added by Sequelize if `timestamps: true`)
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
Film.hasMany(TranslatableItem, {
  foreignKey: "recordId",
  constraints: false, // have to set this false because translatableitems is also associated with Books
  scope: {
    recordType: "film"
  }
});

// because of that polymorphism, we have to handle "delete" cascades ourself.   We _could_ handle this explitly in the service class if we preferred.
Film.beforeDestroy(async (film, options) => {
  await TranslatableItem.destroy({
    where: {
      recordId: film.dataValues.id,
      recordType: "film"
    }
  });
});
TranslatableItem.belongsTo(Film, {
  foreignKey: "recordId",
  constraints: false
});

export default Film;
