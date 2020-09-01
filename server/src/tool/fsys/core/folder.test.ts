import { assert } from 'chai';
import { Folder } from './folder';

describe('Testing "./tool/fsys/core/folder"', () => {
    it('New Instance', async () => {
        const folder = new Folder('.');
    });

    it('List children (cwd)', async function() {
        const folder = new Folder('.');
        const data = await folder.children;
        assert.exists(data.find(x => x.path.endsWith('node_modules')))
    });

    it('List children (c:/)', async function() {
        const folder = new Folder('c:');
        const data = await folder.children;
        assert.exists(data.find(x => x.path.endsWith('Windows')))
    });
});