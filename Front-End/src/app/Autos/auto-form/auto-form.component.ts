import { Component, OnInit, Input } from '@angular/core';
import { Auto } from 'src/app/modelos/auto';
import { AutosService } from 'src/app/servicios/autos.service';
import { AccionesForm } from 'src/app/Enumeraciones/acciones-form.enum';
import { FormsActions } from 'src/app/Interfaces/forms-actions';
import { Router, ActivatedRoute } from '@angular/router';
import { Controladores } from 'src/app/Enumeraciones/controladores.enum';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'auto-form',
  templateUrl: './auto-form.component.html',
  styleUrls: ['./auto-form.component.sass']
})
export class AutoFormComponent implements OnInit, FormsActions<Auto> {

  @Input()
  public elemento: Auto = new Auto();
  @Input()
  public accion: AccionesForm = AccionesForm.Crear;
  controlador:string = Controladores.Autos.toString();

  constructor(
    private autoService:AutosService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {    
    this.route.params
    .subscribe(params => {
      if (params['id'] != undefined) {
        this.autoService.getOne(params['id']).subscribe(response => this.elemento = response);
        this.accion = AccionesForm.Actualizar;
      }
    });
  }

  save() {
    switch (this.accion) {
      case AccionesForm.Actualizar:
          this.autoService.updateElemnt(this.elemento.id, new Auto(this.elemento)).subscribe(() => this.alerta(`El Auto con la matricula ${this.elemento.matricula} se actualizó correctamente`));  
        break;
      case AccionesForm.Crear:
        this.autoService.newElemnt(this.elemento).subscribe(response => this.alerta(`El Auto con la matricula ${response.matricula} se insertó correctamente`));  
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
