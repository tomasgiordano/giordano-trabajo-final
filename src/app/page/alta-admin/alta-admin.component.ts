import { Component, OnInit } from '@angular/core';
import { info } from 'console';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/models.module';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-alta-admin',
  templateUrl: './alta-admin.component.html',
  styleUrls: ['./alta-admin.component.css']
})
export class AltaAdminComponent implements OnInit {

  emailClass:'';
  claveClass:'';
  email:string;
  clave:string;
  usuario:Usuario = new Usuario();
  img1:any;
  img2:any;
  lista:Array<any>;
  especialidades:Array<any> = new Array<any>();

  constructor(private auth:AuthService, private data:DataService, private toastr:ToastrService ) { }
 

  Entrar(){
    
    if(this.validacion())
    {
      this.auth.registerAdmin(this.usuario);

    }
    
  }

  validacion()
  {  
    if(this.usuario.nombre != null && this.usuario.apellido !=null && this.usuario.email !=null && this.usuario.dni !=null && this.usuario.clave !=null && this.clave !=null )
    {
      if(this.usuario.clave == this.clave)
      {
            return true;
      }
      else
      {
        this.toastr.error("Las contraseñas no Coinciden", "ERROR");
        return false;

      }

    }
    else
    { 
      this.toastr.error("Datos incompletos o inválidos", "ERROR");
      return false;
    }
  
  }

 
  ngOnInit(): void {
    
    this.usuario.rol = "admin";
      

  }
   
 
}