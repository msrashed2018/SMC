import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommitteeMember } from '../../../model/committee-member.model';
import { CommitteeMemberService } from '../../../services/administration/committee-member.service';
import { ConfirmModalService } from '../../confirm-modal/confirm-modal.service';
import { COMMITTEE_MEMBERS_PAGE_SIZE } from '../../../app.constants';



@Component({
  templateUrl: './list-committee-members.component.html',
  styleUrls: ['./list-committee-members.component.scss']
})
export class ListCommitteeMembersComponent implements OnInit {
  committeeMembers: CommitteeMember[]
  message: string

  constructor(
    private committeeMemberService:CommitteeMemberService,
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
    this.items = i*COMMITTEE_MEMBERS_PAGE_SIZE;
    this.refreshData();
  }
  nextPage(event: any): void {
    event.preventDefault();
    if((this.page+1) < this.pages.length){
      this.page = this.page+1
      this.items = (this.page)*COMMITTEE_MEMBERS_PAGE_SIZE;
      this.refreshData();
    }
  }
  prevPage(event: any): void {
    event.preventDefault();

    if((this.page-1) >= 0){
      this.page =this.page -1;
      this.items = (this.page)*COMMITTEE_MEMBERS_PAGE_SIZE;
      this.refreshData();
    }
  }
  ngOnInit() {
    this.refreshData();
  }
  refreshData(){
    this.committeeMemberService.retrieveAllCommitteeMembers(this.page,COMMITTEE_MEMBERS_PAGE_SIZE).subscribe(
      response => {
        this.committeeMembers = response['content'];
        this.pages = new Array(response['totalPages']);
      },
error =>{
        console.log('oops',error);
        this.message = error.error.message;
      }
    )
  }

  onDelete(id) {
    this.confirmationModalService.confirm('برجاء التاكيد', 'هل انت متاكد من حذف العضو؟ ')
    .then((confirmed) => {
      if(confirmed){
        this.committeeMemberService.deleteCommitteeMember(id).subscribe (
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
    this.router.navigate(['administration/committee-members',id,{componentMode: "editMode"}])
  }

  onAdd() {
    this.router.navigate(['administration/committee-member-data'])
  }
}
