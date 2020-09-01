import { randomBytes, CipherCCMTypes, CipherGCMTypes } from 'crypto';
import { Readable, Writable } from '../core/interface';
import { File, AsyncFs } from '../core';

export interface AesData {
  authLength: number;
  /**
   * The type of encryption do you want to use.
   */
  type: CipherCCMTypes | CipherGCMTypes;
  /**
   * The key used to encrypt/decrypt.
   */
  key: number[];
  /**
   * The iv used to encrypt/decrypt (length = 8).
   */
  iv: number[];
}

export class Aes extends File implements Readable<AesData>, Writable<AesData> {
  async read(): Promise<AesData> {
    const byte = await AsyncFs.read(this._path);
    const data = byte.toJSON().data;

    // Get keys
    const lengths = data.splice(0, 3);
    const key = data.splice(0, lengths[0]);
    const iv = data.splice(0, lengths[1]);

    // Get type
    const type = Buffer
      .from(data)
      .toString('utf-8') as 
      CipherCCMTypes | CipherGCMTypes;

    // Data
    return {
      authLength: lengths[2],
      type,
      key,
      iv
    };
  }

  async write(data: AesData) {
    const lengths = Buffer.from([ data.key.length, data.iv.length, data.authLength ]);
    const type = Buffer.from(data.type, 'utf-8');
    const key = Buffer.from(data.key);
    const iv = Buffer.from(data.iv);

    const byte = Buffer.concat([ lengths, key, iv, type ]);
    return AsyncFs.write(this._path, byte);
  }
}