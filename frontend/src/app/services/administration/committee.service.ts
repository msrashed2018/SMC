import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../app.constants';
import { Committee } from '../../model/committee.model';

@Injectable({
  providedIn: 'root'
})
export class CommitteeService {

  constructor(
    private http:HttpClient
  ) { }

  retrieveAllCommittees(page,size) {
    return this.http.get<Committee[]>(`${API_URL}/committees?page=${page}&size=${size}`);

  }
  retrieveCommitteesByTypeAndFunction(committeeType , committeeFunction) {
    return this.http.get<Committee[]>(`${API_URL}/committees/findUpcommingCommitteesByTypeAndFunction?type=${committeeType}&function=${committeeFunction}`);
  }

  deleteCommittee(id){
    return this.http.delete(`${API_URL}/committees/${id}`);
  }

  retrieveCommittee(id){
    return this.http.get<Committee>(`${API_URL}/committees/${id}`);
  }

  updateCommittee(id, committee){
    return this.http.put(
          `${API_URL}/committees/${id}`
                , committee);
  }

  createCommittee(committee){
    return this.http.post(
              `${API_URL}/committees`
                , committee);
  }
}
