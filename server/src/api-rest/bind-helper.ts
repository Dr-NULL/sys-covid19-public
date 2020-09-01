import { Interface, RespHelper } from '../tool/server';
import { appConfig } from '.';
import helmet from 'helmet';

/**
 * Add to the Express response argument callback a RespHelper instance, for manage standarizeds JSON responses.
 * @param app Express instance.
 */
export const bindHelper: Interface.Action = app => {
  app.use(helmet());
  app.use((req, res, nxt) => {
    res.helper = new RespHelper(appConfig.data, res);
    nxt();
  });
};
