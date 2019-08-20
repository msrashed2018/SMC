import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GovernateService } from '../../../services/administration/governate.service';
import { Governate } from '../../../model/governate.model';
import { ConfirmModalService } from '../../confirm-modal/confirm-modal.service';
import { GOVERNATES_PAGE_SIZE } from '../../../app.constants';
// import { BrowserModule } from '@angular/platform-browser';


@Component({
  // selector: 'app-list-governates',
  templateUrl: './list-governates.component.html',
  styleUrls: ['./list-governates.component.scss']
})
export class ListGovernatesComponent implements OnInit {
  governates: Governate[]
  message: string

  constructor(
    private governateService: GovernateService,
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
    this.items = i * GOVERNATES_PAGE_SIZE;
    this.refreshData();
  }
  nextPage(event: any): void {
    event.preventDefault();
    if ((this.page + 1) < this.pages.length) {
      this.page = this.page + 1
      this.items = (this.page) * GOVERNATES_PAGE_SIZE;
      this.refreshData();
    }
  }
  prevPage(event: any): void {
    event.preventDefault();

    if ((this.page - 1) >= 0) {
      this.page = this.page - 1;
      this.items = (this.page) * GOVERNATES_PAGE_SIZE;
      this.refreshData();
    }
  }
  ngOnInit() {
    this.refreshData();
  }

  refreshData() {
    this.governateService.retrieveAllGovernates(this.page, GOVERNATES_PAGE_SIZE).subscribe(
      response => {
        this.governates = response['content'];
        this.pages = new Array(response['totalPages']);
      },
      error => {
        console.log('oops', error);
        this.message = error.error.message;
      }
    )
  }

  onDelete(id) {
    this.confirmationModalService.confirm('برجاء التاكيد', 'هل انت متاكد من حذف المحافظة ')
      .then((confirmed) => {
        if (confirmed) {
          this.governateService.deleteGovernate(id).subscribe(
            response => {
              this.message = ` تم حذف المحافظه بنجاح `
              this.refreshData();
            },
            error => {
              console.log('oops', error)
              this.message = error.error.message
            }
          )
        }
      })
  }


  onEdit(id) {
    this.router.navigate(['administration/governates', id, { componentMode: "editMode" }])
  }

  onAdd() {
    this.router.navigate(['administration/governate-data'])
  }
}
