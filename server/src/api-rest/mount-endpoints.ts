import { Interface, ErrorHelper } from '../tool/server';
import { routes } from '../routing-app';
import { appConfig } from '.';

/**
 * Mount all endpoints created in `'./routing-app'`.
 * @param app Express instance.
 */
export const mountEndpoints: Interface.Action = app => {
    const server = appConfig.data.server;

    // Mount endpoints
    for (const route of routes) {
        route.path = server.apiPrefix + route.path;
        route.implement(app);
    }

    // Not Found
    app.all(`/${server.apiPrefix}/*`, (req, res) => {
        const error = new ErrorHelper(404, 'This requested resource doesn\'t exists.');
        res.helper.error(error);
    });
}