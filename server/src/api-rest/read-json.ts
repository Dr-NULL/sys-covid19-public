import { Interface } from '../tool/server';
import { json, urlencoded } from 'body-parser';

export const readJson: Interface.Action = app => {
    app.use(json({
        strict: false,
        type: "application/vnd.api+json",
        limit: "1024mb"
    }));

    app.use(urlencoded({
        extended: false
    }));
};
