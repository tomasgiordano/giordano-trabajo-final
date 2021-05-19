import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
    this.rol = localStorage.getItem('perfil');
    this.nombre = localStorage.getItem('nombre');
    this.apellido = localStorage.getItem('apellido');
    this.img1 = localStorage.getItem('img1');
  }

}
