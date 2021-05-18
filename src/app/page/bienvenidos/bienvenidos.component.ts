import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bienvenidos',
  templateUrl: './bienvenidos.component.html',
  styleUrls: ['./bienvenidos.component.css']
})
export class BienvenidosComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }

  login(){
    this.route.navigate(['/login']); 
  }

  register(){
    this.route.navigate(['/registro']); 
  }
}
