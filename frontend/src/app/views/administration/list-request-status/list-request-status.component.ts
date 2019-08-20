import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestStatus } from '../../../model/request-status.model';
import { RequestStatusService } from '../../../services/administration/request-status.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalService } from '../../confirm-modal/confirm-modal.service';
import { REQUEST_STATUS_PAGE_SIZE } from '../../../app.constants';



@Component({
  selector: 'app-list-request-status',
  templateUrl: './list-request-status.component.html',
  styleUrls: ['./list-request-status.component.scss']
})
export class ListRequestStatusComponent implements OnInit {
  requestStatus: RequestStatus[]
  message: string

  constructor(
    private requestStatusService:RequestStatusService,
    private router : Router, private confirmationModalService: ConfirmModalService
  ) { 

  }
  page: number = 0;
  pages: Array<number>;
  items: number = 0;
  setPage(i,event: any): void {
    // this.currentPage = event.page;
    event.preventDefault();
    this.page = i ;
    this.items = i*REQUEST_STATUS_PAGE_SIZE;
    this.refreshData();
  }
  nextPage(event: any): void {
    event.preventDefault();
    if((this.page+1) < this.pages.length){
      this.page = this.page+1
      this.items = (this.page)*REQUEST_STATUS_PAGE_SIZE;
      this.refreshData();
    }
  }
  prevPage(event: any): void {
    event.preventDefault();

    if((this.page-1) >= 0){
      this.page =this.page -1;
      this.items = (this.page)*REQUEST_STATUS_PAGE_SIZE;
      this.refreshData();
    }
  }
  ngOnInit() {
    this.refreshData();
  }
  refreshData(){
    this.requestStatusService.retrieveAllRequestStatus(this.page,REQUEST_STATUS_PAGE_SIZE).subscribe(
      response => {
        this.requestStatus = response['content'];
        this.pages = new Array(response['totalPages']);
      },
error =>{
        console.log('oops',error);
        this.message = error.error.message;
      }
    )
  }

  onDelete(id) {
    this.confirmationModalService.confirm('برجاء التاكيد', 'هل انت متاكد من حذف حالة الطلب؟ ')
    .then((confirmed) => {
      if(confirmed){
      this.requestStatusService.deleteRequestStatus(id).subscribe (
        response => {
          this.refreshData();
        },
        error =>{
          console.log('oops',error)
          this.message = error.error.message  
        }
      )
    }
    })
  }
 
  public openConfirmationDialog() {
    }
  onEdit(id) {
    this.router.navigate(['administration/request-status',id,{componentMode: "editMode"}])
  }

  onAdd() {
    this.router.navigate(['administration/request-status-data'])
  }
}
