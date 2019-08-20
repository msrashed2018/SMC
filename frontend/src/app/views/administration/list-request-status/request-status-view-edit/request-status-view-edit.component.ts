import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestStatusService } from '../../../../services/administration/request-status.service';
@Component({
  selector: 'app-request-status-view-edit',
  templateUrl: './request-status-view-edit.component.html',
  styleUrls: ['./request-status-view-edit.component.scss']
})
export class RequestStatusViewEditComponent implements OnInit {
  requestModel={};
  requestStatusId;
  componentMode;
  disabled : boolean = false;
  successMessage: boolean = false;
  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';
  errorMessage ="";
  constructor(private formBuilder: FormBuilder, private requestStatusService: RequestStatusService, private router: Router,private route:ActivatedRoute ) { }

  ngOnInit() {
    this.route.params.forEach((urlParams) => {
      this.requestStatusId= urlParams['id'];
      this.componentMode=urlParams['componentMode'];
      this.displayRequestStatusDetails();
    });
    if(this.componentMode == "editMode"){
      this.disabled = false;
    }else{
    this.disabled = true;
    }
  }
  collapsed(event: any): void {
  }

  expanded(event: any): void {
  }
  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.iconCollapse = this.isCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
  }
  displayRequestStatusDetails(){
    this.requestStatusService.retrieveRequestStatus(this.requestStatusId).subscribe(
      response => {
        this.requestModel = response as any;
      }
    )
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
