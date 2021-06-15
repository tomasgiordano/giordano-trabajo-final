import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-graficos-columna',
  templateUrl: './graficos-columna.component.html',
  styleUrls: ['./graficos-columna.component.css']
})
export class GraficosColumnaComponent implements OnInit {

  @Input() listado = [];
  @Input() nombre = "";

  constructor() { }

  ngOnInit(): void {
    Highcharts.chart("idName", {
      chart: {
        type: 'column'
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
