import { assert } from 'chai';
import { Base } from './base';
import * as asyncFs from './async-fs';
import { randomBytes } from 'crypto';

class Stub extends Base {
    public get parent() {
        return new Stub(this._path);
    }

    public constructor(path: string) {
        super(path);
    }

    public copy(path: string) {
        return Promise.resolve(new Stub(path));
    }

    public move(path: string) {
        return Promise.resolve();
    }
}

describe('Testing "./tool/fsys/core/base"', () => {
    describe('Create instance', () => {
        const path = process.cwd().replace(/\\/gi, '/');
        it('New Instance (current working directory)', () => {
            const base = new Stub('.');
            assert.strictEqual(base.path, path);
        });

        it('New Instance (relative another directory)', () => {
            const base = new Stub('./src');
            assert.strictEqual(base.path, path + '/src');
        });

        it('New Instance (absolute path)', () => {
            const base = new Stub('c:\\test');
            assert.strictEqual(base.path, 'c:/test');
        });
    });

    describe('Test Existence', () => {
        const path = process.cwd().replace(/\\/gi, '/');
        it('Not exist', async () => {
            // Create instance
            const base = new Stub('./test-dir');
            const exist = await base.exists;

            // Check existence
            assert.strictEqual(exist, false);
        });

        it('File', async () => {
            // Create Instance
            const base = new Stub('./test-file.asm');
            await asyncFs.write(base.path, Buffer.from(randomBytes(16)));
            const exist = await base.exists;

            // Check existence
            assert.strictEqual(exist, true);
            await asyncFs.unlink(base.path);
        });

        it('Directory', async () => {
            // Create Instance
            const base = new Stub('./test-dir-002');
            await asyncFs.mkdir(base.path);
            const exist = await base.exists

            // Check existence
            assert.strictEqual(exist, true);
            await asyncFs.rmdir(base.path);
        });
    });

    describe('Test Kill', () => {
        it('Kill File', async () => {
            // Make File
            const base = new Stub('./test-file');
            await asyncFs.write(
                base.path,
                Buffer.from(randomBytes(16))
            );

            await base.delete();
        });
    });

    describe('Test Filename', () => {
        it('In current working directory', async () => {
            const base = new Stub('.');
            assert.strictEqual(base.name, 'server');
        });
        
        it('In absolute path', async () => {
            const base = new Stub('c:/another/folder');
            assert.strictEqual(base.name, 'folder');
        });
        
        it('Empty path', async () => {
            const base = new Stub('  ');
            assert.strictEqual(base.name, 'server');
        });
    });
});
