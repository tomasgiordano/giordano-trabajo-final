import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verificacion-cuenta',
  templateUrl: './verificacion-cuenta.component.html',
  styleUrls: ['./verificacion-cuenta.component.css']
})
export class VerificacionCuentaComponent implements OnInit {

  constructor(private route:Router, private auth:AuthService, private toast:ToastrService) { }
  email = "***@gmail.com";

  ngOnInit(): void {
    console.log(this.auth.getLogueado());
    if(this.auth.getLogueado())
    {
      this.email = this.auth.getCurrentUserMail();
      console.info(this.email);

    }
  }

  loguearse()
  {
    //this.route.navigate(['/Login']);
    this.auth.logout();
  }
  rEmail(){
    this.auth.sendVerificationEmail().then(res =>{
      //alert("Email reenviado con Éxito");
      this.toast.success("Email reenviado con Éxito");
 
    }).catch(error =>{
       
      //alert(error);
      this.toast.error(error,"Error");

    })
  }

}
