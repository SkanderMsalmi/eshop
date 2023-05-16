import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.scss']
})
export class SidebarAdminComponent implements OnInit {
  isSidebarOpen = true;
  isSidebarCollapsed = false;

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  closeSidebar() {
    if (this.isSidebarCollapsed) {
      this.isSidebarCollapsed = false;
    }
  }
  constructor() { }

  ngOnInit(): void {
  }

}
