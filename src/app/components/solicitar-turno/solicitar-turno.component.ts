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

  
  usuario:any = new Usuario();

  especialidades:Array<any> = new Array<any>();
  lista:Array<any>;
  turno:Turnos = new Turnos();
  prefesionales:any = new Profesional();
  horas:Array<any> = [];

  constructor(private auth:AuthService, private data:DataService, private toastr:ToastrService ) { }
 

  Entrar(){  
    
    this.turno.paciente = this.usuario;
  
     console.info(this.turno);
    if(this.validacion())
    {
      console.info(this.turno);
      this.auth.registerTurnos(this.turno).then(res=>{
        console.log("Guarda bien el turno");
        this.toastr.success("Turno Guardado con Éxito");
      }).catch(error =>{
        console.log("Pincho el turno pa");
        console.info(error);
      })

    }
     
  }

  cargarEspecialidades(){

    this.lista = (this.especialidades.filter(res => res.completed == true )).map(res => res.name);
    console.info(this.lista);
  }
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 ;
  }

  ngOnInit(): void {

      this.data.getEspecialidades().subscribe( res =>{
            res.forEach(item =>{
              
              let objet = {name: item.nombre, completed: false, color: 'primary'} 

              this.especialidades.push(objet);
                
            })

            console.info(this.especialidades);
      }) 
      var uid="0";
     this.auth.getUserUid().then(res =>{
       uid = res.toString();
       this.data.getUserByUid(uid)
          .subscribe(res => {
            this.usuario = res;
            console.info(this.usuario);
          })
     }).catch(res =>{
      uid = res.toString();
      console.log("Sin Usuario");
     });

    // this.data.getProfesionales("Kinesiología");

  }
  validacion()
  {  
    if(this.turno.paciente.nombre != null && this.turno.paciente.apellido !=null && this.turno.paciente.email !=null && this.turno.paciente.dni !=null && this.turno.hora !=null && this.turno.fecha !=null && this.turno.especialidad !=null)
    {
       return true;
    }
    else
    { 
      this.toastr.error("Datos incompletos o inválidos", "ERROR");
      return false;
    }
  
  }

  cargarProfesionales()
  {    
    this.horas = [];
    this.turno.fecha = undefined;
     this.data.getProfesionales(this.turno.especialidad).then(res =>{
         console.log(this.turno.especialidad);
        if(res.length > 0)
        {
        this.prefesionales = res;
        console.info(this.prefesionales);
        }
        else
        {
          this.prefesionales = ["No hay ningun especialista"];
        }
     })
  }

  cargarHora()
  {
    
    this.horas = [];
    
    let date = new Date(this.turno.fecha);
    let dia="";
    let dias=[];
    console.info();
    switch(date.getDay())
    {
      case 0:
        dia = "Lunes";
        break;
      case 1:
         dia = "Martes";
        break;
      case 2:
        dia = "Miércoles";

        break;
      case 3:
        dia = "Jueves";
        
        break;
      case 4:
        dia = "Viernes";

        break;
      case 5:
        dia = "Sábado";
        
        break;
      case 6:
        dia = "Domingo";

        break;
    }
   // this.horas = this.turno.profesional.atencion.map(function(x){return x.hora});
   console.log(dia);
    dias = this.turno.profesional.atencion.filter(function(x){return x.dia == dia})
    if(dias.length>0)
    {
       this.horas = dias.map(function(x){return x.hora});
       console.info(this.horas);
    }
    else
    {
      this.toastr.warning("El profesional no atiende el dia de la semana indicado");
    }
  }




   
 

  


}
