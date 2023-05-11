import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isLoggedin$.pipe(
      first(),
      tap((isLoggedin: boolean) => {
        if (!isLoggedin) {
          this.router.navigateByUrl('/auth/login');
        }
      })
    );
  }
}