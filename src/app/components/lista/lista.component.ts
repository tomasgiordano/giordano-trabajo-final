import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  @ViewChild('paginator') paginator: MatPaginator;

  @Input()listado = [];
  @Output()retorno : any = new EventEmitter<any>()

  page_size: number = 4
  page_number: number = 1
  page_SizeOptions: number[] = [4,8,12]

  constructor() {
  }

  ngOnInit(): void {
  }

  handlePage(e: PageEvent){
    this.page_size = e.pageSize
    this.page_number = e.pageIndex + 1
  }
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.page_number = 1
  }

  retornador(element : any, option: string){
    this.retorno.emit({retorno: element, option: option})
  }

}
