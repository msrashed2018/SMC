import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../app.constants';
import { Role } from '../../model/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(
    private http:HttpClient
  ) { }

  retrieveAllRoles() {
    return this.http.get<Role[]>(`${API_URL}/roles`);

  }

  deleteRole(id){
    return this.http.delete(`${API_URL}/roles/${id}`);
  }

  retrieveRole(id){
    return this.http.get<Role>(`${API_URL}/roles/${id}`);
  }

  updateRole(id, role){
    return this.http.put(
          `${API_URL}/roles/${id}`
                , role);
  }

  createRole(role){
    return this.http.post(
              `${API_URL}/roles`
                , role);
  }
}
