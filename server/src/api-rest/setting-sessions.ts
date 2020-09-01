import { Interface } from '../tool/server';
import { appConfig } from '.';
import { deploy } from 'session-crossover';

export const settingSessions: Interface.Action = app => {
    app.use(deploy({
        path: appConfig.data.folder.session,
        aesType: 'aes-128-gcm',
        expires: appConfig.data.session.expires,
        cookieName: appConfig.data.session.name,
    }));
}
