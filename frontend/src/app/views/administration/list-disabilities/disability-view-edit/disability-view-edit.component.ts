import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DisabilityService } from '../../../../services/administration/disability.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Disability } from '../../../../model/disability.model';
import { EquipmentService } from '../../../../services/administration/equipment.service';
import { Equipment } from '../../../../model/equipment.model';

@Component({
  selector: 'app-disability-view-edit',
  templateUrl: './disability-view-edit.component.html',
  styleUrls: ['./disability-view-edit.component.scss']
})
export class DisabilityViewEditComponent implements OnInit {
  requestModel : Disability = new Disability;
  requestEquipmentId;
  componentMode;
  disabled : boolean = false;
  successMessage: boolean = false;
  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';
  public equipments : Equipment[];
  public selectedEquipmentName : string ="";
  public accepted : boolean = false;
  errorMessage ="";
  constructor(private formBuilder: FormBuilder,private equipmentService: EquipmentService, private disabilityService: DisabilityService, private router: Router,private route:ActivatedRoute ) { }

  ngOnInit() {

    this.fillEquipments();
    this.route.params.forEach((urlParams) => {
      this.requestEquipmentId= urlParams['id'];
      this.componentMode=urlParams['componentMode'];
      this.displayDisabilityDetails();
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
  displayDisabilityDetails(){
    
    this.disabilityService.retrieveDisability(this.requestEquipmentId).subscribe(
      response => {
        this.requestModel = response as Disability;
        if(this.requestModel.equipment != null){
          this.selectedEquipmentName = this.requestModel.equipment.name;
        }

        if(this.requestModel.accepted == "1"){
          this.accepted = true;
        }else{
          this.accepted = false;
        }
      }
    )
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
  onSave(){
    // let equipment = new Equipment;
    // equipment.id = this.selectedEquipmentId;
    // this.requestModel.equipment = equipment;

    this.requestModel.equipment = this.equipments.find((e)=> e  .name==this.selectedEquipmentName);
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


    
  }
  onAcceptedChecked( event) {
    this.accepted = event.target.checked;
  }
  close(){
    this.router.navigateByUrl("/administration/disabilities");
  }
}
