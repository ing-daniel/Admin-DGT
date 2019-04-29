import { AccionesForm } from '../Enumeraciones/acciones-form.enum';
import { Observable } from 'rxjs';

export interface FormsActions<T> {
    elemento:T;
    accion:AccionesForm;
    
    save();
    alerta(mensaje:string);
}
