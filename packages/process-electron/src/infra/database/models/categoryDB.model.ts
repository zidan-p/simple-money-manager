import { Sequelize, DataTypes, Model, ModelStatic } from "sequelize";
import { Table, Column, AllowNull, HasMany, ForeignKey } from "sequelize-typescript";
// import { Ledger } from "./LedgerDD.model";


@Table
export class Ledger extends Model {
  // # NOTE: because it's already handle by equelize, i didn't use another name for primary key

  @Column(DataTypes.NUMBER)
  amount!:number;

  @Column(DataTypes.ENUM("income", "expense"))
  type!: string;

  @Column(DataTypes.TEXT("medium"))
  @AllowNull
  description?: string;

  @Column(DataTypes.DATE)
  date!: Date

  @ForeignKey(() => Category)
  @Column
  category_id!: number;

  @BelongsTo(() => Category)
  @Column
  Category!: Category;
}

@Table
export class Category extends Model{

  @Column(DataTypes.STRING)
  name!: string;

  @AllowNull
  @Column(DataTypes.TEXT("medium"))
  description?: string;

  @AllowNull
  @Column(DataTypes.STRING)
  icon?: string;

  @HasMany(()=>Ledger)
  @Column
  Ledger!: Ledger[];
}