import { Component, OnInit, Input } from '@angular/core';
import { FormsActions } from 'src/app/Interfaces/forms-actions';
import { Automovilista } from 'src/app/Modelos/automovilista';
import { AccionesForm } from 'src/app/Enumeraciones/acciones-form.enum';
import { Controladores } from 'src/app/Enumeraciones/controladores.enum';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AutomovilistasService } from 'src/app/servicios/automovilistas.service';

@Component({
  selector: 'automovilista-form',
  templateUrl: './automovilista-form.component.html',
  styleUrls: ['./automovilista-form.component.sass']
})
export class AutomovilistaFormComponent implements OnInit, FormsActions<Automovilista> {
  @Input()
  public elemento: Automovilista = new Automovilista();
  @Input()
  public accion: AccionesForm = AccionesForm.Crear;
  controlador:string = Controladores.Automovilistas.toString();

  constructor(
    private service:AutomovilistasService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {    
    this.route.params
    .subscribe(params => {
      if (params['id'] != undefined) {
        this.service.getOne(params['id']).subscribe(response => this.elemento = response);
        this.accion = AccionesForm.Actualizar;
      }
    });
  }

  save() {
    switch (this.accion) {
      case AccionesForm.Actualizar:
          this.service.updateElemnt(this.elemento.id, new Automovilista(this.elemento)).subscribe(() => this.alerta(`El Automovilista con nombre ${this.elemento.nombre} se actualizó correctamente`));  
        break;
      case AccionesForm.Crear:
        this.service.newElemnt(this.elemento).subscribe(response => this.alerta(`El Automovilista con nombre ${response.nombre} se insertó correctamente`));  
        break;
      default:
        break;
    }
  }

  alerta(mensaje:string) {
    this.snackBar.open(mensaje, 'Cerrar', {duration:5000});
    setTimeout(() => this.router.navigate([this.controlador]), 500);
  }

}
