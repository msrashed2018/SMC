import { Component, OnInit, NgModule } from '@angular/core';
import { Request } from '../../../model/request.model';
import { DatePipe, CommonModule } from '@angular/common';
import { AlertModule, AlertConfig } from 'ngx-bootstrap/alert';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { ConfirmModalService } from '../../confirm-modal/confirm-modal.service';
import { RequestService } from '../../../services/request.service';
import { REVIEW_REQUESTS_PAGE_SIZE } from '../../../app.constants';

@Component({
  selector: 'app-review-requests',
  templateUrl: './review-requests.component.html',
  styleUrls: ['./review-requests.component.scss']
})
export class ReviewRequestsComponent implements OnInit {
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
  pageChanged(event: any): void {
    this.items = (event.page - 1) * this.itemsPerPage;
    this.currentPage = event.page - 1;
    this.refreshData();
  }
  ngOnInit() {
    this.requests = [];
    this.refreshData();
  }
  refreshData() {
    this.requestService.searchByStatesAndSearchKey("CONTINUE_REGISTERING_DONE", "DONE", "DONE", this.searchKey, this.currentPage, this.itemsPerPage)
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

  onEdit(id) {
    this.router.navigate(['request/request-edit', id])
  }
  onReviewed(id) {
    this.confirmationModalService.confirm(' اضغط علي ok', 'هل انت متاكد من  مراجعة الطلب ')
      .then((confirmed) => {
        if (confirmed) {
          let request = new Request();
          request.id = 1;
          this.requestService.reviewRequest(id, request).subscribe(
            result => {
              this.refreshData();
              this.errorMessage = false;
            },
            error => {
              console.log('oops', error);
              this.errorMessage = true;
            }
          )
        }
      })
  }

}

