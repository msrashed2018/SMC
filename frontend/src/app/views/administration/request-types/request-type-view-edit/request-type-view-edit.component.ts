import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestTypeService } from '../../../../services/administration/request-type.service';

@Component({
  selector: 'app-request-type-view-edit',
  templateUrl: './request-type-view-edit.component.html',
  styleUrls: ['./request-type-view-edit.component.scss']
})
export class RequestTypeViewEditComponent implements OnInit {

  constructor(      private requestTypeService:RequestTypeService,
    private router : Router,private route:ActivatedRoute
  ) { }
  requestTypeId;
  componentMode;
  requestModel={};
  disabled : boolean = false;
  successMessage: boolean = false;
  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';
  errorMessage ="";
  ngOnInit() {
    this.route.params.forEach((urlParams) => {
      this.requestTypeId= urlParams['id'];
      this.componentMode=urlParams['componentMode'];
      this.displayTypeDetails();
    });
    if(this.componentMode == "editMode"){
      this.disabled = false;
    }else{
    this.disabled = true;
    }
  }
  displayTypeDetails(){
    this.requestTypeService.retrieveRequestType(this.requestTypeId).subscribe(
      response => {
        this.requestModel = response as any;
      }
    )
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
      result => {
        this.router.navigateByUrl("/administration/types");
      },
      error => {
        if(error.error.message.includes('unique constraint') || error.error.message.includes('Unique index or primary key violation')){
          this.errorMessage = "بالفعل تم تسجيل هذا النوع من قبل";
        }else{
          this.errorMessage = error.error.message;
        }
        console.log('oops', error);
        this.successMessage = false;
      }
    );
  }
  close(){
    this.router.navigateByUrl("/administration/types");
  }

}
