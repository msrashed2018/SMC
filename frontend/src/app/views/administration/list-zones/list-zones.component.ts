import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ZoneService } from '../../../services/administration/zone.service';
import { Zone } from '../../../model/zone.model';
import { FormBuilder } from '@angular/forms';
import { ConfirmModalService } from '../../confirm-modal/confirm-modal.service';


import { ZONES_PAGE_SIZE } from '../../../app.constants';


@Component({
  selector: 'app-list-zones',
  templateUrl: './list-zones.component.html',
  styleUrls: ['./list-zones.component.scss']
})
export class ListZonesComponent implements OnInit {
  zones: Zone[]
  message: string
  

  constructor(
    private zoneService:ZoneService,
    private router : Router, private confirmationModalService: ConfirmModalService
  ) { 

  }
  page: number = 0;
  pages: Array<number>;
  items: number = 0;
  setPage(i,event: any): void {
    // this.currentPage = event.page;
    event.preventDefault();
    this.page = i ;
    this.items = i*ZONES_PAGE_SIZE;
    this.refreshData();
  }
  nextPage(event: any): void {
    event.preventDefault();
    if((this.page+1) < this.pages.length){
      this.page = this.page+1
      this.items = (this.page)*ZONES_PAGE_SIZE;
      this.refreshData();
    }
  }
  prevPage(event: any): void {
    event.preventDefault();

    if((this.page-1) >= 0){
      this.page =this.page -1;
      this.items = (this.page)*ZONES_PAGE_SIZE;
      this.refreshData();
    }
  }
  ngOnInit() {
    this.refreshData();
  }
  refreshData(){
    this.zoneService.retrieveAllZones(this.page,ZONES_PAGE_SIZE).subscribe(
      response => {
        this.zones = response['content'];
        this.pages = new Array(response['totalPages']);
      }
    )
  }

  onDelete(id) {
    this.confirmationModalService.confirm('برجاء التاكيد', 'هل انت متاكد من حذف المقر ')
    .then((confirmed) => {
      if(confirmed){
        this.zoneService.deleteZone(id).subscribe (
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
    this.router.navigate(['administration/zones',id,{componentMode: "editMode"}])
  }

  onAdd() {
    this.router.navigate(['administration/zone-data'])
  }


  @ViewChild('content') content: ElementRef;
}
