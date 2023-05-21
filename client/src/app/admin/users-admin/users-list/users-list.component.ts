import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/core/models/user.model';
import { AdminService } from 'src/app/core/services/admin.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  loading: boolean = false;
  view = "list"
  public users =[];
  searchQuery: string = '';
  public gettingUsers = ()=> this.adminService.getAllUsers().subscribe(
    (reponse)=> this.users = reponse
   );
  constructor(private dialog: MatDialog,private adminService:AdminService) {
    this.loading = true;
    this.gettingUsers();
    this.loading = false;
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
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { message: 'Are you sure you want to delete this user?' }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.adminService.deleteUserById(userId).subscribe(() => {
          // Refresh the orders list after successful block
          this.gettingUsers();

        });
      }
    });

  }

  confirmBlockUser(userId: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { message: 'Are you sure you want to block this user?' }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.adminService.blockUserById(userId).subscribe(() => {
          // Refresh the orders list after successful block
          this.gettingUsers();

        });
      }
    });
  }

  confirmUnBlockUser(userId: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { message: 'Are you sure you want to unblock this user?' }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.adminService.unblockUserById(userId).subscribe(() => {
          // Refresh the orders list after successful block
          this.gettingUsers();

        });
      }
    });
  }

}
