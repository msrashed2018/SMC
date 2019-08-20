import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../app.constants';
import { Occupation } from '../../model/occupation.model';

@Injectable({
  providedIn: 'root'
})
export class OccupationService {

  constructor(
    private http:HttpClient
  ) { }

  retrieveAllOccupations(page,size) {
    return this.http.get<Occupation[]>(`${API_URL}/occupations?page=${page}&size=${size}`);

  }

  deleteOccupation(id){
    return this.http.delete(`${API_URL}/occupations/${id}`);
  }

  retrieveOccupation(id){
    return this.http.get<Occupation>(`${API_URL}/occupations/${id}`);
  }

  updateOccupation(id, occupation){
    return this.http.put(
          `${API_URL}/occupations/${id}`
                , occupation);
  }

  createOccupation(occupation){
    return this.http.post(
              `${API_URL}/occupations`
                , occupation);
  }
}
