import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/models.module';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {

  usuario:any = new Usuario();
  pacientes: Array<any> = [];
  selected:Boolean;
  constructor(private data: DataService,private auth:AuthService) {
    
   }

  async ngOnInit(){
    this.auth.getUserUid().then(async a => {
      this.pacientes = await this.data.getTurnoPacientes(a)
      console.log(this.pacientes);
    });
  }

  async onSelect(pac: any){
    this.selected = false;//hice esto contra mi voluntad
    this.usuario = await this.data.getMedico(pac.uid);
    this.selected = true;
    console.log(this.usuario);
  }
}
