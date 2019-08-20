import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/administration/user.service';
import { User } from '../../../model/user.model';
import { FormBuilder } from '@angular/forms';
import { ConfirmModalService } from '../../confirm-modal/confirm-modal.service';
import { USERS_PAGE_SIZE } from '../../../app.constants';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  users: User[]
  message: string

  constructor(
    private userService:UserService,
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
    this.items = i*USERS_PAGE_SIZE;
    this.refreshData();
  }
  nextPage(event: any): void {
    event.preventDefault();
    if((this.page+1) < this.pages.length){
      this.page = this.page+1
      this.items = (this.page)*USERS_PAGE_SIZE;
      this.refreshData();
    }
  }
  prevPage(event: any): void {
    event.preventDefault();

    if((this.page-1) >= 0){
      this.page =this.page -1;
      this.items = (this.page)*USERS_PAGE_SIZE;
      this.refreshData();
    }
  }
  ngOnInit() {
    this.refreshData();
  }
  refreshData(){
    this.userService.retrieveAllUsers(this.page,USERS_PAGE_SIZE).subscribe(
      response => {
        this.users = response['content'];
        this.pages = new Array(response['totalPages']);
      },
error =>{
        console.log('oops',error);
        this.message = error.error.message;
      }
    )
  }

  onDelete(id) {
    this.confirmationModalService.confirm('برجاء التاكيد', 'هل انت متاكد من حذف المستخدم؟ ')
    .then((confirmed) => {
      if(confirmed){
        this.userService.deleteUser(id).subscribe (
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
    this.router.navigate(['administration/users',id,{componentMode: "editMode"}])
  }

  onAdd() {
    this.router.navigate(['administration/user-data'])
  }
}
