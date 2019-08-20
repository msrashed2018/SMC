import { Component, OnInit } from '@angular/core';
import { RequestPayment } from '../../../../model/request-payment.model';
import { RequestService } from '../../../../services/request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-payment-data',
  templateUrl: './payment-data.component.html',
  styleUrls: ['./payment-data.component.scss']
})
export class PaymentDataComponent implements OnInit {

  requestId : number = 0;

  
  isPaymentDataCollapsed: boolean = false;
  iconPaymentDataCollapse: string = 'icon-arrow-up';

  payment : RequestPayment = new RequestPayment();
  // paymentDoneCheck : boolean = false;

  paymentErrorMessage : string = '';
  paymentSuccessMessage : string = '';
  constructor( private route:ActivatedRoute, private datepipe: DatePipe, private requestService: RequestService, private router: Router) { }

  ngOnInit() {
    this.route.params.forEach((urlParams) => {
      this.requestId= urlParams['requestId'];
      // this.requestId= 1;
      this.refreshData();
    });
  }
  paymentDataExpanded(event: any): void {
    
  }
  togglePaymentDataCollapse(): void {
    this.isPaymentDataCollapsed = !this.isPaymentDataCollapsed;
    this.iconPaymentDataCollapse = this.isPaymentDataCollapsed ? 'icon-arrow-up' : 'icon-arrow-down';
  }
  // onPaymentDoneChecked( event) {
  //   this.paymentDoneCheck = event.target.checked;
  // }
  onSavePayment(){
    // if(this.paymentDoneCheck){
    //   this.payment.paymentDone = '1';
    // }else{
    //   this.payment.paymentDone= '0';
    // }
    this.payment.paymentDone = '1';
    this.requestService.saveRequestPayment(this.requestId, this.payment).subscribe(
      result => {
        this.payment = result as RequestPayment;
        this.paymentSuccessMessage = "تم حفظ المدفوعات بنجاح";
        this.paymentErrorMessage = '';
        
      },
      error => {
        console.log('oops', error);
        this.paymentSuccessMessage ='';
        this.paymentErrorMessage = error.error.message;
      }
    )
  }

  refreshData(){
    this.requestService.retreiveRequestPayment(this.requestId).subscribe(
      result =>{
        this.payment = result as RequestPayment;
        // if(this.payment.paymentDone == '1'){
        //   this.paymentDoneCheck = true;
        // }else{
        //   this.paymentDoneCheck = false;
        // }

        if(this.payment.paymentDate == null){
          this.payment.paymentDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
        }
      },
      error=>{
        this.paymentSuccessMessage = "";
        this.paymentErrorMessage = error.error.message;
      }

    )
  }
  close(){
    this.router.navigateByUrl("/request/payments");
  }
}
