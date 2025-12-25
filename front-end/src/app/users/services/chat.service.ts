import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../../shared/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  prifix = 'user/';

  constructor(private http:HttpClient) { }

  getConversation(senderId:number):Observable<any>{
       const userId =JSON.parse(localStorage.getItem('loginData')||'');
       const postData = {
        recieverId : userId.id,
        senderId:senderId
       }
       return this.http.post<HttpResponse<any[]>>(env.url+this.prifix+'conversation',postData);
  }
}
