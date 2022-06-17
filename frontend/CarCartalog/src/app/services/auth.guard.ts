import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }

  canActivate() {
    if (this.auth.IsLoggedIn()) {
      return true;
    }
    alert("Faça Login para acessar a área administrativa")
    this.router.navigate(['login'])
    return false;
  }

}