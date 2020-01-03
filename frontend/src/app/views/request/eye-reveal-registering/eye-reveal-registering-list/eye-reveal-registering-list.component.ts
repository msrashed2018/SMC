import { Component, OnInit, NgModule } from '@angular/core';
import { Request } from '../../../../model/request.model';
import { DatePipe, CommonModule } from '@angular/common';
import { AlertModule, AlertConfig } from 'ngx-bootstrap/alert';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { ConfirmModalService } from '../../../confirm-modal/confirm-modal.service';
import { RequestService } from '../../../../services/request.service';
import { EYE_REVEAL_REGISTRATION_PAGE_SIZE } from '../../../../app.constants';

@Component({
  selector: 'app-eye-reveal-registering-list',
  templateUrl: './eye-reveal-registering-list.component.html',
  styleUrls: ['./eye-reveal-registering-list.component.scss']
})
export class EyeRevealRegisteringListComponent implements OnInit {
  private requests: Request[];
  private noDataFound: boolean = false;
  private errorMessage: boolean = false;
  searchKey: string = '';
  constructor(private confirmationModalService: ConfirmModalService, private requestService: RequestService, private router: Router, private datepipe: DatePipe) { }
  //pagination variables
  maxSize: number = 10;
  totalItems: number = 0;
  currentPage: number = 0;
  numPages: number = 0;
  items: number = 0;
  itemsPerPage: number = 10;
  ngOnInit() {
    this.requests = [];
    this.refreshData();
  }
  pageChanged(event: any): void {
    this.items = (event.page - 1) * this.itemsPerPage;
    this.currentPage = event.page - 1;
    this.refreshData();
  }
  refreshData() {
    this.requestService.searchByStatesAndSearchKey("CONTINUE_REGISTERING_DONE", "NA", "PENDING_REGISTERING", this.searchKey,this.currentPage,this.itemsPerPage)
      .subscribe(
        result => {
          if (typeof result !== 'undefined' && result !== null && result['content'].length != 0) {
            this.noDataFound = false;
            this.requests = result['content'];
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
  searchByKey(event: Event) {
    this.requests = [];
   this.currentPage = 0;
    // this.citizens = [];
    this.errorMessage = false;
    this.noDataFound = false;
    this.refreshData();

  }

  onContinue(id) {
    this.router.navigate(['request/eye-reveal-registering-data', { requestId: id }])
  }

}
