import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';

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
  constructor(private auth:AuthServiceService) { }

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


}
