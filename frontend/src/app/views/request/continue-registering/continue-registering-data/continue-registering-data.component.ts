import { Component, OnInit, Input } from '@angular/core';
import { RequestService } from '../../../../services/request.service';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { RequestTypeService } from '../../../../services/administration/request-type.service';
import { RequestStatusService } from '../../../../services/administration/request-status.service';
import { TrafficManagementService } from '../../../../services/administration/traffic-management.service';
import { CustomService } from '../../../../services/administration/custom.service';
import { EyeRevealSettingService } from '../../../../services/administration/eye-reveal-setting.service';
import { EyeMeasureService } from '../../../../services/administration/eye-measure.service';
import { EquipmentService } from '../../../../services/administration/equipment.service';
import { DisabilityService } from '../../../../services/administration/disability.service';
import { CommitteeService } from '../../../../services/administration/committee.service';
import { Committee } from '../../../../model/committee.model';
import { Request } from '../../../../model/request.model';
import { API_URL } from '../../../../app.constants';
import { ActivatedRoute } from '@angular/router';
import { Citizen } from '../../../../model/citizen.model';
import { DocumentTypeService } from '../../../../services/administration/document-type.service';
import { DocumentType } from '../../../../model/document-type.model';
import { DocumentCategory } from '../../../../model/document-category.enum';
import { RequestDocument } from '../../../../model/request-document.model';
import { AppPrint } from '../../../../app-print';
import { RequestType } from '../../../../model/request-type.model';
import { PERSONAL_PHOTO_FILE_NAME } from '../../../../app-words';
import { Tafkeet } from '../../../../tafkeet';
import { ConfirmModalService } from '../../../confirm-modal/confirm-modal.service';
import { Roles } from '../../../../model/roles.enum';

@Component({
  selector: 'app-continue-registering-data',
  templateUrl: './continue-registering-data.component.html',
  styleUrls: ['./continue-registering-data.component.scss']
})
export class ContinueRegisteringDataComponent implements OnInit {
  isRequestDataCollapsed: boolean = false;
  isMedicalRevealDataCollapsed: boolean = true;
  isFileUploadDataCollapsed: boolean = true;
  iconRequestDataCollapse: string = 'icon-arrow-up';
  iconMedicalRevealDataCollapse: string = 'icon-arrow-down';
  iconFileUploadDataCollapse: string = 'icon-arrow-down';


  //---------------------------------------------------------------------------------------------------------

  //models fields--------------------------------------------------------------------------------------------
  citizenId: number = 0;
  requestId: number = 0;
  request: Request = new Request();
  citizen = new Citizen();
  requestType = new RequestType;
  public documents = [{}];
  eyeCommittee = new Committee();
  bonesCommittee = new Committee();
  committees: Committee[];
  printEnabled: boolean = false;

  eyeCommittees: Committee[];
  bonesCommittees: Committee[];
  selectedEyeCommitteeId: number = 0;
  selectedBonesCommitteeId: number = 0;

  errorMessage: boolean = false;
  requestDataErrorMessage: string = '';
  requestDataSuccessMessage: string = '';
  medicalRevealErrorMessage: string = '';
  medicalRevealSuccessMessage: string = '';
  successMessage: boolean = false;
  message: string = "";
  //file upload fields---------------------------------------------------------------------------------------
  selectedDocumentTypeId: number = 0;
  documentTypes: DocumentType[];
  showFile = false
  fileUploadErrorMessage: string;
  fileUploads: Map<string, string> = new Map<string, string>();
  requestDocuments: RequestDocument[];
  uploading = false;
  @Input() fileUpload: string;
  selectedFiles: FileList
  currentFileUpload: File
  progress: { percentage: number } = { percentage: 0 }
  //---------------------------------------------------------------------------------------------------------

  constructor(private confirmationModalService: ConfirmModalService, private documentTypeService: DocumentTypeService, private route: ActivatedRoute, private formBuilder: FormBuilder, private committeeService: CommitteeService, private disabilityService: DisabilityService, private equipmentService: EquipmentService, private eyeMeasureService: EyeMeasureService, private eyeRevealSettingService: EyeRevealSettingService, private customService: CustomService, private requestService: RequestService, private requestTypeService: RequestTypeService, private requestStatusService: RequestStatusService, private trafficManagementService: TrafficManagementService) { }

  ngOnInit() {
    this.route.params.forEach((urlParams) => {
      this.requestId = urlParams['requestId'];
      // this.requestId= 1;
      this.refreshData();

    });
  }
  refreshData() {
    this.requestService.retrieveRequest(this.requestId).subscribe(
      result => {
        this.request = result as Request;
        this.citizen = this.request.citizen;
        this.requestType = this.request.requestType;

        if (this.request.eyeCommittee != null) {
          this.selectedEyeCommitteeId = this.request.eyeCommittee.id;
          this.printEnabled = true;
        }
        if (this.request.bonesCommittee != null) {
          this.selectedBonesCommitteeId = this.request.bonesCommittee.id;
          this.printEnabled = true;
        }

      },
      error => {
        this.errorMessage = true;
        this.message = error.error.message;
        console.log('oops', error);
      });

  }

