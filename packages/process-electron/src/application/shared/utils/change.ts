import { Result } from "domain/shared/logic/Result";

// Use cases that need changes can implement this
export interface WithChanges {
  changes: Changes;
}

// Extracted into its own class
export class Changes {
  private changes: Result<any>[];

  constructor () {
    this.changes = [];
  }

  public addChange (result: Result<any>) : void {
    this.changes.push(result);
  }

  public getCombinedChangesResult (): Result<any> {
    return Result.combine(this.changes);
  }
}