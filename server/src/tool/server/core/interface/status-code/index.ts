import { Info } from './info';
import { Success } from './success';
import { Redirect } from './redirect';
import { ClientError } from './client-error';
import { ServerError } from './server-error';

export { Info }
export { Success }
export { Redirect }
export { ClientError }
export { ServerError }

export interface All extends
  Info,
  Success,
  Redirect,
  ClientError,
  ServerError {}