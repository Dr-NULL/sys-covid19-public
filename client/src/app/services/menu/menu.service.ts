import { Injectable } from '@angular/core';
import { HttpService, Response } from '../http';
import { Menu } from 'src/app/models/menu';
export { Menu };

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(
    private httpServ: HttpService
  ) { }

  get(): Promise<Response<Menu[]>> {
    return this.httpServ.get<Menu[]>(
      'menu/get'
    );
  }

  check(): Promise<Response<void>> {
    return this.httpServ.get<void>(
      'menu/check'
    );
  }
}
