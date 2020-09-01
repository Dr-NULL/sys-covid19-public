import { AppConfig, OrmConfig } from '../tool/config';
import { AesCrypto } from '../tool/aes-crypto';
export const appConfig = new AppConfig();
export const ormConfig = new OrmConfig();
export const aesCrypto = new AesCrypto();

import { listen } from './listen';
import { readJson } from './read-json';
import { connectDb } from './connect-db';
import { Interface } from '../tool/server';
import { bindHelper } from './bind-helper';
import { loadConfig } from './load-config';
import { mountStatic } from './mount-static';
import { mountEndpoints } from './mount-endpoints';
import { settingSessions } from './setting-sessions';

/**
 * This is the deployment array. This object contains an orderer async functions. 
 * Every function makes a specific change to an Express instance created above. 
 * The order of the items is __VERY IMPORTANT__, so be careful with the position of 
 * every function allocated in this array. The mechanism is this:
 * - The folder `'./routing-cmd'` has a route that deploy the API-Rest.
 * - That route makes an Express App instance.
 * - Then iterates this array, passing to every item the Express instance created above.
 */
export const deployment: Interface.Action[] = [
    loadConfig,
    connectDb,
    readJson,
    mountStatic,
    bindHelper,
    settingSessions,
    mountEndpoints,
    listen
];
