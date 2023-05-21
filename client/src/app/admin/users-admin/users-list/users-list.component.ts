import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  view = "list"
  public users =[];
  searchQuery: string = '';
  public gettingUsers = ()=> this.adminService.getAllUsers().subscribe(
    (reponse)=> this.users = reponse
   );
  constructor(private adminService:AdminService) {
    this.gettingUsers();
   }
   get filteredUsers(): User[] {
    if (this.searchQuery.trim() === '') {
      return this.users;
    }
    const query = this.searchQuery.toLowerCase();
    return this.users.filter(user => {
      const name = user.name.toLowerCase();
      const email = user.email.toLowerCase();
      return name.includes(query) || email.includes(query);
    });
  }
  ngOnInit(): void {
  }
  clearSearch() {
    this.searchQuery = '';
  }
  deleteUser(userId: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.adminService.deleteUserById(userId).subscribe(() => {
        // const index = this.users.findIndex(user => user.id === userId);
        // if (index !== -1) {
        //   // Remove the user from the users array using splice
        //   this.users.splice(index, 1);
        // } // Refresh the user list after deletion
    this.gettingUsers();

      });
    }
  }
  blockUser(userId:string):void{
    if (confirm('Are you sure you want to block this ?')) {
      this.adminService.blockUserById(userId).subscribe(() => {
        
    this.gettingUsers();

      });
    }
  }
  unblockUser(userId:string):void{
    if (confirm('Are you sure you want to unblock this user ?')) {
      this.adminService.unblockUserById(userId).subscribe(() => {
        
    this.gettingUsers();

      });
    }
  }
}
