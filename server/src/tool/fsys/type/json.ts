import { Readable, Writable } from '../core/interface';
import { File, AsyncFs } from '../core';

export class Json<T> extends File implements Readable<T>, Writable<T> {
  async read(encoding?: BufferEncoding) {
    if (!encoding) {
      encoding = 'utf-8';
    }

    const byte = await AsyncFs.read(this._path);
    const text = byte.toString(encoding);
    const data = JSON.parse(text);

    return data as T;
  }

  async write(data: T, encoding?: BufferEncoding) {
    if (!encoding) {
      encoding = 'utf-8';
    }

    const text = JSON.stringify(data, null, '    ');
    const byte = Buffer.from(text, encoding);
    return AsyncFs.write(this._path, byte);
  }
} 
