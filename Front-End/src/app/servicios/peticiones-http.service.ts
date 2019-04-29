import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auto } from '../modelos/auto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PeticionesHttpService {

  private header: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json;charset=utf-8' });
  
  readonly url = environment.urlApi;

  constructor(private http: HttpClient) { }

  _get(controller: string, parametros?: any): Observable<any> {

    let cadenaParametros: string = "";
    let _id: string = "";

    if (parametros != undefined)
      if (typeof parametros == 'number' || typeof parametros == 'string')
        _id = parametros.toString();

    if (parametros != undefined && _id == "") {
      for (const key in parametros) {
        if (parametros.hasOwnProperty(key)) {
          const valor = parametros[key];
          cadenaParametros += cadenaParametros == "" ? key + "=" + valor : "&" + key + "=" + valor;
        }
      }
    }

    return this.http.get(`${this.url + controller + (cadenaParametros != "" ? `?${cadenaParametros}` : `/${_id}`)}`, { headers: this.header });
  }

  _post(controller: string, elemento: any): Observable<any> {
    if(elemento.hasOwnProperty("id")) delete elemento.id;
    return this.http.post(`${this.url + controller}`, elemento, { headers: this.header });
  }

  _put(controller: string, elemento: any, id:any) : Observable<any> {
    return this.http.put(`${this.url + controller}/${id}`, elemento, { headers: this.header });
  }

  _delete(controller: string, id: any): Observable<any> {
    return this.http.delete(`${this.url + controller}/${id}`, { headers: this.header });
  }

}
