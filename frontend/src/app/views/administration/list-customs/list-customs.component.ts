import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Custom } from '../../../model/custom.model';
import { CustomService } from '../../../services/administration/custom.service';
import { ConfirmModalService } from '../../confirm-modal/confirm-modal.service';
import { CUSTOMS_PAGE_SIZE } from '../../../app.constants';



@Component({
  selector: 'app-list-customs',
  templateUrl: './list-customs.component.html',
  styleUrls: ['./list-customs.component.scss']
})
export class ListCustomsComponent implements OnInit {
  customs: Custom[]
  message: string

  constructor(
    private customService:CustomService,
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
    this.items = i*CUSTOMS_PAGE_SIZE;
    this.refreshData();
  }
  nextPage(event: any): void {
    event.preventDefault();
    if((this.page+1) < this.pages.length){
      this.page = this.page+1
      this.items = (this.page)*CUSTOMS_PAGE_SIZE;
      this.refreshData();
    }
  }
  prevPage(event: any): void {
    event.preventDefault();

    if((this.page-1) >= 0){
      this.page =this.page -1;
      this.items = (this.page)*CUSTOMS_PAGE_SIZE;
      this.refreshData();
    }
  }
  ngOnInit() {
    this.refreshData();
  }
  refreshData(){
    this.customService.retrieveAllCustoms(this.page,CUSTOMS_PAGE_SIZE).subscribe(
      response => {
        this.customs = response['content'];
        this.pages = new Array(response['totalPages']);
      },
error =>{
        console.log('oops',error);
        this.message = error.error.message;
      }
    )
  }

  onDelete(id) {
    this.confirmationModalService.confirm('برجاء التاكيد', 'هل انت متاكد من حذف الجمرك؟ ')
    .then((confirmed) => {
      if(confirmed){
        this.customService.deleteCustom(id).subscribe (
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
    this.router.navigate(['administration/customs',id,{componentMode: "editMode"}])
  }

  onAdd() {
    this.router.navigate(['administration/custom-data'])
  }
}
