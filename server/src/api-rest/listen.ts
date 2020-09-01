import { Interface } from '../tool/server';
import { appConfig } from '.';
import { Log } from '../tool/log';

/**
 * Set the Express instance in listening mode (ready to response requests).
 * @param app Express instance.
 */
export const listen: Interface.Action = app => {
    const server = appConfig.data.server;
    app.listen(server.port, '0.0.0.0', () => {
        Log.ok('Webservice is deployed, listening...');
    });
};
