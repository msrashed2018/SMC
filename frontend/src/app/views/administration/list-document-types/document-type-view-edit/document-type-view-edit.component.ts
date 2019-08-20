import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DocumentTypeService } from '../../../../services/administration/document-type.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-document-type-view-edit',
  templateUrl: './document-type-view-edit.component.html',
  styleUrls: ['./document-type-view-edit.component.scss']
})
export class DocumentTypeViewEditComponent implements OnInit {
  requestModel={};
  documentTypeId;
  componentMode;
  disabled : boolean = false;
  successMessage: boolean = false;
  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';
  errorMessage ="";
  constructor(private formBuilder: FormBuilder, private documentTypeService: DocumentTypeService, private router: Router,private route:ActivatedRoute ) { }

  ngOnInit() {
    this.route.params.forEach((urlParams) => {
      this.documentTypeId= urlParams['id'];
      this.componentMode=urlParams['componentMode'];
      this.displayDocumentTypeDetails();

      if(this.componentMode == "editMode"){
          this.disabled = false;
      }else{
        this.disabled = true;
      }
    });
  }
  collapsed(event: any): void {
  }

  expanded(event: any): void {
  }
  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.iconCollapse = this.isCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
  }
  displayDocumentTypeDetails(){
    this.documentTypeService.retrieveDocumentType(this.documentTypeId).subscribe(
      response => {
        this.requestModel = response as any;
      }
    )
  }
  onSave(){
  
    this.documentTypeService.updateDocumentType(this.documentTypeId,this.requestModel).subscribe(
      result => {
        this.router.navigateByUrl("/administration/document-types");
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
    this.router.navigateByUrl("/administration/document-types");
  }
}
