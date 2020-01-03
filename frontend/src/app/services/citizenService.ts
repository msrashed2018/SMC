import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { Citizen } from '../model/citizen.model';
import { API_URL } from '../app.constants';

export const TOKEN = 'token'
export const AUTHENTICATED_USER = 'authenticaterUser'

@Injectable({
    providedIn: 'root'
  })
  export class CitizenService {
  
  constructor(private http: HttpClient, public datepipe: DatePipe) { }
  deleteCitizen(id){
    return this.http.delete(`${API_URL}/citizens/${id}`);
  }
  findCitizensBySearchKey(searchKey : string, page,size) {
    return this.http.get<Citizen[]>
      (`${API_URL}/citizens/search/findCitizensBySearchKey?searchKey=${searchKey}&page=${page}&size=${size}`).pipe( map(
        data => {
        return data;
      }));
  }

  retrieveCitizen(id){
    return this.http.get<Citizen>(`${API_URL}/citizens/${id}`);
  }
  retrieveAllCitizens(page,size) {
    return this.http.get<Citizen[]>(`${API_URL}/citizens?page=${page}&size=${size}`);
  }
  retriveAll(latest_date :string) {
      
    return this.http.get<Citizen[]>
      (`${API_URL}`+'/citizens/search/findAllByDate?date='+latest_date).pipe( map(
        data => {
        return data;
      }));
  }
  verifyCitizenFingerprintStep1(citizenId){
    return this.http.post<Boolean>(`${API_URL}/citizens/${citizenId}/fingerprint/verifystep1`,null);
  }

  isCitizenfigerprintVerified(citizenId){
    return this.http.get<Boolean>(`${API_URL}/citizens/${citizenId}/fingerprint/isverified`);
  }
  registerCitizenFingerprintStep1(citizenId){
    return this.http.post<Boolean>(`${API_URL}/citizens/${citizenId}/fingerprint/enrollmentstep1`,null);
  }
  cancelFingerprintRegisteration(){
    return this.http.delete(`${API_URL}/citizens/fingerprint/cancelenrollment`);
  }
  cancelFingerprintVerification(){
    return this.http.delete(`${API_URL}/citizens/fingerprint/cancelverifification`);
  }

  isCitizenfigerprintEnrolled(citizenId){
    return this.http.get<Boolean>(`${API_URL}/citizens/${citizenId}/fingerprint/isenrolled`);
  }
  createCitizenRequest(citizenRequestCommand){
    return this.http.post<any>
    (`${API_URL}`+'/citizens',citizenRequestCommand).pipe( map(
      data => {
      return data;
    }));
  }
  updateCitizen(citizenId, citizen : Citizen){
    return this.http.put(
          `${API_URL}/citizens/${citizenId}`
                , citizen);
  }
  retriveAllOccupations() {
      
    return this.http.get<Object>
      (`${API_URL}`+'/occupations').pipe( map(
        data => {
        return data;
      }));
  }

  retriveAllCities() {
      
    return this.http.get<Object>
      (`${API_URL}`+'/cities').pipe( map(
        data => {
        return data;
      }));
  }
  retriveAllGovernates() {
      
    return this.http.get<Object>
      (`${API_URL}`+'/governates').pipe( map(
        data => {
        return data;
      }));
  }

}

