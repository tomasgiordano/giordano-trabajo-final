import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-graficos-turnos-solicitados',
  templateUrl: './graficos-turnos-solicitados.component.html',
  styleUrls: ['./graficos-turnos-solicitados.component.css']
})
export class GraficosTurnosSolicitadosComponent implements OnInit {

  @Input() listado = [];
  @Input() nombre = "";
  constructor() { }

  ngOnInit(): void {
    Highcharts.chart("chartTurnosSolicitados", {
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
