import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuardService {

  constructor() { }

   getLoginDetails(): string {
    return localStorage.getItem('loginData') as string;
  }

}
