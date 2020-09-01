import { assert } from 'chai';
import { Raw } from './raw';

describe('Testing "./tool/fsys/type/raw"', () => {
  it('Read "./package.json"', async function() {
    const file = new Raw('./package.json');
    const byte = await file.read();
    const text = byte.toString('utf-8');
    const data = JSON.parse(text);

    assert.containsAllKeys(
      data,
      [
        'name',
        'version',
        'devDependencies'
      ]
    );
  });

  it('Write "./lol.json"', async function() {
    const data = { text: 'jajaja', value: 666 };
    const text = JSON.stringify(data, null, '    ');
    const byte = Buffer.from(text, 'utf-8');

    const file = new Raw('./lol.json');
    await file.write(byte);
  });

  it('Copy "./lol.json" to "./lol-copy.json"', async function() {
    // Copy file
    const file = new Raw('./lol.json');
    const copy = await file.copy('./lol-copy.json');

    // Read file
    const byte = await copy.read();
    const text = byte.toString('utf-8');
    const data = JSON.parse(text);
    
    assert.hasAllKeys(data, [ 'text', 'value' ]);
  });

  it('Drop "./lol.json" and "./lol-copy.json"', async function() {
    const file = new Raw('./lol.json');
    const copy = new Raw('./lol-copy.json');
    
    await file.delete();
    await copy.delete();
  });
});