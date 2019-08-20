import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../app.constants';
import { User } from '../../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http:HttpClient
  ) { }

  retrieveAllUsers(page,size) {
    return this.http.get<User[]>(`${API_URL}/users?page=${page}&size=${size}`);
  }

  deleteUser(id){
    return this.http.delete(`${API_URL}/users/${id}`);
  }

  retrieveUser(id){
    return this.http.get<User>(`${API_URL}/users/${id}`);
  }

  updateUser(id, user){
    return this.http.put(
          `${API_URL}/users/${id}`
                , user);
  }

  createUser(user){
    return this.http.post(
              `${API_URL}/users`
                , user);
  }
}
