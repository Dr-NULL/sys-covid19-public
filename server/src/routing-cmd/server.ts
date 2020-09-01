import { Route } from '../tool/arg';
import { deployment } from '../api-rest';
import express from 'express';

export const serve = new Route();
serve.main = [
    [ 'server', 'srv' ]
]
serve.desc = 'Deploy the webservice.';
serve.callback = async args => {
    // Initialize configurations
    const app = express();
    for (const step of deployment) {
        await step(app);
    }
};
