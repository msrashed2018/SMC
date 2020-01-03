import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuditService } from '../../../services/administration/audit.service';
import { Audit } from '../../../model/audit.model';
import { ConfirmModalService } from '../../confirm-modal/confirm-modal.service';
import { AUDITS_PAGE_SIZE } from '../../../app.constants';

@Component({
  selector: 'app-audit-list',
  templateUrl: './audit-list.component.html',
  styleUrls: ['./audit-list.component.scss']
})
export class AuditListComponent implements OnInit {
  audits: Audit[]
  message: string
  private noDataFound: boolean = false;
  private errorMessage: boolean = false;
  searchKey: string = '';
  isForSearch: boolean = true;
  constructor(
    private auditService: AuditService,
    private router: Router,
    private confirmationModalService: ConfirmModalService
  ) {

  }
  //pagination variables
  maxSize: number = 10;
  totalItems: number = 0;
  currentPage: number = 0;
  numPages: number = 0;
  items: number = 0;
  itemsPerPage : number = 10;
  pageChanged(event: any): void {
    this.items = (event.page -1) * this.itemsPerPage ;
    this.currentPage = event.page -1;
    this.refreshData();
  }

  ngOnInit() {
    this.refreshData();
  }

  refreshData(){
    this.auditService.retrieveAuditsBySearchKey(this.searchKey, this.currentPage, this.itemsPerPage)
    .subscribe(
      result => {
        if (typeof result !== 'undefined' && result !== null && result['content'].length != 0) {
          this.noDataFound = false;
          this.audits = result['content'];
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
    this.audits = [];
    this.currentPage = 0;
    // this.citizens = [];
    this.errorMessage = false;
    this.noDataFound = false;
    this.refreshData();

  }
  onDelete(id) {
    this.confirmationModalService.confirm('برجاء التاكيد', 'هل انت متاكد من حذف هذا الحدث ')
      .then((confirmed) => {
        if (confirmed) {
          this.auditService.deleteAudit(id).subscribe(
            response => {
              this.refreshData();
            },
            error =>{
              console.log('oops',error)
              this.message = error.error.message  
            }
          )
        }
      })
  }

  onEdit(id) {
    this.router.navigate(['administration/audits', id, { componentMode: "editMode" }])
  }

  onAdd() {
    this.router.navigate(['administration/audit-data'])
  }
}

