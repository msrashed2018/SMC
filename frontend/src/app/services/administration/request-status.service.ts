import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../app.constants';
import { RequestStatus } from '../../model/request-status.model';

@Injectable({
  providedIn: 'root'
})
export class RequestStatusService {

  constructor(
    private http:HttpClient
  ) { }

  retrieveAllRequestStatus(page,size) {
    return this.http.get<RequestStatus[]>(`${API_URL}/request-status?page=${page}&size=${size}`);

  }

  deleteRequestStatus(id){
    return this.http.delete(`${API_URL}/request-status/${id}`);
  }

  retrieveRequestStatus(id){
    return this.http.get<RequestStatus>(`${API_URL}/request-status/${id}`);
  }

  updateRequestStatus(id, requestStatus){
    return this.http.put(
          `${API_URL}/request-status/${id}`
                , requestStatus);
  }

  createRequestStatus(requestStatus){
    return this.http.post(
              `${API_URL}/request-status`
                , requestStatus);
  }
}