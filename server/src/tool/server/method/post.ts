import { EndPoint } from '../core/end-point';
import { Express } from 'express';

/**
 * Make a change to the server (generally inserting new resources), or request sensible data.
 * - SAFE       = `false`
 * - IDEMPOTENT = `false`
 */
export class Post extends EndPoint {
  public implement(app: Express) {
    app.post(
      this._path,
      this.launch()
    )
  }
}