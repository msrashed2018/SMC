import { Component, OnInit, NgModule } from '@angular/core';
import { Request } from '../../../../model/request.model';
import { DatePipe, CommonModule } from '@angular/common';
import { AlertModule, AlertConfig } from 'ngx-bootstrap/alert';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { ConfirmModalService } from '../../../confirm-modal/confirm-modal.service';
import { RequestService } from '../../../../services/request.service';
import { PAYMENTS_PAGE_SIZE } from '../../../../app.constants';
@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnInit {
  private requests: Request[];
  private noDataFound: boolean = false;
  private errorMessage: boolean = false;
  searchKey: string = '';
  isForSearch: boolean = true;
  constructor(private confirmationModalService: ConfirmModalService, private requestService: RequestService, private router: Router, private datepipe: DatePipe) { }
  page: number = 0;
  pages: Array<number>;
  items: number = 0;
  setPage(i, event: any): void {
    // this.currentPage = event.page;
    event.preventDefault();
    this.page = i;
    this.items = i * PAYMENTS_PAGE_SIZE;
    if (this.isForSearch) { this.searchByStatesAndSearchKey(); } else { this.retriveAllRequests(); }
  }
  nextPage(event: any): void {
    event.preventDefault();
    if ((this.page + 1) < this.pages.length) {
      this.page = this.page + 1
      this.items = (this.page) * PAYMENTS_PAGE_SIZE;
      if (this.isForSearch) { this.searchByStatesAndSearchKey(); } else { this.retriveAllRequests(); }
    }
  }
  prevPage(event: any): void {
    event.preventDefault();

    if ((this.page - 1) >= 0) {
      this.page = this.page - 1;
      this.items = (this.page) * PAYMENTS_PAGE_SIZE;
      if (this.isForSearch) { this.searchByStatesAndSearchKey(); } else { this.retriveAllRequests(); }
    }
  }
  ngOnInit() {
    this.requests = [];
    this.retriveAllRequests();
  }

  searchByStatesAndSearchKey() {
    this.requestService.searchByStatesAndSearchKey("PENDING_PAYMENT", "NA", "NA", this.searchKey, this.page, PAYMENTS_PAGE_SIZE)
      .subscribe(
        result => {
          if (typeof result !== 'undefined' && result !== null && result['content'].length != 0) {
            this.noDataFound = false;
            this.requests = result['content'];
            this.pages = new Array(result['totalPages']);
            this.isForSearch = true;
          } else {

            this.pages = new Array(0);
            this.noDataFound = true;
          }
        },
        error => {
          console.log('oops: ', error);
          this.errorMessage = true;
        }
      );
  }
  searchByKey(event: Event) {
    this.requests = [];
    this.page = 0;
    // this.citizens = [];
    this.errorMessage = false;
    this.noDataFound = false;
    this.searchByStatesAndSearchKey();

  }
  retriveAllRequests() {
    this.requests = [];
    this.errorMessage = false;
    this.noDataFound = false;
    let date = new Date();
    // let today =this.datepipe.transform(date, 'yyyy-MM-dd');
    this.requestService.retrieveByRequestStates("PENDING_PAYMENT", "NA", "NA", this.page, PAYMENTS_PAGE_SIZE)
      .subscribe(
        result => {
          if (typeof result !== 'undefined' && result !== null && result['content'].length != 0) {
            this.noDataFound = false;
            this.requests = result['content'];
            this.pages = new Array(result['totalPages']);
            this.isForSearch = false;
          } else {

            this.noDataFound = true;
          }
        },
        error => {
          console.log('oops: ', error);
          this.errorMessage = true;

        }
      );
  }

  // onDelete(citizenId, requestId) {
  //   this.confirmationModalService.confirm('برجاء التاكيد', 'هل انت متاكد من حذف الطلب؟ ')
  //   .then((confirmed) => {
  //     if(confirmed){
  //       this.requestService.deleteRequest(citizenId, requestId).subscribe (
  //         response => {
  //           this.retriveAllRequests();
  //         }
  //       )
  //     }
  //   })
  // }

  onPay(id) {
    this.router.navigate(['request/payment-data', { requestId: id }])
  }
  onAdd() {
    // this.router.navigate(['request/new-request'])
  }
}
