import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../app.constants';
import { Equipment } from '../../model/equipment.model';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  constructor(
    private http:HttpClient
  ) { }

  retrieveAllEquipments(page,size) {
    return this.http.get<Equipment[]>(`${API_URL}/equipments?page=${page}&size=${size}`);

  }

  deleteEquipment(id){
    return this.http.delete(`${API_URL}/equipments/${id}`);
  }

  retrieveEquipment(id){
    return this.http.get<Equipment>(`${API_URL}/equipments/${id}`);
  }

  updateEquipment(id, equipment){
    return this.http.put(
          `${API_URL}/equipments/${id}`
                , equipment);
  }

  createEquipment(equipment){
    return this.http.post(
              `${API_URL}/equipments`
                , equipment);
  }
}
