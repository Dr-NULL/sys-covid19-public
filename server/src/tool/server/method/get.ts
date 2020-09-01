import { EndPoint } from '../core/end-point';
import { Express } from 'express';
import { Log } from '../../log';

/**
 * Request data to the server.
 * - SAFE       = `true`
 * - IDEMPOTENT = `true`
 */
export class Get extends EndPoint {
  public implement(app: Express) {
    app.get(
      this._path,
      this.launch()
    )
  }
}