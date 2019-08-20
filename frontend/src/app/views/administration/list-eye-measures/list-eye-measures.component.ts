import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EyeMeasureService } from '../../../services/administration/eye-measure.service';
import { EyeMeasure } from '../../../model/eye-measure.model';
import { ConfirmModalService } from '../../confirm-modal/confirm-modal.service';
import { EYE_MEASURES_PAGE_SIZE } from '../../../app.constants';


@Component({
  selector: 'app-list-eye-measures',
  templateUrl: './list-eye-measures.component.html',
  styleUrls: ['./list-eye-measures.component.scss']
})
export class ListEyeMeasureComponent implements OnInit {
  measures: EyeMeasure[]
  message: string

  constructor(
    private eyeMeasureService:EyeMeasureService,
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
    this.items = i*EYE_MEASURES_PAGE_SIZE;
    this.refreshData();
  }
  nextPage(event: any): void {
    event.preventDefault();
    if((this.page+1) < this.pages.length){
      this.page = this.page+1
      this.items = (this.page)*EYE_MEASURES_PAGE_SIZE;
      this.refreshData();
    }
  }
  prevPage(event: any): void {
    event.preventDefault();

    if((this.page-1) >= 0){
      this.page =this.page -1;
      this.items = (this.page)*EYE_MEASURES_PAGE_SIZE;
      this.refreshData();
    }
  }
  ngOnInit() {
    this.refreshData();
  }
  refreshData(){
    this.eyeMeasureService.retrieveAllEyeMeasure(this.page,EYE_MEASURES_PAGE_SIZE).subscribe(
      response => {
        this.measures = response['content'];
        this.pages = new Array(response['totalPages']);
      },
error =>{
        console.log('oops',error);
        this.message = error.error.message;
      }
    )
  }

  onDelete(id) {
    this.confirmationModalService.confirm('برجاء التاكيد', 'هل انت متاكد من حذف القياس ')
    .then((confirmed) => {
      
      if(confirmed){
        this.eyeMeasureService.deleteEyeMeasure(id).subscribe (
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
    this.router.navigate(['administration/eye-measures',id,{componentMode: "editMode"}])
  }

  onAdd() {
    this.router.navigate(['administration/eye-measure-data'])
  }
}
