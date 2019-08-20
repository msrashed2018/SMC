import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EquipmentService } from '../../../services/administration/equipment.service';
import { Equipment } from '../../../model/equipment.model';
import { FormBuilder } from '@angular/forms';
import { ConfirmModalService } from '../../confirm-modal/confirm-modal.service';
import { EQUIPMENTS_TYPES_PAGE_SIZE } from '../../../app.constants';

@Component({
  selector: 'app-list-equipments',
  templateUrl: './list-equipments.component.html',
  styleUrls: ['./list-equipments.component.scss']
})
export class ListEquipmentsComponent implements OnInit {
  equipments: Equipment[]
  message: string

  constructor(
    private equipmentService:EquipmentService,
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
    this.items = i*EQUIPMENTS_TYPES_PAGE_SIZE;
    this.refreshData();
  }
  nextPage(event: any): void {
    event.preventDefault();
    if((this.page+1) < this.pages.length){
      this.page = this.page+1
      this.items = (this.page)*EQUIPMENTS_TYPES_PAGE_SIZE;
      this.refreshData();
    }
  }
  prevPage(event: any): void {
    event.preventDefault();

    if((this.page-1) >= 0){
      this.page =this.page -1;
      this.items = (this.page)*EQUIPMENTS_TYPES_PAGE_SIZE;
      this.refreshData();
    }
  }
  ngOnInit() {
    this.refreshData();
  }
  refreshData(){
    this.equipmentService.retrieveAllEquipments(this.page,EQUIPMENTS_TYPES_PAGE_SIZE).subscribe(
      response => {
        this.equipments = response['content'];
        this.pages = new Array(response['totalPages']);
      },
error =>{
        console.log('oops',error);
        this.message = error.error.message;
      }
    )
  }

  onDelete(id) {
    this.confirmationModalService.confirm('برجاء التاكيد', 'هل انت متاكد من حذف السيارة؟ ')
    .then((confirmed) => {
      
      if(confirmed){
        this.equipmentService.deleteEquipment(id).subscribe (
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
    this.router.navigate(['administration/equipments',id,{componentMode: "editMode"}])
  }

  onAdd() {
    this.router.navigate(['administration/equipment-data'])
  }
}
