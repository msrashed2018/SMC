import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DocumentTypeService } from '../../../../services/administration/document-type.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-document-type-data',
  templateUrl: './document-type-data.component.html',
  styleUrls: ['./document-type-data.component.scss']
})
export class DocumentTypeDataComponent implements OnInit {
  requestModel={};
  successMessage: boolean = false;
  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';
  errorMessage ="";
  constructor(private formBuilder: FormBuilder, private documentTypeService: DocumentTypeService, private router: Router ) { }

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
    this.documentTypeService.createDocumentType(this.requestModel).subscribe(
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
