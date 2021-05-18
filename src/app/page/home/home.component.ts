import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/models.module';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  usuario:any = new Usuario();
  constructor(private route:Router,private data:DataService,private auth:AuthService) { }

  ngOnInit(): void { 

    var uid="0";
    this.auth.getUserUid().then(res =>{
      uid = res.toString();
      this.data.getUserByUid(uid)
          .subscribe(res => {
            this.usuario = res;
          })
    }).catch(res =>{
      uid = res.toString();
      console.log("Sin Usuario");
    });
  }
  
  logOut()
  {
    this.auth.logout();
  }

}
