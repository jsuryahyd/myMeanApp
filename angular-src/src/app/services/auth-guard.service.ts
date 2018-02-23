import { Injectable } from '@angular/core';
import {Router,CanActivate} from "@angular/router";
import {AuthServiceService} from './auth-service.service';

@Injectable()
export class AuthGuardService implements CanActivate{
  
  constructor(private auth:AuthServiceService,private router:Router) { }
  canActivate(): boolean {
    // throw new Error("Method not implemented.");
    if(this.auth.isLoggedIn()){
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

}
