import { Component, OnInit, ViewChild, Renderer2, ElementRef, Input } from '@angular/core';
import { MatTable, MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PeticionesHttpService } from 'src/app/servicios/peticiones-http.service';
import { TableGeneric } from 'src/app/Modelos/table-generic';

@Component({
  selector: 'generic-list',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.sass']
})
export class ListaComponent implements OnInit {

  constructor(
    private services: PeticionesHttpService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  //#region Variables
  @Input()
  TableGeneric: TableGeneric;
  @ViewChild('table') table: MatTable<Element>;
  mostrarTabla:boolean =  true;
  esPrimeraVez:boolean = true;

  ngOnInit() {
    if(this.TableGeneric == undefined){
      this.TableGeneric = new TableGeneric();
      this.route.data
      .subscribe(info => {
        this.TableGeneric.mostrarOpciones = info.mostrarOpciones == undefined ? this.TableGeneric.mostrarOpciones : info.mostrarOpciones;
        this.TableGeneric.mostrarBtnAtras = info.mostrarBtnAtras == undefined ? this.TableGeneric.mostrarBtnAtras : info.mostrarBtnAtras;
        if(this.TableGeneric.mostrarOpciones)
          this.TableGeneric.columnas = ['opciones', ...info.encabezados];
        else
          this.TableGeneric.columnas = info.encabezados;

        this.TableGeneric.titulos = info.titulos;
        this.TableGeneric.rutasHTML = info.hasOwnProperty("rutas") ? info.rutas : {};
        if(!this.TableGeneric.rutasHTML.hasOwnProperty("editar"))  this.TableGeneric.rutasHTML.editar = '';
        this.TableGeneric.controlador = info.controlador;
        this.TableGeneric.tituloLista = info.tituloLista;
        this.TableGeneric.acciones = info.hasOwnProperty("acciones") ? info.acciones : new Array<any>();

        this.route.params
        .subscribe(params => {
          const _id = params['id'];
          if(_id != undefined)
          this.TableGeneric.controlador = this.TableGeneric.controlador.replace(":id", _id);
        });

        this.getLista();
      });
    }
  }

  getLista() {
    if(this.TableGeneric.controlador != ""){
      this.services._get(this.TableGeneric.controlador).subscribe(
        datos => this.TableGeneric.listado = datos,
        err => this.alerta("Error: " + err.message),
        () => this.mostrarDatos()
      );
    }
  }

  mostrarDatos(){
    this.mostrarTabla = this.TableGeneric.listado.length > 0;
    this.esPrimeraVez = false;
    if (this.TableGeneric.listado.length > 0) setTimeout(() => this.table.renderRows(), 200);
  }

  delete(id: any) {
    if (confirm("Seguro deseas eliminar elemento seleccionado?")) {
      this.services._delete(this.TableGeneric.controlador, id)
        .subscribe(
          () => this.alerta("El elemento se eliminó correctamente."),
          erro => this.alerta("Error: " + erro.message),
          () => this.getLista()
        );
    }
  }

  alerta(mensaje: string) {
    this.snackBar.open(mensaje, "Cerrar", { duration: 5000 });
  }

  reemplazarInfo(ruta: string, buscado: string, asignado: string): string {
      var aa = ruta.replace(buscado, asignado);
    return aa;
  }

  atras(){
    window.history.back()
  }

}
