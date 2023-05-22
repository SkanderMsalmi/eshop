import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {

  }

  canActivate(): Observable<boolean> {
    return this.authService.role$.pipe(
      map(role => role === 'ADMIN'), // Check if role is 'ADMIN'
      tap(isAdmin => {
        if (!isAdmin) {
          this.router.navigateByUrl('/'); // Redirect to home if not an admin
        }
      })
    );
  }

}
