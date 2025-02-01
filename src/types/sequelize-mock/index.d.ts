declare module "sequelize-mock" {
  import { Sequelize, Model, ModelCtor, DataTypes } from "sequelize";

  export default class SequelizeMock extends Sequelize {
    constructor();

    define<T extends Model>(modelName: string, attributes?: any, options?: any): ModelCtor<T>;
  }
}
