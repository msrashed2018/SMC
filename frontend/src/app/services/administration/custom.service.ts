import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../app.constants';
import { Custom } from '../../model/custom.model';

@Injectable({
  providedIn: 'root'
})
export class CustomService {

  constructor(
    private http:HttpClient
  ) { }

  retrieveAllCustoms(page,size) {
    return this.http.get<Custom[]>(`${API_URL}/customs?page=${page}&size=${size}`);

  }

  deleteCustom(id){
    return this.http.delete(`${API_URL}/customs/${id}`);
  }

  retrieveCustom(id){
    return this.http.get<Custom>(`${API_URL}/customs/${id}`);
  }

  updateCustom(id, custom){
    return this.http.put(
          `${API_URL}/customs/${id}`
                , custom);
  }

  createCustom(custom){
    return this.http.post(
              `${API_URL}/customs`
                , custom);
  }
}
