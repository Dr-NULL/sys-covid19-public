import { HttpService, Response } from '../http';
import { Injectable } from '@angular/core';
import { FormData } from './form-data';

export { FormData };
@Injectable({
  providedIn: 'root'
})
export class FormService {
  constructor(
    private httpServ: HttpService
  ) { }

  public add(data: FormData): Promise<Response<void>> {
    return this.httpServ.post<void>(
      'form/add',
      data
    );
  }
}
