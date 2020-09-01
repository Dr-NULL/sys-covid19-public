import { Interface } from '../tool/server';
import { Log } from '../tool/log';
import { BaseOrm } from '../tool/other/base-orm';

export const connectDb: Interface.Action = app => {
    return new Promise(resolve => {
        const connect = async () => {
            try {
                await BaseOrm.connect();
                Log.ok('Connection to DBs successful!');
                resolve();
            } catch (err) {
                if (err.code === 'ETIMEOUT') {
                    Log.er('Connection to DBs failed, trying again...');
                    connect();
                } else {
                    Log.er('Connection to DBs failed:');
                    console.error(err);
                    setTimeout(connect, 5000);
                }
            }
        }
    
        Log.ev('Connecting to DBs...');
        connect();
    });
};
