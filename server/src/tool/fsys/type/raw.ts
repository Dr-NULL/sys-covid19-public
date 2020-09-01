import { File, AsyncFs } from '../core';
import { Readable, Writable } from '../core/interface';
import { WriteFileOptions } from 'fs';

export class Raw extends File implements Readable<Buffer>, Writable<Buffer> {
  public constructor(path: string) {
    super(path);
  }

  read(): Promise<Buffer> {
    return AsyncFs.read(this._path);
  }

  write(data: Buffer, options?: WriteFileOptions) {
    return AsyncFs.write(this._path, data, options);
  }
}
