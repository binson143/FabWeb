import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoanRecord } from './loan-record';
import { InstallmentRecord } from './installment-record';
import { Loan } from '../installment/models/loan';
import { Pagination } from '../installment/models/pagination';
import { forkJoin, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class BackendMockService {
  /**
   * This service act as Backend Mock
   * This service contains all the logic required in backend.such as Db,pagination logic etc.
   */
  loanCollection: Array<LoanRecord> = [];
  installmentCollection: Array<InstallmentRecord> = []
  constructor(private http: HttpClient) {
    this.loadCollections();
  }
  public getLoans(pagination: Pagination): Observable<any> {
    if (!this.hasRecord()) {
      // init the function.
      return this.loadCollections().pipe(map(
        (d: any) => {
          this.loanCollection = d[0].data;
          this.installmentCollection = d[1].data;
          return this.prepareData(pagination);
        }
      ))
    }
    return of(this.prepareData(pagination));
  }
  /* private functions */
  private prepareData(pagination: Pagination): Array<Loan> {

    const result: Array<Loan> = [];
    // building a pagination logic.
    const startRecordPosition = pagination.currentPage * pagination.recordPerPage;
    const endRecordPosition = startRecordPosition + pagination.recordPerPage;
    const loans = this.loanCollection.slice(startRecordPosition, endRecordPosition);
    loans.forEach(record => {
      const loan: Loan = {
        id: record.id,
        sender: record.sender,
        receiver: record.receiver,
        totalAmount: record.totalAmount,
        totalPaidAmount: 0,
        installments: []
      };
      loan.installments = this.installmentCollection
        .filter(y => y.parentId === record.id)
        .map(y => ({ id: y.id, sender: record.sender, receiver: record.receiver, totalAmount: record.totalAmount, paidAmount: y.paidAmount }))
      loan.totalPaidAmount = loan.installments.reduce((sum, next) => { return (sum + next.paidAmount) }, 0);
      result.push(loan);
    });
    pagination.totalRecords = this.loanCollection.length;
    pagination.totalPage = Math.ceil(pagination.totalRecords / pagination.recordPerPage);

    return result;
  }
  /**
   * Fetching data from local json files.
   */
  private loadCollections() {
    return forkJoin(
      [this.http.get<Array<LoanRecord>>('assets/Parent.json'),
      this.http.get<Array<InstallmentRecord>>('assets/Child.json')]
    )
  }

  private hasRecord(): boolean {
    return this.installmentCollection.length > 0 && this.loanCollection.length > 0;
  }
}
