import { resolve } from '@angular/compiler-cli/src/ngtsc/file_system';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Logger, Turnos, Usuario, Profesional } from '../models/models.module';
import { rejects } from 'assert';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {

  constructor(private db: AngularFirestore, public data: DataService) { }

  public async logger(email: string) {
    try {
      const log = new Logger(email);

      await this.db.collection('log').add(log.toJSON);
    } catch (error) {
      console.log(error);
    }
  }

  public async getLogger(): Promise<Array<Logger>> {
    return new Promise<Array<Logger>>(async (resolve, rejects) => {
      let sub = this.db.collection<Logger>('log').valueChanges().subscribe(
        (data: Array<Logger>) => {
          data = data.sort((a, b) => {
            const dateA = new Date(this.dateTransform(a.fecha, a.hora));
            const dateB = new Date(this.dateTransform(b.fecha, b.hora));
            if (dateA < dateB) {
              return 1;
            } else if (dateA > dateB) {
              return -1;
            } else {
              return 0;
            }

          })
          resolve(data)
        }, err => rejects, () => {
          sub.unsubscribe();
        })
    })
  }

  dateTransform(fecha: string, hora: string) {
    const $DDMMYYYY_HHMM = `${fecha.replace(new RegExp('/', 'g'), '.')} ${hora}`
    var $ret = '';
    var $foo = $DDMMYYYY_HHMM.split('.');
    var $DD = $foo[0];
    var $MM = $foo[1];
    var $YYYY = $foo[2].split(' ')[0].trim();
    var $HH = $foo[2].split(' ')[1].split(':')[0].trim();
    var $MMM = $foo[2].split(' ')[1].split(':')[1].trim();
    return $YYYY + '-' + $MM + '-' + $DD + ' ' + $HH + ':' + $MMM;
  }

  public async getStats() {
    return new Promise(async (resolve, rejects) => {
      try {
        const turnos = await this.db.collection<Turnos>('turnos').ref.get();
        const medicos = await this.db.collection<Profesional>('usuarios').ref.where("rol", "==", "profesional").get();
        const arrMedicos: Array<Profesional> = [];
        const arrTurnos: Array<Turnos> = []
        turnos.forEach(t => arrTurnos.push(t.data()));
        medicos.forEach(m => arrMedicos.push(m.data()));
        console.log(arrMedicos);
        resolve({
          turnosEspecialidad: this.cantTurnosEspecialidad(arrTurnos),
          turnosDias: this.cantTurnosDia(arrTurnos),
          turnosSolicitados: this.cantTurnosSolicitados(arrTurnos, arrMedicos),
          turnosFinalizados: this.cantTurnosFinalizados(arrTurnos, arrMedicos)
        })

      } catch (error) {
        rejects(error);
      }
    })
  }

  private cantTurnosEspecialidad(arr: Array<Turnos>) {
    const especialidades: Array<string> = ['Oftalmología', 'Neurologia', 'Psiquiatría', 'Pediatría', 'Cardiologia', 'Radiología']
    let cant: Array<any> = []

    especialidades.forEach((a, index) => {
      cant.push({
        type: undefined,
        data: [0],
        name: especialidades[index]
      })
      arr.forEach((t: any) => {
        if (t.especialidad === a) cant[index].data[0]++;
      });
    });

    return cant;
  }

  private cantTurnosDia(arr: Array<Turnos>) {
    let cant: Array<any> = []
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    days.forEach((c, index) => {
      cant.push({
        type: undefined,
        data: [0],
        name: days[index]
      })
      arr.forEach(t => {

        if (new Date(t.fecha).getDay() === index) cant[index].data[0]++;
      });
    });

    return cant;
  }

  private cantTurnosSolicitados(arrTurnos: Array<Turnos>, arrMedicos: Array<Profesional>) {
    let cant: Array<any> = [];
    const date: Date = new Date();
    date.setDate(-7);
    arrMedicos.forEach((m, index) => {
      cant.push({
        type: undefined,
        data: [0],
        name: `${m.nombre} ${m.apellido}`
      });
      arrTurnos.forEach(t => {
        if (t.profesional.uid === m.uid && t.estado === 0 && new Date(t.fecha) >= date) cant[index].data[0]++;
      });
    });

    return cant;
  }

  private cantTurnosFinalizados(arrTurnos: Array<Turnos>, arrMedicos: Array<Profesional>) {
    let cant: Array<any> = [];
    const date: Date = new Date();
    date.setDate(-7);
    arrMedicos.forEach((m, index) => {
      cant.push({
        type: undefined,
        data: [0],
        name: `${m.nombre} ${m.apellido}`
      });
      arrTurnos.forEach(t => {
        if (t.profesional.uid === m.uid && t.estado > 1 && new Date(t.fecha) >= date) cant[index].data[0]++;
      });
    });

    return cant;
  }
}
