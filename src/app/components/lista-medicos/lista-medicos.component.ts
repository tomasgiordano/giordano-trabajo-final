import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-lista-medicos',
  templateUrl: './lista-medicos.component.html',
  styleUrls: ['./lista-medicos.component.css']
})
export class ListaMedicosComponent implements OnInit {

  @Input() medicos: Array<any>;

  constructor() { }

  ngOnInit(): void {
  }

  listToString(especialidades: string[]){
    let listaEspecilidades: string = '';

    especialidades.forEach((e,index) =>{
      if(especialidades.length-1 == index){
        listaEspecilidades += ` ${e} `;
      }else{
        listaEspecilidades += ` ${e} -`;
      }
    })
  }

}
