import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestStatusService } from '../../../../services/administration/request-status.service';

@Component({
  selector: 'app-request-status-data',
  templateUrl: './request-status-data.component.html',
  styleUrls: ['./request-status-data.component.scss']
})
export class RequestStatusDataComponent implements OnInit {
  requestModel={};
  successMessage: boolean = false;
  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';
  errorMessage ="";
  constructor(private formBuilder: FormBuilder, private requestStatusService: RequestStatusService, private router: Router ) { }


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
  
    this.requestStatusService.createRequestStatus(this.requestModel).subscribe(
      result => {
        this.router.navigateByUrl("/administration/request-status");
      },
      error => {
        if(error.error.message.includes('unique constraint') || error.error.message.includes('Unique index or primary key violation')){
          this.errorMessage = "بالفعل تم تسجيل هذا الحالة من قبل";
        }else{
          this.errorMessage = error.error.message;
        }
        console.log('oops', error);
        this.successMessage = false;
      }
    );
  }
  close(){
    this.router.navigateByUrl("/administration/request-status");
  }
}

