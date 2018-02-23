import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class AuthServiceService {
  authToken:any
  user:any

  constructor(private http:Http) { }
  registerUser(user){
    let headers = new Headers();
    headers.append('content-Type','application/json');
    // http.post gives out an observable
    return this.http.post('users/user-register',user,{headers:headers}).map(res=>res.json());
  }
//called from login.component.ts
  authenticateUser(user){
    let headers = new Headers();
    headers.append('content-Type','application/json');
    return this.http.post('users/authenticate',user,{headers:headers}).map(res=>res.json())
  }

  getProfile(){
    let headers = new Headers();
    headers.append('content-Type','application/json');
    this.loadToken();
    headers.append('Authorization',this.authToken);
    return this.http.get('users/profile',{headers:headers}).map(res=>res.json());
  }

  loadToken(){
    this.authToken = localStorage.getItem('id_token')
  }

  saveUserData(token,user){
    localStorage.setItem('id_token',token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
  isLoggedIn(){
    return tokenNotExpired('id_token');
  }
}
