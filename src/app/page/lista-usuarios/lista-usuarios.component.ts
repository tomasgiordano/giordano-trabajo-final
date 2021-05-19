import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  lista: any = null;
  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    this.db.collection('usuarios').valueChanges().subscribe((data: any) => {
      console.log(data);
      this.lista = data.map(({nombre, apellido, dni, email, rol, estado, uid}) => {
        if(rol === 'profesional'){
          return {
            nombre,
            apellido,
            dni,
            email,
            estado,
            accion: () => {
              this.db.collection('usuarios').doc(uid).update({estado: !estado})
            }
          }
        }
        return {
          nombre,
          apellido,
          dni,
          email,
        }
      })

      console.log(this.lista);
    })
  }

}
