import { CipherGCMTypes, CipherCCMTypes, randomBytes, createCipheriv, CipherCCMOptions, CipherGCMOptions } from 'crypto';
import { DataEmptyError, InvalidCipherError } from './error';
import { Type } from '../fsys';

export class AesCrypto {
  private _file: Type.Aes;
  private _data: Type.AesData;

  /**
   * Get if the current AES Keys file exists.
   */
  public get exists() {
    return this._file.exists;
  }
  
  /**
   * Create a new instance that create/load AES keys, and encrypt/decrypt data.
   * @param path The path where the file will be allocated.
   */
  public constructor(path?: string) {
    if (!path) {
      path = './secret.aes';
    }

    this._file = new Type.Aes(path);
  }

  /**
   * Creates new AES random keys, and storages it in memory.
   * @param type Cipher algorithm to you want ot use.
   */
  public randomKeys(type: CipherGCMTypes | CipherCCMTypes) {
    let length = 32;
    try {
      if (type.match(/^aes/gi)) {
        // AES Length
        const reso = parseInt(type.match(/[0-9]+/)[0], 10);
        length = reso / 8;
      }
    } catch (err) {
      throw new InvalidCipherError();
    }

    this._data = {
      key: randomBytes(length).toJSON().data,
      iv: randomBytes(8).toJSON().data,
      authLength: 16,
      type
    };
  }

  /**
   * Save the AES generated keys into a file.
   */
  public save() {
    if (!this._data) {
      throw new DataEmptyError();
    }

    return this._file.write(this._data);
  }

  /**
   * Load the AES Keys from the file given at the constructor.
   */
  public async load() {
    this._data = await this._file.read();
  }

  /**
   * Delete the file with the current AES Keys, and delete the data allocated in memory.
   */
  public delete() {
    this._data = undefined;
    return this._file.delete();
  }

  /**
   * Encrypt the given text using the inner AES keys.
   * @param text The text do you want to encrypt.
   */
  public encrypt(text: string) {
    // Check keys
    if (!this._data) {
      throw new DataEmptyError();
    }

    // Make cipher
    const cipher = createCipheriv(
      this._data.type,
      Buffer.from(this._data.key),
      Buffer.from(this._data.iv),
      {
        authTagLength: this._data.authLength
      } as CipherCCMOptions | CipherGCMOptions
    )

    // Encrypt
    const byte = Buffer.concat([
      cipher.update(text, 'utf8'),
      cipher.final()
    ]);
    return byte.toString('hex');
  }

  /**
   * Decrypt the given text using the inner AES keys.
   * @param text The text do you want to decrypt.
   */
  public decrypt(text: string) {
    // Check keys
    if (!this._data) {
      throw new DataEmptyError();
    }

    // Create cipher
    const cipher = createCipheriv(
      this._data.type,
      Buffer.from(this._data.key),
      Buffer.from(this._data.iv),
      {
        authTagLength: this._data.authLength
      } as CipherGCMOptions | CipherCCMOptions
    );
    
    // Decrypt
    const byte = Buffer.concat([
      cipher.update(Buffer.from(text, 'hex')),
      cipher.final()
    ]);

    return byte.toString('utf-8');
  }
}
