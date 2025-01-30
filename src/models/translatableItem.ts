import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "./index";

// Define the attributes of the TranslatableItem model
interface TranslatableItemAttributes {
  id: string;
  recordId: string;
  recordType: string;
  language: string;
  key: string;
  value: string | null;
}

// Define optional attributes for creation
interface TranslatableItemCreationAttributes extends Optional<TranslatableItemAttributes, "id"> {}

class TranslatableItem
  extends Model<TranslatableItemAttributes, TranslatableItemCreationAttributes>
  implements TranslatableItemAttributes
{
  public id!: string;
  public recordId!: string;
  public recordType!: string;
  public language!: string;
  public key!: string;
  public value!: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

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
