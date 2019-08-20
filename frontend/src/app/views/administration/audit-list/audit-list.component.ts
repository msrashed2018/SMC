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
  page: number = 0;
  pages: Array<number>;
  items: number = 0;
  setPage(i, event: any): void {
    // this.currentPage = event.page;
    event.preventDefault();
    this.page = i;
    this.items = i * AUDITS_PAGE_SIZE;
    if (this.isForSearch) { this.retrieveAuditsBySearchKey(); } else { this.refreshData(); }
  }2
  nextPage(event: any): void {
    event.preventDefault();
    if ((this.page + 1) < this.pages.length) {
      this.page = this.page + 1
      this.items = (this.page) * AUDITS_PAGE_SIZE;
      if(this.isForSearch){
        this.retrieveAuditsBySearchKey();
      }else{
        this.refreshData();
      }
    }
  }
  prevPage(event: any): void {
    event.preventDefault();

    if ((this.page - 1) >= 0) {
      this.page = this.page - 1;
      this.items = (this.page) * AUDITS_PAGE_SIZE;
      if(this.isForSearch){
        this.retrieveAuditsBySearchKey();
      }else{
        this.refreshData();
      }
    }
  }

  ngOnInit() {
    this.refreshData();
  }

  retrieveAuditsBySearchKey(){
    this.auditService.retrieveAuditsBySearchKey(this.searchKey, this.page, AUDITS_PAGE_SIZE)
    .subscribe(
      result => {
        if (typeof result !== 'undefined' && result !== null && result['content'].length != 0) {
          this.noDataFound = false;
          this.audits = result['content'];
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
    this.audits = [];
    this.page = 0;
    // this.citizens = [];
    this.errorMessage = false;
    this.noDataFound = false;
    this.retrieveAuditsBySearchKey();

  }

  refreshData() {
    this.auditService.retrieveAllAudits(this.page, AUDITS_PAGE_SIZE).subscribe(
      response => {
        this.noDataFound = false;
        this.audits = response['content'];
        this.pages = new Array(response['totalPages']);
        this.isForSearch = false;
      },
      error => {
        console.log('oops', error);
        this.errorMessage = true;
      }
    )
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

