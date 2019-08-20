import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DisabilityService } from '../../../../services/administration/disability.service';
import { Router } from '@angular/router';
import { Disability } from '../../../../model/disability.model';
import { Equipment } from '../../../../model/equipment.model';
import { EquipmentService } from '../../../../services/administration/equipment.service';

@Component({
  selector: 'app-disability-data',
  templateUrl: './disability-data.component.html',
  styleUrls: ['./disability-data.component.scss']
})
export class DisabilityDataComponent implements OnInit {
  requestModel : Disability= new Disability;
  successMessage: boolean = false;
  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';
  public equipments : Equipment[];
  public selectedEquipmentName : string ="";
  public accepted : boolean = false;
  errorMessage ="";
  constructor(private formBuilder: FormBuilder,private equipmentService: EquipmentService, private disabilityService: DisabilityService, private router: Router ) { }

  ngOnInit() {
    this.fillEquipments();
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
    // console.log(this.selectedEquipmentName)

    this.requestModel.equipment = this.equipments.find((e)=> e.name==this.selectedEquipmentName);
    if(this.requestModel.equipment == null){
      this.errorMessage = ".نوع السيارة غير صحيح .. من فضلك اختر النوع من القائمة";
    }else{
      if(this.accepted){
      this.requestModel.accepted= '1';
      }else{
          this.requestModel.accepted= '0';
      }

      this.disabilityService.createDisability(this.requestModel).subscribe(
        result => {
          this.router.navigateByUrl("/administration/disabilities");
        },
        error => {
          if(error.error.message.includes('unique constraint') || error.error.message.includes('Unique index or primary key violation')){
            this.errorMessage = "بالفعل تم تسجيل هذا الاعاقة من قبل";
          }else{
            this.errorMessage = error.error.message;
          }
          console.log('oops', error);
          this.successMessage = false;
        }
      );
    }
    // let equipment = new Equipment;
    // // equipment.id = this.selectedEquipmentId;
    // this.requestModel.equipment = equipment;

    
  }
  close(){
    this.router.navigateByUrl("/administration/disabilities");
  }
  fillEquipments(){
    this.equipmentService.retrieveAllEquipments(0,100).subscribe(
      result => {
        this.equipments = result['content'];
      },
      error => {
        console.log('oops', error);
    });
  }
  onAcceptedChecked( event) {
    this.accepted = event.target.checked;
  }
}
