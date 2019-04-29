import { Component, OnInit, ViewChild } from '@angular/core';
import { AutosService } from 'src/app/servicios/autos.service';
import { FormControl } from '@angular/forms';
import { Observable, forkJoin } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Auto } from 'src/app/modelos/auto';
import { AutomovilistasService } from 'src/app/servicios/automovilistas.service';
import { Automovilista } from 'src/app/Modelos/automovilista';
import { MatSnackBar } from '@angular/material';
import { TableGeneric } from 'src/app/Modelos/table-generic';
import { ListaComponent } from 'src/app/Comun/lista/lista.component';
import { RelacionesService } from 'src/app/servicios/relaciones.service';
import { MultasService } from 'src/app/servicios/multas.service';
import { Multa } from 'src/app/Modelos/multa';

declare type Tipo = 'auto' | 'automovilista';

@Component({
  selector: 'generar-multa',
  templateUrl: './generar-multa.component.html',
  styleUrls: ['./generar-multa.component.sass']
})
export class GenerarMultaComponent implements OnInit {

  constructor(
    private multasService:MultasService,
    private autosService:AutosService,
    private automovilistasService:AutomovilistasService,
    private relacionesService:RelacionesService,
    private snackBar: MatSnackBar
  ) { }

  controlAuto = new FormControl();
  autos: Array<Auto> = new Array<Auto>();;
  filteredAutos: Observable<Auto[]>;
  autoSeleccionado: Auto = new Auto();

  controlConductor = new FormControl();
  conductores: Array<Automovilista> = new Array<Automovilista>();;
  filteredConductor: Observable<Automovilista[]>;
  conductorSeleccionado: Automovilista = new Automovilista();

  Multas:Array<Multa> = new Array<Multa>();
  multaId:number;
  
  tableGeneric:TableGeneric = new TableGeneric()
  @ViewChild(ListaComponent) genericList: ListaComponent;
  mostrarConductores:boolean = false;


ngOnInit() {
    forkJoin(this.autosService.getAll(), this.multasService.getAll())
    .subscribe(response =>{

      if(response[0].length > 0){
        this.autos = response[0];
        this.filteredAutos = this.controlAuto.valueChanges
        .pipe(
          startWith<string | Auto>(''),
          map(value => typeof value === 'string' ? value : value.matricula),
          map(matricula => matricula ? <Auto[]>this._filter(matricula, 'auto') : this.autos.slice())
        );
        this.resetConductor();
      }

      if(response[1].length > 0){
        this.Multas = response[1];
      }
    });
  }

  displayAuto(elemento?: Auto): string | undefined {
    return elemento ? elemento.matricula : undefined;
  }

  displayConductor(elemento?:Automovilista): string | undefined {
    return elemento ? `${elemento.nombre} ${elemento.apellidos}`  : undefined;
  }

  private _filter(dato: string, tipo:Tipo): Auto[] | Automovilista[] {
    const filterValue = dato.toLowerCase();
    switch (tipo) {
      case 'auto':
        return this.autos.filter(option => option.matricula.toLowerCase().indexOf(filterValue) === 0);    
        break;
      case 'automovilista':
        return this.conductores.filter(option => option.nombre.toLowerCase().indexOf(filterValue) === 0);
        break;
      default:
        break;
    }
    return [];
  }

  resetConductor(){
    this.conductorSeleccionado = new Automovilista();
    this.mostrarConductores = false;
  }

  showByAuto(){
    this.resetConductor();

    if(this.autoSeleccionado.id == '' || typeof this.autoSeleccionado == 'string'){
      this.alerta("Es necesario seleccionar un auto.")
      return;
    } 

    this.relacionesService._getAutoAutomovilsta(this.autoSeleccionado.id).subscribe(response=>{
      this.conductores = response;
      this.filteredConductor = this.controlConductor.valueChanges
      .pipe(
        startWith<string | Automovilista>(''),
        map(value => typeof value === 'string' ? value : value.nombre),
        map(nombre => nombre ? <Automovilista[]> this._filter(nombre,'automovilista') : this.conductores.slice())
      );
      this.mostrarConductores = true;
    });
  }

  save(){
    if(!confirm(`Desea aplicar la multa al conductor ${this.conductorSeleccionado.nombre.toUpperCase()}?`)) return;

    if((this.autoSeleccionado.id == '' || this.conductorSeleccionado.id == '') ||
        (typeof this.autoSeleccionado == 'string' || typeof this.conductorSeleccionado == 'string') ||
        this.multaId == 0){
      this.alerta("Es necesario seleccionar una multa, un auto y un conductor.")
      return;
    }    

    let relacion = {
      MultaId : this.multaId,
      AutoAutomivilistaId : this.conductorSeleccionado["idRelacion"]
    }

    this.relacionesService._postMultaAutoAutomovilsta(relacion).subscribe(response =>{
      if(response == "" || response == null){
        this.alerta(`La multa se aplico de manera correcta.`);
      }else{
        this.alerta(response);
      }
    });
  }

  alerta(mensaje:string) {
    this.snackBar.open(mensaje, 'Cerrar', {duration:5000});
  }

}
