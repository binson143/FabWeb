import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Pagination} from '../../installment/models/pagination';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() pagination: Pagination;
  @Output() paginationChanged=new EventEmitter<Pagination>();
  activePage=0;
  constructor() { }

  ngOnInit(): void {
  }
  onPaginationChange(page):void{
    this.activePage=page;
    if(this.paginationChanged){
      const pagination={...this.pagination,currentPage:page};
      this.paginationChanged.emit(pagination)
    }
  }
}
