import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CommitteeService } from '../../../../services/administration/committee.service';
import { Router } from '@angular/router';
import { Zone } from '../../../../model/zone.model';
import { ZoneService } from '../../../../services/administration/zone.service';
import { Committee } from '../../../../model/committee.model';
import { CommitteeMemberService } from '../../../../services/administration/committee-member.service';
import { CommitteeMember } from '../../../../model/committee-member.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-committee-data',
  templateUrl: './committee-data.component.html',
  styleUrls: ['./committee-data.component.scss']
})
export class CommitteeDataComponent implements OnInit {
  requestModel: Committee = new Committee;
  successMessage: boolean = false;
  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';
  // public zones : Zone[];
  public members: CommitteeMember[]
  // public selectedZoneId : number
  public selectedMember1Id: number
  public selectedMember2Id: number
  public selectedMember3Id: number = 0;
  public selectedMember4Id: number = 0;
  public selectedMember5Id: number = 0;
  public selectedMember6Id: number = 0;
  errorMessage = "";
  constructor(private datepipe: DatePipe, private formBuilder: FormBuilder, private committeeMemberService: CommitteeMemberService, private zoneService: ZoneService, private committeeService: CommitteeService, private router: Router) { }

  ngOnInit() {
    // this.zones = [];
    this.members = [];
    // this.fillZones();
    this.fillCommitteeMembers();
    this.selectedMember6Id = 0;
  }
  collapsed(event: any): void {
  }

  expanded(event: any): void {
  }
  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.iconCollapse = this.isCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
  }
  isCommitteeDateInFuture(committeeDate: string): boolean {
    if (new Date(committeeDate) >= new Date(new Date().toDateString())) {
      return true;
    } else {
      return false;
    }
  }
  onSave() {
    // let zone = new Zone;
    // zone.id = this.selectedZoneId;

    if (!this.isCommitteeDateInFuture(this.requestModel.date)) {
      this.errorMessage = 'عفوا لابد ان يكون تاريخ اللجنة في السمتقبل';
    } else {

      this.requestModel.memberOne = this.members.find((c) => c.id == this.selectedMember1Id);
      this.requestModel.memberTwo = this.members.find((c) => c.id == this.selectedMember2Id);

      if (this.selectedMember3Id > 0) {
        this.requestModel.memberThree = this.members.find((c) => c.id == this.selectedMember3Id);
      } else {
        this.requestModel.memberThree = null;
      }
      if (this.selectedMember4Id > 0) {
        this.requestModel.memberFour = this.members.find((c) => c.id == this.selectedMember4Id);
      } else {
        this.requestModel.memberFour = null;
      }

      if (this.selectedMember5Id > 0) {
        this.requestModel.memberFive = this.members.find((c) => c.id == this.selectedMember5Id);
      } else {
        this.requestModel.memberFive = null;
      }

      if (this.selectedMember6Id > 0) {
        this.requestModel.memberSix = this.members.find((c) => c.id == this.selectedMember6Id);
      } else {
        this.requestModel.memberSix = null;
      }
      this.requestModel.date = this.datepipe.transform(this.requestModel.date, 'yyyy-MM-dd');


      this.committeeService.createCommittee(this.requestModel).subscribe(
        result => {
          this.router.navigateByUrl("/administration/committees");
        },
        error => {
          if (error.error.message != null) {
            this.errorMessage = error.error.message;
          }
          console.log('oops', error);
          this.successMessage = false;
        }
      );
    }
  }
  close() {
    this.router.navigateByUrl("/administration/committees");
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
  fillCommitteeMembers() {
    this.committeeMemberService.retrieveAllCommitteeMembers(0, 1000).subscribe(
      result => {
        this.members = result['content'];
      },
      error => {
        console.log('oops', error);
      });
  }
}
