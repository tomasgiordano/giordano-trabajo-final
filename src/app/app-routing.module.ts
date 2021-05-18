import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { RegistroComponent } from './page/registro/registro.component';
import { BienvenidosComponent } from './page/bienvenidos/bienvenidos.component';
import { HomeComponent } from './page/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { AltaAdminComponent } from './page/alta-admin/alta-admin.component';

const routes: Routes = [
  {path:'',component:BienvenidosComponent},
  {path:'login',component:LoginComponent},
  {path:'registro',component:RegistroComponent},
  {path:'home',component:HomeComponent,canActivate:[AuthGuard]},
  {path:'altaAdmin',component:AltaAdminComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
