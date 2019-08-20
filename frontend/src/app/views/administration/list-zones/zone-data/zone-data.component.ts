import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ZoneService } from '../../../../services/administration/zone.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-zone-data',
  templateUrl: './zone-data.component.html',
  styleUrls: ['./zone-data.component.scss']
})
export class ZoneDataComponent implements OnInit {
  requestModel={};
  successMessage: boolean = false;
  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';
  errorMessage ="";
  constructor(private formBuilder: FormBuilder, private zoneService: ZoneService, private router: Router ) { }


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
  
    this.zoneService.createZone(this.requestModel).subscribe(
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
