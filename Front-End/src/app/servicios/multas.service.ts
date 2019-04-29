import { Injectable } from '@angular/core';
import { Crud } from './abstractos/crud.service';
import { Controladores } from '../Enumeraciones/controladores.enum';
import { PeticionesHttpService } from './peticiones-http.service';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Multa } from '../Modelos/multa';

@Injectable({
  providedIn: 'root'
})
export class MultasService  extends Crud<Multa>{
  controlador: Controladores = Controladores.Multas;

  constructor(
    private http:PeticionesHttpService,
  ) { super();}

  getAll(): Observable<Array<Multa>> {
    return this.http._get(this.controlador)
    .pipe(
        map(this.deserializarObjetos),
        catchError(this.handleError)
      );
  }

  getOne(id: any): Observable<Multa> {
    return this.http._get(this.controlador, id)
    .pipe(
        map(this.deserializarObjeto),
        catchError(this.handleError),
      );
  }

  newElemnt(elemento: Multa): Observable<Multa> {
    return this.http._post(this.controlador, elemento)
    .pipe(
      map(this.deserializarObjeto),
      catchError(this.handleError),
    );
}

  deleteElemnt(id: any): Observable<Multa> {
    return this.http._delete(this.controlador, id)
    .pipe(
      map(this.deserializarObjeto),
      catchError(this.handleError),
    );  
  }

  updateElemnt(id:any, elemento: Multa): Observable<number> {
    return this.http._put(this.controlador, elemento, id)
    .pipe(
      catchError(this.handleError),
    );
  }

  handleError (error: any) {
    console.error("error", error); // log to console instead
    return throwError(error);
  }
}
