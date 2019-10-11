import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
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
import { Committee } from '../../../model/committee.model';
import { Request } from '../../../model/request.model';
import { API_URL } from '../../../app.constants';
import { RequestPayment } from '../../../model/request-payment.model';
import { EyeReveal } from '../../../model/eye-reveal.model';
import { EyeMeasure } from '../../../model/eye-measure.model';
import { BonesReveal } from '../../../model/bones-reveal.model';
import { Disability } from '../../../model/disability.model';
import { Equipment } from '../../../model/equipment.model';
import { ActivatedRoute } from '@angular/router';
import { Custom } from '../../../model/custom.model';
import { RequestStatus } from '../../../model/request-status.model';
import { RequestType } from '../../../model/request-type.model';
import { TrafficManagement } from '../../../model/traffic-management.model';
import { isUndefined } from 'util';
import { DocumentCategory } from '../../../model/document-category.enum';
import { RequestDocument } from '../../../model/request-document.model';
import { DocumentTypeService } from '../../../services/administration/document-type.service';
import { DocumentType } from '../../../model/document-type.model';
import { ConfirmModalService } from '../../confirm-modal/confirm-modal.service';
@Component({
  selector: 'app-request-edit',
  templateUrl: './request-edit.component.html',
  styleUrls: ['./request-edit.component.scss']
})
export class RequestEditComponent implements OnInit {

  constructor(private confirmationModalService: ConfirmModalService, private documentTypeService: DocumentTypeService, private route: ActivatedRoute, private formBuilder: FormBuilder, private committeeService: CommitteeService, private disabilityService: DisabilityService, private equipmentService: EquipmentService, private eyeMeasureService: EyeMeasureService, private eyeRevealSettingService: EyeRevealSettingService, private customService: CustomService, private requestService: RequestService, private requestTypeService: RequestTypeService, private requestStatusService: RequestStatusService, private trafficManagementService: TrafficManagementService) { }

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
  //---------------------------------------------------------------------------------------------------------

  //models fields--------------------------------------------------------------------------------------------
  citizenId: number = 0;
  requestId: number = 0;
  componentMode: string
  request: Request = new Request();
  selectedRequestTypeId: number = 0;
  selectedCustomId: number = 0;
  selectedTrafficManagementId: number = 0;
  selectedRequestStatusId: number = 0;
  citizen = {};
  requestTypes = [{}];
  payment: RequestPayment;


  requestStatuses = [{}];
  trafficManagements = [{}];
  disabilities = [{}];
  equipments = [{}];
  public documents = [{}];
  customs = [{}];


  committees: Committee[];
  measures = [{}];
  eyeReveal: EyeReveal;
  distinguishCheck: boolean = false;
  glassesCheck: boolean = false;
  squintCheck: boolean = false;
  selectedEyeCommitteeId: number = 0;
  selectedLeftEyeMeasureId: number = 0;
  selectedRightEyeMeasureId;

  bonesReveal: BonesReveal;
  selectedBonesCommitteeId: number = 0;
  selectedDisabilityTypeId: number = 0;
  selectedEquipmentTypeId: number = 0;
  public paymentDoneCheck: boolean = false;


  errorMessage: boolean = false;
  requestDataErrorMessage: string = '';
  requestDataSuccessMessage: string = '';

  paymentErrorMessage: string = '';
  paymentSuccessMessage: string = '';
  bonesRevealErrorMessage: string = '';
  bonesRevealSuccessMessage: string = '';
  eyeRevealErrorMessage: string = '';
  eyeRevealSuccessMessage: string = '';
  successMessage: boolean = false;
  message: string = "";
  //---------------------------------------------------------------------------------------------------------

  //file upload fields---------------------------------------------------------------------------------------
  showFile = false
  selectedDocumentTypeId: number = 0;
  documentTypes: DocumentType[];
  requestDocuments: RequestDocument[];
  fileUploadErrorMessage: string;
  fileUploads: Map<string, string> = new Map<string, string>();
  uploading = false;
  @Input() fileUpload: string;
  selectedFiles: FileList
  currentFileUpload: File
  progress: { percentage: number } = { percentage: 0 }
  //---------------------------------------------------------------------------------------------------------



