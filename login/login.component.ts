import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/service/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router) {
    this.loadInitial();
    // ...
  }

  // router: Router = new Router();
  loginService: LoginService = new LoginService();
  user_name = '';
  password = '';
  API_KEY = 'hyperlink';
  error = '';

  // inject dependencies like httpClient, SweetAlert
  LoginComponent(LoginService: LoginService){
  this.loginService = LoginService;  
  }

  async loginUser(): Promise<void> {
    console.log("login");
    
   var result = await fetch(`http://localhost:3000/api/v1/user/login`,{
      method: 'POST',
      body: JSON.stringify({user_name: this.user_name, password: this.password}),
      headers: {'Content-Type': 'application/json','api-key': this.API_KEY},
    });

    var response = await result.json();

    console.log(response);

    if(response.code === '1'){
      console.log("efff",response.data.token);
      localStorage.setItem('token',response.data.token)
      this.router.navigate(['/listing']);
    }else if(response.code === '0'){
      this.error = response.message;
      console.log(this.error);
    }
    
  }

  loadInitial(): void{
    var user = localStorage.getItem('token');
    if(user){
      this.router.navigate(['/listing'])
    }
   }

}
