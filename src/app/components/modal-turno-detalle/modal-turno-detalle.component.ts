import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Turnos, Usuario } from 'src/app/models/models.module';

@Component({
  selector: 'app-modal-turno-detalle',
  templateUrl: './modal-turno-detalle.component.html',
  styleUrls: ['./modal-turno-detalle.component.css']
})
export class ModalTurnoDetalleComponent implements OnInit {
  
  @Input() mostrar:boolean;
  @Input() turno:Turnos; 
  @Input() user:Usuario;
  @Output() eventoMostrarModal = new EventEmitter<boolean>();
  @Output() eventoMostrarEncuesta = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {

    console.info(this.turno);
  }
 
  cerrar() 
  { 
    
    this.eventoMostrarModal.emit(false);
  }

  encusesta()
  { 
    this.eventoMostrarModal.emit(false);

    this.eventoMostrarEncuesta.emit(true);
  }

}
