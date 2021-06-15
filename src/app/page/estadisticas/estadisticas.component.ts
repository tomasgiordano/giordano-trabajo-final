import { Component, OnInit } from '@angular/core';
import { Logger } from 'src/app/models/models.module';
import { EstadisticasService } from 'src/app/services/estadisticas.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

  log: Array<Logger>
  estadisticas: Array<any> = null;

  constructor(private stats: EstadisticasService) { }

  ngOnInit(): void {
    this.stats.getLogger()
      .then(data => this.log = data)
      .finally(() => console.log(this.log));

    this.stats.getStats().then((a: any) => this.estadisticas = a)
  }


}
