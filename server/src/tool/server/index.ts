export * as Method from './method';
export * as Interface from './core/interface';
export { EndPoint } from './core/end-point';
export { statusCode } from './core/status-code';
export { ErrorHelper } from './core/error-helper';

import { RespHelper } from './core/resp-helper';
export { RespHelper } 

declare global {
  namespace Express {
    export interface Response {
      helper: RespHelper;
    }
  }
}
