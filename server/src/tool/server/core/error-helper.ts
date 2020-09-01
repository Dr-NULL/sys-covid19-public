import { StatusCode } from './interface';

type ErrorCode = 
  keyof StatusCode.ClientError |
  keyof StatusCode.ServerError

export class ErrorHelper extends Error {
  private _statusCode: ErrorCode
  public get statusCode() {
    return this._statusCode
  }
  
  public constructor(
    code: ErrorCode,
    desc: string
  ) {
    super(desc)
    this._statusCode = code
  }
}