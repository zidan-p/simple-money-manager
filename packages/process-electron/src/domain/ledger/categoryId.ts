import { Entity } from "domain/shared/base/Entity";
import { UniqueEntityID } from "domain/shared/base/UniqueEntityID";


export class CategoryId extends Entity<any> {

  get id (): UniqueEntityID {
    return this._id;
  }

  private constructor (id?: UniqueEntityID) {
    super(null, id)
  }

  public static create (id?: UniqueEntityID): CategoryId {
    return new CategoryId(id);
  }
}