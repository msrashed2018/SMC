import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Committee } from '../../../model/committee.model';
import { CommitteeService } from '../../../services/administration/committee.service';
import { ConfirmModalService } from '../../confirm-modal/confirm-modal.service';
import { COMMITTEES_PAGE_SIZE } from '../../../app.constants';

@Component({
  selector: 'app-list-committees',
  templateUrl: './list-committees.component.html',
  styleUrls: ['./list-committees.component.scss']
})
export class ListCommitteesComponent implements OnInit {
  committees: Committee[]
  message: string

  constructor(
    private committeeService:CommitteeService,
    private router : Router, private confirmationModalService: ConfirmModalService
  ) { 

  }
  //pagination variables
  maxSize: number = 10;
  totalItems: number = 0;
  currentPage: number = 0;
  numPages: number = 0;
  items: number = 0;
  itemsPerPage: number = 10;
  pageChanged(event: any): void {
    this.items = (event.page -1) * this.itemsPerPage ;
    this.currentPage = event.page -1;
    this.refreshData();
  }
  ngOnInit() {
    this.refreshData();
  }
  refreshData(){
    this.committeeService.retrieveAllCommittees(this.currentPage,this.itemsPerPage).subscribe(
      response => {
        this.committees = response['content'];
        this.totalItems = response['totalElements'];
      },
      error =>{
        console.log('oops',error);
        this.message = error.error.message;
      }
    )
  }

  onDelete(id) {
    this.confirmationModalService.confirm('برجاء التاكيد', 'هل انت متاكد من حذف اللجنة؟ ')
    .then((confirmed) => {
      if(confirmed){
        this.committeeService.deleteCommittee(id).subscribe (
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
    this.router.navigate(['administration/committees',id,{componentMode: "editMode"}])
  }

  onAdd() {
    this.router.navigate(['administration/committee-data'])
  }
}
