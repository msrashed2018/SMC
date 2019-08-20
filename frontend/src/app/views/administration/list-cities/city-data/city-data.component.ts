import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CityService } from '../../../../services/administration/city.service';
import { Router } from '@angular/router';
import { City } from '../../../../model/city.model';
import { Governate } from '../../../../model/governate.model';
import { GovernateService } from '../../../../services/administration/governate.service';

@Component({
  selector: 'app-city-data',
  templateUrl: './city-data.component.html',
  styleUrls: ['./city-data.component.scss']
})
export class CityDataComponent implements OnInit {
  city : City= new City;
  successMessage: boolean = false;
  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';
  public governates : Governate[];
  public selectedGovernateId : number
  constructor(private formBuilder: FormBuilder,private governateService: GovernateService, private cityService: CityService, private router: Router ) { }

  ngOnInit() {
    this.fillGovernates();
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
  fillGovernates(){
    this.governateService.retrieveZoneGovernates(0,200).subscribe(
      result => {
        this.governates = result['content'];
      },
      error => {
        console.log('oops', error);
    });
  }

}
