import { Injectable } from '@angular/core';
import { HttpService, Response } from '../http';
import { TypeUser } from '@models/type-user';

@Injectable({
  providedIn: 'root'
})
export class TypeUserService {

  constructor(
    private httpServ: HttpService
  ) { }

  get(): Promise<Response<TypeUser[]>> {
    return this.httpServ.get<TypeUser[]>(
      `type-user/get`
    );
  }
}
