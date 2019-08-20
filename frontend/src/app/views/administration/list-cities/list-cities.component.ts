import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CityService } from '../../../services/administration/city.service';
import { City } from '../../../model/city.model';
import { ConfirmModalService } from '../../confirm-modal/confirm-modal.service';
import { CITIES_PAGE_SIZE } from '../../../app.constants';


@Component({
  selector: 'app-list-cities',
  templateUrl: './list-cities.component.html',
  styleUrls: ['./list-cities.component.scss']
})
export class ListCitiesComponent implements OnInit {
  cities: City[]
  message: string

  constructor(
    private cityService: CityService,
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
    this.items = i * CITIES_PAGE_SIZE;
    this.refreshData();
  }
  nextPage(event: any): void {
    event.preventDefault();
    if ((this.page + 1) < this.pages.length) {
      this.page = this.page + 1
      this.items = (this.page) * CITIES_PAGE_SIZE;
      this.refreshData();
    }
  }
  prevPage(event: any): void {
    event.preventDefault();

    if ((this.page - 1) >= 0) {
      this.page = this.page - 1;
      this.items = (this.page) * CITIES_PAGE_SIZE;
      this.refreshData();
    }
  }

  ngOnInit() {
    this.refreshData();
  }
  refreshData() {
    this.cityService.retrieveAllCities(this.page, CITIES_PAGE_SIZE).subscribe(
      response => {
        this.cities = response['content'];
        this.pages = new Array(response['totalPages']);
      },
      error => {
        console.log('oops', error);
        this.message = error.error.message;
      }
    )
  }

  onDelete(id) {
    this.confirmationModalService.confirm('برجاء التاكيد', 'هل انت متاكد من حذف المدينة ')
      .then((confirmed) => {
        if (confirmed) {
          this.cityService.deleteCity(id).subscribe(
            response => {
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
    this.router.navigate(['administration/cities', id, { componentMode: "editMode" }])
  }

  onAdd() {
    this.router.navigate(['administration/city-data'])
  }
}
