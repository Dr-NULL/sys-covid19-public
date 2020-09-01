import { routesCmd } from './routing-cmd';
import { Router } from './tool/arg';
import { Log } from './tool/log';

Log.title('sys-covid19', '0.0.1');
Router.read(routesCmd)
    .catch(err => {
        Log.er(err.message)
    })