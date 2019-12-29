import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
//import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const redirectUrl = route['_routerState']['url'];

    if (this.authService.isLoggedIn()) {
      return true;
    }

    this.router.navigateByUrl(
      this.router.createUrlTree(
        ['/login'], {
          queryParams: {
            redirectUrl
          }
        }
      )
    );

    return false;
  }
}