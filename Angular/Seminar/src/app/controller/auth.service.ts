import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  isLoggedIn: boolean = false;

  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let url: string = state.url;
    return this.checkLogin();
    throw new Error('Method not implemented.');
  }

  checkLogin(): true | UrlTree {
    let val: string = localStorage.getItem('isUserLoggedIn');
    if (val != null && val == "true") {
      return true;
    } else {
      return this.router.parseUrl('/');
    }
  }

}
