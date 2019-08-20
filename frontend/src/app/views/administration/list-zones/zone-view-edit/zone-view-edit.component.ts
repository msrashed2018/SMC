import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ZoneService } from '../../../../services/administration/zone.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Zone } from '../../../../model/zone.model';

@Component({
  selector: 'app-zone-view-edit',
  templateUrl: './zone-view-edit.component.html',
  styleUrls: ['./zone-view-edit.component.scss']
})
export class ZoneViewEditComponent implements OnInit {
  requestModel={};
  requestStatusId;
  componentMode;
  disabled : boolean = false;
  successMessage: boolean = false;
  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';
  errorMessage ="";
  constructor(private formBuilder: FormBuilder, private zoneService: ZoneService, private router: Router,private route:ActivatedRoute ) { }

  ngOnInit() {
    this.route.params.forEach((urlParams) => {
      this.requestStatusId= urlParams['id'];
      this.componentMode=urlParams['componentMode'];
      this.displayZoneDetails();

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
  displayZoneDetails(){
    this.zoneService.retrieveZone(this.requestStatusId).subscribe(
      response => {
        this.requestModel = response as Zone;
        console.log(this.requestModel);
      }
    )
  }
  onSave(){
  
    this.zoneService.updateZone((this.requestModel as Zone).id,this.requestModel).subscribe(
      result => {
        this.router.navigateByUrl("/administration/zones");
      },
      error => {
        if(error.error.message.includes('unique constraint') || error.error.message.includes('Unique index or primary key violation')){
          this.errorMessage = "بالفعل تم تسجيل هذا المقر من قبل";
        }else{
          this.errorMessage = error.error.message;
        }
        console.log('oops', error);
        this.successMessage = false;
      }
    );
  }
  close(){
    this.router.navigateByUrl("/administration/zones");
  }
}
