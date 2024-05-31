import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Route, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../servives/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(public authService: AuthService, private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): MaybeAsync<GuardResult> {

      if (this.authService.isAuthentificated) {
        return true;
      } else {
        this.router.navigateByUrl('/login');
        return false;
      }
      
    
  }
}
