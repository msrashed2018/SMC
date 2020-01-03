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
  requestStatuses: RequestStatus[] = [];
  selectedRequestStatusId: number = 0;
  searchKey: string = '';

  constructor(private requestStatusService: RequestStatusService, private confirmationModalService: ConfirmModalService, private requestService: RequestService, private router: Router, private datepipe: DatePipe) { }

  //pagination variables
  maxSize: number = 10;
  totalItems: number = 0;
  currentPage: number = 0;
  numPages: number = 0;
  items: number = 0;
  itemsPerPage: number = 10;
  pageChanged(event: any): void {
    this.items = (event.page - 1) * this.itemsPerPage;
    this.currentPage = event.page - 1;
    this.refreshData();
  }
  ngOnInit() {
    this.fillRequestStatuses();
    this.requestResults = [];
    this.refreshData();
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
  refreshData() {
    this.requestService.retrieveRequestResults(this.selectedRequestStatusId, this.startDate, this.endDate, this.currentPage, this.itemsPerPage)
      .subscribe(
        result => {
          if (typeof result !== 'undefined' && result !== null && result['content'].length != 0) {
            this.noDataFound = false;
            this.requestResults = result['content'];
            this.totalItems = result['totalElements'];
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
    this.currentPage = 0;
    // this.citizens = [];
    this.errorMessage = false;
    this.noDataFound = false;
    this.refreshData();
  }

  printResults(): void {
    let popupWin, requestResultsContent;
    let requestStatus = this.requestStatuses.find((s) => s.id == this.selectedRequestStatusId)

    if (requestStatus != null) {
      requestResultsContent = AppPrint.getRequestResultsPageContent(this.requestResults, requestStatus.name);
    } else {
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
