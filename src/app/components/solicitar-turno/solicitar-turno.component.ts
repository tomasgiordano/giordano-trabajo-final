import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Profesional, Turnos, Usuario } from 'src/app/models/models.module';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.css'],
  
})
export class SolicitarTurnoComponent implements OnInit {

  medicos: Array<any> = [];
  turno:Turnos = new Turnos();
  turnosDisponibles:Array<any>;
  usuario:any = new Usuario();
  mostrarModalDetalle: boolean;

  constructor(private data: DataService,private auth:AuthService) {
    this.data.getMedicos()
        .then((data: [])=> this.medicos = data)
        .catch(console.error)
        .finally(() => console.log(this.medicos));
  }
 

  async ngOnInit(): Promise<void> {
    try{
      var uid = await this.auth.getUserUid();
      this.usuario = await this.data.getUser(uid);
      console.log(this.usuario);
    }catch(err){
      console.error(err);
    }

    // this.auth.getUserUid().then(res =>{
    //   uid = res.toString();
    //   this.data.getUserByUid(uid)
    //      .subscribe(res => {
    //        this.usuario = res as Usuario;
    //      })
    // }).catch(res =>{
    //  uid = res.toString();
    //  console.log("Sin Usuario");
    // });
  }
  
  async onSelect(med: any){
    this.turno.profesional = await this.data.getMedico(med.uid);
    this.turnosDisponibles = new Array<any>();
    this.turno.especialidad = med.especialidad;
    this.Fechas();
  }

  tomarFechaHora(evento:any)
  { 
    this.turno.fecha = evento.fecha;
    this.turno.hora = evento.hora;
    this.turno.paciente = this.usuario;
    console.log(this.turno);
    this.mostrarModalDetalle = true;
    console.log(this.turno.fecha + ' ' + this.turno.hora);
  }

  cerrarModalDetalle(dato: any) {
    this.mostrarModalDetalle = dato;
  }
  
  transformFech(fecha:string)
  {  
    let dia;
    switch(fecha)
    {
        case "Lunes":
           dia = 1;
        break;
        case "Martes":
         dia = 2; 
        break;

        case "Miércoles":
          dia = 3; 
        break;

        case "Jueves":
          dia = 5; 
        break;

        case "Viernes":
          dia = 5; 
        break;

        case "Sábado":
          dia = 6; 
        break;
    } 
    return dia;
  }  

  ExisteTurno(fecha:string,hora:any,num:number,dia:string,mes:number)
  { 
     let turnosDisponibles = [];
     this.data.TurnoFecha(fecha,hora).then(res =>{
        turnosDisponibles = res;
        if(turnosDisponibles.length == 0)
        { 
          this.turnosDisponibles.push({fecha:fecha,hora:hora,numero:num,nombre:dia,mes:mes+1});
        }
      })  
  }

  OrdenarLista()
  {
    for (let index = 0; index < this.turnosDisponibles.length; index++) {
      
      let element = this.turnosDisponibles[index].numero;
      let siguiente = this.turnosDisponibles[index+1].numero;
      let aux=0;
  
      if(element>siguiente)
      {
        aux = this.turnosDisponibles[index];
        this.turnosDisponibles[index] =  this.turnosDisponibles[index+1];
        this.turnosDisponibles[index+1] = this.turnosDisponibles[index];
      }
      
    }
  }

  Fechas()
  {
    
    let day = new Date();
    let turnosDisponibles = [];
    //let horas = [];

    this.turno.profesional.atencion.forEach(element => {
       
    let dia = this.transformFech(element.dia);
    let dif = day.getDay() - dia;
    
    let fecha:Date = new Date();
    
    if(dif > 0)
    { 
      fecha.setDate(fecha.getDate() - dif);

      
    }
    else
    {  
      if(dif<0)
      {
        
        fecha.setDate(fecha.getDate() - dif);
        
      }
    }
    if(dif <1)
    {
      let fe  = this.parserFecha(fecha);
      this.ExisteTurno(fe,element.hora,fecha.getDate(),element.dia,fecha.getMonth());

    }
    let semana:Date = new Date();
     
   for (let i = 1; i < 4; i++) {
     semana.setDate(fecha.getDate()+7*i);
     let sem = this.parserFecha(semana)
     this.ExisteTurno(sem,element.hora,semana.getDate(),element.dia,semana.getMonth());
     
   }
  
   
    
        // turnosDisponibles.push({fecha:fecha,hora:element.hora});
    
   // console.info(turnosDisponibles);

    });

    

  }

  parserFecha(fecha:Date)
  {
    let dia = fecha.getDate();
    let mes = fecha.getMonth()+1;
    let anio = fecha.getFullYear() ;
  //  let feche = dia + "-" + mes + "-" + anio;
  let feche;
  if(dia>9)
  {
     feche = anio + "-" + mes + "-" + dia;

  }
  else
  {
     feche = anio + "-" + mes + "-" + "0"+dia;

  }
    
    return feche;
   
  }
}