  onSaveMedicalReveal() {


    // console.log(JSON.stringify(this.request))

    if (this.selectedEyeCommitteeId != 0) {
      let committee: Committee = new Committee;
      committee.id = this.selectedEyeCommitteeId;
      this.request.eyeCommittee = committee;
    }

    if (this.selectedBonesCommitteeId != 0) {
      let committee: Committee = new Committee;
      committee.id = this.selectedBonesCommitteeId;
      this.request.bonesCommittee = committee;
    }
    this.requestService.continueRegisteringRequest(this.citizen.id, this.request.id, this.request).subscribe(
      result => {
        this.medicalRevealErrorMessage = "";
        this.medicalRevealSuccessMessage = "تم حفظ بيانات الكشف الطبي بنجاح"
        this.printEnabled = true;
        this.request = result as Request;
      },
      error => {
        console.log('oops', error);
        this.medicalRevealSuccessMessage = "";
        this.medicalRevealErrorMessage = error.error.message;
      }
    )
  }

  fillCommittees() {

    if (this.requestType.name.includes("تظلم")) {
      this.committeeService.retrieveCommitteesByTypeAndFunction('رمد', 'تظلمات').subscribe(
        result => {
          this.eyeCommittees = result;
        },
        error => {
          console.log('oops', error);
        });
      this.committeeService.retrieveCommitteesByTypeAndFunction('عظام', 'تظلمات').subscribe(
        result => {
          this.bonesCommittees = result;
        },
        error => {
          console.log('oops', error);
        });
    } else {
      this.committeeService.retrieveCommitteesByTypeAndFunction('رمد', 'اخري').subscribe(
        result => {
          this.eyeCommittees = result;
        },
        error => {
          console.log('oops', error);
        });
      this.committeeService.retrieveCommitteesByTypeAndFunction('عظام', 'اخري').subscribe(
        result => {
          this.bonesCommittees = result;
        },
        error => {
          console.log('oops', error);
        });
    }

  }
  // file upload methods--------------------------------------------------------------------------------------
  showFiles(enable: boolean) {
    this.showFile = enable
    // this.getDocumentsTypes();
    if (enable) {

      this.requestService.getRequestDocumentsByCategory(this.request.id, DocumentCategory.PERSONAL).subscribe(
        result => {
          this.requestDocuments = result as RequestDocument[];
          // this.requestDocuments .forEach(element => {
          //   this.fileUploads.set(element,`${API_URL}/requests/${this.request.id}/documents/${element}`);
          //   // console.log("key: "+ element + "   value :"+`${API_URL}/requests/${this.request.id}/documents/${element}`);
          // });
        },
        error => {
          console.log('oops', error.error)
        }
      )
    }
  }

  fillDocumentTypes() {
    this.documentTypeService.retrieveDocumentTypesByCategory(DocumentCategory.PERSONAL).subscribe(
      result => {
        this.documentTypes = result as DocumentType[];
      },
      error => {
        console.log('oops', error.error)
      }
    )
  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
    this.uploading = false;
  }
  getFile(requestDocumentName) {
    this.requestService.getRequestDocument(this.request.id, requestDocumentName);
  }

  deleteFile(requestDocumentName) {
    let message = ` هل انت متاكد من حذف هذا الملف"${requestDocumentName} "`
    this.confirmationModalService.confirm('من فضلك اضغط علي ok', message)
      .then((confirmed) => {
        if (confirmed) {
          this.requestService.deleteRequestDocument(this.request.id, requestDocumentName).subscribe(
            result => {
              this.fileUploadErrorMessage = "";
              this.showFiles(true);
            },
            error => {
              this.fileUploadErrorMessage = error.error.message;
            }
          );
        }
      })
  }

  upload() {

    if (this.selectedDocumentTypeId != 0) {
      this.uploading = true;
      this.requestService.uploadRequestDocument(this.requestId, this.selectedDocumentTypeId, this.selectedFiles).subscribe(
        result => {
          this.fileUploadErrorMessage = "";
          if (result.type === HttpEventType.UploadProgress) {
            this.progress.percentage = Math.round(100 * result.loaded / result.total);

          } else if (result instanceof HttpResponse) {
            this.showFiles(true);
          }

        },
        error => {
          if (error.error.message != null) {
            this.fileUploadErrorMessage = error.error.message;
          } else {
            this.fileUploadErrorMessage = error.error;
          }
          console.log('oops', error.error)
        }

      )
      this.selectedFiles = undefined
    } else {
      this.fileUploadErrorMessage = "اختر نوع الملف اولا";
    }

  }
  //--------------------------------------------------------------------------------------



  medicalRevealDataCollapsed(event: any): void {
  }
  medicalRevealDataExpanded(event: any): void {
    this.fillCommittees();
  }
  toggleMedicalRevealDataCollapse(): void {
    this.isMedicalRevealDataCollapsed = !this.isMedicalRevealDataCollapsed;
    this.iconMedicalRevealDataCollapse = this.isMedicalRevealDataCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
  }
  requestDataCollapsed(event: any): void {
  }
  requestDataExpanded(event: any): void {
  }
  toggleRequestDataCollapse(): void {
    this.isRequestDataCollapsed = !this.isRequestDataCollapsed;
    this.iconRequestDataCollapse = this.isRequestDataCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
  }


