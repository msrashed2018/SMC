import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EyeMeasureService } from '../../../../services/administration/eye-measure.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-eye-measure-data',
  templateUrl: './eye-measure-data.component.html',
  styleUrls: ['./eye-measure-data.component.scss']
})
export class EyeMeasureDataComponent implements OnInit {
  measure={};
  successMessage: boolean = false;
  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';
  errorMessage ="";
  constructor(private formBuilder: FormBuilder, private eyeMeasureService: EyeMeasureService, private router: Router ) { }


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
