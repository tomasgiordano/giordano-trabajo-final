import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BienvenidosComponent } from './page/bienvenidos/bienvenidos.component';
import { LoginComponent } from './page/login/login.component';
import { RegistroComponent } from './page/registro/registro.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Material
import { CommonModule } from '@angular/common';
import {MatStepperModule} from '@angular/material/stepper';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatExpansionModule} from '@angular/material/expansion';

//Firebase
import { AngularFireModule, FirebaseApp } from '@angular/fire';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';

import { NgxCaptchaModule } from 'ngx-captcha';
import { RecaptchaModule } from 'ng-recaptcha';

//Alerta
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HomeComponent } from './page/home/home.component';
import { AltaAdminComponent } from './page/alta-admin/alta-admin.component';
import { UsuariosComponent } from './page/usuarios/usuarios.component';
import { NavComponent } from './components/nav/nav.component';
import { InicioComponent } from './page/inicio/inicio.component';
import { ListaComponent } from './components/lista/lista.component';
import { DetalleUsuarioComponent } from './components/detalle-usuario/detalle-usuario.component';
import { PaginatePipe } from './pipes/paginate.pipe';
import { ListaUsuariosComponent } from './page/lista-usuarios/lista-usuarios.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HorariosComponent } from './components/horarios/horarios.component';
import { ListaEspecialidadesComponent } from './components/lista-especialidades/lista-especialidades.component';
import { ListaFechaHoraComponent } from './components/lista-fecha-hora/lista-fecha-hora.component';
import { ListaProfesionalesComponent } from './components/lista-profesionales/lista-profesionales.component';
import { ModalTurnoComponent } from './components/modal-turno/modal-turno.component';
import { ModalTurnoDetalleComponent } from './components/modal-turno-detalle/modal-turno-detalle.component';
import { SacarTurnoComponent } from './components/sacar-turno/sacar-turno.component';
import { SolicitarTurnoComponent } from './components/solicitar-turno/solicitar-turno.component';
import { TurnoDetalleComponent } from './components/turno-detalle/turno-detalle.component';
import { TurnosListComponent } from './components/turnos-list/turnos-list.component';
import { BusquedaPipe } from './pipes/busqueda.pipe';
import { CalificacionPipe } from './pipes/calificacion.pipe';
import { EstadoTurnoPipe } from './pipes/estado-turno.pipe';
import { FechaPipe } from './pipes/fecha.pipe';
import { FiltroPipe } from './pipes/filtro.pipe';
import { MesesPipe } from './pipes/meses.pipe';
import { SortTurnosPipe } from './pipes/sort-turnos.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerificacionCuentaComponent } from './components/verificacion-cuenta/verificacion-cuenta.component';
import * as firebase from 'firebase';
import { ProfesionalHoraComponent } from './components/profesional-hora/profesional-hora.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { ListaMedicosComponent } from './components/lista-medicos/lista-medicos.component';
import { ConfirmarTurnoComponent } from './components/confirmar-turno/confirmar-turno.component';
@NgModule({
  declarations: [
    AppComponent,
    BienvenidosComponent,
    LoginComponent,
    RegistroComponent,
    HomeComponent,
    AltaAdminComponent,
    UsuariosComponent,
    NavComponent,
    InicioComponent,
    ListaComponent,
    DetalleUsuarioComponent,
    PaginatePipe,
    ListaUsuariosComponent,
    HorariosComponent,
    ListaEspecialidadesComponent,
    ListaFechaHoraComponent,
    ListaProfesionalesComponent,
    ModalTurnoComponent,
    ModalTurnoDetalleComponent,
    SacarTurnoComponent,
    SolicitarTurnoComponent,
    TurnoDetalleComponent,
    TurnosListComponent,
    BusquedaPipe,
    CalificacionPipe,
    EstadoTurnoPipe,
    FechaPipe,
    FiltroPipe,
    MesesPipe,
    SortTurnosPipe,
    VerificacionCuentaComponent,
    ProfesionalHoraComponent,
    ListaMedicosComponent,
    ConfirmarTurnoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,
    MatTableModule,
    MatSnackBarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule,
    MatExpansionModule,
    MatPaginatorModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDb4GaW-1w6n-vtpPXE5GitKcnimT2iLfk",
      authDomain: "loginscreen-bfc67.firebaseapp.com",
      databaseURL: "https://loginscreen-bfc67.firebaseio.com",
      projectId: "loginscreen-bfc67",
      storageBucket: "loginscreen-bfc67.appspot.com",
      messagingSenderId: "340700455440",
      appId: "1:340700455440:web:941406c13cdc1beb422095",
      measurementId: "G-1X1DVX9K4M"
    }),
    ToastrModule.forRoot(),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    NgxCaptchaModule,
    RecaptchaModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonToggleModule
  ],
  providers: [
    AngularFireAuth,
    AngularFireStorage,
    AngularFirestore,
    ToastrService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
