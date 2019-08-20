import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../app.constants';
import { Zone } from '../../model/zone.model';
import { Governate } from '../../model/governate.model';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  constructor(
    private http:HttpClient
  ) { }

  retrieveAllZones(page,size) {
    return this.http.get<Zone[]>(`${API_URL}/zones?page=${page}&size=${size}`);

  }
  deleteZone(id){
    return this.http.delete(`${API_URL}/zones/${id}`);
  }

  retrieveZone(id){
    return this.http.get<Zone>(`${API_URL}/zones/${id}`);
  }

  updateZone(id, zone){
    return this.http.put(
          `${API_URL}/zones/${id}`
                , zone);
  }

  createZone(zone){
    return this.http.post(
              `${API_URL}/zones`
                , zone);
  }
  retrieveZoneGovernates(zoneId) {
    return this.http.get<Governate[]>(`${API_URL}/zones/${zoneId}/governates`);
  }
}
