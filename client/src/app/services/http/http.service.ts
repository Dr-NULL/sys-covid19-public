import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ResponseError } from './lib/response-error';
import { appGlobal } from 'src/app/app.global';
import { Response } from './lib/response';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(
    private http: HttpClient
  ) { }

  private parseUrl(url: string): string {
    if (!url.match(/^https?:\/\//gi)) {
      // Ruta API
      url = url.replace(/^(\\|\/)+/gi, '');
      url = location.origin + '/'
        + appGlobal.http.apiPrefix.replace(/(\\|\/)/gi, '')
        + '/' + url;
    }

    return url;
  }

  /**
   * HTTP Request del tipo "GET". Se utiliza para solicitar un recurso al servidor.
   * @param url URL del recurso que se solicita.
   */
  public async get<T = any>(url: string): Promise<Response<T>> {
    try {
      const resp = await this.http.get<Response<T>>(
        this.parseUrl(url),
        { headers: appGlobal.http.headers }
      ).toPromise();

      return resp;
    } catch (err) {
      throw new ResponseError(err);
    }
  }

  /**
   * HTTP Request del tipo "POST". Se utiliza para crear o agregar un recurso al servidor.
   * @param url URL del recurso que se va a agregar.
   * @param data Datos del recurso a crear/insertar.
   */
  public async post<T = any>(url: string, data: any): Promise<Response<T>> {
    try {
      const resp = await this.http.post<Response<T>>(
        this.parseUrl(url),
        JSON.stringify(data),
        { headers: appGlobal.http.headers }
      ).toPromise();

      return resp;
    } catch (err) {
      throw new ResponseError(err);
    }
  }

  /**
   * HTTP Request del tipo "PUT". se utiliza para actualizar completamente los datos de un recurso existente en
   * el servidor. Sí permite la inserción de nuevos recursos.
   * @param url URL del recurso que se va a modificar.
   * @param data Datos del recurso a modificar.
   */
  public async put<T = any>(url: string, data: any): Promise<Response<T>> {
    try {
      const resp = await this.http.put<Response<T>>(
        this.parseUrl(url),
        JSON.stringify(data),
        { headers: appGlobal.http.headers }
      ).toPromise();

      return resp;
    } catch (err) {
      throw new ResponseError(err);
    }
  }


  /**
   * HTTP Request del tipo "PATCH". se utiliza para actualizar de forma parcial los datos de un recurso existente
   * en el servidor (por ejemplo solo cambiar uno o 2 campos de una entidad). No permite la inserción de nuevos
   * recursos.
   * @param url URL del recurso que se va a modificar.
   * @param data Datos del recurso a modificar.
   */
  public async patch<T = any>(url: string, data: any): Promise<Response<T>> {
    try {
      const resp = await this.http.patch<Response<T>>(
        this.parseUrl(url),
        JSON.stringify(data),
        { headers: appGlobal.http.headers }
      ).toPromise();

      return resp;
    } catch (err) {
      throw new ResponseError(err);
    }
  }

  /**
   * HTTP Request del tipo "DELETE". Se utiliza para eliminar un recurso al servidor.
   * @param url URL del recurso a eliminar.
   */
  public async delete<T = any>(url: string): Promise<Response<T>> {
    try {
      const resp = await this.http.delete<Response<T>>(
        this.parseUrl(url),
        { headers: appGlobal.http.headers }
      ).toPromise();

      return resp;
    } catch (err) {
      throw new ResponseError(err);
    }
  }
}
