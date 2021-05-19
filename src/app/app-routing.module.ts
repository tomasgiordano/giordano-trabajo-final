import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { RegistroComponent } from './page/registro/registro.component';
import { BienvenidosComponent } from './page/bienvenidos/bienvenidos.component';
import { HomeComponent } from './page/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { AltaAdminComponent } from './page/alta-admin/alta-admin.component';
import { InicioComponent } from './page/inicio/inicio.component';
import { UsuariosComponent } from './page/usuarios/usuarios.component';
import { ListaUsuariosComponent } from './page/lista-usuarios/lista-usuarios.component';

const routes: Routes = [
  {path:'',component:BienvenidosComponent},
  {path:'login',component:LoginComponent},
  {path:'registro',component:RegistroComponent},
  {path:'home',component:HomeComponent,canActivate:[AuthGuard],children:[
    {path:'',component:InicioComponent,canActivate:[AuthGuard]},
    {path:'altaAdmin',component:AltaAdminComponent,canActivate:[AuthGuard]},
    {path:'usuarios',component:ListaUsuariosComponent,canActivate:[AuthGuard]}
  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
