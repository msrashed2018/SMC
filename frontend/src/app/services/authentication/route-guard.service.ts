import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { TokenStorageService } from './jwt/token-storage.service';

@Injectable(
  // providedIn: 'root'
)
export class RouteGuardService implements CanActivate {

  constructor(
    private router: Router, private tokenStorage: TokenStorageService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.tokenStorage.getToken()){
      return true;
    }else{
      this.router.navigate(['login']);
      return false;
    }
    // if (this.BasicAuthenticationService.isUserLoggedIn()) {
    //   return true;
    // } else {
    //   console.log(" user is not loged");

    //   this.router.navigate(['login']);

    //   return false;
    // }
  }
}
