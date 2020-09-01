import { AesCrypto } from '.';
import { assert } from 'chai';

describe('Testing "./tool/aes-crypto"', () => {
  describe('Test key generation/usage', () => {
    it('En/Decrypt in "aes-128-gcm"', async () => {
      const aes = new AesCrypto('./keys.aes');
      aes.randomKeys('aes-128-gcm');
      await aes.save();
      assert.isTrue(await aes.exists);
  
      const raw = 'hello world';
      const enc = aes.encrypt(raw);
      const dec = aes.decrypt(enc);
  
      assert.strictEqual(raw, dec);
      await aes.delete();
    });
    
    it('En/Decrypt in "aes-128-ccm"', async () => {
      const aes = new AesCrypto('./keys.aes');
      aes.randomKeys('aes-128-ccm');
      await aes.save();
      assert.isTrue(await aes.exists);
  
      const raw = 'hello world';
      const enc = aes.encrypt(raw);
      const dec = aes.decrypt(enc);
  
      assert.strictEqual(raw, dec);
      await aes.delete();
    });

    it('En/Decrypt in "aes-192-gcm"', async () => {
      const aes = new AesCrypto('./keys.aes');
      aes.randomKeys('aes-192-gcm');
      await aes.save();
      assert.isTrue(await aes.exists);
  
      const raw = 'hello world';
      const enc = aes.encrypt(raw);
      const dec = aes.decrypt(enc);
  
      assert.strictEqual(raw, dec);
      await aes.delete();
    });
    
    it('En/Decrypt in "aes-192-ccm"', async () => {
      const aes = new AesCrypto('./keys.aes');
      aes.randomKeys('aes-192-ccm');
      await aes.save();
      assert.isTrue(await aes.exists);
  
      const raw = 'hello world';
      const enc = aes.encrypt(raw);
      const dec = aes.decrypt(enc);
  
      assert.strictEqual(raw, dec);
      await aes.delete();
    });
  
    it('En/Decrypt in "aes-256-gcm"', async () => {
      const aes = new AesCrypto('./keys.aes');
      aes.randomKeys('aes-256-gcm');
      await aes.save();
      assert.isTrue(await aes.exists);
  
      const raw = 'hello world';
      const enc = aes.encrypt(raw);
      const dec = aes.decrypt(enc);
  
      assert.strictEqual(raw, dec);
      await aes.delete();
    });
    
    it('En/Decrypt in "aes-256-ccm"', async () => {
      const aes = new AesCrypto('./keys.aes');
      aes.randomKeys('aes-256-ccm');
      await aes.save();
      assert.isTrue(await aes.exists);
  
      const raw = 'hello world';
      const enc = aes.encrypt(raw);
      const dec = aes.decrypt(enc);
  
      assert.strictEqual(raw, dec);
      await aes.delete();
    });
    
    it('En/Decrypt in "chacha20-poly1305"', async () => {
      const aes = new AesCrypto('./keys.aes');
      aes.randomKeys('chacha20-poly1305');
      await aes.save();
      assert.isTrue(await aes.exists);
  
      const raw = 'hello world';
      const enc = aes.encrypt(raw);
      const dec = aes.decrypt(enc);
  
      assert.strictEqual(raw, dec);
      await aes.delete();
    });
  });

  describe('Massive En/decryptions "aes-128-gcm":', () => {
    it('Test "hello world"', async function() {
      const aes = new AesCrypto('./keys.aes');
      aes.randomKeys('aes-128-gcm');

      const raw = 'hello world';
      const enc = aes.encrypt(raw);
      const dec = aes.decrypt(enc);
      assert.strictEqual(raw, dec);
    });

    it('Test "perreoijoeputa!"', async function() {
      const aes = new AesCrypto('./keys.aes');
      aes.randomKeys('aes-128-gcm');

      const raw = 'perreoijoeputa!';
      const enc = aes.encrypt(raw);
      const dec = aes.decrypt(enc);
      assert.strictEqual(raw, dec);
    });

    it('Test "↑←¶∆∆∆∆√√♪||`~"', async function() {
      const aes = new AesCrypto('./keys.aes');
      aes.randomKeys('aes-128-gcm');

      const raw = '↑←¶∆∆∆∆√√♪||`~';
      const enc = aes.encrypt(raw);
      const dec = aes.decrypt(enc);
      assert.strictEqual(raw, dec);
    });

    it('Test "₱€n€"', async function() {
      const aes = new AesCrypto('./keys.aes');
      aes.randomKeys('aes-128-gcm');

      const raw = '₱€n€';
      const enc = aes.encrypt(raw);
      const dec = aes.decrypt(enc);
      assert.strictEqual(raw, dec);
    });

    it('Test "平沢進 - 変弦自在"', async function() {
      const aes = new AesCrypto('./keys.aes');
      aes.randomKeys('aes-128-gcm');

      const raw = '平沢進 - 変弦自在';
      const enc = aes.encrypt(raw);
      const dec = aes.decrypt(enc);
      assert.strictEqual(raw, dec);
    });

    it('Test "꧂†††꧂"', async function() {
      const aes = new AesCrypto('./keys.aes');
      aes.randomKeys('aes-128-gcm');

      const raw = '꧂†††꧂';
      const enc = aes.encrypt(raw);
      const dec = aes.decrypt(enc);
      assert.strictEqual(raw, dec);
    });
  });

  describe('Massive En/decryptions "aes-128-ccm":', () => {
    it('Test "hello world"', async function() {
      const aes = new AesCrypto('./keys.aes');
      aes.randomKeys('aes-128-ccm');

      const raw = 'hello world';
      const enc = aes.encrypt(raw);
      const dec = aes.decrypt(enc);
      assert.strictEqual(raw, dec);
    });

    it('Test "perreoijoeputa!"', async function() {
      const aes = new AesCrypto('./keys.aes');
      aes.randomKeys('aes-128-ccm');

      const raw = 'perreoijoeputa!';
      const enc = aes.encrypt(raw);
      const dec = aes.decrypt(enc);
      assert.strictEqual(raw, dec);
    });

    it('Test "↑←¶∆∆∆∆√√♪||`~"', async function() {
      const aes = new AesCrypto('./keys.aes');
      aes.randomKeys('aes-128-ccm');

      const raw = '↑←¶∆∆∆∆√√♪||`~';
      const enc = aes.encrypt(raw);
      const dec = aes.decrypt(enc);
      assert.strictEqual(raw, dec);
    });

    it('Test "₱€n€"', async function() {
      const aes = new AesCrypto('./keys.aes');
      aes.randomKeys('aes-128-ccm');

      const raw = '₱€n€';
      const enc = aes.encrypt(raw);
      const dec = aes.decrypt(enc);
      assert.strictEqual(raw, dec);
    });

    it('Test "平沢進 - 変弦自在"', async function() {
      const aes = new AesCrypto('./keys.aes');
      aes.randomKeys('aes-128-ccm');

      const raw = '平沢進 - 変弦自在';
      const enc = aes.encrypt(raw);
      const dec = aes.decrypt(enc);
      assert.strictEqual(raw, dec);
    });

    it('Test "꧂†††꧂"', async function() {
      const aes = new AesCrypto('./keys.aes');
      aes.randomKeys('aes-128-ccm');

      const raw = '꧂†††꧂';
      const enc = aes.encrypt(raw);
      const dec = aes.decrypt(enc);
      assert.strictEqual(raw, dec);
    });
  });
});
