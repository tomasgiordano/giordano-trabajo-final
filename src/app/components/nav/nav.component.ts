import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  rol: string

  constructor(private route:Router,private auth:AuthService) { }

  ngOnInit(): void { 
    this.rol = localStorage.getItem('perfil');
  }

  logOut()
  {
    this.auth.logout();
  }

}
