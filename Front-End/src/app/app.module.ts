import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatToolbarModule,
  MatTableModule,
  MatMenuModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatAutocompleteModule,
  MatSelectModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PeticionesHttpService } from './servicios/peticiones-http.service';
import { AutosService } from './servicios/autos.service';
import { AutoFormComponent } from './Autos/auto-form/auto-form.component';
import { AutomovilistaFormComponent } from './Automovilistas/automovilista-form/automovilista-form.component';
import { MultasFormComponent } from './Multas/multas-form/multas-form.component';
import { AutomovilistasService } from './servicios/automovilistas.service';
import { MultasService } from './servicios/multas.service';
import { HttpRequestInterceptor } from './servicios/httpRequest.interceptor';
import { LoadingComponent } from './Comun/loading/loading.component';
import { LoadingService } from './servicios/loading.service';
import { AsignarAutomovilistaComponent } from './Autos/asignar-automovilista/asignar-automovilista.component';
import { ListaComponent } from './Comun/lista/lista.component';
import { SinDatosComponent } from './Comun/sin-datos/sin-datos.component';
import { RelacionesService } from './servicios/relaciones.service';
import { GenerarMultaComponent } from './Multas/generar-multa/generar-multa.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaComponent,
    AutoFormComponent,
    AutomovilistaFormComponent,
    MultasFormComponent,
    LoadingComponent,
    AsignarAutomovilistaComponent,
    SinDatosComponent,
    GenerarMultaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  
    MatButtonModule,
    MatToolbarModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatSelectModule
  ],
  exports: [],
  providers: [
    HttpClientModule,
    PeticionesHttpService,
    AutosService,
    AutomovilistasService,
    MultasService,
    LoadingService,
    RelacionesService,
    {provide:HTTP_INTERCEPTORS,
      useClass:HttpRequestInterceptor,
      multi:true
    }   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
