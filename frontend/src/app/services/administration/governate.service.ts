import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../app.constants';
import { Governate } from '../../model/governate.model';
import { City } from '../../model/city.model';

@Injectable({
  providedIn: 'root'
})
export class GovernateService {

  constructor(
    private http:HttpClient
  ) { }
  retrieveZoneGovernates(page,size) {
    return this.http.get<Governate[]>(`${API_URL}/governates?page=${page}&size=${size}`);
  }
  retrieveAllGovernates(page,size) {
    return this.http.get<Governate[]>(`${API_URL}/governates/findAll?page=${page}&size=${size}`);
  }
  retrieveGovernateCities(governateId) {
    return this.http.get<City[]>(`${API_URL}/governates/${governateId}/cities`);
  }

  deleteGovernate(id){
    return this.http.delete(`${API_URL}/governates/${id}`);
  }

  retrieveGovernate(id){
    return this.http.get<Governate>(`${API_URL}/governates/${id}`);
  }

  updateGovernate(id, governate){
    return this.http.put(
          `${API_URL}/governates/${id}`
                , governate);
  }

  createGovernate(governate){
    return this.http.post(
              `${API_URL}/governates`
                , governate);
  }
}
