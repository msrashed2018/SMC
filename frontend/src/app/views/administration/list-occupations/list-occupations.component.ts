import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OccupationService } from '../../../services/administration/occupation.service';
import { Occupation } from '../../../model/occupation.model';
import { FormBuilder } from '@angular/forms';
import { ConfirmModalService } from '../../confirm-modal/confirm-modal.service';
import { OCCUPATION_TYPES_PAGE_SIZE } from '../../../app.constants';


@Component({
  selector: 'app-list-occupations',
  templateUrl: './list-occupations.component.html',
  styleUrls: ['./list-occupations.component.scss']
})
export class ListOccupationsComponent implements OnInit {
  occupations: Occupation[]
  message: string

  constructor(
    private occupationService:OccupationService,
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
    this.items = i*OCCUPATION_TYPES_PAGE_SIZE;
    this.refreshData();
  }
  nextPage(event: any): void {
    event.preventDefault();
    if((this.page+1) < this.pages.length){
      this.page = this.page+1
      this.items = (this.page)*OCCUPATION_TYPES_PAGE_SIZE;
      this.refreshData();
    }
  }
  prevPage(event: any): void {
    event.preventDefault();

    if((this.page-1) >= 0){
      this.page =this.page -1;
      this.items = (this.page)*OCCUPATION_TYPES_PAGE_SIZE;
      this.refreshData();
    }
  }
  ngOnInit() {
    this.refreshData();
  }
  refreshData(){
    this.occupationService.retrieveAllOccupations(this.page,OCCUPATION_TYPES_PAGE_SIZE).subscribe(
      response => {
        this.occupations = response['content'];
        this.pages = new Array(response['totalPages']);
      },
error =>{
        console.log('oops',error);
        this.message = error.error.message;
      }
    )
  }

  onDelete(id) {
    this.confirmationModalService.confirm('برجاء التاكيد', 'هل انت متاكد من حذف المقر ')
    .then((confirmed) => {
      if(confirmed){
        this.occupationService.deleteOccupation(id).subscribe (
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
    this.router.navigate(['administration/occupations',id,{componentMode: "editMode"}])
  }

  onAdd() {
    this.router.navigate(['administration/occupation-data'])
  }
}
