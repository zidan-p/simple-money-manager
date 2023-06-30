import { Sequelize, DataTypes, Model, ModelStatic, Optional } from "sequelize";
import { Table, Column, AllowNull, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Category } from "./CategoryDB.model";

interface LedgerAttributes {
  // id: number; // just let sequelize handle it
  amount: number;
  type: "income" | "expense";
  description: string;
  date: Date;
}


// # Model<OutputType, InputType>
export class Ledger extends Model<LedgerAttributes>{
  amount!: number;
  type!: "income" | "expense";
  description!: string;
  date!: Date;
}


export default (sequelize: Sequelize) : ModelStatic<Ledger> => {
  // # the "Model" interface didnt work with this return value.
  // # i just let it to be in "sequelize" onbject, not in my object
  return Ledger.init({
    // # NOTE: because it's already handle by equelize, i didn't use another name for primary key
    amount: DataTypes.BIGINT,
    type: DataTypes.ENUM("income", "expense"),
    description: DataTypes.TEXT("medium"),
    date: DataTypes.TIME
  }, {
    sequelize
  })
}

