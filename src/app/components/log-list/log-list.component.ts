import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Logger } from '../../models/models.module';

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.css']
})
export class LogListComponent implements OnInit {

  @ViewChild('paginator') paginator: MatPaginator;

  @Input() listado: Array<Logger> = [];


  page_size: number = 4
  page_number: number = 1
  page_SizeOptions: number[] = [4, 8]

  constructor() {
  }

  ngOnInit(): void {
  }

  handlePage(e: PageEvent) {
    this.page_size = e.pageSize
    this.page_number = e.pageIndex + 1
  }
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.page_number = 1
  }

}
