import { Injectable, ViewChild, Output, EventEmitter } from '@angular/core';
import { LoadingComponent } from '../Comun/loading/loading.component';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  constructor() { }

  mostrar = false;
  @Output() change: EventEmitter<boolean> = new EventEmitter();

  toggle() {
    this.mostrar = !this.mostrar;
    this.change.emit(this.mostrar);
  }

}
