import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Profesional, Usuario } from '../models/models.module';

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

  getUser(uid: string): Promise<Usuario>{
    return new Promise(async (resolve,reject) => {

      try{
        const user = await this.dbUsersRef.doc(uid).ref.get();
        resolve(user.data() as Usuario);
      }catch(err){
        reject(err);
      }
    });
  }

  async getTurnoPacientes(uid:string)
  {
    try{
      const turnosRef = await this.dbTurnosRef.ref.where("profesional.uid", "==", uid).get();
      const pacientes = turnosRef.docs.map(t => {
        const ret =  t.data();
        
        return{
          ...ret.paciente
        };
      });

      return this.filterRepeated(pacientes);
    }catch(err){
      console.log(err);
    }
  }

  filterRepeated(arr: Array<any>): Array<any>{
    let count: number;
    let ret: Array<any> = [];
    for(let i = 0; i < arr.length; i++){
      count = 0;
      for(let j = 0; j <= i; j ++){
        if(arr[i].uid === arr[j].uid){
          count++;
        }
      }
      if(count == 1){
        ret.push(arr[i]);
      }
    }

    return ret;
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

  async getMedicos(){
    return new Promise(async (resolve,reject) => {

      try{
        const medicos = await this.dbUsersRef.ref.where("rol", "==", "profesional").get();
        
        resolve(this.transformData(medicos));
      }catch(err){
        reject(err);
      }
    });
  }

  async getMedico(uid: string): Promise<Profesional>{
    return new Promise(async (resolve,reject) => {
      try{

        const medico = await this.dbUsersRef.doc(uid).ref.get();

        resolve(medico.data() as Profesional);
      }catch(err){
        reject(err);
      }
    });
  }

  transformData(med: any){
    let arr = []

    med.forEach(x => {
      const m = x.data();
      if(m.especialidades.length > 0 ){
        let medicosTransform = [];
        m.especialidades.forEach(a => {
          console.log(a);
          medicosTransform.push({
            img1: m.img1,
            nombre: m.nombre,
            apellido: m.apellido,
            especialidad: a,
            uid: m.uid
          });
        })

        arr = arr.concat(medicosTransform);
      }else{
        arr.push({
          img1: m.img1,
          nombre: m.nombre,
          apellido: m.apellido,
          especialidad: m.especialidades[0],
          uid: m.uid
        });
      }

      
    });

    return arr;
  }
}
