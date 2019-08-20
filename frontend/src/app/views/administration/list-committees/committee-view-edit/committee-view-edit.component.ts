import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CommitteeService } from '../../../../services/administration/committee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Zone } from '../../../../model/zone.model';
import { ZoneService } from '../../../../services/administration/zone.service';
import { Committee } from '../../../../model/committee.model';
import { CommitteeMemberService } from '../../../../services/administration/committee-member.service';
import { CommitteeMember } from '../../../../model/committee-member.model';

@Component({
  selector: 'app-committee-view-edit',
  templateUrl: './committee-view-edit.component.html',
  styleUrls: ['./committee-view-edit.component.scss']
})
export class CommitteeViewEditComponent implements OnInit {
  requestModel: Committee = new Committee;
  successMessage: boolean = false;
  isCollapsed: boolean = false;
  committeeId;
  componentMode;
  disabled: boolean = false;
  iconCollapse: string = 'icon-arrow-up';
  // public zones : Zone[];
  public members: CommitteeMember[] = [];
  // public selectedZoneId : number
  public selectedMember1Id: number
  public selectedMember2Id: number
  public selectedMember3Id: number = 0;
  public selectedMember4Id: number = 0;
  public selectedMember5Id: number = 0;
  public selectedMember6Id: number = 0;
  errorMessage = "";
  constructor(private formBuilder: FormBuilder, private committeeMemberService: CommitteeMemberService, private zoneService: ZoneService, private committeeService: CommitteeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.forEach((urlParams) => {
      this.committeeId = urlParams['id'];
      this.componentMode = urlParams['componentMode'];


      if (this.componentMode == "editMode") {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    });


    // this.zones = [];
    this.members = [];
    // this.fillZones();
    this.fillCommitteeMembers();
    this.selectedMember6Id = 0;
    this.displayCommitteeDetails();

  }
  displayCommitteeDetails() {
    this.committeeService.retrieveCommittee(this.committeeId).subscribe(
      response => {
        this.requestModel = response as Committee;
        if (this.requestModel.memberOne != null) {
          this.selectedMember1Id = this.requestModel.memberOne.id
        }
        if (this.requestModel.memberTwo != null) {
          this.selectedMember2Id = this.requestModel.memberTwo.id
        }
        if (this.requestModel.memberThree != null) {
          this.selectedMember3Id = this.requestModel.memberThree.id
        }
        if (this.requestModel.memberFour != null) {
          this.selectedMember4Id = this.requestModel.memberFour.id
        }
        if (this.requestModel.memberFive != null) {
          this.selectedMember5Id = this.requestModel.memberFive.id
        }
        if (this.requestModel.memberSix != null) {
          this.selectedMember6Id = this.requestModel.memberSix.id
        }

        // if(this.requestModel.zone!=null){
        //   this.selectedZoneId = this.requestModel.zone.id
        // }
      }, error => {
        if (error.error.message != null) {
          this.errorMessage = error.error.message;
        }
        console.log('oops', error);
      }
    )
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
    // this.requestModel.zone = zone;
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

      this.committeeService.updateCommittee(this.committeeId, this.requestModel).subscribe(
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
        this.members = result['content'] as CommitteeMember[];
      },
      error => {
        console.log('oops', error);
      });
  }
}
