import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "./index";
import TranslatableItem from "./translatableItem";

class Film extends Model {}

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
  constraints: false,
  scope: {
    recordType: "film"
  }
});

TranslatableItem.belongsTo(Film, {
  foreignKey: "recordId",
  constraints: false
});

export default Film;
