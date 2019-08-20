import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectorMatcher } from '@angular/compiler';
import { Citizen } from '../../model/citizen.model';
import { UserAuthorities } from '../../model/user-authorities.model';
import { AuthService } from '../../services/authentication/jwt/auth.service';
import { TokenStorageService } from '../../services/authentication/jwt/token-storage.service';
import { LoginInfo } from '../../services/authentication/jwt/login-info';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';

  userAuthorities: UserAuthorities;
  citizen: Citizen[];
  private loginInfo: LoginInfo;
  invalidAuthinticationMessage: boolean = false;

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  constructor(private router: Router, private jwtAuthService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }
  }


  onSubmit() {
    this.loginInfo = new LoginInfo(this.username, this.password);
    this.jwtAuthService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.authorities);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getAuthorities();
        this.router.navigateByUrl("");
      },
      error => {
        this.invalidAuthinticationMessage = true
        this.isLoginFailed = true;
        console.log(error);
        if (error.status == 401) {
          this.errorMessage = "هناك خطأ في اسم المستخدم او كلمه المرور!";
        } else if (error.status == 0) {
          
          this.errorMessage = "حدث خطا في الاتصال.. برجاء المحاولة لاحقا";
        }else{
          this.errorMessage = error.error;
        }
      }
    );
  }
}
