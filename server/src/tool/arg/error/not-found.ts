import { Arg } from '..';

export class NotFound extends Error {
  public readonly name = 'not-found';
  public readonly raw: string;

  public constructor() {
    super();
    const arg = new Arg();
    this.raw = arg.main
      .reduce((prev, curr) => `${prev} ${curr}`, '')
      .trim()

    super.message = `Command not found "${this.raw}".`
  }
}