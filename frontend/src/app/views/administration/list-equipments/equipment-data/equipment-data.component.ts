import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EquipmentService } from '../../../../services/administration/equipment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-equipment-data',
  templateUrl: './equipment-data.component.html',
  styleUrls: ['./equipment-data.component.scss']
})
export class EquipmentDataComponent implements OnInit {
  requestModel={};
  successMessage: boolean = false;
  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';
  errorMessage ="";
  constructor(private formBuilder: FormBuilder, private equipmentService: EquipmentService, private router: Router ) { }


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