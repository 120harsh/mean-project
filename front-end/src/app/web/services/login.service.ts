
import { Injectable } from '@angular/core';
import { HttpResponse } from '../../shared/model';
import { HttpClient } from '@angular/common/http';
import { env } from '../../shared/environment';
import { Observable } from 'rxjs';
import { LoginData } from '../model/login.model';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  urlPrifix = 'web/';

  constructor(private http:HttpClient) { }

    getLoginDetails(userDetails:LoginData):Observable<HttpResponse<any>>{
      return this.http.post<HttpResponse<any>>(env.url+this.urlPrifix+'login',userDetails);
    }

}
