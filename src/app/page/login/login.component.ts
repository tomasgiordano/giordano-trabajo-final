import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  emailClass:'';
  claveClass:'';
  email:string;
  clave:string;
  recaptcha: any;
  siteKey:string;
  desa:boolean = false;

  constructor(private auth:AuthService) { 
  }

  ngOnInit(): void {
  }

  usuarios: Array<any> = [
    { id: 0, nombre: "Administrador", correo: "admin@admin.com", clave: "123456" },
    { id: 1, nombre: "Paciente", correo: "paciente@paciente.com", clave: "123456"},
    { id: 2, nombre: "Profesional", correo: "profesional@profesional.com", clave: "123456"}
  ] 

  onChange(id) 
  {
    console.log("llega");
    console.info(this.usuarios[id].correo);
    this.email = this.usuarios[id].correo;
    this.clave = this.usuarios[id].clave;
  }

  Entrar()
  {
    this.auth.login(this.email,this.clave).then( res=>{
      console.log("se loguea");
    
    }).catch(error =>{
      console.log("anda");
    })
  }

}

