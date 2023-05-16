import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerGuard implements CanActivate {
  constructor(private authService: AuthService,private router:Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.user$.pipe(
      map((user: User | null) => {
        if (user && user?.role === 'CUSTOMER') {
          return true; // Allow access for customer users
        } else {
            this.router.navigateByUrl("/auth/login");

          return false; // Deny access for non-customer users
        }
      })
    );
  }
}