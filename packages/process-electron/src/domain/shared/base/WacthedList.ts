import { Entity } from "./Entity";




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
  constructor(list: L[]){this._list = list}

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
   * 
   * new list that recently added with addItems
   */
  newItems(): L[]{
    return this._newList;
  }

  /**
   * when item is already inside then don't need to add
   */
  addItems(item: L){
    const alreadyAdded = this._newList.find(l => l.equals(item))
    if (!alreadyAdded) this._newList.push(item);
  }
}