import { Injectable } from '@angular/core';
import { HttpService, Response } from '../http';
import { User } from '@models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private httpServ: HttpService
  ) { }

  public systemCheck(): Promise<Response<User>> {
    return this.httpServ.get<User>(
      `user/system/check`
    );
  }

  public add(
    rut: string,
    mail: string,
    nick: string,
    pass: string,
    type: number
  ): Promise<Response<void>> {
    return this.httpServ.post<void>(
      `user/add`,
      {
        rut,
        mail,
        nick,
        pass,
        type
      }
    );
  }

  public systemAdd(
    rut: string,
    mail: string,
    nick: string,
    pass: string
  ): Promise<Response<void>> {
    return this.httpServ.post<void>(
      `user/system/add`,
      {
        rut,
        mail,
        nick,
        pass
      }
    );
  }

  public login(nick: string, pass: string): Promise<Response<void>> {
    return this.httpServ.post<void>(
      `user/login`,
      {
        nick,
        pass
      }
    );
  }

  public logout(): Promise<Response<void>> {
    return this.httpServ.get<void>(
      `user/logout`
    );
  }

  public get(): Promise<Response<User[]>> {
    return this.httpServ.get<User[]>(
      `user/get`
    );
  }

  public delete(id: number): Promise<Response<void>> {
    return this.httpServ.delete<void>(
      `user/del/${id}`
    );
  }
}
