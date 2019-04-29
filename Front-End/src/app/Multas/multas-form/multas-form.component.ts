import { Component, OnInit, Input } from '@angular/core';
import { FormsActions } from 'src/app/Interfaces/forms-actions';
import { AccionesForm } from 'src/app/Enumeraciones/acciones-form.enum';
import { Controladores } from 'src/app/Enumeraciones/controladores.enum';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Multa } from 'src/app/Modelos/multa';
import { MultasService } from 'src/app/servicios/multas.service';

@Component({
  selector: 'multas-form',
  templateUrl: './multas-form.component.html',
  styleUrls: ['./multas-form.component.sass']
})
export class MultasFormComponent implements OnInit, FormsActions<Multa> {
  @Input()
  public elemento: Multa = new Multa();
  @Input()
  public accion: AccionesForm = AccionesForm.Crear;
  controlador:string = Controladores.Multas.toString();

  constructor(
    private service:MultasService,
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
          this.service.updateElemnt(this.elemento.id, new Multa(this.elemento)).subscribe(() => this.alerta(`La multa ${this.elemento.descripcion} se actualizó correctamente`));  
        break;
      case AccionesForm.Crear:
        this.service.newElemnt(this.elemento).subscribe(response => this.alerta(`La multa ${response.descripcion} se insertó correctamente`));  
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