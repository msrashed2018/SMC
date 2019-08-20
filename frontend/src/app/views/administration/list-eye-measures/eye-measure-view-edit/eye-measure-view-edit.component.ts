import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EyeMeasureService } from '../../../../services/administration/eye-measure.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EyeMeasure } from '../../../../model/eye-measure.model';
@Component({
  selector: 'app-eye-measure-view-edit',
  templateUrl: './eye-measure-view-edit.component.html',
  styleUrls: ['./eye-measure-view-edit.component.scss']
})
export class EyeMeasureViewEditComponent implements OnInit {
  measure={};
  eyeMeasureId;
  componentMode;
  disabled : boolean = false;
  successMessage: boolean = false;
  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';
  errorMessage ="";
  constructor(private formBuilder: FormBuilder, private eyeMeasureService: EyeMeasureService, private router: Router,private route:ActivatedRoute ) { }

  ngOnInit() {
    this.route.params.forEach((urlParams) => {
      this.eyeMeasureId= urlParams['id'];
      this.componentMode=urlParams['componentMode'];
      this.displayEyeMeasureDetails();

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
  displayEyeMeasureDetails(){
    this.eyeMeasureService.retrieveEyeMeasure(this.eyeMeasureId).subscribe(
      response => {
        this.measure = response as EyeMeasure;
      }
    )
  }
  onSave(){
  
    this.eyeMeasureService.createEyeMeasure(this.measure).subscribe(
      result => {
        this.router.navigateByUrl("/administration/eye-measures");
      },
      error => {
        if(error.error.message.includes('unique constraint') || error.error.message.includes('Unique index or primary key violation')){
          this.errorMessage = "بالفعل تم تسجيل هذا القياس من قبل";
        }else{
          this.errorMessage = error.error.message;
        }
        console.log('oops', error);
        this.successMessage = false;
      }
    );
  }
  close(){
    this.router.navigateByUrl("/administration/eye-measures");
  }
}

