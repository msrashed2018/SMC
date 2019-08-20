import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../app.constants';
import { RequestType } from '../../model/request-type.model';

@Injectable({
  providedIn: 'root'
})
export class RequestTypeService {

  constructor(
    private http:HttpClient
  ) { }

  retrieveAllRequestTypes(page,size) {
    return this.http.get<RequestType[]>(`${API_URL}/request-type?page=${page}&size=${size}`);

  }

  deleteRequestType(id){
    return this.http.delete(`${API_URL}/request-type/${id}`);
  }

  retrieveRequestType(id){
    return this.http.get<RequestType>(`${API_URL}/request-type/${id}`);
  }

  updateRequestType(id, requestType){
    return this.http.put(
          `${API_URL}/request-type/${id}`
                , requestType);
  }

  createRequestType(requestType){
    return this.http.post(
              `${API_URL}/request-type`
                , requestType);
  }
}
