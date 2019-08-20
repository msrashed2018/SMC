import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { OccupationService } from '../../../../services/administration/occupation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Occupation } from '../../../../model/occupation.model';

@Component({
  selector: 'app-occupation-view-edit',
  templateUrl: './occupation-view-edit.component.html',
  styleUrls: ['./occupation-view-edit.component.scss']
})
export class OccupationViewEditComponent implements OnInit {
  requestModel={};
  occupationId;
  componentMode;
  disabled : boolean = false;
  successMessage: boolean = false;
  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';
  errorMessage ="";
  constructor(private formBuilder: FormBuilder, private occupationService: OccupationService, private router: Router,private route:ActivatedRoute ) { }

  ngOnInit() {
    this.route.params.forEach((urlParams) => {
      this.occupationId= urlParams['id'];
      this.componentMode=urlParams['componentMode'];
      this.displayOccupationDetails();

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
  displayOccupationDetails(){
    this.occupationService.retrieveOccupation(this.occupationId).subscribe(
      response => {
        this.requestModel = response as Occupation;
      }, error=>{
        if(error.error.message.includes('unique constraint') || error.error.message.includes('Unique index or primary key violation')){
          this.errorMessage = "بالفعل تم تسجيل هذا المهنة من قبل";
        }else{
          this.errorMessage = error.error.message;
        }
        console.log(error)
      }
    )
  }
  onSave(){
  
    this.occupationService.createOccupation(this.requestModel).subscribe(
      result => {
        this.router.navigateByUrl("/administration/occupations");
      },
      error => {
        console.log('oops', error);
        this.successMessage = false;
      }
    );
  }
  close(){
    this.router.navigateByUrl("/administration/occupations");
  }
}
