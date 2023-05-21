import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user.model';

@Pipe({
  name: 'userSearch'
})
export class UserSearchPipe implements PipeTransform {
  transform(users: User[], searchQuery: string): User[] {
    if (!users || !searchQuery) {
      return users;
    }

    const query = searchQuery.toLowerCase().trim();
    return users.filter(user =>
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    );
  }

}
