import { AggregateRoot } from "domain/shared/base/AggregateRoot";
import { Ledger } from "./ledger";
import { CategoryId } from "./categoryId";
import { Entity } from "domain/shared/base/Entity";
import { WatchedList } from "domain/shared/base/WacthedList";
import { UniqueEntityID } from "domain/shared/base/UniqueEntityID";
import { Result } from "domain/shared/logic/Result";
import { Guard } from "domain/shared/logic/Guard";
import { CategoryFile } from "./categoryFile";


export interface CategoryProps {
  name: string;
  description: string;
  icon: CategoryFile;
  ledgers? : WatchedList<Ledger>;
};

export class Category extends Entity<CategoryProps> {
  get categoryId() : CategoryId {return CategoryId.create(this._id);}

  get name(): string {return this.props.name;}

  get description(): string {return this.props.description;}

  /**
   * @description
   * the icon path? i don't know, it maybe will be file object or just its path.
   * for now i'll stick with the path
   */
  get icon(): CategoryFile {return this.props.icon;}

  get ledgers(): Ledger[] {return this.props.ledgers?.currentItems() ?? []}

  public addLedger(ledger: Ledger): void {

    // # Note, how to make sure its performance is ideal?
    // # i mean maybe there are hundred of ledger rows, it will be slow to query those rows.
    // # just for my understanding, i will let it be.

    // # update: just use some recent data, let usecase / repo that handle it
    this.props.ledgers?.addItems(ledger);
  }

  private constructor (props: CategoryProps, id?: UniqueEntityID){
    super(props,id);
  }

  public static create(props: CategoryProps, id?: UniqueEntityID): Result<Category>{
    const propsResult = Guard.againstNullOrUndefinedBulk([
      {argument: props.description, argumentName: "description"},
      {argument: props.name, argumentName: "name"},
      {argument: props.icon, argumentName: "icon"},
    ])

    if(!propsResult.succeeded) return Result.fail<Category>(propsResult.message);

    // because the ledgers already watched, it alright if directly create the entity.
    // but remember, check the category id with Ledger category id.
    let isIdPresent = Guard.againstNullOrUndefined(id, "category id");
    let isLedgersPresent = Guard.againstNullOrUndefined(props.ledgers, "ledgers data");

    /** # when the data from database */
    if(isIdPresent){
      // # to get the genre association from db, you can use the mapper for category
      // # so every genre that retrieved, then create the ledger object.

      // # check if ledgers have coresponding category id
      const matchCategoryId = props.ledgers?.newItems().every(ledger => ledger.category._id === id)
      if(!matchCategoryId) return Result.fail<Category>("ledger(s) category id didn't match");

      // don't worry about the id, if it undefined then it will builded
      return Result.ok<Category>( new Category({...props}, id)); 

    }

    /** # when the object newly created */
    // # when the category haven't been created, then it can't be used to hold ledger
    if(isLedgersPresent) return Result.fail<Category>
      ("can't do this action, the category have to be present in the database");

    return Result.ok<Category>(new Category({...props}, id))
  }
}