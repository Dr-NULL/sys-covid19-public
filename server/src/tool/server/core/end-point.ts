import { Express, Request, Response } from 'express';
import { Callback } from './callback';
import { Log } from '../../log';

export abstract class EndPoint {
  protected _path : string;
  /**
   * Get or set the path of the current EndPoint.
   */
  public get path() : string {
    return this._path;
  }
  public set path(v : string) {
    this._path = '/' + v.replace(/^(\\|\/)+/gi, '');
  }
  
  protected _callback : Callback;
  /**
   * Get or set the callback asociated to this Endpoint.
   */
  public get callback() : Callback {
    return this._callback;
  }
  public set callback(v : Callback) {
    this._callback = v;
  }

  /**
   * Execute the callback of the current end-point, and handle the exceptions.
   * @param req Request of the Express application instance.
   * @param res Response of the Express application instance.
   */
  protected launch() {
    return async function(this: EndPoint, req: Request, res: Response) {
      // Handle error in server side
      try {
        await this._callback(req, res)
      } catch (err) {
        Log.er(err.message, '')

        // Send Response
        if (!res.writableEnded) {
          res.helper.error(err)
        }
      }
    }.bind(this)
  }
  
  /**
   * Implement this endpoint to a Express instance application.
   * @param app Express application instance.
   */
  public abstract implement(app: Express): void | Promise<void>
}