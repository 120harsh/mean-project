import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponse } from '../../shared/model';
import { env } from '../../shared/environment';
import { UserDetails } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  prifix = 'user/'

  constructor(private http:HttpClient) { }

  getUserList():Observable<HttpResponse<UserDetails[]>>{
    const userId =JSON.parse(localStorage.getItem('loginData')||'');
    return this.http.post<HttpResponse<UserDetails[]>>(env.url+this.prifix+'all-users',{id:userId.id});
  }
    getUserStatus():Observable<HttpResponse<any[]>>{
    const userId =JSON.parse(localStorage.getItem('loginData')||'');
    return this.http.post<HttpResponse<any[]>>(env.url+this.prifix+'all-user-request-status',{id:userId.id});
  }
}
