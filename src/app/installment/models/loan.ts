import { Installment } from "./installment";

export interface Loan{
  id:number;
  sender:string;
  receiver:string;
  totalAmount:number;
  totalPaidAmount:number;
  installments:Array<Installment>;
}
