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
import { FormsModule } from '@angular/forms';

//Firebase
import { AngularFireModule, FirebaseApp } from '@angular/fire';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';

//Alerta
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HomeComponent } from './page/home/home.component';
import { AltaAdminComponent } from './page/alta-admin/alta-admin.component';
import { UsuariosComponent } from './page/usuarios/usuarios.component';

@NgModule({
  declarations: [
    AppComponent,
    BienvenidosComponent,
    LoginComponent,
    RegistroComponent,
    HomeComponent,
    AltaAdminComponent,
    UsuariosComponent
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
    FormsModule,
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
    AngularFireStorageModule
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
