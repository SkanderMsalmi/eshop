import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerGuard implements CanActivate {
  constructor(private authService: AuthService,private router:Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.role$.pipe(
      map(role => role === 'CUSTOMER' || role == null || role == undefined),
      tap(isCustomer => {
        if (!isCustomer) {
          this.router.navigateByUrl('/'); // Redirect to the admin dashboard or any desired page
        }
      })
    );
  }
}