  ngOnInit() {
    this.route.params.forEach((urlParams) => {
      this.requestId = urlParams['id'];
      // this.componentMode = urlParams['componentMode'];
      this.citizenId = urlParams['citizenId'];
      // this.requestId= 1;
      this.displayRequestDataDetails();
    });
  }

  displayRequestDataDetails() {
    this.requestService.retrieveRequest(this.requestId).subscribe(
      result => {
        console.log(result)
        this.request = result as Request;
        this.citizen = this.request.citizen;
        if (this.request.trafficManagement != null) {
          this.selectedTrafficManagementId = this.request.trafficManagement.id;
        }
        if (this.request.requestType != null) {
          this.selectedRequestTypeId = this.request.requestType.id;
        }
        if (this.request.requestStatus != null) {
          this.selectedRequestStatusId = this.request.requestStatus.id;
        }
        if (this.request.custom != null) {
          this.selectedCustomId = this.request.custom.id;
        }
        this.fillRequestTypes();
        this.fillTrafficManagements();
        this.fillRequestStatuses();
        this.fillCustoms();
      },
      error => {
        this.errorMessage = true;
        this.message = error.error.message;
        console.log('oops', error);
      });

  }
  onSavePayment() {
    if (this.paymentDoneCheck) {
      this.payment.paymentDone = '1';
    } else {
      this.payment.paymentDone = '0';
    }
    this.requestService.saveRequestPayment(this.request.id, this.payment).subscribe(
      result => {
        this.payment = result as RequestPayment;
        this.paymentSuccessMessage = "تم حفظ المدفوعات بنجاح";
        this.paymentErrorMessage = '';

      },
      error => {
        console.log('oops', error);
        this.paymentSuccessMessage = '';
        this.paymentErrorMessage = error.error.message;
      }
    )
  }
  onSaveEyeReveal() {

    if (this.distinguishCheck) {
      this.eyeReveal.distinguishColor = '1';
    } else {
      this.eyeReveal.distinguishColor = '0';
    }
    if (this.glassesCheck) {
      this.eyeReveal.useGlasses = '1';
    } else {
      this.eyeReveal.useGlasses = '0';
    }

    if (this.squintCheck) {
      this.eyeReveal.squint = '1';
    } else {
      this.eyeReveal.squint = '0';
    }
    if (this.selectedEyeCommitteeId != 0) {
      let committee: Committee = new Committee;
      committee.id = this.selectedEyeCommitteeId;
      // this.eyeReveal.committee = committee;
    }
    if (this.selectedLeftEyeMeasureId != 0) {
      let eyeMeasure: EyeMeasure = new EyeMeasure;
      eyeMeasure.id = this.selectedLeftEyeMeasureId;

      this.eyeReveal.leftEye = eyeMeasure;
    }
    if (this.selectedRightEyeMeasureId != 0) {
      let eyeMeasure: EyeMeasure = new EyeMeasure;
      eyeMeasure.id = this.selectedRightEyeMeasureId;
      this.eyeReveal.rightEye = eyeMeasure;
    }
    this.requestService.saveRequestEyeReveal(this.requestId, this.eyeReveal).subscribe(
      result => {
        this.eyeReveal = result as EyeReveal;
        this.eyeRevealErrorMessage = '';
        this.eyeRevealSuccessMessage = "تم حفظ بيانات كشف الرمد بنجاح"
      },
      error => {
        console.log('oops', error);
        this.eyeRevealErrorMessage = error.error.message;
        this.eyeRevealSuccessMessage = '';
      }
    )
  }

