import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private auth:AuthServiceService,private flashMessage:FlashMessagesService,private router:Router) { 
    
  }

  ngOnInit() {
  }

  logout(){
    this.auth.logout();
    this.flashMessage.show('You are now Logged out',{cssClass:"ui message",timeout:10000});
    this.router.navigate(['/login']);
  }

}
