import { EndPoint } from '../core/end-point';
import { Express } from 'express';

/**
 * Deletes a resource on the server.
 * - SAFE       = `false`
 * - IDEMPOTENT = `true`
 */
export class Delete extends EndPoint {
  public implement(app: Express) {
    app.delete(
      this._path,
      this.launch()
    )
  }
}