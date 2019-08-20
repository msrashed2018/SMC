import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../app.constants';
import { City } from '../../model/city.model';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(
    private http:HttpClient
  ) { }

  retrieveAllCities(page,size) {
    return this.http.get<City[]>(`${API_URL}/cities/findAll?page=${page}&size=${size}`);
  }
  retrieveZoneCities(page,size) {
    return this.http.get<City[]>(`${API_URL}/cities?page=${page}&size=${size}`);
  }

  deleteCity(id){
    return this.http.delete(`${API_URL}/cities/${id}`);
  }

  retrieveCity(id){
    return this.http.get<City>(`${API_URL}/cities/${id}`);
  }

  updateCity(id, city){
    return this.http.put(
          `${API_URL}/cities/${id}`
                , city);
  }

  createCity(city){
    return this.http.post(
              `${API_URL}/cities`
                , city);
  }
}
