import { AggregateRoot } from "domain/shared/base/AggregateRoot";
import { Ledger } from "./ledger";
import { CategoryId } from "./categoryId";
import { Entity } from "domain/shared/base/Entity";
import { WatchedList } from "domain/shared/base/WacthedList";
import { UniqueEntityID } from "domain/shared/base/UniqueEntityID";
import { Result } from "domain/shared/logic/Result";
import { Guard } from "domain/shared/logic/Guard";


export interface CategoryProps {
  name: string;
  description: string;
  icon: string;
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
  get icon(): string {return this.props.icon;}

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

    if(isIdPresent){
      // # check if ledgers have coresponding category id
      props.ledgers?.newItems().every(ledger => ledger.)

    }

    // # when the category haven't been created, then it can't be use to add data
    if(!isIdPresent && isLedgersPresent) return Result.fail<Category>
      ("can't do this action, the category have to be present in database");
    

  }
}