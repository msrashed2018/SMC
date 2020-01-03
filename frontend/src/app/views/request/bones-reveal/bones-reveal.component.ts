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
  everySecond: Observable<number> = timer(0, 2000);

  canSkipFingerprintVerfication: boolean = false;
  constructor(private tokenStorage: TokenStorageService, private fingerprintConfirmationModalService: FingerprintConfirmServiceService, private citizenService: CitizenService, private requestService: RequestService, private router: Router, private datepipe: DatePipe) { }
  page: number = 0;
  pages: Array<number>;
  items: number = 0;
  setPage(i, event: any): void {
    // this.currentPage = event.page;
    event.preventDefault();
    this.page = i;
    this.items = i * BONES_REVEAL_PAGE_SIZE;
    if (this.isForSearch) { this.searchByStatesAndSearchKey(); } else { this.retriveAllRequests(); }
  }
  nextPage(event: any): void {
    event.preventDefault();
    if ((this.page + 1) < this.pages.length) {
      this.page = this.page + 1
      this.items = (this.page) * BONES_REVEAL_PAGE_SIZE;
      if (this.isForSearch) { this.searchByStatesAndSearchKey(); } else { this.retriveAllRequests(); }
    }
  }
  prevPage(event: any): void {
    event.preventDefault();

    if ((this.page - 1) >= 0) {
      this.page = this.page - 1;
      this.items = (this.page) * BONES_REVEAL_PAGE_SIZE;
      if (this.isForSearch) { this.searchByStatesAndSearchKey(); } else { this.retriveAllRequests(); }
    }
  }
  ngOnInit() {
    this.requests = [];
    this.retriveAllRequests();
    this.canSkipFingerprintVerfication = this.tokenStorage.hasAdminRole();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  searchByStatesAndSearchKey() {
    this.requestService.searchByStatesAndSearchKey("CONTINUE_REGISTERING_DONE", "PENDING_REVEAL", "NA", this.searchKey, this.page, BONES_REVEAL_PAGE_SIZE)
      .subscribe(
        result => {
          if (typeof result !== 'undefined' && result !== null && result['content'].length != 0) {
            this.noDataFound = false;
            this.requests = result['content'];
            this.isForSearch = true;
            this.pages = new Array(result['totalPages']);
          } else {

            this.pages = new Array(0);
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
    this.page = 0;
    // this.citizens = [];
    this.errorMessage = false;
    this.noDataFound = false;
    this.searchByStatesAndSearchKey();
  }
  retriveAllRequests() {
    this.requests = [];
    this.errorMessage = false;
    this.noDataFound = false;
    let date = new Date();
    // let today =this.datepipe.transform(date, 'yyyy-MM-dd');
    this.requestService.retrieveByRequestStates("CONTINUE_REGISTERING_DONE", "PENDING_REVEAL", "NA", this.page, BONES_REVEAL_PAGE_SIZE)
      .subscribe(
        result => {
          if (typeof result !== 'undefined' && result !== null && result['content'].length != 0) {
            this.noDataFound = false;
            this.requests = result['content'];
            this.pages = new Array(result['totalPages']);
            this.isForSearch = false;
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
      if( n == 60){
        this.subscription.unsubscribe();
        this.fingerprintConfirmationModalService.close();
      }
      this.citizenService.isCitizenfigerprintVerified(citizenId).subscribe(
        result => {
          if (result == true) {
            this.confirmAttend(requestId);
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
          this.confirmAttend(requestId);
          
        }
      }).finally(() => { this.subscription.unsubscribe(); })

  }

  confirmAttend(requestId) {
    this.fingerprintConfirmationModalService.close();
    this.fingerprintConfirmationModalService.confirm('التحقق من بصمة المواطن', 'تم تسجيل حضور المواطن لكشف العظام بنجاح', '/assets/img/brand/success.png', true)
      .then((confirmed) => {
        if (confirmed) {
          // do something
        }
      }).finally(() => {
        this.retriveAllRequests();
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
  }

}
