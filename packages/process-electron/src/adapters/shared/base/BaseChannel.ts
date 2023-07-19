

export abstract class BaseChannel {

  protected abstract executeImpl (): Promise<void | any>;

  public execute (): void {
    this.req = req;
    this.res = res;

    this.executeImpl();
  }
}