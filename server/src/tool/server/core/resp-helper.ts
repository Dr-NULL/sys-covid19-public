import { StatusCode, ResponseData, ResponseError } from './interface';
import { AppConfigData } from '../../config';
import { Response } from 'express';
import { ErrorHelper } from './error-helper';
import { statusCode } from './status-code';

type Code = 
  keyof StatusCode.Info | 
  keyof StatusCode.Success | 
  keyof StatusCode.Redirect;

export class RespHelper {
  private _appJson: AppConfigData;
  private _res: Response;

  public constructor(appJson: AppConfigData, res: Response) {
    this._appJson = appJson;
    this._res = res;
  }

  private write(obj: any, code: keyof StatusCode.All) {
    // Prepare buffer
    const txt = JSON.stringify(obj);
    const bit = Buffer.from(txt, 'utf8');
    
    // Prepare response
    this._res.contentType('application/vnd.api+json');
    this._res.statusCode = code;
    this._res.send(bit);
  }

  /**
   * Sends a JSON object to the client, setting the "content-type" to `'json'` and closes the connection.
   * @param obj Object to send to the client.
   * @param code `default = 200` Status code of the current response. 
   */
  public json(obj: any, code: Code = 200) {
    // Prepare container
    const snd: ResponseData = {
      data: obj,
      meta: this._appJson.meta
    };

    this.write(snd, code);
  }

  public error(err: any) {
    // Prepare container
    let snd: ResponseError;
    let cod: keyof StatusCode.All = 500;
    if (err instanceof ErrorHelper) {
      cod = (err as ErrorHelper).statusCode;
      snd = {
        error: {
          status: cod,
          title: statusCode[cod],
          detail: (err as ErrorHelper).message
        },
        meta: this._appJson.meta
      };
    } else {
      snd = {
        error: {
          status: 500,
          title: statusCode[500],
          detail: (err as ErrorHelper).message
        },
        meta: this._appJson.meta
      };
    }

    this.write(snd, cod);
  }
}
