import { Component, OnInit, NgModule } from '@angular/core';
import { Request } from '../../../model/request.model';
import { DatePipe, CommonModule } from '@angular/common';
import { AlertModule, AlertConfig } from 'ngx-bootstrap/alert';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { ConfirmModalService } from '../../confirm-modal/confirm-modal.service';
import { RequestService } from '../../../services/request.service';
import { REQUESTS_PAGE_SIZE } from '../../../app.constants';
@Component({
  selector: 'app-list-requests',
  templateUrl: './list-requests.component.html',
  styleUrls: ['./list-requests.component.scss']
})
export class ListRequestsComponent implements OnInit {
  private requests: Request[];
  private noDataFound: boolean = false;
  private errorMessage: boolean = false;
  searchKey: string = '';
  constructor(private confirmationModalService: ConfirmModalService, private requestService: RequestService, private router: Router, private datepipe: DatePipe) { }
  page: number = 0;
  pages: Array<number>;
  items: number = 0;
  isForSearch: boolean = true;
  setPage(i, event: any): void {
    // this.currentPage = event.page;
    event.preventDefault();
    this.page = i;
    this.items = i * REQUESTS_PAGE_SIZE;
    if (this.isForSearch) { this.retrieveRequestsBySearchKey(); } else { this.retriveAllRequests(); }
  }
  nextPage(event: any): void {
    event.preventDefault();
    if ((this.page + 1) < this.pages.length) {
      this.page = this.page + 1
      this.items = (this.page) * REQUESTS_PAGE_SIZE;
      if (this.isForSearch) { this.retrieveRequestsBySearchKey(); } else { this.retriveAllRequests(); }
    }
  }
  prevPage(event: any): void {
    event.preventDefault();

    if ((this.page - 1) >= 0) {
      this.page = this.page - 1;
      this.items = (this.page) * REQUESTS_PAGE_SIZE;
      if (this.isForSearch) { this.retrieveRequestsBySearchKey(); } else { this.retriveAllRequests(); }
    }
  }
  ngOnInit() {
    this.requests = [];
    this.retriveAllRequests();
  }

  retrieveRequestsBySearchKey(){
    this.requestService.retrieveRequestsBySearchKey(this.searchKey, this.page, REQUESTS_PAGE_SIZE)
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
    this.retrieveRequestsBySearchKey();

  }
  retriveAllRequests() {
    this.requests = [];
    this.errorMessage = false;
    this.noDataFound = false;
    this.requestService.retrieveAllRequests(this.page, REQUESTS_PAGE_SIZE)
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

  onDelete(citizenId, requestId) {
    this.confirmationModalService.confirm('برجاء التاكيد', 'هل انت متاكد من حذف الطلب؟ ')
      .then((confirmed) => {
        if (confirmed) {
          this.requestService.deleteRequest(citizenId, requestId).subscribe(
            response => {
              this.errorMessage = false;
              if (this.isForSearch) { this.searchByKey(null); } else { this.retriveAllRequests(); }
            },
            error =>{
              console.log('oops',error)
              this.errorMessage = true;
            }
          )
        }
      })
  }

  onEdit(id) {
    this.router.navigate(['request/request-edit', id])
  }
  onAdd() {
    // this.router.navigate(['request/new-request'])
  }
}
