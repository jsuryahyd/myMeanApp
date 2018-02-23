import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValidateFormService } from '../../services/validate-form.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
email:string;password:String;
  constructor(private validateForm: ValidateFormService, private flashMessages: FlashMessagesService,private auth:AuthServiceService,private router:Router) { }

  ngOnInit() {
  }

  loginSubmit(){
       // alert('submitted');
       const user = {
        email: this.email,
        password: this.password,
      }
  
      if (!this.validateForm.validateLoginRequired(user)) {
        // alert('Please fill in all the fields');
        this.flashMessages.show('Please fill in all the fields', { cssClass: 'ui negative message', timeout: 10000 });
        return false;
      }

      //submit and get response
      this.auth.authenticateUser(user).subscribe(res=>{
        if(res.success){
          console.log(res)
          this.flashMessages.show('Successfully logged in',{cssClass:"ui positive message",timeout:10000});
          this.auth.saveUserData(res.token,res.userObj)
        this.router.navigate(['/dashboard'])
        return false;
      }else{
        this.flashMessages.show(res.msg,{cssClass:'ui negative message',timeout:10000});
        return false;
      }
      })
  }

}
