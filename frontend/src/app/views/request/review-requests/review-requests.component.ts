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
  isForSearch: boolean = true;
  constructor(private confirmationModalService: ConfirmModalService, private requestService: RequestService, private router: Router, private datepipe: DatePipe) { }
  page: number = 0;
  pages: Array<number>;
  items: number = 0;
  setPage(i, event: any): void {
    // this.currentPage = event.page;
    event.preventDefault();
    this.page = i;
    this.items = i * REVIEW_REQUESTS_PAGE_SIZE;
    if (this.isForSearch) { this.searchByStatesAndSearchKey(); } else { this.retriveAllRequests(); }
  }
  nextPage(event: any): void {
    event.preventDefault();
    if ((this.page + 1) < this.pages.length) {
      this.page = this.page + 1
      this.items = (this.page) * REVIEW_REQUESTS_PAGE_SIZE;
      if (this.isForSearch) { this.searchByStatesAndSearchKey(); } else { this.retriveAllRequests(); }
    }
  }
  prevPage(event: any): void {
    event.preventDefault();

    if ((this.page - 1) >= 0) {
      this.page = this.page - 1;
      this.items = (this.page) * REVIEW_REQUESTS_PAGE_SIZE;
      if (this.isForSearch) { this.searchByStatesAndSearchKey(); } else { this.retriveAllRequests(); }
    }
  }
  ngOnInit() {
    this.requests = [];
    this.retriveAllRequests();
  }
  searchByStatesAndSearchKey(){
    this.requestService.searchByStatesAndSearchKey("CONTINUE_REGISTERING_DONE", "DONE", "DONE", this.searchKey, this.page, REVIEW_REQUESTS_PAGE_SIZE)
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
    this.requestService.retrieveByRequestStates("CONTINUE_REGISTERING_DONE", "DONE", "DONE", this.page, REVIEW_REQUESTS_PAGE_SIZE)
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
              this.retriveAllRequests();
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

