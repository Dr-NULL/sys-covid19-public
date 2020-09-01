import { Aes, AesData } from './aes';
import { randomBytes, createCipheriv, CipherGCMOptions, CipherCCMOptions } from 'crypto';
import { assert } from 'chai';

describe('Testing "./tool/fsys/type/aes"', () => {
  after(async () => {
    const file = new Aes('./test.aes');
    await file.delete();
  });

  it('Create new Keys "aes-128-ccm"', async function() {
    const file = new Aes('./test.aes');
    const dataIn: AesData = {
      authLength: 16,
      type: 'aes-128-ccm',
      key: randomBytes(16).toJSON().data,
      iv: randomBytes(8).toJSON().data
    };

    await file.write(dataIn);
    const dataOut = await file.read();

    assert.hasAllKeys(dataOut, [
      'authLength',
      'type',
      'key',
      'iv'
    ]);

    assert.strictEqual(dataIn.authLength, dataOut.authLength);
    assert.strictEqual(dataIn.type, dataOut.type);
    assert.strictEqual(dataIn.key.length, dataOut.key.length);
    assert.strictEqual(dataIn.iv.length, dataOut.iv.length);
  });

  it('Create new Keys "aes-192-ccm"', async function() {
    const file = new Aes('./test.aes');
    const dataIn: AesData = {
      authLength: 16,
      type: 'aes-192-ccm',
      key: randomBytes(24).toJSON().data,
      iv: randomBytes(8).toJSON().data
    };

    await file.write(dataIn);
    const dataOut = await file.read();

    assert.hasAllKeys(dataOut, [
      'authLength',
      'type',
      'key',
      'iv'
    ]);

    assert.strictEqual(dataIn.authLength, dataOut.authLength);
    assert.strictEqual(dataIn.type, dataOut.type);
    assert.strictEqual(dataIn.key.length, dataOut.key.length);
    assert.strictEqual(dataIn.iv.length, dataOut.iv.length);
  });

  it('Create new Keys "aes-256-ccm"', async function() {
    const file = new Aes('./test.aes');
    const dataIn: AesData = {
      authLength: 16,
      type: 'aes-256-ccm',
      key: randomBytes(32).toJSON().data,
      iv: randomBytes(8).toJSON().data
    };

    await file.write(dataIn);
    const dataOut = await file.read();

    assert.hasAllKeys(dataOut, [
      'authLength',
      'type',
      'key',
      'iv'
    ]);

    assert.strictEqual(dataIn.authLength, dataOut.authLength);
    assert.strictEqual(dataIn.type, dataOut.type);
    assert.strictEqual(dataIn.key.length, dataOut.key.length);
    assert.strictEqual(dataIn.iv.length, dataOut.iv.length);
  });

  it('Create new Keys "aes-128-gcm"', async function() {
    const file = new Aes('./test.aes');
    const dataIn: AesData = {
      authLength: 16,
      type: 'aes-128-gcm',
      key: randomBytes(16).toJSON().data,
      iv: randomBytes(8).toJSON().data
    };

    await file.write(dataIn);
    const dataOut = await file.read();

    assert.hasAllKeys(dataOut, [
      'authLength',
      'type',
      'key',
      'iv'
    ]);

    assert.strictEqual(dataIn.authLength, dataOut.authLength);
    assert.strictEqual(dataIn.type, dataOut.type);
    assert.strictEqual(dataIn.key.length, dataOut.key.length);
    assert.strictEqual(dataIn.iv.length, dataOut.iv.length);
  });

  it('Create new Keys "aes-192-gcm"', async function() {
    const file = new Aes('./test.aes');
    const dataIn: AesData = {
      authLength: 16,
      type: 'aes-192-gcm',
      key: randomBytes(24).toJSON().data,
      iv: randomBytes(8).toJSON().data
    };

    await file.write(dataIn);
    const dataOut = await file.read();

    assert.hasAllKeys(dataOut, [
      'authLength',
      'type',
      'key',
      'iv'
    ]);

    assert.strictEqual(dataIn.authLength, dataOut.authLength);
    assert.strictEqual(dataIn.type, dataOut.type);
    assert.strictEqual(dataIn.key.length, dataOut.key.length);
    assert.strictEqual(dataIn.iv.length, dataOut.iv.length);
  });

  it('Create new Keys "aes-256-gcm"', async function() {
    const file = new Aes('./test.aes');
    const dataIn: AesData = {
      authLength: 16,
      type: 'aes-256-gcm',
      key: randomBytes(32).toJSON().data,
      iv: randomBytes(8).toJSON().data
    };

    await file.write(dataIn);
    const dataOut = await file.read();

    assert.hasAllKeys(dataOut, [
      'authLength',
      'type',
      'key',
      'iv'
    ]);

    assert.strictEqual(dataIn.authLength, dataOut.authLength);
    assert.strictEqual(dataIn.type, dataOut.type);
    assert.strictEqual(dataIn.key.length, dataOut.key.length);
    assert.strictEqual(dataIn.iv.length, dataOut.iv.length);
  });
});