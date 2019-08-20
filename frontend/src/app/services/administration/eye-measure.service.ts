import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../app.constants';
import { EyeMeasure } from '../../model/eye-measure.model';

@Injectable({
  providedIn: 'root'
})
export class EyeMeasureService {

  constructor(
    private http:HttpClient
  ) { }

  retrieveAllEyeMeasure(page,size) {
    return this.http.get<EyeMeasure[]>(`${API_URL}/eye-measures?page=${page}&size=${size}`);

  }

  deleteEyeMeasure(id){
    return this.http.delete(`${API_URL}/eye-measures/${id}`);
  }

  retrieveEyeMeasure(id){
    return this.http.get<EyeMeasure>(`${API_URL}/eye-measures/${id}`);
  }

  updateEyeMeasure(id, eyeMeasure){
    return this.http.put(
          `${API_URL}/eye-measures/${id}`
                , eyeMeasure);
  }

  createEyeMeasure(EyeMeasure){
    return this.http.post(
              `${API_URL}/eye-measures`
                , EyeMeasure);
  }
}
