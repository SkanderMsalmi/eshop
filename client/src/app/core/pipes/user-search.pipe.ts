import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user.model';
import { MatTableDataSource } from '@angular/material/table';

@Pipe({
  name: 'userSearch'
})
export class UserSearchPipe implements PipeTransform {
  transform(users: MatTableDataSource<User>, searchQuery: string): MatTableDataSource<User> {
    if (!users || !searchQuery) {
      return users;
    }

    const query = searchQuery.toLowerCase().trim();
    return new MatTableDataSource(
      users.data.filter(user =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
      )
    );
  }

}
