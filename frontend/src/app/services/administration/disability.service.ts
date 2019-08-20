import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../app.constants';
import { Disability } from '../../model/disability.model';

@Injectable({
  providedIn: 'root'
})
export class DisabilityService {

  constructor(
    private http:HttpClient
  ) { }

  retrieveAllDisabilities(page,size) {
    return this.http.get<Disability[]>(`${API_URL}/disabilities?page=${page}&size=${size}`);

  }

  deleteDisability(id){
    return this.http.delete(`${API_URL}/disabilities/${id}`);
  }

  retrieveDisability(id){
    return this.http.get<Disability>(`${API_URL}/disabilities/${id}`);
  }

  updateDisability(id, disability){
    return this.http.put(
          `${API_URL}/disabilities/${id}`
                , disability);
  }

  createDisability(disability){
    return this.http.post(
              `${API_URL}/disabilities`
                , disability);
  }
}
