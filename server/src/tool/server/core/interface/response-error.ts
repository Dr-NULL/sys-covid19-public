import { Response } from './response';

export interface ResponseError extends Response {
  error: {
    status: number;
    title: string;
    detail: string;
  }
}