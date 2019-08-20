import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EyeRevealSettingService } from '../../../services/administration/eye-reveal-setting.service';
import { EyeRevealSetting } from '../../../model/eye-reveal-setting.model';
import { ConfirmModalService } from '../../confirm-modal/confirm-modal.service';
import { EYE_REVEAL_SETTINGS_PAGE_SIZE } from '../../../app.constants';


@Component({
  selector: 'app-list-eye-reveal-setting',
  templateUrl: './list-eye-reveal-setting.component.html',
  styleUrls: ['./list-eye-reveal-setting.component.scss']
})
export class ListEyeRevealSettingComponent implements OnInit {
  settings: EyeRevealSetting[]
  message: string

  constructor(
    private eyeRevealSettingService:EyeRevealSettingService,
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
    this.items = i*EYE_REVEAL_SETTINGS_PAGE_SIZE;
    this.refreshData();
  }
  nextPage(event: any): void {
    event.preventDefault();
    if((this.page+1) < this.pages.length){
      this.page = this.page+1
      this.items = (this.page)*EYE_REVEAL_SETTINGS_PAGE_SIZE;
      this.refreshData();
    }
  }
  prevPage(event: any): void {
    event.preventDefault();

    if((this.page-1) >= 0){
      this.page =this.page -1;
      this.items = (this.page)*EYE_REVEAL_SETTINGS_PAGE_SIZE;
      this.refreshData();
    }
  }
  ngOnInit() {
    this.refreshData();
  }
  refreshData(){
    this.eyeRevealSettingService.retrieveAllEyeRevealSettings(this.page,EYE_REVEAL_SETTINGS_PAGE_SIZE).subscribe(
      response => {
        this.settings = response['content'];
        this.pages = new Array(response['totalPages']);
      },
error =>{
        console.log('oops',error);
        this.message = error.error.message;
      }
    )
  }

  onDelete(id) {
    this.confirmationModalService.confirm('برجاء التاكيد', 'هل انت متاكد من حذف الضبط ')
    .then((confirmed) => {
      
      if(confirmed){
        this.eyeRevealSettingService.deleteEyeRevealSetting(id).subscribe (
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
    this.router.navigate(['administration/eye-reveal-settings',id,{componentMode: "editMode"}])
  }

  onAdd() {
    this.router.navigate(['administration/eye-reveal-setting-data'])
  }
}
