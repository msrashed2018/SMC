import { Component, OnInit, NgModule } from '@angular/core';
import { Citizen } from '../../../model/citizen.model';
import { CitizenService } from '../../../services/citizenService';
import { DatePipe, CommonModule } from '@angular/common';
import { AlertModule, AlertConfig } from 'ngx-bootstrap/alert';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { ConfirmModalService } from '../../confirm-modal/confirm-modal.service';
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
  private canEdit: boolean = false
  constructor(private tokenStorageService: TokenStorageService, private confirmationModalService: ConfirmModalService, private citizenService: CitizenService, private router: Router, private datepipe: DatePipe) { }

  //pagination variables
  maxSize: number = 10;
  totalItems: number = 0;
  currentPage: number = 0;
  numPages: number = 0;
  items: number = 0;
  itemsPerPage: number = 10;
 
  ngOnInit() {
    if (this.tokenStorageService.hasRole("ROLE_SUPER_USER") || this.tokenStorageService.hasRole("ROLE_ADMIN")) {
      this.canEdit = true;
    }
    this.citizens = [];
    this.refreshData();
  }
  pageChanged(event: any): void {
    this.items = (event.page -1) * this.itemsPerPage ;
    this.currentPage = event.page -1;
    this.refreshData();
  }
  refreshData() {
    this.citizenService.findCitizensBySearchKey(this.searchKey, this.currentPage, this.itemsPerPage)
      .subscribe(
        result => {
          if (typeof result !== 'undefined' && result !== null && result['content'].length != 0) {
            this.noDataFound = false;
            this.citizens = result['content'];
            this.totalItems = result['totalElements'];
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
    this.currentPage = 0;
    this.refreshData();
  }
  calculateAge(dateString) {
    let birthDate: Date = new Date(dateString);
    return moment().diff(birthDate, 'years');
  }
  
  onDelete(id) {
    this.confirmationModalService.confirm('برجاء التاكيد', 'هل انت متاكد من حذف المواطن؟ ')
      .then((confirmed) => {
        if (confirmed) {
          this.citizenService.deleteCitizen(id).subscribe(
            response => {
              this.refreshData();
              this.errorMessage = false;
            },
            error => {
              console.log('oops', error)
              this.errorMessage = true;
            }
          )
        }
      })
  }
  displayCitizenRequests(id) {
    let citizenName = this.citizens.find((c) => c.id == id).name;
    this.router.navigate(['citizen/citizen-requests', id, { name: citizenName }])
  }
  onEdit(id) {
    this.router.navigate(['citizen/view-edit', id, { componentMode: "editMode" }])
  }
  onAdd() {
    this.router.navigate(['citizen/new-citizen'])
  }
}
