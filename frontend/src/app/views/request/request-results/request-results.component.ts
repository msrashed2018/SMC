import { Component, OnInit, NgModule } from '@angular/core';
import { Request } from '../../../model/request.model';
import { DatePipe, CommonModule } from '@angular/common';
import { AlertModule, AlertConfig } from 'ngx-bootstrap/alert';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { ConfirmModalService } from '../../confirm-modal/confirm-modal.service';
import { RequestService } from '../../../services/request.service';
import { RESULTS_PAGE_SIZE } from '../../../app.constants';
import { RequestStatusService } from '../../../services/administration/request-status.service';
import { RequestResult } from '../../../model/request-result.model';
import { AppPrint } from '../../../app-print';
import { RequestStatus } from '../../../model/request-status.model';

@Component({
  selector: 'app-request-results',
  templateUrl: './request-results.component.html',
  styleUrls: ['./request-results.component.scss']
})
export class RequestResultsComponent implements OnInit {
  private requestResults: RequestResult[];
  private noDataFound: boolean = false;
  private errorMessage: boolean = false;
  startDate: Date;
  endDate: Date;
  requestStatuses : RequestStatus[] = [];
  selectedRequestStatusId: number;
  searchKey: string = '';

  constructor(private requestStatusService: RequestStatusService, private confirmationModalService: ConfirmModalService, private requestService: RequestService, private router: Router, private datepipe: DatePipe) { }
  page: number = 0;
  pages: Array<number>;
  items: number = 0;
  isForSearch: boolean = true;
  setPage(i, event: any): void {
    // this.currentPage = event.page;
    event.preventDefault();
    this.page = i;
    this.items = i * RESULTS_PAGE_SIZE;
    if (this.isForSearch) { this.retrieveResultsByTypeAndDate(); } else { this.retriveAllRequests(); }
  }
  nextPage(event: any): void {
    event.preventDefault();
    if ((this.page + 1) < this.pages.length) {
      this.page = this.page + 1
      this.items = (this.page) * RESULTS_PAGE_SIZE;
      if (this.isForSearch) { this.retrieveResultsByTypeAndDate(); } else { this.retriveAllRequests(); }
    }
  }
  prevPage(event: any): void {
    event.preventDefault();

    if ((this.page - 1) >= 0) {
      this.page = this.page - 1;
      this.items = (this.page) * RESULTS_PAGE_SIZE;
      if (this.isForSearch) { this.retrieveResultsByTypeAndDate(); } else { this.retriveAllRequests(); }
    }
  }
  ngOnInit() {
    this.fillRequestStatuses();
    this.requestResults = [];
    this.retriveAllRequests();
  }
  fillRequestStatuses() {
    this.requestStatusService.retrieveAllRequestStatus(0, 100).subscribe(
      result => {
        this.requestStatuses = result['content'];
      },
      error => {
        console.log('oops', error);
      });
  }
  retrieveResultsByTypeAndDate() {

    // console.log(this.startDate);
    // console.log(this.endDate);
    this.requestService.retrieveRequestResults(this.selectedRequestStatusId, this.startDate, this.endDate, this.page, RESULTS_PAGE_SIZE)
      .subscribe(
        result => {
          console.log(result)
          if (typeof result !== 'undefined' && result !== null && result['content'].length != 0) {
            this.noDataFound = false;
            this.requestResults = result['content'];
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

  retriveAllRequests() {
    this.requestResults = [];
    this.errorMessage = false;
    this.noDataFound = false;
    // let sDate =  this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    // let eDate =  this.datepipe.transform(new Date(), 'yyyy-MM-dd');


    this.requestService.retrieveByRequestStates("APPROVED", "NA", "NA", this.page, RESULTS_PAGE_SIZE)
      .subscribe(
        result => {
          console.log(result)
          if (typeof result !== 'undefined' && result !== null && result['content'].length != 0) {
            this.noDataFound = false;
            this.requestResults = result['content'];
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

  onSearch() {
    this.requestResults = [];
    this.page = 0;
    // this.citizens = [];
    this.errorMessage = false;
    this.noDataFound = false;
    this.retrieveResultsByTypeAndDate();
  }

  printResults(): void {
    let popupWin, requestResultsContent;
    let requestStatus = this.requestStatuses.find((s) => s.id == this.selectedRequestStatusId )

    if(requestStatus != null){
      requestResultsContent = AppPrint.getRequestResultsPageContent(this.requestResults, requestStatus.name);
    }else{
      requestResultsContent = AppPrint.getRequestResultsPageContent(this.requestResults, 'لا يوجد');
    }
    
    
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    // // window.print()
    popupWin.document.open();
    popupWin.document.write(requestResultsContent);
    popupWin.document.close();
    popupWin.print();
  }
}
