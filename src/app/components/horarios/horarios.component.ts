import { Component, OnInit} from '@angular/core';
import { timeStamp } from 'console';
import { ToastrService } from 'ngx-toastr';
import { timer } from 'rxjs';
import { Profesional } from 'src/app/models/models.module';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent implements OnInit {

  constructor(private auth:AuthService,private data:DataService,private toast:ToastrService) { }

  dias = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
  horarios = [];
  dia:any;
  hora:any;
  profesional:any = new Profesional();
  turno:any;
  displayedColumns: string[] = ['Nombre', 'Día', 'Hora','Acción'];
  ngOnInit(): void {
  
    var uid="0";
    this.auth.getUserUid().then(res =>{
      uid = res.toString();
      this.data.getUserByUid(uid)
        .subscribe(res => {
          this.profesional = res;
        })
    }).catch(res =>{
    uid = res.toString();
    console.log("Sin Usuario");
    });
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 ;
  }
  setHorarios(inicio:number,final:number)
  {
    this.horarios = [];
    for (let index = inicio; index < final; index++) {
      let time = index + ":" + "00";
      this.horarios.push(time);
    } 

    console.info(this.horarios);

  }

  sabado()
  {
    if(this.dia == "Sábado")
    {
      this.setHorarios(8,15);
    }
    else
    {
      this.setHorarios(8, 20);

    }
  }

  atencion()
  { 
    if(this.dia != "Sábado")
    {
      if(this.turno == "Tarde")
      {
        this.profesional.atencion.push({dia:this.dia,hora:"14:00"});
        this.profesional.atencion.push({dia:this.dia,hora:"15:00"});
        this.profesional.atencion.push({dia:this.dia,hora:"16:00"});
        this.profesional.atencion.push({dia:this.dia,hora:"17:00"});
        this.profesional.atencion.push({dia:this.dia,hora:"18:00"});
        this.profesional.atencion.push({dia:this.dia,hora:"19:00"});
      }
      else
      {
        this.profesional.atencion.push({dia:this.dia,hora:"8:00"});
        this.profesional.atencion.push({dia:this.dia,hora:"9:00"});
        this.profesional.atencion.push({dia:this.dia,hora:"10:00"});
        this.profesional.atencion.push({dia:this.dia,hora:"11:00"});
        this.profesional.atencion.push({dia:this.dia,hora:"12:00"});
        this.profesional.atencion.push({dia:this.dia,hora:"13:00"});
      }
    }
    else
    {
      this.profesional.atencion.push({dia:this.dia,hora:"8:00"});
      this.profesional.atencion.push({dia:this.dia,hora:"9:00"});
      this.profesional.atencion.push({dia:this.dia,hora:"10:00"});
      this.profesional.atencion.push({dia:this.dia,hora:"11:00"});
      this.profesional.atencion.push({dia:this.dia,hora:"12:00"});
      this.profesional.atencion.push({dia:this.dia,hora:"13:00"});
    }
    
    this.auth.updateHorario(this.profesional).then(res =>{
    this.toast.success("Día y horario guardado con éxito");
    }).catch(error =>{
      this.toast.error(error,"Error");
    });

    
  }

  eliminar(item)
  { 
   // console.log(item);
    let aux:Array<any> = new Array();
    let nuev:Array<any> = new Array();

    aux.push(this.profesional.atencion);
    
    aux[0].splice(aux[0].indexOf(item),1);
    
    this.profesional.atencion = aux[0];
    this.auth.updateHorario(this.profesional).then(res =>{
      this.toast.success("Registro Eliminado con éxito");
  }).catch(error =>{
    this.toast.error(error,"Error");
  });
  }
}
