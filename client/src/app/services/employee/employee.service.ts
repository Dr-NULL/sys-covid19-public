import { HttpService, Response } from '../http';
import { Injectable } from '@angular/core';
import { Employee } from '@models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private httpServ: HttpService
  ) { }

  searchByRut(rut: string): Promise<Response<Employee>> {
    rut = encodeURI(rut);
    return this.httpServ.get<Employee>(
      `employee/get/${rut}`
    );
  }
}
