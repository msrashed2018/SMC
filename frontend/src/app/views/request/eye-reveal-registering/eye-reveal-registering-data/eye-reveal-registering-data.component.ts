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
import { Request } from '../../../../model/request.model';
import { API_URL } from '../../../../app.constants';
import { ActivatedRoute } from '@angular/router';
import { EyeReveal } from '../../../../model/eye-reveal.model';
import { Disability } from '../../../../model/disability.model';
import { EyeMeasure } from '../../../../model/eye-measure.model';
import { DocumentCategory } from '../../../../model/document-category.enum';
import { RequestDocument } from '../../../../model/request-document.model';
import { DocumentTypeService } from '../../../../services/administration/document-type.service';
import { DocumentType } from '../../../../model/document-type.model';

@Component({
  selector: 'app-eye-reveal-registering-data',
  templateUrl: './eye-reveal-registering-data.component.html',
  styleUrls: ['./eye-reveal-registering-data.component.scss']
})
export class EyeRevealRegisteringDataComponent implements OnInit {
  //cards collapse fields------------------------------------------------------------------------------------
  isRequestDataCollapsed: boolean = false;
  isEyeRevealDataCollapsed: boolean = true;
  isFileUploadDataCollapsed: boolean = true;
  iconRequestDataCollapse: string = 'icon-arrow-up';
  iconEyeRevealDataCollapse: string = 'icon-arrow-down';
  iconFileUploadDataCollapse: string = 'icon-arrow-down';
  //---------------------------------------------------------------------------------------------------------

  //models fields--------------------------------------------------------------------------------------------
  citizenId: number = 0;
  requestId: number = 0;
  componentMode: string
  request: Request = new Request();
  requestType = {};
  equipment: string = "";
  eyeCommittee = {};
  selectedRequestTypeId: number = 0;
  selectedCustomId: number = 0;
  selectedTrafficManagementId: number = 0;
  selectedRequestStatusId: number = 0;
  citizen = {};


  disabilities: Disability[] = [];
  // equipments = [{}];
  public documents = [{}];
  customs = [{}];


  measures = [{}];
  eyeReveal = new EyeReveal();
  distinguishCheck: boolean = false;
  glassesCheck: boolean = false;
  squintCheck: boolean = false;
  // selectedEyeCommitteeId: number = 0;
  selectedLeftEyeMeasureId: number = 0;
  selectedRightEyeMeasureId: number = 0;

  selectedDisabilityTypeName: string = "";
  // selectedEquipmentTypeId: number = 0;


  errorMessage: boolean = false;
  requestDataErrorMessage: string = '';
  requestDataSuccessMessage: string = '';

  eyeRevealErrorMessage: string = '';
  eyeRevealSuccessMessage: string = '';
  successMessage: boolean = false;
  message: string = "";
  //---------------------------------------------------------------------------------------------------------

  //file upload fields---------------------------------------------------------------------------------------
  showFile = false
  documentTypes: DocumentType[];
  fileUploadErrorMessage: string;
  requestDocuments: RequestDocument[];
  fileUploads: Map<string, string> = new Map<string, string>();
  uploading = false;
  @Input() fileUpload: string;
  selectedFiles: FileList
  currentFileUpload: File
  progress: { percentage: number } = { percentage: 0 }
  selectedDocumentTypeId: number = 0;
  //---------------------------------------------------------------------------------------------------------



  constructor(private documentTypeService: DocumentTypeService, private route: ActivatedRoute, private formBuilder: FormBuilder, private committeeService: CommitteeService, private disabilityService: DisabilityService, private equipmentService: EquipmentService, private eyeMeasureService: EyeMeasureService, private eyeRevealSettingService: EyeRevealSettingService, private customService: CustomService, private requestService: RequestService, private requestTypeService: RequestTypeService, private requestStatusService: RequestStatusService, private trafficManagementService: TrafficManagementService) { }

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
        this.eyeCommittee = this.request.eyeCommittee;
      },
      error => {
        this.errorMessage = true;
        this.message = error.error.message;
        console.log('oops', error);
      });

  }

  onSaveEyeReveal() {

    if (this.eyeReveal.id != 0) {

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
      // if(this.selectedEyeCommitteeId !=0){
      //   let committee: Committee = new Committee;
      //   committee.id= this.selectedEyeCommitteeId;
      //   // this.eyeReveal.committee = committee;
      // }
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
      this.requestService.updateRequestEyeReveal(this.requestId, this.eyeReveal.id, this.eyeReveal).subscribe(
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
    } else {
      this.eyeRevealErrorMessage = 'عفوا لم يتم كشف رمد لهذا المواطن';
      this.eyeRevealSuccessMessage = '';
    }
  }

  onSaveRequestData() {
  }


  onClose() {
  }

  onDelete() {
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



  //cards collapse methods-----------------------------------------------------------------------------------
  requestDataCollapsed(event: any): void {
  }
  requestDataExpanded(event: any): void {
  }
  toggleRequestDataCollapse(): void {
    this.isRequestDataCollapsed = !this.isRequestDataCollapsed;
    this.iconRequestDataCollapse = this.isRequestDataCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
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
        } else {
          this.eyeRevealSuccessMessage = "";
          this.eyeRevealErrorMessage = "عفوا لم يتم كشف رمد لهذا المواطن";
        }
      },
      error => {
        this.eyeRevealSuccessMessage = "";
        this.eyeRevealErrorMessage = error.error.message;
      }
    )

    this.fillMeasures();

  }

  toggleEyeRevealDataCollapse(): void {
    this.isEyeRevealDataCollapsed = !this.isEyeRevealDataCollapsed;
    this.iconEyeRevealDataCollapse = this.isEyeRevealDataCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
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

  fillMeasures() {
    this.eyeMeasureService.retrieveAllEyeMeasure(0, 100).subscribe(
      result => {
        this.measures = result['content'];
      },
      error => {
        console.log('oops', error);
      });
  }
  // fillEquipments(){
  //   this.equipmentService.retrieveAllEquipments().subscribe(
  //     result => {
  //       this.equipments = result;
  //     },
  //     error => {
  //       console.log('oops', error);
  //   });
  // }
  fillDisabilities() {
    this.disabilityService.retrieveAllDisabilities(0, 100).subscribe(
      result => {
        this.disabilities = result['content'];
      },
      error => {
        console.log('oops', error);
      });
  }


  // file upload methods--------------------------------------------------------------------------------------
  showFiles(enable: boolean) {
    this.showFile = enable
    // this.getDocumentsTypes();
    if (enable) {

      this.requestService.getRequestDocumentsByCategory(this.request.id, DocumentCategory.EYE).subscribe(
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
    this.documentTypeService.retrieveDocumentTypesByCategory(DocumentCategory.EYE).subscribe(
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
    this.requestService.deleteRequestDocument(this.request.id, requestDocumentName).subscribe(
      result => {
        this.fileUploadErrorMessage = "";
        this.showFiles(true);
      },
      error => {
        if (error.error.message != null) {
          this.fileUploadErrorMessage = error.error.message;
        } else {
          this.fileUploadErrorMessage = error.error;
        }
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
            console.log('File is completely uploaded!');

            this.showFiles(true);
          }

        },
        error => {
          this.fileUploadErrorMessage = error.error;
          console.log('oops', error.error.message)
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


