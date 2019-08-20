import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { OccupationService } from '../../../../services/administration/occupation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-occupation-data',
  templateUrl: './occupation-data.component.html',
  styleUrls: ['./occupation-data.component.scss']
})
export class OccupationDataComponent implements OnInit {
  requestModel={};
  successMessage: boolean = false;
  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';
  errorMessage ="";
  constructor(private formBuilder: FormBuilder, private occupationService: OccupationService, private router: Router ) { }


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
  
    this.occupationService.createOccupation(this.requestModel).subscribe(
      result => {
        this.router.navigateByUrl("/administration/occupations");
      },
      error => {
        if(error.error.message.includes('unique constraint') || error.error.message.includes('Unique index or primary key violation')){
          this.errorMessage = "بالفعل تم تسجيل هذا المهنة من قبل";
        }else{
          this.errorMessage = error.error.message;
        }
        console.log('oops', error);
        this.successMessage = false;
      }
    );
  }
  close(){
    this.router.navigateByUrl("/administration/occupations");
  }
}

