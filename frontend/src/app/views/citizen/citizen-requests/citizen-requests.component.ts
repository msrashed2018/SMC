import { Component, OnInit, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormControl, FormBuilder, FormsModule } from '@angular/forms';
import { CitizenService } from '../../../services/citizenService';
import { Router, ActivatedRoute } from '@angular/router';
import { OccupationService } from '../../../services/administration/occupation.service';
import { GovernateService } from '../../../services/administration/governate.service';
import { Governate } from '../../../model/governate.model';
import { GenderService } from '../../../services/administration/gender.service';
import { DatePipe } from '@angular/common';
import { RequestService } from '../../../services/request.service';
import { Request } from '../../../model/request.model';
import { RequestType } from '../../../model/request-type.model';
import { RequestTypeService } from '../../../services/administration/request-type.service';
import { CustomService } from '../../../services/administration/custom.service';
import { TrafficManagementService } from '../../../services/administration/traffic-management.service';
import { Custom } from '../../../model/custom.model';
import { TrafficManagement } from '../../../model/traffic-management.model';
import { TokenStorageService } from '../../../services/authentication/jwt/token-storage.service';

@Component({
  selector: 'app-citizen-requests',
  templateUrl: './citizen-requests.component.html',
  styleUrls: ['./citizen-requests.component.scss']
})
export class CitizenRequestsComponent implements OnInit {
  private isAdmin: boolean = false;
  private hasRequests: boolean = false;
  citizenName : string ;
  isNewRequestCollapsed: boolean = true;
  isCitizenRequestsCollapsed: boolean = false;
  iconNewRequestCollapse: string = 'icon-arrow-down';
  iconCitizenRequestsCollapse: string = 'icon-arrow-up';
  errorMessage: boolean = false;
  message: string = "";
  citizenId : number;
  requests: Request[] = [];
  requestTypes: RequestType[] = [];
  governates : Governate[] = [];
  customs : Custom[] = [];
  trafficManagements : TrafficManagement[] = [];
  selectedRequestTypeId : number ;
  selectedTrafficManagementId : number = 0;
  selectedCustomId : number = 0;
  newRequestErrorMessage : string = '';
  newRequestSuccessMessage : string = '';
  constructor(private tokenStorageService: TokenStorageService,  private route: ActivatedRoute, private formBuilder: FormBuilder,  private requestTypeService: RequestTypeService, private requestService: RequestService, private authenticationService: TokenStorageService, private datepipe: DatePipe, private genderService: GenderService, private governateService: GovernateService, private occupationService: OccupationService, private citizenService: CitizenService, private router: Router, private trafficManagementService: TrafficManagementService, private customService: CustomService) { }

  ngOnInit() {
    this.isAdmin = this.tokenStorageService.hasAdminRole();
    this.route.params.forEach((urlParams) => {
      this.citizenId= urlParams['id'];
      this.citizenName = urlParams['name'];
    });
    this.fillCitizenRequests();
  }

  
  newRequestCollapsed(event: any): void {
    // console.log(event);
  }

  newRequestExpanded(event: any): void {
    this.fillRequestTypes();
    this.fillTrafficManagements();
    this.fillCustoms();
    // console.log(event);
  }
  toggleNewRequestCollapse(): void {
    this.isNewRequestCollapsed = !this.isNewRequestCollapsed;
    this.iconNewRequestCollapse = this.isNewRequestCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
  }

  citizenRequestsCollapsed(event: any): void {
    // console.log(event);
  }

  citizenRequestsExpanded(event: any): void {
    // console.log(event);
  }
  toggleCitizenRequestsCollapse(): void {
    this.isCitizenRequestsCollapsed = !this.isCitizenRequestsCollapsed;
    this.iconCitizenRequestsCollapse = this.isCitizenRequestsCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
  }
  fillCitizenRequests(){
    this.requestService.retrieveCitizenRequests(this.citizenId, 0,100).subscribe(
      result=>{
         this.requests = result['content'];
         if(result['content'].length !=0 ){
           this.hasRequests = true;
         }else{
           this.hasRequests = false;
         }
      },
      error=>{
        console.log('oops', error);
        this.errorMessage = true;
        this.message = error.error.message;
      }
    )
  }
  fillRequestTypes(){
    this.requestTypeService.retrieveAllRequestTypes(0,100).subscribe(
      result => {
        this.requestTypes = result['content'];
      },
      error => {
        console.log('oops', error);
      });
  }
  fillCustoms(){
    this.customService.retrieveAllCustoms(0,100).subscribe(
      result => {
        this.customs = result['content'];
      },
      error => {
        console.log('oops', error);
      });
  }
  fillTrafficManagements(){
    this.trafficManagementService.retrieveAllTrafficManagement(0,100).subscribe(
      result => {
        this.trafficManagements = result['content'];
      },
      error => {
        console.log('oops', error);
      });
  }
  createNewRequest(){
    let request = new Request();
    // request.requestDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    // request.createdBy = this.authenticationService.getUsername();

    let requestType = new RequestType;
    requestType.id = this.selectedRequestTypeId;
    request.requestType = requestType;


    if(this.selectedCustomId !=0 ){
      let custom = new Custom();
      custom.id = this.selectedCustomId;
      request.custom = custom;
    }
    if(this.selectedTrafficManagementId !=0 ){
      let trafficManagement = new TrafficManagement();
      trafficManagement.id = this.selectedTrafficManagementId;
      request.trafficManagement = trafficManagement;
    }
    
    this.requestService.createRequest(this.citizenId,request).subscribe(
      result=>{
        this.fillCitizenRequests();
        this.newRequestErrorMessage = '';
        this.newRequestSuccessMessage = 'تم اضافه الطلب بنجاح';
      },
      error=>{
        console.log('oops', error);
        this.newRequestSuccessMessage = '';
        this.newRequestErrorMessage = error.error.message;
      }
    )
  }

  onDeleteRequest(requestId){
    this.requestService.deleteRequest(this.citizenId,requestId).subscribe(
      result=>{
        this.fillCitizenRequests();
      },
      error=>{
        console.log('oops', error);
        this.errorMessage = true;
        this.message = error.error.message;
      }
    )
  }

  onEditRequest(requestId){
    this.router.navigate(["/request/",requestId,{componentMode: "editMode", citizenId:this.citizenId}]);
  }
}
