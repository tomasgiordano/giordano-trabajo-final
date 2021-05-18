import { Component, OnInit } from '@angular/core';
import { info } from 'console';
import { Usuario } from 'src/app/models/models.module';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from "../../services/auth.service";
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
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
  
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  Entrar(){
    this.cargarEspecialidades();
    if(this.validacion())
    {
        if(this.usuario.tipo == "profesional")
        {
          this.auth.registerPro(this.usuario,this.lista,this.img1);
        }
        else
        {
          this.auth.signUp(this.usuario,this.img1,this.img2);
        }
    }
  }

  validacion()
  {  
    if(this.usuario.nombre != null && this.usuario.apellido !=null && this.usuario.email !=null && this.usuario.dni !=null && this.usuario.clave !=null && this.clave !=null && this.usuario.tipo)
    {
      if(this.usuario.clave == this.clave)
      {
        if(this.usuario.tipo=="paciente")
        {
          if(this.usuario.img1 != null && this.usuario.img2 !=null)
          {
            return true;
          }
          else
          {
            this.toastr.error("Las dos imagenes son requeridas", "ERROR");
            return false;
          }
        }
        else
        {
          if(this.lista.length>0){
            
            console.info(this.lista);
            return true;

          }
          else
          { 
            this.toastr.error("Debe seleccionar almenos una especialidad", "ERROR");
            return false;
          }
        }
      }
      else
      {
        this.toastr.error("Las contraseñas no coinciden", "ERROR");
        return false;
      }
    }
    else
    { 
      this.toastr.error("Datos incompletos o inválidos", "ERROR");
      return false;
    }
  }

  cargarEspecialidades(){
    this.lista = (this.especialidades.filter(res => res.completed == true )).map(res => res.name);
    console.info(this.lista);
  }

  ngOnInit(): void {
      this.data.getEspecialidades().subscribe( res =>{
            res.forEach(item =>{
              let objet = {name: item.nombre, completed: false, color: 'primary'} 
              this.especialidades.push(objet);
            })
            console.info(this.especialidades);
      })
  }

  onFileSelected(event) {
    this.img1 = event.target.files[0];
    this.usuario.img1=" ";
    console.log(this.img1);
  }

  onFileSelected2(event) {
    this.img2 = event.target.files[0];
    this.usuario.img2=" ";
    console.log(this.img2);
  }

  updateAllComplete(){
    console.log(this.especialidades);
  }

}