  onSaveBonesReveal() {
    if (this.selectedBonesCommitteeId != 0) {
      let committee: Committee = new Committee;
      committee.id = this.selectedBonesCommitteeId;
      // this.bonesReveal.committee = committee;
    }

    if (this.selectedDisabilityTypeId != 0) {
      let disability: Disability = new Disability;
      disability.id = this.selectedDisabilityTypeId;
      this.bonesReveal.disability = disability;
    }
    // if(this.selectedEquipmentTypeId !=0){
    //   let equipment: Equipment = new Equipment;
    //   equipment.id= this.selectedEquipmentTypeId;
    //   this.bonesReveal.equipment = equipment;
    // }
    this.requestService.saveRequestBonesReveal(this.request.id, this.bonesReveal).subscribe(
      result => {
        this.bonesReveal = result as BonesReveal;
        this.bonesRevealSuccessMessage = "تم حفظ بيانات كشف العظام بنجاح";
        this.bonesRevealErrorMessage = "";
      },
      error => {
        console.log('oops', error);
        this.bonesRevealSuccessMessage = "";
        this.bonesRevealErrorMessage = error.error.message;
      }
    )
  }
  onSaveRequestData() {

    if (this.selectedCustomId != 0) {
      let custom: Custom = new Custom;
      custom.id = this.selectedCustomId;
      this.request.custom = custom;
    }else{
      this.request.custom = null;
    }
    if (this.selectedRequestStatusId != 0) {
      let requestStatus: RequestStatus = new RequestStatus;
      requestStatus.id = this.selectedRequestStatusId;
      this.request.requestStatus = requestStatus;
    }else{
      this.request.requestStatus = null;
    }
    if (this.selectedRequestTypeId != 0) {
      let requestType: RequestType = new RequestType;
      requestType.id = this.selectedRequestTypeId;
      this.request.requestType = requestType;
    }
    if (this.selectedTrafficManagementId != 0) {
      let trafficManagement: TrafficManagement = new TrafficManagement;
      trafficManagement.id = this.selectedTrafficManagementId;
      this.request.trafficManagement = trafficManagement;
    }else{
      this.request.trafficManagement = null;
    }

    // console.log(JSON.stringify(this.request))
    this.requestService.editRequest(this.request.id, this.request).subscribe(
      result => {
        this.requestDataErrorMessage = "";
        this.requestDataSuccessMessage = "تم حفظ الطلب بنجاح"
      },
      error => {
        console.log('oops', error);
        this.requestDataSuccessMessage = "";
        this.requestDataErrorMessage = error.error.message;
      }
    )
  }

