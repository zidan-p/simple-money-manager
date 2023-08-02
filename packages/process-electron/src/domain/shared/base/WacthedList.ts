import { Entity } from "./Entity";


export type WatchedListDto<TDto> = {
  currentItems?  : TDto[] | [],
  removedItems?  : TDto[] | [],
  addedItems?    : TDto[] | []
}


export type WatchedListProps<T> = {
  currentItems?  : T[] | [],
  removedItems?  : T[] | [],
  addedItems?    : T[] | []
}

/**
 * @description
 * an utility class to watch a current list, 
 * and make sure all the list items are unique.
 * 
 * the type parameter is at least an entity object.
 * i can't think about another ts feature tu extract the props
 */
export class WatchedList<L extends Entity<any>> {
  private _list: L[] = [];
  private _newList: L[] = [];
  private _removedList: L[] = [];
  constructor(list: L[]){

  }

  /**
   * this return doesn't represent all associated data.
   * maybe only some of the recent data.
   * 
   * NOTE: 
   * maybe next time i will use lazy loading to get all or some data.
   * but because it can be complicated when querying many object,
   * i let the use case that handle it.
   * 
   */
  currentItems(): L[]{
    return this._list;
  }

  /**
   * new list that recently added with addItems
   */
  newItems(): L[]{
    return this._newList;
  }

  /**
   * removed list, it can be from usecase operation
   */
  removedItems(): L[]{
    return this._removedList;
  }



  /**
   * when item is already inside then don't need to add
   */
  addNewItems(item: L){
    const alreadyAdded = this._newList.find(l => l.equals(item))
    if (!alreadyAdded) this._newList.push(item);
  }

  removeNewItems(item: L){
    const removedList = this._newList.filter(l => !l.equals(item))
    this._newList = removedList;
  }

  /**
   * when item is already inside then don't need to add
   */
  addRemovedItems(item: L){
    const alreadyAdded = this._removedList.find(l => l.equals(item))
    if (!alreadyAdded) this._removedList.push(item);
  }

  removeRemovedItems(item: L){
    const removedList = this._removedList.filter(l => !l.equals(item))
    this._removedList = removedList;
  }
}