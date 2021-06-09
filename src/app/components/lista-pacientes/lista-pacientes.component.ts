import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-lista-pacientes',
  templateUrl: './lista-pacientes.component.html',
  styleUrls: ['./lista-pacientes.component.css']
})
export class ListaPacientesComponent implements OnInit {

  @Input() listado:any;
  @Output() enventoPaciente = new EventEmitter<any>();
  
  constructor(private data:DataService) { }

  ngOnInit(): void {
    
  }

  seleccionarPaciente(dato:any)
  {  
    this.enventoPaciente.emit(dato);
  }
}
