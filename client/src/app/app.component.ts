import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './core/models/user.model';
import { AuthService } from './core/services/auth.service';
@Component({
  selector: 'll-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isLoggedin$: Observable<boolean> = this.authService.isLoggedin$.asObservable();

  public logout(){
    
    
    this.authService.logout().subscribe(
      ()=>{
        this.router.navigateByUrl('/connexion')
      }
    )
  }
  constructor(private authService:AuthService,private router:Router){}
}
