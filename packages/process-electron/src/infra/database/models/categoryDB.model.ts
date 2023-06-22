import { Sequelize, DataTypes, Model, ModelStatic } from "sequelize";


export default (sequelize: Sequelize) : ModelStatic<Model> => {
  // # the "Model" interface didnt work with this return value.
  // # i just let it to be in "sequelize" onbject, not in my object
  return sequelize.define("Category", {
    // # NOTE: because it's already handle by equelize, i didn't use another name for primary key
    name: {
      allowNull : false,
      type      : DataTypes.STRING
    },
    description: {
      allowNull : true,
      type      : DataTypes.TEXT("medium")
    },
    icon : {
      allowNull : true,
      type      : DataTypes.STRING
    }
  }, {
    // # i let sequelize define the table name, so it will be "categories"
  })
}