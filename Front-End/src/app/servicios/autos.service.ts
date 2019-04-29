import { Injectable } from '@angular/core';
import { PeticionesHttpService } from './peticiones-http.service';
import { Crud } from './abstractos/crud.service';
import { Auto } from '../modelos/auto';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Controladores } from '../Enumeraciones/controladores.enum';

@Injectable({
  providedIn: 'root'
})
export class AutosService extends Crud<Auto>  {
  
  controlador: Controladores = Controladores.Autos;

  constructor(
    private http:PeticionesHttpService,
  ) { super();}

  getAll(): Observable<Array<Auto>> {
    return this.http._get(this.controlador)
    .pipe(
        map(this.deserializarObjetos),
        catchError(this.handleError)
      );
  }

  getOne(id: any): Observable<Auto> {
    return this.http._get(this.controlador, id)
    .pipe(
        map(this.deserializarObjeto),
        catchError(this.handleError),
      );
  }

  newElemnt(elemento: Auto): Observable<Auto> {
    return this.http._post(this.controlador, elemento)
    .pipe(
      map(this.deserializarObjeto),
      catchError(this.handleError),
    );
  }

  deleteElemnt(id: any): Observable<Auto> {
    return this.http._delete(this.controlador, id)
    .pipe(
      map(this.deserializarObjeto),
      catchError(this.handleError),
    );  
  }

  updateElemnt(id:any, elemento: Auto): Observable<number> {
    return this.http._put(this.controlador, elemento, id)
    .pipe(
      catchError(this.handleError),
    );
  }

  getAutomovilistasPorAuto(id:any){
    return this.http._get(this.controlador,`${id}/Automovilistas`)
    .pipe(
        map(this.deserializarObjeto),
        catchError(this.handleError)
      );
  }

  handleError (error: any) {
    console.error("error", error); // log to console instead
    return throwError(error);
  }
  
}
