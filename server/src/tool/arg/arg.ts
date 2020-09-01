import { Data } from './data';
import { getArgs } from './util/get-args';
import { getMain } from './util/get-main';
import { getData } from './util/get-data';

export class Arg {
  private _main: string[];
  public get main(): string[] {
    return this._main;
  }

  private _data: Data = {};
  public get data(): Data {
    return this._data;
  }

  public constructor(argv?: string[]) {
    const args = getArgs(argv)
    this._main = getMain(args)
    this._data = getData(args)
  }

  /**
   * Return a boolean with the equivalent value of the key given.
   * @param key Key to check.
   */
  public bool(key: string) {
    // Doesn't exists
    if (!this._data[key]) {
      return false
    }

    // Check array
    const arr = this._data[key]
    if (arr.length === 0) {
      return true
    } else if (arr.length > 1) {
      return true
    } else if (arr[0].toLowerCase().trim() === 'true') {
      return true
    } else if (arr[0].toLowerCase().trim() === 'false') {
      return false
    } else {
      return true
    }
  }

  /**
   * Search the values of all keys given in a unique array.
   * @param keys Keys to check.
   */
  public paramValues(...keys: string[]) {
    const val: string[] = []
    for (const key of keys) {
      if (this.bool(key)) {
        val.push(...this.data[key])
      }
    }
    return val
  }
}