import { Sequelize, DataTypes, Model, ModelStatic, Optional } from "sequelize";
import { Table, Column, AllowNull, HasMany, ForeignKey } from "sequelize-typescript";
import { Ledger } from "./LedgerDB.model";

interface LedgerAttributes {
  name: string;
  description: string;
  icon: string;
}

// # Model<OutputType, InputType>
export class Category extends Model<LedgerAttributes>{
  public name!: string;
  public description!: string;
  public icon!: string;
}

export default (sequelize: Sequelize) : ModelStatic<Category> => {
  // # the "Model" interface didnt work with this return value.
  // # i just let it to be in "sequelize" onbject, not in my object
  return Category.init({
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
    sequelize
  })
}