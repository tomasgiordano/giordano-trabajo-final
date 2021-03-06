import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { RegistroComponent } from './page/registro/registro.component';
import { BienvenidosComponent } from './page/bienvenidos/bienvenidos.component';
import { HomeComponent } from './page/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { AltaAdminComponent } from './page/alta-admin/alta-admin.component';
import { InicioComponent } from './page/inicio/inicio.component';
import { ListaUsuariosComponent } from './page/lista-usuarios/lista-usuarios.component';
import { SolicitarTurnoComponent } from './components/solicitar-turno/solicitar-turno.component';
import { TurnosListComponent } from './components/turnos-list/turnos-list.component';
import { HorariosComponent } from './components/horarios/horarios.component';
import { VerificacionCuentaComponent } from './components/verificacion-cuenta/verificacion-cuenta.component';
import { PacientesComponent } from './components/pacientes/pacientes.component';
import { MiperfilComponent } from './page/miperfil/miperfil.component';
import { EstadisticasComponent } from './page/estadisticas/estadisticas.component';

const routes: Routes = [
  { path: '', component: BienvenidosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard], children: [
      { path: '', component: InicioComponent, canActivate: [AuthGuard] },
      { path: 'altaAdmin', component: AltaAdminComponent, canActivate: [AuthGuard] },
      { path: 'estadisticas', component: EstadisticasComponent, canActivate: [AuthGuard] },
      { path: 'usuarios', component: ListaUsuariosComponent, canActivate: [AuthGuard] },
      { path: 'pacientes', component: PacientesComponent, canActivate: [AuthGuard] },
      { path: 'solicitarTurno', component: SolicitarTurnoComponent, canActivate: [AuthGuard] },
      { path: 'listadoTurnos', component: TurnosListComponent, canActivate: [AuthGuard] },
      { path: 'altaAdmin', component: AltaAdminComponent, canActivate: [AuthGuard] },
      { path: 'horarios', component: HorariosComponent, canActivate: [AuthGuard] },
      { path: 'sacarTurno', component: SolicitarTurnoComponent, canActivate: [AuthGuard] },
      { path: 'miperfil', component: MiperfilComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: 'verificacion', component: VerificacionCuentaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
