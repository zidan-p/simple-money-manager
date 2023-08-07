import {Sequelize, Model, ModelStatic} from "sequelize";
import { DatabaseSMM } from "..";




/**
 * @summary
 * really, i dont know the best way to associate model in sequelize.
 * only this way that i know. it's confusing if you imagine the assiciate here.
 * it maybe will be hard to maintain if the table have been so many.
 */
// export default (sequelize: Sequelize) => {
//     const {Ledger!, Category as ModelStatic} = sequelize.models
// }

export function associateModel(database: DatabaseSMM){
  const Category = database.models.Category;
  const Ledger = database.models.Ledger;

  // one to many (Category - Ledger)
  Category.hasMany(Ledger);
  Ledger.belongsTo(Category, {
    foreignKey: "categoryId",
    as        : "Category"
  });
}