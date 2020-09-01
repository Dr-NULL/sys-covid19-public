import { AppConfig } from '.';
import { assert } from 'chai';

describe('Testing "./tool/config/app-config"', () => {
    it('Create new File', async () => {
        const config = new AppConfig('./appconfig-test.json');
        assert.isNotTrue(await config.exists);
        
        await config.save();
        assert.isTrue(await config.exists);
    });

    it('Load current configuration', async () => {
        const config = new AppConfig('./appconfig-test.json');
        assert.isTrue(await config.exists);
        
        await config.load();
        assert.containsAllKeys(
            config.data,
            [ 'folder', 'server', 'session' ]
        );
    });

    it('Modify current configuration', async () => {
        const config = new AppConfig('./appconfig-test.json');
        assert.isTrue(await config.exists);
        
        await config.load();
        config.data.server.apiPrefix = 'gegege';
        await config.save();
    });

    it('Load current configuration again', async () => {
        const config = new AppConfig('./appconfig-test.json');
        assert.isTrue(await config.exists);
        
        await config.load();
        assert.strictEqual(
            config.data.server.apiPrefix,
            'gegege'
        );
    });

    it('Delete the current configuration file', async () => {
        const config = new AppConfig('./appconfig-test.json');
        assert.isTrue(await config.exists);

        await config.delete();
        assert.isNotTrue(await config.exists);
    });
});
