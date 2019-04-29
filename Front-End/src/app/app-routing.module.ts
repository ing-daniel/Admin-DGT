import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaComponent } from './Comun/lista/lista.component';
import { AutoFormComponent } from './Autos/auto-form/auto-form.component';
import { AutomovilistaFormComponent } from './Automovilistas/automovilista-form/automovilista-form.component';
import { MultasFormComponent } from './Multas/multas-form/multas-form.component';
import { AsignarAutomovilistaComponent } from './Autos/asignar-automovilista/asignar-automovilista.component';
import { GenerarMultaComponent } from './Multas/generar-multa/generar-multa.component';

const routes: Routes = [
  { 
    path: '', 
    component: ListaComponent,
    data: {
      tituloLista: '5 Multas más frecuentes',
      encabezados: ['nombre', 'puntosDescontados', 'cantidad'],
      titulos: ['Descripción', 'Puntos a descontar', 'Cantidad de Multas'],
      controlador: "Multas/Top5",
      mostrarOpciones: false
    }
  },
  {
    path: 'Autos',
    children: [
      {
        path: '', component: ListaComponent,
        data: {
          tituloLista: 'Autos',
          encabezados: ['matricula', 'marca', 'modelo'],
          titulos: ['Matricula', 'Marca', 'Modelo'],
          rutas: { editar: 'Editar', nuevo: 'Nuevo', },
          controlador: "Autos",
          mostrarOpciones: true
        }
      },
      { path: 'Nuevo', component: AutoFormComponent },
      { path: 'Editar/:id', component: AutoFormComponent },
    ],
  },
  {
    path: 'Automovilistas',
    children: [
      {
        path: '', component: ListaComponent,
        data: {
          tituloLista: 'Automovilistas',
          encabezados: ['nombre', 'apellidos', 'puntos'],
          titulos: ['Nombre', 'Apellidos', 'Puntos'],
          rutas: { editar: 'Editar', nuevo: 'Nuevo' },
          controlador: "Automovilistas",
          mostrarOpciones: true,
          acciones: [
            {
              descripcion:'Listado de Multas',
              ruta:"/Multas/Automovilistas",
              agregarId:true,
              icono: "supervisor_account"
            }
          ]
        }
      },
      { path: 'Nuevo', component: AutomovilistaFormComponent },
      { path: 'Editar/:id', component: AutomovilistaFormComponent },
      { path: ':id/Multas', component: AutomovilistaFormComponent }
    ],
  },  
  {
    path: 'Multas',
    children: [
      {
        path: '', component: ListaComponent,
        data: {
          tituloLista: 'Tipo de multas',
          encabezados: ['descripcion', 'puntosMenos'],
          titulos: ['Descripcion', 'Puntos a Descontar'],
          rutas: { editar: 'Editar', nuevo: 'Nueva' },
          controlador: "Multas",
          mostrarOpciones: true,
        }
      },
      { 
        path: 'Automovilistas/:id', 
        component: ListaComponent,
        data: {
          tituloLista: 'Multas por automovilista',
          encabezados: ['descripcion', 'puntosMenos'],
          controlador: "Multas/Automovilistas/:id",
          titulos: ['Descripcion', 'Puntos a Descontados'],
          mostrarOpciones: false,
          mostrarBtnAtras:true
        }
      },
      { path: 'Nueva', component: MultasFormComponent },
      { path: 'Editar/:id', component: MultasFormComponent }
    ],
  },
  {
    path: 'Operaciones',
    children: [
      { path: 'Asignacion', component: AsignarAutomovilistaComponent},
      { path: 'Multa', component: GenerarMultaComponent}
    ],
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
