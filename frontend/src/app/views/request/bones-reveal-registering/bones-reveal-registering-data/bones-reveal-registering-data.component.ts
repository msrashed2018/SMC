import { Component, OnInit, Input } from '@angular/core';
import { RequestService } from '../../../../services/request.service';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { RequestTypeService } from '../../../../services/administration/request-type.service';
import { RequestStatusService } from '../../../../services/administration/request-status.service';
import { TrafficManagementService } from '../../../../services/administration/traffic-management.service';
import { CustomService } from '../../../../services/administration/custom.service';
import { EquipmentService } from '../../../../services/administration/equipment.service';
import { DisabilityService } from '../../../../services/administration/disability.service';
import { CommitteeService } from '../../../../services/administration/committee.service';
import { Request } from '../../../../model/request.model';
import { ActivatedRoute } from '@angular/router';
import { BonesReveal } from '../../../../model/bones-reveal.model';
import { Disability } from '../../../../model/disability.model';
import { DocumentCategory } from '../../../../model/document-category.enum';
import { RequestDocument } from '../../../../model/request-document.model';
import { DocumentTypeService } from '../../../../services/administration/document-type.service';
import { DocumentType } from '../../../../model/document-type.model';

@Component({
  selector: 'app-bones-reveal-registering-data',
  templateUrl: './bones-reveal-registering-data.component.html',
  styleUrls: ['./bones-reveal-registering-data.component.scss']
})
export class BonesRevealRegisteringDataComponent implements OnInit {
  //cards collapse fields------------------------------------------------------------------------------------
  isRequestDataCollapsed: boolean = false;
  isBonesRevealDataCollapsed: boolean = true;
  isFileUploadDataCollapsed: boolean = true;
  iconRequestDataCollapse: string = 'icon-arrow-up';
  iconBonesRevealDataCollapse: string = 'icon-arrow-down';
  iconFileUploadDataCollapse: string = 'icon-arrow-down';
  //---------------------------------------------------------------------------------------------------------

  //models fields--------------------------------------------------------------------------------------------
  citizenId: number = 0;
  requestId: number = 0;
  componentMode: string
  request: Request = new Request();
  requestType = {};
  equipment: string = "";
  bonesCommittee = {};
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
  distinguishCheck: boolean = false;
  glassesCheck: boolean = false;
  squintCheck: boolean = false;

  bonesReveal = new BonesReveal();
  // selectedBonesCommitteeId: number = 0;
  selectedDisabilityTypeName: string = "";
  // selectedEquipmentTypeId: number = 0;


  errorMessage: boolean = false;
  requestDataErrorMessage: string = '';
  requestDataSuccessMessage: string = '';

  bonesRevealErrorMessage: string = '';
  bonesRevealSuccessMessage: string = '';
  successMessage: boolean = false;
  message: string = "";
  //---------------------------------------------------------------------------------------------------------

  //file upload fields---------------------------------------------------------------------------------------
  showFile = false;
  documentTypes: DocumentType[];
  fileUploadErrorMessage: string;
  requestDocuments: RequestDocument[];
  uploading = false;
  @Input() fileUpload: string;
  selectedFiles: FileList
  currentFileUpload: File
  progress: { percentage: number } = { percentage: 0 }
  selectedDocumentTypeId: number = 0;
  //---------------------------------------------------------------------------------------------------------



  constructor(private documentTypeService: DocumentTypeService, private route: ActivatedRoute, private formBuilder: FormBuilder, private committeeService: CommitteeService, private disabilityService: DisabilityService, private equipmentService: EquipmentService, private customService: CustomService, private requestService: RequestService, private requestTypeService: RequestTypeService, private requestStatusService: RequestStatusService, private trafficManagementService: TrafficManagementService) { }

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
        this.bonesCommittee = this.request.bonesCommittee;
      },
      error => {
        this.errorMessage = true;
        this.message = error.error.message;
        console.log('oops', error);
      });

  }

  onSaveBonesReveal() {
    if (this.bonesReveal.id != 0) {
      // if(this.selectedBonesCommitteeId !=0){
      //   let committee: Committee = new Committee;
      //   committee.id= this.selectedBonesCommitteeId;
      //   // this.bonesReveal.committee = committee;
      // }

      this.bonesReveal.disability = this.disabilities.find((d) => d.name == this.selectedDisabilityTypeName);
      if (this.bonesReveal.disability == null) {
        this.bonesRevealErrorMessage = ".نوع الاعاقة غير صحيح .. من فضلك اختر النوع من القائمة";
      } else {
        this.bonesRevealErrorMessage = "";
        this.requestService.updateRequestBonesReveal(this.request.id, this.bonesReveal.id, this.bonesReveal).subscribe(
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




    } else {
      this.bonesRevealSuccessMessage = "";
      this.bonesRevealErrorMessage = "عفوا لم يتم كشف عظام لهذا المواطن";
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

  bonesRevealDataCollapsed(event: any): void {
  }
  bonesRevealDataExpanded(event: any): void {
    // this.fillEquipments();
    this.fillDisabilities();

    this.requestService.retreiveRequestBonesReveal(this.requestId).subscribe(
      result => {
        if (result != null) {
          this.bonesReveal = result as BonesReveal;
          // console.log(JSON.stringify(this.bonesReveal))
          if (this.bonesReveal.disability != null) {
            this.selectedDisabilityTypeName = this.bonesReveal.disability.name
          }

          // if(this.bonesReveal.equipment != null){
          //   this.selectedEquipmentTypeId = this.bonesReveal.equipment.id
          // }
        } else {
          this.bonesRevealSuccessMessage = "";
          this.bonesRevealErrorMessage = "عفوا لم يتم كشف عظام لهذا المواطن";
        }
      },
      error => {
        this.bonesRevealSuccessMessage = "";
        this.bonesRevealErrorMessage = error.error.message;
      }
    )
  }
  onDisabilityChanged(value) {
    this.bonesReveal.disability = this.disabilities.find((d) => d.name == value)
    if (this.bonesReveal.disability == null) {
      this.bonesRevealErrorMessage = ".نوع الاعاقة غير صحيح .. من فضلك اختر النوع من القائمة";
    } else {
      this.bonesRevealErrorMessage = "";
      this.equipment = this.bonesReveal.disability.equipment.name;
      if (this.bonesReveal.disability.accepted == '0') {
        this.bonesReveal.result = 'مرفوض'
      } else if (this.bonesReveal.disability.accepted == '1') {
        this.bonesReveal.result = 'مقبول'
      } else if (this.bonesReveal.disability.accepted == '2') {
        this.bonesReveal.result = 'اعادة مناظرة'
      }
    }
  }
  toggleBonesRevealDataCollapse(): void {
    this.isBonesRevealDataCollapsed = !this.isBonesRevealDataCollapsed;
    this.iconBonesRevealDataCollapse = this.isBonesRevealDataCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
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

      this.requestService.getRequestDocumentsByCategory(this.request.id, DocumentCategory.BONES).subscribe(
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
    this.documentTypeService.retrieveDocumentTypesByCategory(DocumentCategory.BONES).subscribe(
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
  //--------------------------------------------------------------------------------------