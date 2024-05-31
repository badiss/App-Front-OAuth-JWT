import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Route, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../servives/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate{

  constructor(public authService: AuthService, private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): MaybeAsync<GuardResult> {

      if (this.authService.isAuthentificated) {
        // je récupére a travers route, les roles indiqué dans le routing
        let requiredRoles = route.data['roles']
        // je récupére les rôles de user authentifier.
        let rolesUser : string[] = this.authService.roles;

        // je vais vérifié s'il ya un role parmis les rôles de user authentifié existe dans la liste des rôles autorisée dans le routing
        for (let role of rolesUser) {
          if (requiredRoles.includes(role)) {
            return true;
          }
        }
        return false;
      } else {
        this.router.navigateByUrl('/login');
        return false;
      }
      
    
  }
}
