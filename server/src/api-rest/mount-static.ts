import { Folder, Type } from '../tool/fsys';
import { Interface } from '../tool/server';

import express from 'express';
import { appConfig } from '.';

/**
 * Mount the Angular Static Folder specified in `appconfig.json`.
 * @param app Express instance.
 */
export const mountStatic: Interface.Action = async app => {
    const config = appConfig.data;
    const folder = new Folder(config.folder.angular + '/client');
    const regexp = new RegExp(`^\/${config.server.apiPrefix}/`, 'gi');

    app.use(express.static(folder.path));
    app.use((req, res, nxt) => {
        if (!req.path.match(regexp)) {
            // Redirect
            res.sendFile(
                'index.html',
                { root: folder.path }
            );
        } else {
            // Next middleware
            nxt();
        }
    });
};
