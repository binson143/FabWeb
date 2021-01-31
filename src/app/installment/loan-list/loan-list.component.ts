import { Component, OnInit } from '@angular/core';
import { BackendMockService } from 'src/app/mock/backend-mock.service';
@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.scss']
})
export class LoanListComponent implements OnInit {
  loans;
  pagination = { currentPage: 0, recordPerPage: 2 };
  constructor(private backendService: BackendMockService) { }
  ngOnInit(): void {
   this.loadRecords();
  }
  onPaginationChange(e): void {
    this.pagination = e;
    this.loadRecords();
  }
  loadRecords():void{
    this.backendService.getLoans(this.pagination).subscribe(d => {
      this.loans = d;
    })
  }
}
