import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { HttpStatusCode } from '@angular/common/http';

import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: SnackbarService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const requestedUrl = state.url;
    if (this.authService.isUserLoggedIn()) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      this.snackBar.openSnackbar(
        'Please login!',
        HttpStatusCode.Unauthorized
      );
      return false;
    }
  }
}
