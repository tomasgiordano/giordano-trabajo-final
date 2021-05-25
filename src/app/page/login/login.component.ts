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
    { id: 0, nombre: "Administrador", correo: "castrocarlos313@gmail.com", clave: "123456" },
    { id: 1, nombre: "Paciente", correo: "tomiigiordano@gmail.com", clave: "123456"},
    { id: 2, nombre: "Profesional", correo: "tomasgiordano18@gmail.com", clave: "123456"}
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
  
  resolved(captchaResponse: any) {
    this.recaptcha = captchaResponse;
    console.log("captcha: " + this.recaptcha);
  }

}

