import { Injectable } from '@angular/core';
import { HttpService, Response } from '../http';
import { Symptom } from '@models/symptom';

@Injectable({
  providedIn: 'root'
})
export class SymptomService {

  constructor(
    private httpServ: HttpService
  ) { }

  get(): Promise<Response<Symptom[]>> {
    return this.httpServ.get<Symptom[]>(
      `symptom/get`
    );
  }
}
