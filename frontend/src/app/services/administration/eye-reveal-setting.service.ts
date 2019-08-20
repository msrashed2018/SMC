import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../app.constants';
import { EyeRevealSetting } from '../../model/eye-reveal-setting.model';

@Injectable({
  providedIn: 'root'
})
export class EyeRevealSettingService {

  constructor(
    private http:HttpClient
  ) { }

  retrieveAllEyeRevealSettings(page,size) {
    return this.http.get<EyeRevealSetting[]>(`${API_URL}/eye-reveal-settings?page=${page}&size=${size}`);

  }

  deleteEyeRevealSetting(id){
    return this.http.delete(`${API_URL}/eye-reveal-settings/${id}`);
  }

  retrieveEyeRevealSetting(id){
    return this.http.get<EyeRevealSetting>(`${API_URL}/eye-reveal-settings/${id}`);
  }

  updateEyeRevealSetting(id, eyeMeasure){
    return this.http.put(
          `${API_URL}/eye-reveal-settings/${id}`
                , eyeMeasure);
  }

  createEyeRevealSetting(EyeRevealSetting){
    return this.http.post(
              `${API_URL}/eye-reveal-settings`
                , EyeRevealSetting);
  }
}
