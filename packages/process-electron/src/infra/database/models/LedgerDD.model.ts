import { Sequelize, DataTypes, Model, ModelStatic, Optional } from "sequelize";
import { Table, Column, AllowNull, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Category } from "./categoryDB.model";

interface LedgerAttributes {
  id: number;
  type: "income" | "expense";
  description: string;
  date: Date;
}

interface LedgerCreationAttibutes extends Optional<LedgerAttributes, "id">{};


@Table
export class Ledger extends Model<LedgerAttributes, LedgerCreationAttibutes> {
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