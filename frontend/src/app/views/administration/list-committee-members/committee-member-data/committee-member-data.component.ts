import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { CommitteeMemberService } from '../../../../services/administration/committee-member.service';
import { Router } from '@angular/router';
import { Zone } from '../../../../model/zone.model';
import { ZoneService } from '../../../../services/administration/zone.service';
import { CommitteeMember } from '../../../../model/committee-member.model';

@Component({
  selector: 'app-committee-member-data',
  templateUrl: './committee-member-data.component.html',
  styleUrls: ['./committee-member-data.component.scss']
})
export class CommitteeMemberDataComponent implements OnInit {
  requestModel : CommitteeMember= new CommitteeMember;
  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';
  errorMessage :string = "";
  // public zones : Zone[];
  // public selectedZoneId : number
  constructor(private formBuilder: FormBuilder, private zoneService: ZoneService, private committeeMemberService: CommitteeMemberService, private router: Router ) { }

  ngOnInit() {
    // this.zones = [];
    // this.fillZones();
    // this.selectedZoneId = 1;
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
    // let zone = new Zone;
    // zone.id = this.selectedZoneId;
    // this.requestModel.zone = zone;
    this.committeeMemberService.createCommitteeMember(this.requestModel).subscribe(
      result => {
        this.errorMessage = "";
        this.router.navigateByUrl("/administration/committee-members");
      },
      error => {
        if(error.error.message != null){
          this.errorMessage = error.error.message
        }else{
          this.errorMessage = error.error
        }
        console.log('oops', error.error);
      }
    );
  }
  close(){
    this.router.navigateByUrl("/administration/committee-members");
  }

  // fillZones(){
  //   this.zoneService.retrieveAllZones(0,100).subscribe(
  //     result => {
  //       this.zones = result['content'];
  //     },
  //     error => {
  //       console.log('oops', error);
  //   });
  // }
}