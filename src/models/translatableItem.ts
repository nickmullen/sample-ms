import { Model, DataTypes, Optional, Association, NonAttribute } from "sequelize";
import { sequelize } from "./index";

class TranslatableItem extends Model {}

TranslatableItem.init(
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
    key: {
      type: DataTypes.STRING,
      allowNull: true
    },
    value: {
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

export default TranslatableItem;
