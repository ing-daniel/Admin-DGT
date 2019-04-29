import { Observable } from 'rxjs';
import { Controladores } from 'src/app/Enumeraciones/controladores.enum';


export abstract class Crud<T> {

  constructor() { }

  abstract controlador: Controladores;

  abstract getAll(): Observable<Array<T>>;
  abstract getOne(id: any): Observable<T>;
  abstract newElemnt(elemento: T): Observable<T>;
  abstract deleteElemnt(id: any): Observable<T>;
  abstract updateElemnt(id: any, elemento: T): Observable<number>;

  protected deserializarObjetos(datos: any): Array<T> {
    let array: Array<T> = new Array<T>();
    datos.forEach(element => {
      array.push(element);
    });
    return array;
  }

  protected deserializarObjeto(datos: any): T {
    let objeto = {};
    Object.keys(datos).map(key => objeto[key] = datos[key]);
    return <T>objeto;
  }
}
