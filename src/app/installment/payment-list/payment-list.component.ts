import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnInit {
  public installments;
  constructor(private router: Router) {
   this.installments= this.router.getCurrentNavigation().extras.state;
  }
  ngOnInit(): void {
  }
}
