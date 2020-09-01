import { Injectable } from '@angular/core';
import { HttpService, Response } from '../http';
import { Vehicle } from '@models/vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(
    private httpServ: HttpService
  ) { }

  get(): Promise<Response<Vehicle[]>> {
    return this.httpServ.get<Vehicle[]>(
      `vehicle/get`
    );
  }
}
