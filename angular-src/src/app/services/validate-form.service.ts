import { Injectable } from '@angular/core';

@Injectable()
export class ValidateFormService {

  constructor() { }
//check required fields are not empty
  validateRequired(formValues){
    if(formValues.name == undefined || formValues.username== undefined || formValues.email == undefined || formValues.password == undefined){
      return false;
    }
    return true;
  }
//check email is in valid format
  validateEmail(email){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

validateLoginRequired(formValues){
  if( formValues.email == undefined || formValues.password == undefined){
    return false;
  }
  return true;
}

}
