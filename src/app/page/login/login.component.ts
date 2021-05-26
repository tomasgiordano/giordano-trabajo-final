import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  recaptcha: '';
  siteKey:string;
  desa:boolean = false;
  sitekey:string;
  formGroup: FormGroup;

  constructor(private auth:AuthService,private formBuilder: FormBuilder) { 
    this.siteKey = '6Le6rO8aAAAAACqYxNhdHrTwqzD0Yl2HGEpBqUF5'
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
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
    if(this.recaptcha!=''){
      this.auth.login(this.email,this.clave).then( res=>{
        console.log("se loguea");
      
      }).catch(error =>{
        console.log("anda");
      })
    }

  }
  
  resolved(captchaResponse: any) {
    this.recaptcha = captchaResponse;
    console.log("captcha: " + this.recaptcha);
  }

}

