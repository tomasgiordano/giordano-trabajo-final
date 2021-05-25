import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { Turnos, Usuario } from 'src/app/models/models.module';

@Component({
  selector: 'app-turno-detalle',
  templateUrl: './turno-detalle.component.html',
  styleUrls: ['./turno-detalle.component.css']
})
export class TurnoDetalleComponent implements OnInit {
  @Input() turno:Turnos;
  @Input() user:Usuario;
  @Output() eventoMostrarModal = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
   
  }

    MostrarModal() {
    this.eventoMostrarModal.emit(true);
   // this.turno = null;
    
  }

}
