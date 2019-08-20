import { Component, OnInit } from '@angular/core';
import { RequestTypeService } from '../../../../services/administration/request-type.service';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-request-type-data',
  templateUrl: './request-type-data.component.html',
  styleUrls: ['./request-type-data.component.scss']
})
export class RequestTypeDataComponent implements OnInit {
  successMessage: boolean = false;
  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';
  errorMessage ="";
  constructor(private router:Router,  private modalService: NgbModal,  private requestTypeService:RequestTypeService,
  ) { }
  componentViewMode='addMode';
  requestModel={};
  ngOnInit() {
  }
  collapsed(event: any): void {
  }

  expanded(event: any): void {
  }
  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.iconCollapse = this.isCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
  }
  onSave(){
    this.requestTypeService.createRequestType(this.requestModel).subscribe(
      response => {
        this.router.navigate(["/administration/types"])
      },
      error=>{
        if(error.error.message.includes('unique constraint') || error.error.message.includes('Unique index or primary key violation')){
          this.errorMessage = "بالفعل تم تسجيل هذا النوع من قبل";
        }else{
          this.errorMessage = error.error.message;
        }
      }
    )
  }

  close(){
    this.router.navigate(["/administration/types"])
  }

}
