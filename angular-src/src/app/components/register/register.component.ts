import { Component, OnInit } from '@angular/core';
import { ValidateFormService } from '../../services/validate-form.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthServiceService } from '../../services/auth-service.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: String;
  username: String;
  password: String;
  email: String;

  constructor(private validateForm: ValidateFormService, private flashMessages: FlashMessagesService,private auth:AuthServiceService,private router:Router) { }

  ngOnInit() {
  }

  registerSubmit() {
    // alert('submitted');
    const user = {
      name: this.name,
      email: this.email,
      password: this.password,
      username: this.username
    }

    if (!this.validateForm.validateRequired(user)) {
      // alert('Please fill in all the fields');
      this.flashMessages.show('Please fill in all the fields', { cssClass: 'ui negative message', timeout: 10000 });
      return false;
    }

    if (!this.validateForm.validateEmail(user.email)) {
      // alert('please input a valid Email');
      this.flashMessages.show('please input a valid Email', { cssClass: 'ui negative message', timeout: 10000 });
      return false;
    }

    // //submit to server
    // alert('clean submit');// there is no submitting to server
    //Register user
    this.auth.registerUser(user).subscribe(data=>{
      console.table(data);

      if(data.success){
        this.flashMessages.show('You are now Registered',{cssClass:'ui positive message',timeout:3000});
        //redirect
        this.router.navigate(['/login'])        
      }else{
this.flashMessages.show('Error saving user, try again');
      }
    });

  }



}
