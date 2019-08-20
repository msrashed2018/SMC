import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EyeRevealSettingService } from '../../../../services/administration/eye-reveal-setting.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EyeMeasure } from '../../../../model/eye-measure.model';
import { EyeMeasureService } from '../../../../services/administration/eye-measure.service';
import { EyeRevealSetting } from '../../../../model/eye-reveal-setting.model';

@Component({
  selector: 'app-eye-reveal-setting-view-edit',
  templateUrl: './eye-reveal-setting-view-edit.component.html',
  styleUrls: ['./eye-reveal-setting-view-edit.component.scss']
})
export class EyeRevealSettingViewEditComponent implements OnInit {

  setting : EyeRevealSetting = new EyeRevealSetting();
  eyeMeasureId;
  componentMode;
  disabled : boolean = false;
  successMessage: boolean = false;
  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';
  public measures : EyeMeasure[];
  public selectedLeftMeasureId : number
  public selectedRightMeasureId : number
  public glassesCheck : boolean = false;
  public distinguishCheck : boolean = false;
  public squintCheck : boolean = false;

  constructor(private route:ActivatedRoute, private formBuilder: FormBuilder, private eyeMeasureService: EyeMeasureService, private eyeRevealSettingService: EyeRevealSettingService, private router: Router ) { }

  ngOnInit() {
    
    this.fillMeasures();
    this.route.params.forEach((urlParams) => {
      this.eyeMeasureId= urlParams['id'];
      this.componentMode=urlParams['componentMode'];
      this.displaySettingDetails();

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
  displaySettingDetails(){
    this.eyeRevealSettingService.retrieveEyeRevealSetting(this.eyeMeasureId).subscribe(
      response => {
        this.setting = response as EyeRevealSetting;

        if(this.setting.leftMeasure != null){
          this.selectedLeftMeasureId = this.setting.leftMeasure.id;
        }
        if(this.setting.rightMeasure != null){
          this.selectedRightMeasureId = this.setting.rightMeasure.id;
        }

        if(this.setting.distinguishColor == "1"){
          this.distinguishCheck = true;
        }else{
          this.distinguishCheck = false;
        }

        if(this.setting.useGlasses == "1"){
          this.glassesCheck = true;
        }else{
          this.glassesCheck = false;
        }
        if(this.setting.squint == "1"){
          this.squintCheck = true;
        }else{
          this.squintCheck = false;
        }
      }
    )
  }
  onSave(){
    let leftEyeMeasure = new EyeMeasure;
    leftEyeMeasure.id = this.selectedLeftMeasureId;
    this.setting.leftMeasure = leftEyeMeasure;

    let rightEyeMeasure = new EyeMeasure;
    rightEyeMeasure.id = this.selectedRightMeasureId;
    this.setting.rightMeasure = rightEyeMeasure;

    if(this.distinguishCheck){
      this.setting.distinguishColor= '1';
    }else{
      this.setting.distinguishColor= '0';
    }

    if(this.glassesCheck){
      this.setting.useGlasses= '1';
    }else{
      this.setting.useGlasses= '0';
    }

    if(this.squintCheck){
      this.setting.squint= '1';
    }else{
      this.setting.squint= '0';
    }


    this.eyeRevealSettingService.createEyeRevealSetting(this.setting).subscribe(
      result => {
        this.router.navigateByUrl("/administration/eye-reveal-settings");
      },
      error => {
        console.log('oops', error);
        this.successMessage = false;
      }
    );
  }
  close(){
    this.router.navigateByUrl("/administration/eye-reveal-settings");
  }

  fillMeasures(){
    this.eyeMeasureService.retrieveAllEyeMeasure(0,100).subscribe(
      result => {
        this.measures = result['content'];
      },
      error => {
        console.log('oops', error);
    });
  }
  onGlassesChecked( event) {
    this.glassesCheck = event.target.checked;
  }

  onSquintChecked( event) {
    this.squintCheck = event.target.checked;
  }
  onDistinguishChecked( event) {
    this.distinguishCheck = event.target.checked;
  }
}
