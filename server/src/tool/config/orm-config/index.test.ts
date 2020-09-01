import { OrmConfig } from '.';
import { assert } from 'chai';

describe('Testing "./tool/config/orm-config"', () => {
    it('Create new File', async () => {
        const config = new OrmConfig('./ormconfig-test.json');
        assert.isNotTrue(await config.exists);
        
        await config.save();
        assert.isTrue(await config.exists);
    });

    it('Load current configuration', async () => {
        const config = new OrmConfig('./ormconfig-test.json');
        assert.isTrue(await config.exists);
        
        await config.load();
        assert.isArray(config.data);

        // Check all
        for (const item of config.data) {
            assert.isObject(item);
            assert.containsAllKeys(
                item,
                [
                    'host', 'username',
                    'password', 'database'
                ]
            )
        }
    });

    it('Modify current configuration', async () => {
        const config = new OrmConfig('./ormconfig-test.json');
        assert.isTrue(await config.exists);
        
        await config.load();
        config.data[0].database = 'gegege';
        await config.save();
    });

    it('Load current configuration again', async () => {
        const config = new OrmConfig('./ormconfig-test.json');
        assert.isTrue(await config.exists);
        
        await config.load();
        assert.strictEqual(
            config.data[0].database,
            'gegege'
        );
    });

    it('Delete the current configuration file', async () => {
        const config = new OrmConfig('./ormconfig-test.json');
        assert.isTrue(await config.exists);

        await config.delete();
        assert.isNotTrue(await config.exists);
    });
});
