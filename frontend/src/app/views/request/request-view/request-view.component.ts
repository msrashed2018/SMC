import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { RequestService } from '../../../services/request.service';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { RequestTypeService } from '../../../services/administration/request-type.service';
import { RequestStatusService } from '../../../services/administration/request-status.service';
import { TrafficManagementService } from '../../../services/administration/traffic-management.service';
import { CustomService } from '../../../services/administration/custom.service';
import { EyeRevealSettingService } from '../../../services/administration/eye-reveal-setting.service';
import { EyeMeasureService } from '../../../services/administration/eye-measure.service';
import { EquipmentService } from '../../../services/administration/equipment.service';
import { DisabilityService } from '../../../services/administration/disability.service';
import { CommitteeService } from '../../../services/administration/committee.service';
import { Request } from '../../../model/request.model';
import { API_URL } from '../../../app.constants';
import { RequestPayment } from '../../../model/request-payment.model';
import { EyeReveal } from '../../../model/eye-reveal.model';
import { BonesReveal } from '../../../model/bones-reveal.model';
import { ActivatedRoute } from '@angular/router';
import { RequestStatus } from '../../../model/request-status.model';
import { DocumentCategory } from '../../../model/document-category.enum';
import { DocumentTypeService } from '../../../services/administration/document-type.service';
import { RequestDocument } from '../../../model/request-document.model';
import { DocumentType } from '../../../model/document-type.model';
import { Tafkeet } from '../../../tafkeet';
import { AppPrint } from '../../../app-print';
@Component({
  selector: 'app-request-view',
  templateUrl: './request-view.component.html',
  styleUrls: ['./request-view.component.scss']
})
export class RequestViewComponent implements OnInit {


  constructor(private documentTypeService: DocumentTypeService, private route: ActivatedRoute, private formBuilder: FormBuilder, private committeeService: CommitteeService, private disabilityService: DisabilityService, private equipmentService: EquipmentService, private eyeMeasureService: EyeMeasureService, private eyeRevealSettingService: EyeRevealSettingService, private customService: CustomService, private requestService: RequestService, private requestTypeService: RequestTypeService, private requestStatusService: RequestStatusService, private trafficManagementService: TrafficManagementService) { }


  //cards collapse fields------------------------------------------------------------------------------------
  isRequestDataCollapsed: boolean = false;
  isPaymentDataCollapsed: boolean = true;
  isEyeRevealDataCollapsed: boolean = true;
  isBonesRevealDataCollapsed: boolean = true;
  isFileUploadDataCollapsed: boolean = true;
  iconRequestDataCollapse: string = 'icon-arrow-up';
  iconPaymentDataCollapse: string = 'icon-arrow-down';
  iconEyeRevealDataCollapse: string = 'icon-arrow-down';
  iconBonesRevealDataCollapse: string = 'icon-arrow-down';
  iconFileUploadDataCollapse: string = 'icon-arrow-down';
  //---------------------------------------------------------------------------------------------------------x
  //models fields--------------------------------------------------------------------------------------------
  citizenId: number = 0;
  requestId: number = 0;
  componentMode: string
  request: Request = new Request();
  selectedRequestStatusId: number = 0;
  citizen = {};
  payment = new RequestPayment();
  paymentDoneCheck: boolean = false;
  requestStatuses: RequestStatus[] = [];
  documents = [{}];

  eyeReveal = new EyeReveal();
  distinguishCheck: boolean = false;
  glassesCheck: boolean = false;
  squintCheck: boolean = false;

  bonesReveal = new BonesReveal();
  errorMessage: boolean = false;

  paymentErrorMessage: string = '';
  bonesRevealErrorMessage: string = '';
  eyeRevealErrorMessage: string = '';
  message: string = "";
  //---------------------------------------------------------------------------------------------------------

  //file upload fields---------------------------------------------------------------------------------------
  requestDocuments = [];
  uploading = false;
  selectedDocumentTypeId: number = 0;
  fileErrorMessage = "";
  //---------------------------------------------------------------------------------------------------------

  ngOnInit() {
    this.route.params.forEach((urlParams) => {
      this.requestId = urlParams['id'];
      this.componentMode = urlParams['componentMode'];
      // this.requestId= 1;
      this.displayRequestDataDetails();
    });
  }
  displayRequestDataDetails() {
    this.requestService.retrieveRequest(this.requestId).subscribe(
      result => {
        console.log(result);
        this.request = result as Request;
        this.citizen = this.request.citizen;

        if (this.request.requestStatus != null) {
          this.selectedRequestStatusId = this.request.requestStatus.id;
        }

      },
      error => {
        this.errorMessage = true;
        this.message = error.error.message;
        console.log('oops', error);
      });

  }






  //cards collapse methods-----------------------------------------------------------------------------------
  requestDataCollapsed(event: any): void {
  }
  requestDataExpanded(event: any): void {
  }
  toggleRequestDataCollapse(): void {
    this.isRequestDataCollapsed = !this.isRequestDataCollapsed;
    this.iconRequestDataCollapse = this.isRequestDataCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
  }
  paymentDataCollapsed(event: any): void {

  }
  paymentDataExpanded(event: any): void {
    this.requestService.retreiveRequestPayment(this.requestId).subscribe(
      result => {
        if (result != null) {
          this.payment = result as RequestPayment;
          if (this.payment.paymentDone == '1') {
            this.paymentDoneCheck = true;
          } else {
            this.paymentDoneCheck = false;
          }
        } else {
          this.paymentErrorMessage = "لم يتم تسجيل مدفوعات لهذا الطلب";
        }

      },
      error => {
        this.paymentErrorMessage = error.error.message;
      }

    )
  }
  togglePaymentDataCollapse(): void {
    this.isPaymentDataCollapsed = !this.isPaymentDataCollapsed;
    this.iconPaymentDataCollapse = this.isPaymentDataCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
  }

