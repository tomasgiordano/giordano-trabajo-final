import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  rol: string;
  nombre: string;
  apellido: string;
  img1: string;
  constructor(private route:Router) { }

  ngOnInit(): void {
    this.rol = localStorage.getItem('perfil');
    this.nombre = localStorage.getItem('nombre');
    this.apellido = localStorage.getItem('apellido');
    this.img1 = localStorage.getItem('img1');
  }

  solicitarTurno(){
    this.route.navigate(['home/sacarTurno']); 
  }
  
  altaAdmin(){
    this.route.navigate(['home/altaAdmin']); 
  }

  turnos(){
    this.route.navigate(['home/listadoTurnos']); 

  }

  horarios(){
    this.route.navigate(['home/horarios']); 
  }
}
