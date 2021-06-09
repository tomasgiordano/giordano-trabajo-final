import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Dinamicos, Turnos, Usuario } from 'src/app/models/models.module';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-turnos-list-pacientes',
  templateUrl: './turnos-list-pacientes.component.html',
  styleUrls: ['./turnos-list-pacientes.component.css'],
})
export class TurnosListPacientesComponent implements OnInit {

  listado: Array<Turnos> = new Array<Turnos>();
  usuario: any = new Usuario();
  @Input() usuarioSeleccionado:any;

  filtro = [
    'Profesional',
    'Especialidad',
    'Dia',
    'Temperatura',
    'Paciente',
    'Adicionales',
    'SinFiltro',
  ];

  dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  fitroSeleccionado: string;
  escribir: string;
  adicional: string;
  dia: string;
  listaDinamicos: Array<Dinamicos>;
  turnoSeleccionado: Turnos;
  mostrarModal: boolean;
  mostrarModalDetalle: boolean;
  cancelarPro: boolean;
  rechazarPro: boolean;

  constructor(
    private data: DataService,
    private auth: AuthService,
    private toast: ToastrService
  ) {
    this.turnoSeleccionado = new Turnos();
  }

  ngOnInit(): void {
    var uid = '0';
    this.auth
      .getUserUid()
      .then((res) => {
        uid = res.toString();
        this.data.getUserByUid(uid).subscribe((res) => {
          this.usuario = res;
          if (this.usuario.rol == 'paciente') {
            this.data.getTurnos().subscribe((res) => {
              console.info(this.usuario.dni + 'ENTRA');
              this.listado = res.filter(
                (res) => res.paciente.dni == this.usuario.dni
              );
            });
          } else {
            if (this.usuario.rol == 'profesional') {
              this.data.getTurnos().subscribe((tur) => {
                this.listado = tur.filter(
                  (res) => res.profesional.dni == this.usuario.dni &&
                          res.paciente.dni == this.usuarioSeleccionado.dni
                );
              });
            } else {
              this.data.getTurnos().subscribe((res) => {
                this.listado = res;
              });
            }
          }
        });
      })
      .catch((res) => {
        uid = res.toString();
        console.log('Sin Usuario');
      });
  }
  mostrarEncuesta(dato: boolean) {
    console.log(this.listado);
    this.mostrarModal = dato;
  }
  tomarTurno(turno: Turnos) {
    this.turnoSeleccionado = turno;
    this.mostrarModalDetalle = true;
  }
  cerrarModalDetalle(dato: any) {
    this.mostrarModalDetalle = dato;
  }

  cancelar(turno: Turnos) {
    if (this.usuario.rol == 'paciente') {
      this.auth
        .updateEstadoTurno(turno, -1)
        .then((res) => {
          this.toast.success('Turno Cancelado con éxito');
        })
        .catch((error) => {
          this.toast.error(
            'Hemos tenido un problema la cancelar el turno',
            'Error'
          );
        });
    } else {
      if ((this.usuario.rol = 'profesional')) {
        this.turnoSeleccionado = turno;
        this.cancelarPro = true;
        this.mostrarEncuesta(true);
      }
    }
  }

  rechazar(turno: Turnos) {
    this.rechazarPro = true;
    this.turnoSeleccionado = turno;
    this.mostrarEncuesta(true);
  }

  aceptar(turno: Turnos) {
    this.auth
      .updateEstadoTurno(turno, 1)
      .then((res) => {
        this.toast.success('Turno Aceptado con éxito');
      })
      .catch((error) => {
        this.toast.error(
          'Hemos tenido un problema la cancelar el turno',
          'Error'
        );
      });
    this.turnoSeleccionado = undefined;
  }

  justificacion(value: boolean) {
    this.rechazarPro = value;
    this.cancelarPro = value;
  }
}
