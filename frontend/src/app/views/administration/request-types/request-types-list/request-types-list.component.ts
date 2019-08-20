import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestTypeService } from '../../../../services/administration/request-type.service';
import { ConfirmModalService } from '../../../confirm-modal/confirm-modal.service';
import { REQUEST_TYPES_PAGE_SIZE } from '../../../../app.constants';

@Component({
  selector: 'app-request-types-list',
  templateUrl: './request-types-list.component.html',
  styleUrls: ['./request-types-list.component.scss']
})
export class RequestTypesListComponent implements OnInit {

  requestTypes=[];
  message: string

  constructor(
    private requestTypeService:RequestTypeService,
    private router : Router,
    private confirmationModalService: ConfirmModalService
  ) { 

  }
  page: number = 0;
  pages: Array<number>;
  items: number = 0;
  setPage(i,event: any): void {
    // this.currentPage = event.page;
    event.preventDefault();
    this.page = i ;
    this.items = i*REQUEST_TYPES_PAGE_SIZE;
    this.refreshData();
  }
  nextPage(event: any): void {
    event.preventDefault();
    if((this.page+1) < this.pages.length){
      this.page = this.page+1
      this.items = (this.page)*REQUEST_TYPES_PAGE_SIZE;
      this.refreshData();
    }
  }
  prevPage(event: any): void {
    event.preventDefault();

    if((this.page-1) >= 0){
      this.page =this.page -1;
      this.items = (this.page)*REQUEST_TYPES_PAGE_SIZE;
      this.refreshData();
    }
  }
  ngOnInit() {
    this.refreshData();
  }

  refreshData(){
    this.requestTypeService.retrieveAllRequestTypes(this.page,REQUEST_TYPES_PAGE_SIZE).subscribe(
      response => {
        this.requestTypes  = response['content'];
        this.pages = new Array(response['totalPages']);
      },
error =>{
        console.log('oops',error);
        this.message = error.error.message;
      }
    )
  }

  onEdit(id){
    this.router.navigate(['administration/types', id ,{componentMode: "editMode"}])
  }
  onDelete(id) {
    this.confirmationModalService.confirm('برجاء التاكيد', 'هل انت متاكد من حذف حالة النوع ')
    .then((confirmed) => {
      if(confirmed){
      this.requestTypeService.deleteRequestType(id).subscribe (
        response => {
          this.refreshData();
        }
      )
    }
    })
  }

}
