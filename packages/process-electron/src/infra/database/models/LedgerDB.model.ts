import { Sequelize, DataTypes, Model, ModelStatic, Optional } from "sequelize";
import { Table, Column, AllowNull, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Category } from "./CategoryDB.model";

interface LedgerAttributes {
  id          : string; 
  categoryId  : string;
  amount      : number;
  type        : "income" | "expense";
  description : string;
  date        : Date;
}


// # Model<OutputType, InputType>
export class Ledger extends Model<LedgerAttributes>{
  declare id    : string;
  declare categoryId   : string;
  amount!       : number;
  type!         : "income" | "expense";
  description!  : string;
  date!         : Date;
}


export default (sequelize: Sequelize) : ModelStatic<Ledger> => {
  // # the "Model" interface didnt work with this return value.
  // # i just let it to be in "sequelize" onbject, not in my object

  // i want to make category id is read by typescript but didn't make
  // it trigger error when initialize model
  // @ts-ignore
  return Ledger.init({
    id: {
      primaryKey: true,
      allowNull : false,
      type      : DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    // categoryId : {
    //   type      : DataTypes.UUID,
    //   references: {
    //     model: Category,
    //     key  : "id"
    //   } 
    // },
    amount  : {
      allowNull : false,
      type      : DataTypes.BIGINT
    },
    type:{
      allowNull : false,
      type      : DataTypes.ENUM("income", "expense")
    },
    description: {
      allowNull : true,
      type      :DataTypes.TEXT("medium")
    },
    date:{
      allowNull : false,
      type      : DataTypes.TIME
    }
  }, {
    sequelize
  })
}

