import { Component, OnInit,EventEmitter,  Input,  Output  } from '@angular/core';
import { menuList } from '../../data/menus';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'll-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Input() public isLoggedin!: boolean | null;
  @Output() public logout: EventEmitter<true> = new EventEmitter();
  navList = [];
  constructor() { }

  ngOnInit(): void {
    this.navList = menuList;
  }
  onLogout() {
    this.logout.emit(true);
  }
}
