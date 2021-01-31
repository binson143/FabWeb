import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanListComponent } from './loan-list/loan-list.component';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { RouterModule, Routes } from '@angular/router';
import { WidgetsModule } from '../widgets/widgets.module';
const routes: Routes = [{
  path: 'loans', component: LoanListComponent
},
{
  path: 'payments', component: PaymentListComponent
},
{
  path: '', redirectTo: 'loans'
}
]
@NgModule({
  declarations: [LoanListComponent, PaymentListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    WidgetsModule
  ],
  exports:[RouterModule]
})
export class InstallmentModule { }
