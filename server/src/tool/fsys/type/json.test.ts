import { assert } from 'chai';
import { Json } from './json';

interface FileTest {
  text: string;
  value: number;
}

describe('Testing "./tool/fsys/type/json"', () => {
  it('Read "./package.json"', async function() {
    const file = new Json('./package.json');
    const data = await file.read();

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
    const file = new Json<FileTest>('./lol.json');
    await file.write({ text: 'jajaja', value: 666 });
  });

  it('Copy "./lol.json" to "./lol-copy.json"', async function() {
    // Copy file
    const file = new Json<FileTest>('./lol.json');
    const copy = await file.copy('./lol-copy.json');

    // Read file
    const data = await copy.read();
    assert.hasAllKeys(data, [ 'text', 'value' ]);
  });

  it('Drop "./lol.json" and "./lol-copy.json"', async function() {
    const file = new Json('./lol.json');
    const copy = new Json('./lol-copy.json');
    
    await file.delete();
    await copy.delete();
  });
});