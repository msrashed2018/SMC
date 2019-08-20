import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DisabilityService } from '../../../services/administration/disability.service';
import { Disability } from '../../../model/disability.model';
import { FormBuilder } from '@angular/forms';
import { ConfirmModalService } from '../../confirm-modal/confirm-modal.service';
import { DISABILITIES_TYPES_PAGE_SIZE } from '../../../app.constants';

@Component({
  selector: 'app-list-disabilities',
  templateUrl: './list-disabilities.component.html',
  styleUrls: ['./list-disabilities.component.scss']
})
export class ListDisabilitiesComponent implements OnInit {
  disabilities: Disability[]
  message: string

  constructor(
    private disabilityService:DisabilityService,
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
    this.items = i*DISABILITIES_TYPES_PAGE_SIZE;
    this.refreshData();
  }
  nextPage(event: any): void {
    event.preventDefault();
    if((this.page+1) < this.pages.length){
      this.page = this.page+1
      this.items = (this.page)*DISABILITIES_TYPES_PAGE_SIZE;
      this.refreshData();
    }
  }
  prevPage(event: any): void {
    event.preventDefault();

    if((this.page-1) >= 0){
      this.page =this.page -1;
      this.items = (this.page)*DISABILITIES_TYPES_PAGE_SIZE;
      this.refreshData();
    }
  }
  ngOnInit() {
    this.refreshData();
  }
  refreshData(){
    this.disabilityService.retrieveAllDisabilities(this.page,DISABILITIES_TYPES_PAGE_SIZE).subscribe(
      response => {
        this.disabilities = response['content'];
        this.pages = new Array(response['totalPages']);
      },
error =>{
        console.log('oops',error);
        this.message = error.error.message;
      }
    )
  }

  onDelete(id) {
    this.confirmationModalService.confirm('برجاء التاكيد', 'هل انت متاكد من حذف الاعاقة ')
    .then((confirmed) => {
      if(confirmed){
        this.disabilityService.deleteDisability(id).subscribe (
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

  onEdit(id) {
    this.router.navigate(['administration/disabilities',id,{componentMode: "editMode"}])
  }

  onAdd() {
    this.router.navigate(['administration/disability-data'])
  }
}
