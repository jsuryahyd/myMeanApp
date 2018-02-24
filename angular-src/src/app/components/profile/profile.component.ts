import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
userProfile:Object;
  username:string;
email:string;
name:string;
  constructor(private auth:AuthServiceService,private flashMessages:FlashMessagesService) { }

  ngOnInit() {
     this.auth.getProfile().subscribe((data)=>{
      // console.log(data)
      this.username = data.user.username;
      this.email = data.user.email;      
      this.name = data.user.name;
      
    },err=>{
      if(err) throw err
    });
  }

  edit_username(){
    this.flashMessages.show('Edit username not yet implemented',{cssClass:"ui positive message",timeout:3000})
  }
  edit_email(){
    this.flashMessages.show('Edit Email not yet implemented',{cssClass:"ui positive message",timeout:3000})
  }


}
