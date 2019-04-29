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

@Component({
  selector: 'asignar-automovilista',
  templateUrl: './asignar-automovilista.component.html',
  styleUrls: ['./asignar-automovilista.component.sass']
})
export class AsignarAutomovilistaComponent implements OnInit {

  constructor(
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

  tableGeneric:TableGeneric = new TableGeneric()
  @ViewChild(ListaComponent) genericList: ListaComponent;
  mostrarTable:boolean = false;

  ngOnInit() {
    forkJoin(this.autosService.getAll(), this.automovilistasService.getAll())
    .subscribe(response =>{

      if(response[0].length > 0){
        this.autos = response[0];
        this.filteredAutos = this.controlAuto.valueChanges
        .pipe(
          startWith<string | Auto>(''),
          map(value => typeof value === 'string' ? value : value.matricula),
          map(matricula => matricula ? this._filterAuto(matricula) : this.autos.slice())
        );
      }

      if(response[1].length > 0){
        this.conductores = response[1];
        this.filteredConductor = this.controlConductor.valueChanges
        .pipe(
          startWith<string | Automovilista>(''),
          map(value => typeof value === 'string' ? value : value.nombre),
          map(nombre => nombre ? this._filterConductor(nombre) : this.conductores.slice())
        );
      }
    });
  }

  displayAuto(auto?: Auto): string | undefined {
    return auto ? auto.matricula : undefined;
  }

  private _filterAuto(matricula: string): Auto[] {
    const filterValue = matricula.toLowerCase();
    return this.autos.filter(option => option.matricula.toLowerCase().indexOf(filterValue) === 0);
  }

  displayConductor(conductor?: Automovilista): string | undefined {
    return conductor ? conductor.nombre : undefined;
  }

  private _filterConductor(nombre: string): Automovilista[] {
    const filterValue = nombre.toLowerCase();
    return this.conductores.filter(option => option.nombre.toLowerCase().indexOf(filterValue) === 0);
  }

  save(){
    this.mostrarTable = false;

    if((this.autoSeleccionado.id == '' || this.conductorSeleccionado.id == '') ||
        (typeof this.autoSeleccionado == 'string' || typeof this.conductorSeleccionado == 'string')){
      this.alerta("Es necesario seleccionar un auto y un conductor.")
      return;
    }

    let relacion = {
      autoId : this.autoSeleccionado.id,
      automovilistaId : this.conductorSeleccionado.id
    }

    this.relacionesService._postAutoAutomovilsta(relacion).subscribe(response =>{
      if(response == "" || response == null){
        this.alerta(`La relación del auto ${this.autoSeleccionado.matricula} con el conductor ${this.conductorSeleccionado.nombre} se inserto correctamente.`);
      }else{
        this.alerta(`No se logro insertar la relación.`);
      }
    });
  }

  showByAuto(){
    if(this.autoSeleccionado.id == '' || typeof this.autoSeleccionado == 'string'){
      this.alerta("Es necesario seleccionar un auto.")
      return;
    } 

    this.mostrarTable = true;
    setTimeout(() => {
      this.genericList.esPrimeraVez =true;
      this.tableGeneric.columnas =['nombre', 'apellidos', 'puntos'];
      this.tableGeneric.titulos = ['Nombre', 'Apellidos', 'Puntos'];
      this.tableGeneric.mostrarOpciones = false;
      this.tableGeneric.tituloLista = `Automovilistas asignados al auto ${this.autoSeleccionado.modelo.toUpperCase()} con placas ${this.autoSeleccionado.matricula.toUpperCase()}`;
      this.relacionesService._getAutoAutomovilsta(this.autoSeleccionado.id).subscribe(response=>{
        this.tableGeneric.listado = response;
        setTimeout(() => this.genericList.mostrarDatos(), 200);
      });
    });
  }

  showByConductor(){
    if(this.conductorSeleccionado.id == '' || typeof this.conductorSeleccionado == 'string'){
      this.alerta("Es necesario seleccionar un conductor.")
      return;
    } 

    this.mostrarTable = true;
    setTimeout(() => {
      this.genericList.esPrimeraVez = true;
      this.tableGeneric.columnas =['matricula', 'marca', 'modelo'];
      this.tableGeneric.titulos = ['Matricula', 'Marca', 'Modelo'];
      this.tableGeneric.mostrarOpciones = false;
      this.tableGeneric.tituloLista = `Autos asignados al automovilista ${this.conductorSeleccionado.nombre.toUpperCase()}`;
      this.relacionesService._getAutomovilstaAuto(this.conductorSeleccionado.id).subscribe(response=>{
        this.tableGeneric.listado = response;
        setTimeout(() => this.genericList.mostrarDatos(), 200);
      });
    });
  }

  alerta(mensaje:string) {
    this.snackBar.open(mensaje, 'Cerrar', {duration:5000});
  }
  
}
