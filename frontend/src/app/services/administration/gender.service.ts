import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../app.constants';
import { Gender } from '../../model/gender.model';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  constructor(
    private http:HttpClient
  ) { }

  retrieveAllGenders() {
    return this.http.get<Gender[]>(`${API_URL}/genders`);

  }

  deleteGender(id){
    return this.http.delete(`${API_URL}/genders/${id}`);
  }

  retrieveGender(id){
    return this.http.get<Gender>(`${API_URL}/genders/${id}`);
  }

  updateGender(id, gender){
    return this.http.put(
          `${API_URL}/genders/${id}`
                , gender);
  }

  createGender(gender){
    return this.http.post(
              `${API_URL}/genders`
                , gender);
  }
}
