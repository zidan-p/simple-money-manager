
import { Entity } from "./Entity";
import { IDomainEvent } from "./../event/IDomainEvent";
import { DomainEvents } from "../event/DomainEvents";
import { UniqueEntityID } from "./UniqueEntityID";

/**
 * @description the aggregate class that associate between entity
 * it also where the base entity is extended.
 * if you want to access the main properties from entity you can use
 * `props` properties from `Entity` parent;
 * 
 * @example
 * ```ts
 * interface LedgerProps = {amount:number}
 * class Ledger extends AggregateRoot<LedgerProps>{ 
 *  // here your code or getter and setter
 *  get amount(): number{
 *    return this.props.amount; // this props is from Entity class
 *  }
 * }
 * ```
 */
export abstract class AggregateRoot<T> extends Entity<T> {
  private _domainEvents: IDomainEvent[] = [];

  /**
   * @description
   * it's just wrapper id for aggregate root.
   * maybe it purpose is to make aggregation easier
   */
  get id (): UniqueEntityID {
    return this._id;
  }

  get domainEvents(): IDomainEvent[] {
    return this._domainEvents;
  }

  protected addDomainEvent (domainEvent: IDomainEvent): void {
    // Add the domain event to this aggregate's list of domain events
    this._domainEvents.push(domainEvent);
    // Add this aggregate instance to the domain event's list of aggregates who's
    // events it eventually needs to dispatch.
    DomainEvents.markAggregateForDispatch(this);
    // Log the domain event
    this.logDomainEventAdded(domainEvent);
  }

  public clearEvents (): void {
    this._domainEvents.splice(0, this._domainEvents.length);
  }

  private logDomainEventAdded (domainEvent: IDomainEvent): void {
    //mbrrr, i really doesn't know anything about this
    //just copy file repo from good article
    const thisClass = Reflect.getPrototypeOf(this)!;
    const domainEventClass = Reflect.getPrototypeOf(domainEvent)!;
    console.info(`[Domain Event Created]:`, thisClass.constructor.name, '==>', domainEventClass.constructor.name)
  }
}