import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-graficos-dias',
  templateUrl: './graficos-dias.component.html',
  styleUrls: ['./graficos-dias.component.css']
})
export class GraficosDiasComponent implements OnInit {

  @Input() listado = [];
  @Input() nombre = "";
  constructor() { }

  ngOnInit(): void {
    Highcharts.chart("chartDias", {
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
