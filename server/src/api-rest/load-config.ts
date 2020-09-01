import { Interface } from '../tool/server';
import { appConfig, ormConfig, aesCrypto } from '.';

import { createConnections } from 'typeorm';
import Chalk from 'chalk';

/**
 * Load the configuration files, and connect typeorm with its databases.
 * @param app Express instance.
 */
export const loadConfig: Interface.Action = async app => {
    // Check config files
    if (
        (!await appConfig.exists) ||
        (!await ormConfig.exists) ||
        (!await aesCrypto.exists)
    ) {
        throw new Error(
                'Some of configuration files wan\'t found. Please execute the '
            +   `${Chalk.bold.white.bgGrey(' setup ')} command before serving the application.`
        );
    }

    // Load config files
    await appConfig.load();
    await ormConfig.load();
    await aesCrypto.load();
}
