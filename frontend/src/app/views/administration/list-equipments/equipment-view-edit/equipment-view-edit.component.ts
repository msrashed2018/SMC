import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EquipmentService } from '../../../../services/administration/equipment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipment } from '../../../../model/equipment.model';

@Component({
  selector: 'app-equipment-view-edit',
  templateUrl: './equipment-view-edit.component.html',
  styleUrls: ['./equipment-view-edit.component.scss']
})
export class EquipmentViewEditComponent implements OnInit {
  requestModel={};
  requestStatusId;
  componentMode;
  disabled : boolean = false;
  successMessage: boolean = false;
  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';
  errorMessage ="";
  constructor(private formBuilder: FormBuilder, private equipmentService: EquipmentService, private router: Router,private route:ActivatedRoute ) { }

  ngOnInit() {
    this.route.params.forEach((urlParams) => {
      this.requestStatusId= urlParams['id'];
      this.componentMode=urlParams['componentMode'];
      this.displayEquipmentDetails();

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
  displayEquipmentDetails(){
    this.equipmentService.retrieveEquipment(this.requestStatusId).subscribe(
      response => {
        this.requestModel = response as Equipment;
      }
    )
  }
  onSave(){
  
    this.equipmentService.createEquipment(this.requestModel).subscribe(
      result => {
        this.router.navigateByUrl("/administration/equipments");
      },
      error => {
        if(error.error.message.includes('unique constraint') || error.error.message.includes('Unique index or primary key violation')){
          this.errorMessage = "بالفعل تم تسجيل هذا السيارة من قبل";
        }else{
          this.errorMessage = error.error.message;
        }
        console.log('oops', error);
        this.successMessage = false;
      }
    );
  }
  close(){
    this.router.navigateByUrl("/administration/equipments");
  }
}

