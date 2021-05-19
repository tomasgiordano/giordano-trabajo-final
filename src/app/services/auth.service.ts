import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

import * as firebase from "firebase/app";
import * as admin from "firebase-admin";

import "firebase/auth";
import "firebase/firestore";
import { Dinamicos, Profesional, Turnos, Usuario } from '../models/models.module';
import { promise } from 'protractor';
import { rejects } from 'assert';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuario:Observable<firebase.default.User>;

  constructor(public router: Router,
              public angularFireAuth:AngularFireAuth,
              public storage:AngularFireStorage,
              private db: AngularFirestore,
              private toas:ToastrService,
              )
  {
    this.usuario = this.angularFireAuth.authState;
  }

  getCurrentUserMail(): string 
  {
    return firebase.default.auth().currentUser.email;
  }

  getLogueado()
  {
    let user = this.angularFireAuth.currentUser;
    if(user != undefined && user != null)
    { 
      return true;
    }
    else
    {
      return false;
    }
  }

  getUserUid()
  {  
    return new Promise((resolve, reject) => {
      this.angularFireAuth.onAuthStateChanged(function(user){
        if(user)
        {
          resolve(user.uid)
        }
        else
        {
          resolve("0")
        }
      })       
    })     
  }

  logout()
  {
    this.angularFireAuth.signOut().then(() => {
      localStorage.clear();
      this.router.navigate(['']);
    })
  }

  async login(email: string, password: string)
  {
    return new Promise(async (resolve, reject) => {
      try{
        const user = await this.angularFireAuth.signInWithEmailAndPassword(email, password);
        const uid: any = await this.getUserUid();
        console.log(uid);
        this.db.collection('usuarios').doc(uid).valueChanges().subscribe(({rol, nombre, apellido, estado} )=> {

            if(!estado){
              this.angularFireAuth.signOut();
              this.toas.error("Usuario deshabilitado","Error");
              throw "No valido";
            }
            this.router.navigate(['home']);
            localStorage.setItem('perfil',rol);
            localStorage.setItem('nombre',nombre);
            localStorage.setItem('apellido',apellido);
            resolve(user);
          
        })
      }catch(err){
        this.toas.error("Usuario Inválido","Error");
        reject(err);
      }
      // this.angularFireAuth.signInWithEmailAndPassword(email, password)
      // .then(user => {
      //   this.router.navigate(['home']);
      //   resolve(user);
      // }).catch(err => {
        
      // });
    })
  }
  
  subirArchivo(nombreArchivo: string, datos: any,metadata:any)
  {
    return this.storage.upload(nombreArchivo, datos, {customMetadata:metadata });
  }

  referenciaCloudStorage(nombreArchivo: string)
  {
    return this.storage.ref(nombreArchivo).getDownloadURL();
  }
  
  public uploadImg( usuario: Usuario, imagen1, imagen2)
  {
    return new Promise((resolve,rejects) =>{
      this.subirArchivo(usuario.email+"_img1",imagen1,
      {
        nombre:usuario.nombre,
        apellido:usuario.apellido,
        dni:usuario.dni,
        id:usuario.id,
        email:usuario.email,
        rol:usuario.rol,
      }).then((img)=>{
        this.subirArchivo(usuario.email+"_img2",imagen2,
        {
          nombre:usuario.nombre,
          apellido:usuario.apellido,
          dni:usuario.dni,
          id:usuario.id,
          email:usuario.email,
          rol:usuario.rol,
        }).then(img2=>{
          img.ref.getDownloadURL().then(data=>{
            usuario.img1 = data;
            console.log(data); 
            img2.ref.getDownloadURL().then( data2=>{
              usuario.img2 = data2;
              resolve(data2);
            });
          });  
        });
      });
    })
  }

  //Registro Paciente
  async signUp(usuario: Usuario, img1, img2)
  {
    var router = this.router;
    var dbRef = this.db;
    var ad = this;
    this.uploadImg(usuario, img1, img2).then(res =>
      {
        this.angularFireAuth.createUserWithEmailAndPassword(usuario.email, usuario.clave).then(function(credencial)
        {
          ad.router.navigate(['/home']);
          dbRef.collection('usuarios').doc(credencial.user.uid).set({
            uid: credencial.user.uid,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            email: usuario.email,
            rol: usuario.tipo,
            dni:usuario.dni,
            obraSocial: usuario.obraSocial,
            edad: usuario.edad,
            estado:true,
            img1: usuario.img1,
            img2: usuario.img2
          })
          .then(function (docRef) {
            console.log("Bien");
          });
          credencial.user.getIdToken()
          .then(function (token) {
            localStorage.setItem('token', token);

          });
        })
        .catch(function (error) {
          console.error("Error: ", error);
          ad.toas.error(error,"Error");
        });
      })
  }

  //Registro Profesional
  async registerPro(usuario:Usuario,especialidades:Array<any>,img1)
  {
    return new Promise(async (resolve, reject) => {

      try{
        const imgRef = await this.subirArchivo(usuario.email+"_img1",img1,
        {
          nombre:usuario.nombre,
          apellido:usuario.apellido,
          dni:usuario.dni,
          id:usuario.id,
          email:usuario.email,
          rol:usuario.rol,
        })
        const url = await imgRef.ref.getDownloadURL()
        const res = await this.angularFireAuth.createUserWithEmailAndPassword(usuario.email, usuario.clave);
        await this.db.collection("usuarios").doc(res.user.uid).set({
          uid: res.user.uid,
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          email: usuario.email,
          rol: usuario.tipo,
          dni:usuario.dni,
          estado:true, 
          especialidades:especialidades,
          img1: url
          })
        this.router.navigate(['/login']);
        resolve(res);   
      }catch(err){
        this.toas.error(err,"Error");
        reject(err);
      }
    });
  }

  //Registro Turnos
  async registerTurnos(turno:Turnos)
  {
    return new Promise((resolve, reject) =>{
      this.db.collection("turnos").ref.orderBy('id',"desc").limit(1).get().then(res=>{    
        res.forEach(a=>{
          let ida =  Number(a.id) + 1;
          this.db.collection("turnos").doc(ida.toString()).set({
            paciente:turno.paciente,
            profesional:turno.profesional,
            //fecha: turno.fecha.getFullYear() + "-" + (turno.fecha.getMonth()+1) + "-" + turno.fecha.getDate(),
            fecha:turno.fecha,
            id:ida,
            hora:turno.hora,
            estado:turno.estado,
            especialidad:turno.especialidad,
            comentario:turno.comentario
          }).then(res=>{
            resolve(true);
          }).catch(error=>{
            reject(error);
            this.toas.error(error,"Error");
          })
        })
      }); 
    });
  }

  //Registro de Admin
  async registerAdmin(usuario:Usuario){
    return new Promise((resolve, reject) => {
      this.angularFireAuth.createUserWithEmailAndPassword(usuario.email, usuario.clave)
      .then(res => {
          this.router.navigate(['/login']);  
          this.db.collection("usuarios").doc(res.user.uid).set({
          uid: res.user.uid,
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          email: usuario.email,
          rol: usuario.rol,
          dni:usuario.dni,
          estado:true
        })
        resolve(res);
      })
      .catch(error => { reject(error) });
    });
  }

  updateHorario(actor:Profesional)
  { 
    return  this.db.collection('usuarios').doc(actor.uid.toString()).update({
      atencion: actor.atencion,
    }) 
  }

  bajaTurno(turno:Turnos)
  {   
    return  this.db.collection('turnos').doc(turno.id.toString()).update({
      estado: -1,
    }) 
  }

  updateEstadoTurno(turno:Turnos,estado:number)
  { 
    return  this.db.collection('turnos').doc(turno.id.toString()).update({
      estado: estado,
    }) 
  }

  updateOpinion(turno:Turnos,user:Usuario,valor:string,valor2:number,edad ?:number,temperatura?:number,presion?:number,datosAdicional?:Array<any>)
  { 
    if(user.rol == "paciente")
    {
      return  this.db.collection('turnos').doc(turno.id.toString()).update({
        opinionPaciente:valor,
        calificacionPaciente:valor2
      }) 
    }
    else
    { 
      console.info(datosAdicional);
      return  this.db.collection('turnos').doc(turno.id.toString()).update({
        opinionProfesional:valor,
        calificacionProfesional:valor2,
        edad:edad,
        temperatura:temperatura,
        presion:presion,
        datosAdicionales:datosAdicional
      }) 
    }
  }

  upadteJustificacion(turno:Turnos,valor:string)
  {
    return  this.db.collection('turnos').doc(turno.id.toString()).update({
      comentario:valor,
    }) 
  }
}