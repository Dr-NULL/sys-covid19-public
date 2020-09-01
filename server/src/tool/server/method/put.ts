import { EndPoint } from '../core/end-point';
import { Express } from 'express';

/**
 * Update an existing server resource, or if doesn't exists, creates a new resource.
 * - SAFE       = `true`
 * - IDEMPOTENT = `true`
 */
export class Put extends EndPoint {
  public implement(app: Express) {
    app.put(
      this._path,
      this.launch()
    )
  }
}