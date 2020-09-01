import { assert } from 'chai';
import { File } from './file';

describe('Testing "./tool/fsys/core/file"', () => {
    it('New Instance', function() {
        const file = new File('./package.json');
        assert.strictEqual(file.name, 'package.json');
    });

    it('Copy file', async function() {
        this.timeout(999999);

        const file = new File('./package.json');
        const copy = await file.copy('./replica.json');

        // Check names
        assert.strictEqual(file.name, 'package.json');
        assert.strictEqual(copy.name, 'replica.json');

        // Check existence
        assert.strictEqual(await file.exists, true);
        assert.strictEqual(await copy.exists, true);

        // Clear
        await copy.delete();
    });

    it('Check Parent', function() {
        const file = new File('./package.json');
        const fold = file.parent;
        assert.strictEqual(fold.name, 'server');
    });
});