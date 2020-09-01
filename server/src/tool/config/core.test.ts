import { Core } from './core';
import { assert } from 'chai';

interface Data {
    text: string;
    value: number;
}

class Stub extends Core<Data> {
    public constructor(path: string, init: Data) {
        super(path, init);
    }
}

describe('Testing "./tool/config/core"', () => {
    const init: Data = {
        text: 'gegege',
        value: 666
    };

    it('Create new File', async () => {
        const config = new Stub('./stubconfig.json', init);
        assert.isNotTrue(await config.exists);

        await config.save();
        assert.isTrue(await config.exists);
    });

    it('Read file content', async () => {
        const config = new Stub('./stubconfig.json', init);
        await config.load();

        assert.isObject(config.data);
        assert.hasAllKeys(config.data, [ 'text', 'value' ]);
        assert.strictEqual(
            config.data.text,
            'gegege'
        );
        assert.strictEqual(
            config.data.value,
            666
        );
    });

    it('Modify configuration', async () => {
        const config = new Stub('./stubconfig.json', init);
        config.data = {
            text: 'ayyy',
            value: 999
        };

        await config.save();
    })

    it('Read file content again', async () => {
        const config = new Stub('./stubconfig.json', init);
        await config.load();

        assert.isObject(config.data);
        assert.hasAllKeys(config.data, [ 'text', 'value' ]);
        assert.strictEqual(
            config.data.text,
            'ayyy'
        );
        assert.strictEqual(
            config.data.value,
            999
        );
    });

    it('Delete the current file', async () => {
        const config = new Stub('./stubconfig.json', init);
        assert.isTrue(await config.exists);

        await config.delete();
        assert.isNotTrue(await config.exists);
    });
});