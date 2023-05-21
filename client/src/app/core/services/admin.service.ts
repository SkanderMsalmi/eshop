import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }
  public getAllUsers():Observable<any>{
    return this.http.get('/api/auth/all');
  }
  public getUserById( id ):Observable<any>{
    return this.http.get('/api/auth/userById/645d064566b3b09f13f39a11');
  }
  public deleteUserById( id ):Observable<any>{
    return this.http.delete('/api/auth/deleteUserById/'+id);
  }

  public blockUserById(id):Observable<any>{
    return this.http.put('/api/auth/toggleBlockUserById/'+id,null);
  }
  public unblockUserById(id):Observable<any>{
    return this.http.put('/api/auth/toggleBlockUserById/'+id,null);
  }
}
