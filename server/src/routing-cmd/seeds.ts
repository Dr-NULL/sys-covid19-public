import { seedFunctions } from '../seeds';
import { Route } from '../tool/arg';
import { Log } from '../tool/log';
import { BaseOrm } from '../tool/other/base-orm';

export const seeds = new Route();
seeds.main = [
    [ 'seeds', 'sd' ]
];
seeds.desc = 'Insert default values to the DB for testing purposes.';
seeds.callback = async args => {
    Log.ev('Loading seeds...');
    await BaseOrm.connect();

    // Execute functions
    for (const seedFunct of seedFunctions) {
        await seedFunct();
    }

    Log.ok('Seeds loaded successful!');
    await BaseOrm.disconnect();
}
