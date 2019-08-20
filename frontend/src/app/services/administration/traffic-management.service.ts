import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../app.constants';
import { TrafficManagement } from '../../model/traffic-management.model';

@Injectable({
  providedIn: 'root'
})
export class TrafficManagementService {

  constructor(
    private http:HttpClient
  ) { }

  retrieveAllTrafficManagement(page,size) {
    return this.http.get<TrafficManagement[]>(`${API_URL}/traffic-management?page=${page}&size=${size}`);

  }

  deleteTrafficManagement(id){
    return this.http.delete(`${API_URL}/traffic-management/${id}`);
  }

  retrieveTrafficManagement(id){
    return this.http.get<TrafficManagement>(`${API_URL}/traffic-management/${id}`);
  }

  updateTrafficManagement(id, trafficManagement){
    return this.http.put(
          `${API_URL}/traffic-management/${id}`
                , trafficManagement);
  }

  createTrafficManagement(trafficManagement){
    return this.http.post(
              `${API_URL}/traffic-management`
                , trafficManagement);
  }
}