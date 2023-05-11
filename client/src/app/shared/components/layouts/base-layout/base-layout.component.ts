import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import { takeWhile } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'll-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss']
})
export class BaseLayoutComponent implements OnInit, OnDestroy {
  public isLoggedin$: Observable<boolean> = this.authService.isLoggedin$.asObservable();
  isLoggedIn: boolean;
  isAlive: boolean = true;
  @ViewChild('sidenav') sidenav;
  isSidenavExpand = false;
  isLessThenLargeDevice = true;

  public logout(){
    
    this.authService.logout().subscribe(
      ()=>{
        this.router.navigateByUrl('/products')
      }
    )
  }
  constructor(private breakpointObserver: BreakpointObserver,private authService:AuthService,private router:Router) {
    this.breakpointObserver.observe(['(max-width: 1199px)']).pipe(takeWhile(() => this.isAlive)).subscribe(({matches}) => {
      this.isLessThenLargeDevice = matches;
      if (!matches) {
        this.isSidenavExpand = false;
      }
    });

  }

  ngOnInit(): void {
 
  }
  
  ngOnDestroy(): void{
    this.isAlive = false
    this.isLoggedIn = false
  }

  toggleSidenav(): void {
    this.sidenav.toggle();
    this.isSidenavExpand = this.sidenav.opened;
  }
}