  eyeRevealDataCollapsed(event: any): void {
  }
  eyeRevealDataExpanded(event: any): void {
    this.requestService.retreiveRequestEyeReveal(this.requestId).subscribe(
      result => {

        if (result != null) {
          this.eyeReveal = result as EyeReveal;
          if (this.eyeReveal.distinguishColor == '1') {
            this.distinguishCheck = true;
          } else {
            this.distinguishCheck = false;
          }
          if (this.eyeReveal.useGlasses == '1') {
            this.glassesCheck = true;
          } else {
            this.glassesCheck = false;
          }
          if (this.eyeReveal.squint == "1") {
            this.squintCheck = true;
          } else {
            this.squintCheck = false;
          }
        } else {
          this.eyeRevealErrorMessage = "لم يتم تسجيل كشف رمد لهذا الطلب";
        }
        // if(this.eyeReveal.committee != null){
        //   this.selectedEyeCommitteeId = this.eyeReveal.committee.id
        // }
      },
      error => {
        this.eyeRevealErrorMessage = error.error.message;
      }
    )
  }
  toggleEyeRevealDataCollapse(): void {
    this.isEyeRevealDataCollapsed = !this.isEyeRevealDataCollapsed;
    this.iconEyeRevealDataCollapse = this.isEyeRevealDataCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
  }

  bonesRevealDataCollapsed(event: any): void {
  }
  bonesRevealDataExpanded(event: any): void {
    this.requestService.retreiveRequestBonesReveal(this.requestId).subscribe(
      result => {
        if (result != null)
          this.bonesReveal = result as BonesReveal;
        else {
          this.bonesRevealErrorMessage = "لم يتم تسجيل كشف عظام لهذا الطلب";
        }
        // console.log(JSON.stringify(this.bonesReveal))
      },
      error => {
        this.bonesRevealErrorMessage = error.error.message;
      }
    )


  }
  toggleBonesRevealDataCollapse(): void {
    this.isBonesRevealDataCollapsed = !this.isBonesRevealDataCollapsed;
    this.iconBonesRevealDataCollapse = this.isBonesRevealDataCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
  }

  fileUploadDataCollapsed(event: any): void {
  }
  fileUploadDataExpanded(event: any): void {
    this.showFiles();
  }
  toggleFileUploadDataCollapse(): void {
    this.isFileUploadDataCollapsed = !this.isFileUploadDataCollapsed;
    this.iconFileUploadDataCollapse = this.isFileUploadDataCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
  }


  // file upload methods--------------------------------------------------------------------------------------
  showFiles() {
    this.requestService.getRequestDocumentsByCategory(this.request.id, DocumentCategory.ALL).subscribe(
      result => {

        if (result != null && result.length > 0) {
          console.log("result = " + result)
          this.requestDocuments = result as RequestDocument[];
        } else {
          this.fileErrorMessage = "لا يوجد اي ملفات لهذا الطلب"
        }
      },
      error => {
        this.fileErrorMessage = error.error.message;
        console.log('oops', error.error)
      }
    )
  }

  getFile(requestDocumentName) {
    this.requestService.getRequestDocument(this.request.id, requestDocumentName);
  }


  printPaymentPermission(): void {

    let paymentPermissionPageContent, popupWin, name = ""
      , nationalId = 0, mobileNumber = "", custom = "", tafkeet = "صفر";
    if (this.request.citizen.name != null) {
      name = this.request.citizen.name;
    }

    // if (this.citizen.nationalId != null) {
    //   nationalId = this.citizen.nationalId;
    // }

    // if (this.citizen.mobileNumber != null) {
    //   mobileNumber = this.citizen.mobileNumber
    // }

    if (this.request.custom != null) {
      custom = this.request.custom.name
    }

    if (this.request.requestType.price == 0) {
      tafkeet = "صفر"
    } else {
      tafkeet = Tafkeet.tafqeet(this.request.requestType.price)
    }
    tafkeet = tafkeet + " جنيها";

    paymentPermissionPageContent = AppPrint.getPaymentPermsissionPageContent(name, custom, this.request.requestType.price, tafkeet);
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    // // window.print()
    popupWin.document.open();
    popupWin.document.write(paymentPermissionPageContent);
    popupWin.document.close();
    popupWin.print();
  }
  printRequestDocument(): void {
    let requestDocumentPageContents, popupWin, name = ""
      , requestType = '', mobileNumber = "",
      custom = "";
    if (this.request.citizen.name != null) {
      name = this.request.citizen.name;
    }


    if (this.request.citizen.mobileNumber != null) {
      mobileNumber = this.request.citizen.mobileNumber;
    }
    if (this.request.custom != null) {
      custom = this.request.custom.name
    }

    requestType = this.request.requestType.name
    requestDocumentPageContents = AppPrint.getRequestDocumentPageContent(name, mobileNumber, custom, requestType, this.request.hasPrevRequest);

    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    // // window.print()
    popupWin.document.open();
    popupWin.document.write(requestDocumentPageContents);
    popupWin.document.close();
    popupWin.print();
  }
}
