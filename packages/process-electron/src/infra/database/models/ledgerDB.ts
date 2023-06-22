import { Sequelize, DataTypes, Model, ModelStatic } from "sequelize";


export default (sequelize: Sequelize) : ModelStatic<Model> => {
  return sequelize.define("Ledger", {
    // # NOTE: because it's already handle by equelize, i didn't use another name for primary key
    amount      : DataTypes.NUMBER,
    type        : DataTypes.ENUM("income", "expense"),
    description : DataTypes.TEXT("medium"),
    date        : DataTypes.TIME
  }, {
    // # i let sequelize define the table name, so it will be "categories"
  })
}