import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Turnos, Usuario } from 'src/app/models/models.module';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-confirmar-turno',
  templateUrl: './confirmar-turno.component.html',
  styleUrls: ['./confirmar-turno.component.css']
})
export class ConfirmarTurnoComponent implements OnInit {

  @Input() mostrar:boolean;
  @Input() turno:Turnos; 
  @Output() eventoMostrarModal = new EventEmitter<boolean>();

  constructor(private toastr:ToastrService,private auth:AuthService) { }

  ngOnInit(): void {
  }

  Entrar(){  
      console.log(this.turno);
      this.auth.registerTurnos(this.turno).then(res=>{
        console.log("Guarda bien el turno");
        this.toastr.success("Turno Guardado con Éxito");
      }).catch(error =>{
        console.info(error);
      })
  }

  cerrar() 
  { 
    this.eventoMostrarModal.emit(false);
  }
}
