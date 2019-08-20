import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CityService } from '../../../../services/administration/city.service';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from '../../../../model/city.model';
import { GovernateService } from '../../../../services/administration/governate.service';
import { Governate } from '../../../../model/governate.model';

@Component({
  selector: 'app-city-view-edit',
  templateUrl: './city-view-edit.component.html',
  styleUrls: ['./city-view-edit.component.scss']
})
export class CityViewEditComponent implements OnInit {

  city : City = new City;
  requestCityId;
  componentMode;
  disabled : boolean = false;
  successMessage: boolean = false;
  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';
  public governates : Governate[];
  public selectedGovernateId : number
  constructor(private formBuilder: FormBuilder,private governateService: GovernateService, private cityService: CityService, private router: Router,private route:ActivatedRoute ) { }

  ngOnInit() {

    this.fillGovernates();
    this.route.params.forEach((urlParams) => {
      this.requestCityId= urlParams['id'];
      this.componentMode=urlParams['componentMode'];
      this.displayCityDetails();
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
  displayCityDetails(){
    
    this.cityService.retrieveCity(this.requestCityId).subscribe(
      response => {
        this.city = response as City;
        if(this.city.governate != null){
          this.selectedGovernateId = this.city.governate.id;
        }
      }
    )
  }
  fillGovernates(){
    this.governateService.retrieveZoneGovernates(0,200).subscribe(
      result => {
        this.governates = result['content'];
      },
      error => {
        console.log('oops', error);
    });
  }
  onSave(){
    let governate = new Governate;
    governate.id = this.selectedGovernateId;
    this.city.governate = governate;

    this.cityService.createCity(this.city).subscribe(
      result => {
        this.router.navigateByUrl("/administration/cities");
      },
      error => {
        console.log('oops', error);
        this.successMessage = false;
      }
    );
  }

  close(){
    this.router.navigateByUrl("/administration/cities");
  }
}
