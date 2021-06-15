import { Component, OnInit } from '@angular/core';
import { AnyARecord } from 'dns';
import { ToastrService } from 'ngx-toastr';
import { Turnos } from 'src/app/models/models.module';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.component.html',
  styleUrls: ['./miperfil.component.css']
})
export class MiperfilComponent implements OnInit {

  rol: string;
  nombre: string;
  apellido: string;
  img1: string;
  edad: string;
  email: string;
  obraSocial: string;
  dni: string;
  usuario :any;
  especialidades : any;
  especialidadSeleccionada:string;
  turnos: Array<Turnos>;
  
  constructor(private data: DataService,private auth: AuthService,private toast: ToastrService) { }

  ngOnInit(): void {

    this.rol = localStorage.getItem('perfil');
    this.nombre = localStorage.getItem('nombre');
    this.apellido = localStorage.getItem('apellido');
    this.img1 = localStorage.getItem('img1');
    this.edad = localStorage.getItem('edad');
    this.email = localStorage.getItem('email');
    this.obraSocial = localStorage.getItem('obraSocial');
    this.dni = localStorage.getItem('dni');

    if(this.rol == 'admin')
    {
      this.img1 == "../../../assets/login.png";
    }

    var uid = '0';
    this.auth
      .getUserUid()
      .then((res) => {
        uid = res.toString();
        this.data.getUserByUid(uid).subscribe((res) => {
          this.usuario = res;
        });
      })
      .catch((res) => {
        uid = res.toString();
        console.log('Sin Usuario');
      });

     this.data.getEspecialidades().subscribe(a => {
       this.especialidades = a;
       console.log(a)
      });
  }

  toPDF(){
let DATA = document.getElementById('htmlData');
      
    html2canvas(DATA).then(canvas => {     
      let fileWidth = 208;
      let fileHeight = canvas.height * fileWidth / canvas.width;
      
      const FILEURI = canvas.toDataURL('image/png')
      let PDF = new jsPDF('l', 'mm', 'a4');
      let position = -10;
      PDF.addImage(FILEURI, 'PNG', 5, position, fileWidth, fileHeight)
        
        PDF.save(`turnos-${this.especialidadSeleccionada}.pdf`);
    });     

  }

  async onChange(event){
    try{
      this.turnos = await this.data.getTurnosPaciente(this.usuario.uid,event);
      console.log(this.turnos);
    }catch(err){
      console.log(err);
    }
  }
}
