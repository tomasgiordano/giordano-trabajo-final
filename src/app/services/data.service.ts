import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Profesional } from '../models/models.module';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  dbEspecialidadRef: AngularFirestoreCollection<any>;
  dbUsersRef:AngularFirestoreCollection<any>;
  dbTurnosRef:AngularFirestoreCollection<any>;

  constructor(private db: AngularFirestore, private authService: AuthService) {
    this.dbEspecialidadRef = this.db.collection("especialidades");
    this.dbUsersRef = this.db.collection("usuarios");
    this.dbTurnosRef = this.db.collection("turnos");
  }


  getEspecialidades() {
    return this.dbEspecialidadRef.valueChanges();
  }

  getTurnos(){
    return this.dbTurnosRef.valueChanges();
  }

  getUserByUid(uid: string) {
    return this.dbUsersRef.doc(uid).valueChanges();
  }

  async getProfesionales(especialidad:string)
  { 
    let usrsRef = await this.dbUsersRef.ref.where("rol", "==", "profesional").get();
    let listado:Array<any> = new Array<any>();
    let profesionales = [];
    let aux = [];

    usrsRef.docs.map(function(x){
        listado.push(x.data());
    });

    listado.forEach(element => {
        aux.push(element.especialidades)
        aux[listado.indexOf(element)].forEach(res => {
          if(res == especialidad)
          {
            profesionales.push(element);
          }
        });
    });

    console.info(profesionales);
    return profesionales;
  }

  async TurnoFecha(fecha:string,hora:any)
  {
    let turnos = [];
    let turnosUfs =  await this.dbTurnosRef.ref.where("fecha", "==", fecha).where("hora","==",hora).get();
    turnosUfs.docs.map(function(x){
      turnos.push(x.data());
    }); 
    return turnos;
  }
}
