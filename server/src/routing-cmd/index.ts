import { Route } from '../tool/arg';
import { help } from './help';
import { serve } from './server';
import { setup } from './setup';
import { seeds } from './seeds';

export const routesCmd: Route[] = [
    help,
    serve,
    setup,
    seeds
];
