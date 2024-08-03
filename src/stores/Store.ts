/*
 * Abstract class used to define in-memory stores
 */
class Store<T> {
  private data: T;

  public constructor(data: T) {
    this.data = data;
  }

  public getData(): T {
    return this.data;
  }

  public setData(newData: T): void {
    this.data = newData;
  }
}

export default Store;
