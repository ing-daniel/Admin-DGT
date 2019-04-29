import { Injectable } from '@angular/core';
import { Controladores } from '../Enumeraciones/controladores.enum';
import { PeticionesHttpService } from './peticiones-http.service';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Automovilista } from '../Modelos/automovilista';
import { Auto } from '../modelos/auto';

@Injectable({
  providedIn: 'root'
})
export class RelacionesService {

  constructor(
    private http:PeticionesHttpService,
  ) { }

  controlador: Controladores = Controladores.Relaciones;

  _getAutoAutomovilsta(idAuto:any){
    return this.http._get(`${this.controlador}/Autos/${idAuto}/Automovilistas`)
    .pipe(
      map(datos =>{
        let array: Array<Automovilista> = new Array<Automovilista>();
        console.log(datos);
        
        datos.autosAutomivilistas.forEach(element => {
          element.automovilista.idRelacion = element.id;
          array.push(element.automovilista);
        });
        return array;
      })
    );
  }

  _getAutomovilstaAuto(idAuto:any){
    return this.http._get(`${this.controlador}/Automovilistas/${idAuto}/Autos`)
    .pipe(
      map(datos =>{
        let array: Array<Auto> = new Array<Auto>();
        datos.autosAutomivilistas.forEach(element => {
          array.push(element.auto);
        });
        return array;
      })
    );;
  }

  _postAutoAutomovilsta(objeto:any){
    return this.http._post(`${this.controlador}/AutoAutomovilista`, objeto);
  }

  _postMultaAutoAutomovilsta(objeto:any){
    return this.http._post(`${this.controlador}/MultaAutoAutomovilista`, objeto);
  }

}
