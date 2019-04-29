import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { PeticionesHttpService } from './peticiones-http.service';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LoadingService } from './loading.service';
import { MatSnackBar } from '@angular/material';

@Injectable()
/**
 * Extensión personalizada de la clase HTTP
 * Permite la configuración de todas las peticiones
 * Captura los envíos y respuestas
 * */
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(
    private peticionesServices: PeticionesHttpService,
    private loading:LoadingService,
    private snackBar: MatSnackBar
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // /**
    //  * Aquí se añade el token de seguridad a cada petición
    //  */
    // let sgt = "Bearer " + Seguridad.obtenerToken();

    // const aut = req.clone({
    //   headers :req.headers.set("Authorization", sgt)
    // });

    // /**
    //  * Aquí se valida que el usuario este realizando peticiones antes del tiempo 
    //  * configuarado para poder refrescar el token de seguridad
    //  */
    // if(this.seguridad.tiempoDeSesionPorExpirar()){
    //   this.peticionesServices.refresh();
    // }
    this.loading.toggle();

    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) this.toogleLoading();
        return event;
      }),
      catchError(err => {
        this.toogleLoading();
        throw this.handleError(err);
      })
    );
  } 
  
  toogleLoading(){
    setTimeout(() =>  this.loading.toggle(), 400);
  }

  handleError (error: any) {
    if(error.hasOwnProperty("error"))
      this.snackBar.open(error.error.text, "Cerrar", {duration:5000});
    return throwError(error);
  }



}