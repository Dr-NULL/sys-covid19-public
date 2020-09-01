import { appConfig, ormConfig, aesCrypto } from '../api-rest';
import { Route } from '../tool/arg';
import { Log } from '../tool/log';

export const setup = new Route();
setup.main = [
    [ 'setup', 'stp' ]
];
setup.desc = 'Creates the files needed to configure the behavior of the webservice.';
setup.callback = async args => {
    if (!await appConfig.exists) {
        Log.ev('Creating "appconfig.json"...');
        await appConfig.save();
    }

    if (!await ormConfig.exists) {
        Log.ev('Creating "ormconfig.json"...');
        await ormConfig.save();
    }

    if (!await aesCrypto.exists) {
        Log.ev('Creating "secret.aes"...');
        aesCrypto.randomKeys('aes-256-gcm');
        await aesCrypto.save();
    }

    Log.ok(
            'Done, now before the deploy the applicacion, you must configure the files '
        +   '"*config.json" created in this folder.'
    );
};