  fileUploadDataCollapsed(event: any): void {
  }
  fileUploadDataExpanded(event: any): void {
    this.fillDocumentTypes();
    this.showFiles(true);
  }
  toggleFileUploadDataCollapse(): void {
    this.isFileUploadDataCollapsed = !this.isFileUploadDataCollapsed;
    this.iconFileUploadDataCollapse = this.isFileUploadDataCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
  }

  onEyeCommitteeChanged(committeeId) {

    for (var x = 0; x < this.eyeCommittees.length; x++) {
      if (this.eyeCommittees[x].id == committeeId) {
        this.eyeCommittee = this.eyeCommittees[x];
      }
    }
  }
  onBonesCommitteeChanged(committeeId) {
    for (var x = 0; x < this.bonesCommittees.length; x++) {
      if (this.bonesCommittees[x].id == committeeId) {
        this.bonesCommittee = this.bonesCommittees[x];
      }
    }
  }

  printReceivedDoocumentReceipts(): void {
    var receivedDocumentReceiptPageContent = "", popupWin, name = "", custom = "", bonesCommitteeDate = " لم يتم تحديد اللجنة", eyeCommitteeDate = " لم يتم تحديد اللجنة", tafkeet = "صفر";

    if (this.citizen.name != null) {
      name = this.citizen.name;
    }

    if (this.request.custom != null) {
      custom = this.request.custom.name;
    }

    if (this.request.bonesCommittee != null) {
      bonesCommitteeDate = this.request.bonesCommittee.date;
    }

    if (this.request.eyeCommittee != null) {
      eyeCommitteeDate = this.request.eyeCommittee.date;
    }
    if (this.request.requestType.price == 0) {
      tafkeet = "صفر"
    } else {
      tafkeet = Tafkeet.tafqeet(this.request.requestType.price)
    }
    tafkeet = tafkeet + " جنيها";
    receivedDocumentReceiptPageContent += AppPrint.getReceivedDocumentReceiptPageContent(name, custom, eyeCommitteeDate, bonesCommitteeDate, this.request.requestType.price, tafkeet);

    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    // // window.print()
    popupWin.document.open();
    popupWin.document.write(receivedDocumentReceiptPageContent);
    popupWin.document.close();
    // popupWin.print();

  }

  print(): void {

    this.requestService.getImage(this.requestId, PERSONAL_PHOTO_FILE_NAME).subscribe(
      response => {
        this.medicalRevealErrorMessage = '';
        var blob = new Blob([response]/*, { type: "image/png"}*/);
        var url = window.URL.createObjectURL(blob);

        var bonesPageContents = "", eyePageContents = "", popupWin, name = "", address = ""
          , nationalId = 0, occupation = "", birthDate = "", mobileNumber = ""
          , governate = "", custom = "", bonesCommittee = " لم يتم تحديد اللجنة", eyeCommittee = " لم يتم تحديد اللجنة";

        if (this.citizen.name != null) {
          name = this.citizen.name;
        }
        if (this.citizen.address != null) {
          address = this.citizen.address
        }
        if (this.citizen.nationalId != null) {
          nationalId = this.citizen.nationalId;
        }
        if (this.citizen.occupation != null) {
          occupation = this.citizen.occupation.name
        }
        if (this.citizen.birthDate != null) {
          birthDate = this.citizen.birthDate
        }
        if (this.citizen.mobileNumber != null) {
          mobileNumber = this.citizen.mobileNumber
        }

        if (this.citizen.governate != null) {
          governate = this.citizen.governate.name
        }

        if (this.request.custom != null) {
          custom = this.request.custom.name;
        }

        if (this.request.bonesCommittee != null) {
          bonesCommittee = this.request.bonesCommittee.date;

          bonesPageContents += AppPrint.getBonesResultPageContent(nationalId, birthDate, name, occupation, address, governate, mobileNumber, custom, bonesCommittee, url);

        }

        if (this.request.eyeCommittee != null) {
          eyeCommittee = this.request.eyeCommittee.date;
          eyePageContents += AppPrint.getEyeResultPageContent(nationalId, name, address, governate, eyeCommittee, url);
        }

        popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        // // window.print()
        popupWin.document.open();

        popupWin.document.write(bonesPageContents + eyePageContents);
        popupWin.document.close();
        // popupWin.print();



      }, error => {
        if (error.status == 404) {
          this.medicalRevealErrorMessage = " لم يتم تسجيل صورة شخصية للمواطن.. يجب رفع الصورة الشخصية اولا"
        }
        else if (error.error.message != null) {
          this.medicalRevealErrorMessage = error.error.message;
        } else {
          this.medicalRevealErrorMessage = error.error;
        }
        console.error();
      }

    )



  }
}
