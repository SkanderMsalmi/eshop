import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
@Component({
  selector: 'app-customer-layout',
  templateUrl: './customer-layout.component.html',
  styleUrls: ['./customer-layout.component.scss']
})
export class CustomerLayoutComponent implements OnInit {
  public user$:Observable<User | null> = this.authService.user$.asObservable();
  public user:User;
  isLessThenLargeDevice;

  constructor(private breakpointObserver: BreakpointObserver, private router: Router,private authService:AuthService) {
 this.user$.subscribe((response)=>this.user = response);

  }

  ngOnInit(): void {
    this.breakpointObserver.observe(['(max-width: 1199px)']).subscribe(({ matches }) => {
      this.isLessThenLargeDevice = matches;
    });
  }
  onLogout(): void {
    this.router.navigate(['auth/login']);
  }

}
