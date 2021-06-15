import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-graficos-turnos-finalizados',
  templateUrl: './graficos-turnos-finalizados.component.html',
  styleUrls: ['./graficos-turnos-finalizados.component.css']
})
export class GraficosTurnosFinalizadosComponent implements OnInit {

  @Input() listado = [];
  @Input() nombre = "";
  constructor() { }

  ngOnInit(): void {
    Highcharts.chart("chartTurnosFinalizados", {
      chart: {
        type: 'bar'
      },
      title: {
        text: this.nombre
      },
      xAxis: {
        categories: ['Turnos'],
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Cantidad de turnos',
          align: 'high'
        },
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      },
      series: this.listado
    });


  }


}
