import { Component, OnInit, NgModule } from '@angular/core';
import { Citizen } from '../../../model/citizen.model';
import { CitizenService } from '../../../services/citizenService';
import { DatePipe, CommonModule } from '@angular/common';
import { AlertModule, AlertConfig } from 'ngx-bootstrap/alert';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { ConfirmModalService } from '../../confirm-modal/confirm-modal.service';
import { CITIZENS_PAGE_SIZE } from '../../../app.constants';
import { TokenStorageService } from '../../../services/authentication/jwt/token-storage.service';


@Component({
  selector: 'app-list-citizens',
  templateUrl: './list-citizens.component.html',
  styleUrls: ['./list-citizens.component.scss']
})
export class ListCitizensComponent implements OnInit {
  searchKey: string = '';
  private citizens: Citizen[];
  private noDataFound: boolean = false;
  private errorMessage: boolean = false;
  private canEdit : boolean = false
  isForSearch: boolean = true;
  constructor(private tokenStorageService: TokenStorageService, private confirmationModalService: ConfirmModalService, private citizenService: CitizenService, private router: Router, private datepipe: DatePipe) { }
  page: number = 0;
  pages: Array<number>;
  items: number = 0;
  setPage(i, event: any): void {
    // this.currentPage = event.page;
    event.preventDefault();
    this.page = i;
    this.items = i * CITIZENS_PAGE_SIZE;
    if (this.isForSearch) { this.retreiveCitizensBySearchKey(); } else { this.retriveAllCitizens(); }
  }
  nextPage(event: any): void {
    event.preventDefault();
    if ((this.page + 1) < this.pages.length) {
      this.page = this.page + 1
      this.items = (this.page) * CITIZENS_PAGE_SIZE;
      if (this.isForSearch) {
        this.retreiveCitizensBySearchKey();
      } else {
        this.retriveAllCitizens();
      }
    }
  }
  prevPage(event: any): void {
    event.preventDefault();

    if ((this.page - 1) >= 0) {
      this.page = this.page - 1;
      this.items = (this.page) * CITIZENS_PAGE_SIZE;
      if (this.isForSearch) {
        this.retreiveCitizensBySearchKey();
      } else {
        this.retriveAllCitizens();
      }
    }
  }
  ngOnInit() {
    if(this.tokenStorageService.hasRole("ROLE_SUPER_USER") || this.tokenStorageService.hasRole("ROLE_ADMIN")){
      this.canEdit = true;
    }
    this.citizens = [];
    this.retriveAllCitizens();
  }

  retreiveCitizensBySearchKey() {
    this.citizenService.findCitizensBySearchKey(this.searchKey, this.page, CITIZENS_PAGE_SIZE)
      .subscribe(
        result => {
          if (typeof result !== 'undefined' && result !== null && result['content'].length != 0) {
            this.noDataFound = false;
            this.citizens = result['content'];
            this.isForSearch = true;
            this.pages = new Array(result['totalPages']);
          } else {
            this.noDataFound = true;
          }
        },
        error => {
          console.log('oops', error);
          this.errorMessage = true;

        }
      );
  }

  searchByKey(event: Event) {
    this.citizens = [];
    this.errorMessage = false;
    this.noDataFound = false;
    this.pages = new Array(0);
    this.page=0;
    this.retreiveCitizensBySearchKey();
  }
  calculateAge(dateString) {
    let birthDate: Date = new Date(dateString);
    return moment().diff(birthDate, 'years');
  }
  retriveAllCitizens() {
    this.citizens = [];
    this.errorMessage = false;
    this.noDataFound = false;
    let date = new Date();
    // let latest_date =this.datepipe.transform(date, 'yyyy-MM-dd');
    this.citizenService.retrieveAllCitizens(this.page, CITIZENS_PAGE_SIZE)
      .subscribe(
        result => {
          if (typeof result !== 'undefined' && result !== null && result['content'].length != 0) {
            this.noDataFound = false;
            this.citizens = result['content'];
            this.isForSearch = false;
            this.pages = new Array(result['totalPages']);
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

  onDelete(id) {
    this.confirmationModalService.confirm('برجاء التاكيد', 'هل انت متاكد من حذف المواطن؟ ')
      .then((confirmed) => {
        if (confirmed) {
          this.citizenService.deleteCitizen(id).subscribe(
            response => {
              this.retriveAllCitizens();
              this.errorMessage = false;
            },
            error =>{
              console.log('oops',error)
              this.errorMessage = true; 
            }
          )
        }
      })
  }
  displayCitizenRequests(id) {
    let citizenName = "";
    this.citizens.forEach(
      citizen => {
        if (citizen.id == id) {
          citizenName = citizen.name;
        }
      }
    )
    this.router.navigate(['citizen/citizen-requests', id, { name: citizenName }])
  }
  onEdit(id) {
    this.router.navigate(['citizen/view-edit', id, { componentMode: "editMode" }])
  }
  onAdd() {
    this.router.navigate(['citizen/new-citizen'])
  }
}
