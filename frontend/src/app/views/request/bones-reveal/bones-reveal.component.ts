import { Component, OnInit, NgModule } from '@angular/core';
import { Request } from '../../../model/request.model';
import { DatePipe, CommonModule } from '@angular/common';
import { AlertModule, AlertConfig } from 'ngx-bootstrap/alert';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { ConfirmModalService } from '../../confirm-modal/confirm-modal.service';
import { RequestService } from '../../../services/request.service';
import { BonesReveal } from '../../../model/bones-reveal.model';
import { BONES_REVEAL_PAGE_SIZE } from '../../../app.constants';
import { FingerprintConfirmServiceService } from '../../fingerprint-confirm-modal/fingerprint-confirm-service.service';
import { CitizenService } from '../../../services/citizenService';
import { interval, Observable, timer, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TokenStorageService } from '../../../services/authentication/jwt/token-storage.service';
@Component({
  selector: 'app-bones-reveal',
  templateUrl: './bones-reveal.component.html',
  styleUrls: ['./bones-reveal.component.scss']
})
export class BonesRevealComponent implements OnInit {
  private requests: Request[];
  private noDataFound: boolean = false;
  private errorMessage: boolean = false;
  searchKey: string = '';
  isForSearch: boolean = true;
  checkVerificationinterval = interval(2000);
  subscription: Subscription = new Subscription();

  canSkipFingerprintVerfication: boolean = false;
  constructor(private tokenStorage: TokenStorageService, private fingerprintConfirmationModalService: FingerprintConfirmServiceService, private citizenService: CitizenService, private requestService: RequestService, private router: Router, private datepipe: DatePipe) { }

  //pagination variables
  maxSize: number = 10;
  totalItems: number = 0;
  currentPage: number = 0;
  numPages: number = 0;
  items: number = 0;
  itemsPerPage: number = 10;
  pageChanged(event: any): void {
    this.items = (event.page - 1) * this.itemsPerPage;
    this.currentPage = event.page - 1;
    this.refreshData();
  }
  ngOnInit() {
    this.requests = [];
    this.refreshData();
    this.canSkipFingerprintVerfication = this.tokenStorage.hasAdminRole();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  refreshData() {
    this.requestService.searchByStatesAndSearchKey("CONTINUE_REGISTERING_DONE", "PENDING_REVEAL", "NA", this.searchKey, this.currentPage, this.itemsPerPage)
      .subscribe(
        result => {
          if (typeof result !== 'undefined' && result !== null && result['content'].length != 0) {
            this.noDataFound = false;
            this.requests = result['content'];
            this.isForSearch = true;
            this.totalItems = result['totalElements'];
          } else {
            this.noDataFound = true;
          }
        },
        error => {
          console.log('oops: ', error);
          this.errorMessage = true;
        }
      );
  }
  searchByKey(event: Event) {
    this.requests = [];
    this.currentPage = 0;
    // this.citizens = [];
    this.errorMessage = false;
    this.noDataFound = false;
    this.refreshData();
  }


  onAttend(requestId) {
    let citizenId = this.requests.find((request) => request.id == requestId).citizen.id;
    this.citizenService.verifyCitizenFingerprintStep1(citizenId).subscribe(
      result => {
        this.showfingerprintConfirmationModal(citizenId, requestId);
      },
      error => {
        console.log('oops', error);
        this.errorMessage = true;
      }
    )
  }

  showfingerprintConfirmationModal(citizenId, requestId) {
    this.subscription = this.checkVerificationinterval.subscribe(n => {
      if (n == 60) {
        this.cancelFingerprintVerification();
        this.subscription.unsubscribe();
        this.fingerprintConfirmationModalService.close();
      }
      this.citizenService.isCitizenfigerprintVerified(citizenId).subscribe(
        result => {
          if (result != null) {
            if (result == true) {
              this.confirmAttend(true, requestId);
            } else if (result == false) {
              this.confirmAttend(false, requestId);
            }
          }
        },
        error => {
          console.log('oops', error);
          this.errorMessage = true;
        }
      )
    });

    this.fingerprintConfirmationModalService.confirm('التحقق من بصمة المواطن', 'لتسجيل حضور المواطن لكشف العظام, من فضلك ادخل بصمة المواطن الان', '/assets/img/brand/fingerprint.gif', false, this.canSkipFingerprintVerfication)
      .then((skip) => {
        if (skip) {
          this.confirmAttend(true, requestId);

        }
      }).finally(() => {
        this.subscription.unsubscribe();
        this.cancelFingerprintVerification();
      })

  }

  confirmAttend(isVerified, requestId) {
    this.fingerprintConfirmationModalService.close();

    if (isVerified) {
      this.fingerprintConfirmationModalService.confirm('التحقق من بصمة المواطن', 'تم تسجيل حضور المواطن لكشف العظام بنجاح', '/assets/img/brand/success.png', true)
        .then((confirmed) => {
          if (confirmed) {
            // do something
          }
        }).finally(() => {
          this.refreshData();
        })
      let bonesReveal = new BonesReveal();
      bonesReveal.revealDone = '1';
      this.requestService.saveRequestBonesReveal(requestId, bonesReveal).subscribe(
        result => {
          // this.retriveAllRequests();
          this.errorMessage = false;
        },
        error => {
          console.log('oops', error);
          this.errorMessage = true;
        }
      )
    } else {
      this.fingerprintConfirmationModalService.confirm('التحقق من بصمة المواطن', 'عفوا البصمة غير متطابقة..!!', '/assets/img/brand/failure.png', true)
        .then((confirmed) => {
          if (confirmed) {
            // do something
          }
        }).finally(() => {
          // this.refreshData();
        })

    }


  }
  cancelFingerprintVerification() {
    this.citizenService.cancelFingerprintVerification().subscribe();
  }
}
