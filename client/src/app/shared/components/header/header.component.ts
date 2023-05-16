import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { menuList as staticMenuList } from '../../data/menus';
import { AuthService } from 'src/app/core/services/auth.service';
import { Store } from '@ngrx/store';
import { StoreInterface } from 'src/app/store/store';

@Component({
  selector: 'll-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() public isLoggedin!: boolean | null;
  @Input() public role!: string | null;
  @Output() public logout: EventEmitter<true> = new EventEmitter();
  @Input() topFixed: boolean;
  @Output() toggleSidenav = new EventEmitter();
  isScrolled: boolean;
  menuList = [];
  isLessThenLargeDevice;
  numberItems : number;
  constructor(private breakpointObserver: BreakpointObserver,private authService:AuthService, private store: Store<StoreInterface>) {
    
  }

  ngOnInit(): void {
    this.menuList = staticMenuList;
    this.store.subscribe(res => this.numberItems = res.cart.products.length);
    this.breakpointObserver.observe(['(max-width: 1199px)']).subscribe(({ matches }) => {
      this.isLessThenLargeDevice = matches;
    });
    
  }
  onLogout() {
    this.logout.emit(true);
  }
  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isScrolled = window.pageYOffset > 15;
  }
}