  onDistinguishChecked(event) {
    this.distinguishCheck = event.target.checked;
  }
  onSquintChecked(event) {
    this.squintCheck = event.target.checked;
  }
  onGlassesChecked(event) {
    this.glassesCheck = event.target.checked;
  }
  onPaymentDoneChecked(event) {
    this.paymentDoneCheck = event.target.checked;
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
        this.payment = result as RequestPayment;
        if (this.payment.paymentDone = '1') {
          this.paymentDoneCheck = true;
        } else {
          this.paymentDoneCheck = false;
        }

      },
      error => {
        this.paymentSuccessMessage = "";
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

          // if(this.eyeReveal.committee != null){
          //   this.selectedEyeCommitteeId = this.eyeReveal.committee.id
          // }

          if (this.eyeReveal.leftEye != null) {
            this.selectedLeftEyeMeasureId = this.eyeReveal.leftEye.id
          }
          if (this.eyeReveal.rightEye != null) {
            this.selectedRightEyeMeasureId = this.eyeReveal.rightEye.id
          }
        }
      },
      error => {
        this.eyeRevealSuccessMessage = "";
        this.eyeRevealErrorMessage = error.error.message;
      }
    )

    this.fillMeasures();
    // this.fillCommittees();

  }
  toggleEyeRevealDataCollapse(): void {
    this.isEyeRevealDataCollapsed = !this.isEyeRevealDataCollapsed;
    this.iconEyeRevealDataCollapse = this.isEyeRevealDataCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
  }

  bonesRevealDataCollapsed(event: any): void {
  }
  bonesRevealDataExpanded(event: any): void {
    // this.fillCommittees();
    this.fillEquipments();
    this.fillDisabilities();

    this.requestService.retreiveRequestBonesReveal(this.requestId).subscribe(
      result => {
        this.bonesReveal = result as BonesReveal;

        // if(this.bonesReveal.committee != null){
        //   this.selectedBonesCommitteeId = this.bonesReveal.committee.id
        // }

        if (this.bonesReveal.disability != null) {
          this.selectedDisabilityTypeId = this.bonesReveal.disability.id
        }

        // if(this.bonesReveal.equipment != null){
        //   this.selectedEquipmentTypeId = this.bonesReveal.equipment.id
        // }
      },
      error => {
        this.bonesRevealSuccessMessage = "";
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
    this.showFiles(true);
    this.fillDocumentTypes();
  }
  toggleFileUploadDataCollapse(): void {
    this.isFileUploadDataCollapsed = !this.isFileUploadDataCollapsed;
    this.iconFileUploadDataCollapse = this.isFileUploadDataCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
  }

  // createNewRequest(){

  //   this.requestService.createRequest(this.request).subscribe(
  //     result => {
  //       this.request = result as Request;
  //       this.request.id= 1;
  //     },
  //     error => {
  //       console.log('oops', error);
  //     });
  // }
  //---------------------------------------------------------------------------------------------------------

  fillRequestTypes() {
    this.requestTypeService.retrieveAllRequestTypes(0, 100).subscribe(
      result => {
        this.requestTypes = result['content'];
      },
      error => {
        console.log('oops', error);
      });
  }
  fillCustoms() {
    this.customService.retrieveAllCustoms(0, 100).subscribe(
      result => {
        this.customs = result['content'];
      },
      error => {
        console.log('oops', error);
      });
  }
  fillTrafficManagements() {
    this.trafficManagementService.retrieveAllTrafficManagement(0, 100).subscribe(
      result => {
        this.trafficManagements = result['content'];
      },
      error => {
        console.log('oops', error);
      });
  }

  fillRequestStatuses() {
    this.requestStatusService.retrieveAllRequestStatus(0, 100).subscribe(
      result => {
        this.requestStatuses = result['content'];
      },
      error => {
        console.log('oops', error);
      });
  }
  fillMeasures() {
    this.eyeMeasureService.retrieveAllEyeMeasure(0, 100).subscribe(
      result => {
        this.measures = result['content'];
      },
      error => {
        console.log('oops', error);
      });
  }
  fillEquipments() {
    this.equipmentService.retrieveAllEquipments(0, 100).subscribe(
      result => {
        this.equipments = result['content'];
      },
      error => {
        console.log('oops', error);
      });
  }
  fillDisabilities() {
    this.disabilityService.retrieveAllDisabilities(0, 100).subscribe(
      result => {
        this.disabilities = result['content'];
      },
      error => {
        console.log('oops', error);
      });
  }
  // fillCommittees() {
  //   this.committeeService.retrieveAllCommittees(0, 100).subscribe(
  //     result => {
  //       this.committees = result['content'];
  //     },
  //     error => {
  //       console.log('oops', error);
  //     });
  // }


  // file upload methods--------------------------------------------------------------------------------------
  showFiles(enable: boolean) {
    this.showFile = enable
    // this.getDocumentsTypes();
    if (enable) {

      this.requestService.getRequestDocumentsByCategory(this.request.id, DocumentCategory.ALL).subscribe(
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
    this.documentTypeService.retrieveDocumentTypesByCategory(DocumentCategory.ALL).subscribe(
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
    let message  = ` هل انت متاكد من حذف هذا الملف"${requestDocumentName} "` 
    this.confirmationModalService.confirm('من فضلك اضغط علي ok',  message)
      .then((confirmed) => {
        if (confirmed) {
          this.deleteRequestDocument(requestDocumentName);
        }
      })
  }

  deleteRequestDocument(requestDocumentName){
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

}
//----------------------------------------------------------------------------------------------------------

