
import { UniqueEntityID } from "../base/UniqueEntityID";

export interface IDomainEvent {
  dateTimeOccurred: Date;
  getAggregateId (): UniqueEntityID;
}

