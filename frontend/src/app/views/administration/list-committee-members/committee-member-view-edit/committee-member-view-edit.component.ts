import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CommitteeMemberService } from '../../../../services/administration/committee-member.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Zone } from '../../../../model/zone.model';
import { ZoneService } from '../../../../services/administration/zone.service';
import { CommitteeMember } from '../../../../model/committee-member.model';

@Component({
  templateUrl: './committee-member-view-edit.component.html',
  styleUrls: ['./committee-member-view-edit.component.scss']
})
export class CommitteeMemberViewEditComponent implements OnInit {
  requestModel: CommitteeMember = new CommitteeMember;;
  requestStatusId;
  componentMode;
  // public zones : Zone[];
  // public selectedZoneId : number
  disabled: boolean = false;
  successMessage: boolean = false;
  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';
  constructor(private formBuilder: FormBuilder, private zoneService: ZoneService, private committeeMemberService: CommitteeMemberService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    // this.zones = [];
    // this.fillZones();
    this.route.params.forEach((urlParams) => {
      this.requestStatusId = urlParams['id'];
      this.componentMode = urlParams['componentMode'];
      this.displayCommitteeMemberDetails();

      if (this.componentMode == "editMode") {
        this.disabled = false;
      } else {
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
  displayCommitteeMemberDetails() {
    this.committeeMemberService.retrieveCommitteeMember(this.requestStatusId).subscribe(
      response => {
        this.requestModel = response as CommitteeMember;
        // this.selectedZoneId = this.requestModel.zone.id;
      }
    )
  }
  onSave() {
    // let zone = new Zone;
    // zone.id = this.selectedZoneId;
    // this.requestModel.zone = zone;
    this.committeeMemberService.createCommitteeMember(this.requestModel).subscribe(
      result => {
        this.router.navigateByUrl("/administration/committee-members");
      },
      error => {
        console.log('oops', error);
        this.successMessage = false;
      }
    );
  }
close() {
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

