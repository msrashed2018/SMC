import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { GovernateService } from '../../../../services/administration/governate.service';
import { Zone } from '../../../../model/zone.model';
import { ZoneService } from '../../../../services/administration/zone.service';
import { Governate } from '../../../../model/governate.model';

@Component({
  selector: 'app-governate-data',
  templateUrl: './governate-data.component.html',
  styleUrls: ['./governate-data.component.scss']
})
export class GovernateDataComponent implements OnInit {
  governate: Governate = new Governate;
  successMessage: boolean = false;
  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';
  public zones : Zone[];
  public selectedZoneId : number
  errorMessage = "";
  constructor(private formBuilder: FormBuilder, private governateService: GovernateService, private zoneService: ZoneService, private router: Router) { }

  ngOnInit() {
    this.fillZones();
  }
  collapsed(event: any): void {
  }

  expanded(event: any): void {
  }
  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.iconCollapse = this.isCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
  }
  onSave() {
    let zone = new Zone;
    zone.id = this.selectedZoneId;
    this.governate.zone = zone;

    this.governateService.createGovernate(this.governate).subscribe(
      result => {
        this.router.navigateByUrl("/administration/governates");
      },
      error => {
        if (error.error.message.includes('unique constraint') || error.error.message.includes('Unique index or primary key violation')) {
          this.errorMessage = "بالفعل تم تسجيل هذا المحافظة من قبل في احدي المقرات";
        } else {
          this.errorMessage = error.error.message;
        }
        console.log('oops', error);
        this.successMessage = false;
      }
    );
  }
  close() {
    this.router.navigateByUrl("/administration/governates");
  }
  fillZones(){
    this.zoneService.retrieveAllZones(0,100).subscribe(
      result => {
        this.zones = result['content'];
      },
      error => {
        console.log('oops', error);
    });
  }

}
