import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { SignupService } from 'src/service/signup.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {


  constructor(private router: Router) {
    // ...
  }
//  router: Router = new Router();
SignupService: SignupService = new SignupService();
  user_name = '';
  full_name = '';
  email = '';
  profile_photo = '';
  password = '';
  API_KEY = 'hyperlink';
  error='';


  SignupComponent(SignupService: SignupService){
    this.SignupService = SignupService;
  }
    async signupUser(): Promise<void> {
      var result = await fetch(`http://localhost:3000/api/v1/user/signup`,{
      method: 'POST',
      body: JSON.stringify({user_name: this.user_name, full_name: this.full_name,email: this.email, profile_photo: this.profile_photo,password: this.password}),
      headers: {'Content-Type': 'application/json','api-key': this.API_KEY},
    });

    var response = await result.json();

    console.log(response);

    if(response.code === '1'){
      // localStorage.setItem('token',response.data.token)
      // console.log(response.data.token);
      
      this.router.navigate(['/login']);
    }else if(response.code === '0'){
      this.error = response.message;
      console.log(this.error);
    }
    }

}
