import { NgModule } from '@angular/core';
import { CommonModule, Time } from '@angular/common';
import { StringifyOptions } from 'querystring';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ModelsModule { }

export class Dinamicos{
 propiedad:string;
 valor:string;

 constructor(prop:string,value:string){
   this.propiedad = prop;
   this.valor = value;
 }
}
export class Usuario{

  id:string;
  tipo:string;
  nombre:string;
  apellido:string;
  email:string;
  edad:string;
  obraSocial:string;
  dni:string;
  clave:string;
  estado:number;
  img1:string;
  img2:string;
  rol:string;

}
export class Profesional{

  uid:string;
  tipo:string;
  nombre:string;
  apellido:string;
  email:string;
  dni:string;
  estado:string;
  img1:string;
  especialidades:Array<any>;
  atencion:Array<any>;

  constructor(){
    this.tipo = "profesional";
    this.nombre = "";
    this.apellido = "";
    this.uid = "";
    this.dni = "";
    this.email = "";
    this.especialidades = [];
    this.estado = "0";
    this.atencion = [];
  }
}

export class Turnos{
  
  id:number;
  paciente:Usuario;
  profesional:Profesional = new Profesional();
  fecha:Date; 
  hora:Time;
  estado:number;
  comentario:string;
  especialidad:string;
  calificacionPaciente:number;
  opinionPaciente:string;
  opinionProfesional:string;
  calificacionProfesional:number;

  constructor()
  {
    this.estado=0;
    this.comentario = "";
  }

  get parserExcel(){
    return {
      id: this.id,
      paciente: this.paciente.nombre + ' ' + this.paciente.apellido,
      profesional: this.profesional.nombre + ' ' + this.profesional.apellido,
      fecha: this.fecha,
      hora: this.hora,
      comentario: this.comentario,
      especialidad: this.especialidad,
      calificacionPaciente: this.calificacionPaciente,
      opinionProfesional: this.opinionProfesional,
      calificacionProfesional: this.calificacionProfesional
    }
  }
}