import { AggregateRoot } from "domain/shared/base/AggregateRoot";
import { LedgerId } from "./ledgerId";
import { Category } from "./category";
import { UniqueEntityID } from "domain/shared/base/UniqueEntityID";
import { Result } from "domain/shared/logic/Result";
import { Guard } from "domain/shared/logic/Guard";
import { CategoryId } from "./categoryId";




export interface LedgerProps { 
  amount: number;
  type: "income" | "expense";
  description: string;
  // categoryId: CategoryId;
  category: Category;
  date?: Date; // <--
  // if it doesn't exist it will provided for newly ledger
  // UPDATE : i let date to be required, because it always present in object
  // even tough it doesn't provided in create 

  // UPDATE#2 : i just use conditional, it will broke my app if i don't do that :)
}

export class Ledger extends AggregateRoot<LedgerProps>{
 
  get ledgerId() : LedgerId { return LedgerId.create(this._id);}

  get amount() : number {return this.props.amount;}

  get type():"income" | "expense" { return this.props.type;}

  get description() : string { return this.props.description;}

  // get categoryId() : CategoryId { return this.props.categoryId;}
  get category() : Category {return this.props.category}

  /** date always present in object, it will provided by `create` method if absent */
  get date() : Date {return this.props.date!}

  // updater 
  public updateAmount(amount: number): Result<void>{
    try {
      this.props.amount = amount;
      return Result.ok<void>();
    } catch (error) {
      return Result.fail<void>("can't update amount for ledger with id = " + this._id);
    }
  }

  public updateType(type: "income" | "expense"): Result<void>{
    try {
      this.props.type = type;
      return Result.ok<void>();
    } catch (error) {
      return Result.fail<void>("can't update type for ledger with id = " + this._id);
    }
  }

  public updateDescription(description: string): Result<void>{
    try {
      this.props.description = description;
      return Result.ok<void>();
    } catch (error) {
      return Result.fail<void>("can't update description for ledger with id = " + this._id);
    }
  }

  public updateCategory(category: Category): Result<void>{
    try {
      this.props.category = category;
      return Result.ok<void>();
    } catch (error) {
      return Result.fail<void>("can't update category for ledger with id = " + this._id);
    }
  }

  public updateDate(date: Date): Result<void>{
    try {
      this.props.date = date;
      return Result.ok<void>();
    } catch (error) {
      return Result.fail<void>("can't update date for ledger with id = " + this._id);
    }
  }

  // some mutating state
  public changeToIcome(): void {this.props.type = "income"}
  public changeToExpense(): void {this.props.type = "expense"}

  private constructor (props: LedgerProps, id?: UniqueEntityID){
    super(props,id);
  }

  public static create (props: LedgerProps, id?: UniqueEntityID) :Result<Ledger>{
    const propsResult = Guard.againstNullOrUndefinedBulk([
      {argument: props.amount, argumentName: "amount"},
      {argument: props.type, argumentName: "type"},
      {argument: props.description, argumentName: "description"},
      {argument: props.category, argumentName: "category"}
      // {argument: props.categoryId, argumentName: "category Id"}
    ])

    if(!propsResult.succeeded) return Result.fail<Ledger>(propsResult.message);

    const ledger = new Ledger({
      ...props,
      date: props.date ? props.date : new Date() 
    }, id)

    const isNewlyCreated = !!id === false;

    if(isNewlyCreated){
      // make event for newly created ledger.
      // it will be listened by statistic
    }

    return Result.ok<Ledger>(ledger);
  }
}


