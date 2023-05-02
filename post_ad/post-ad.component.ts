import { Component } from '@angular/core';
import {Router} from '@angular/router'
import {PostadService} from 'src/service/postad.service';
@Component({
  selector: 'app-post-ad',
  templateUrl: './post-ad.component.html',
  styleUrls: ['./post-ad.component.css']
})
export class PostAdComponent {

  constructor(private router: Router) {
    // ...
  }
  PostadService: PostadService = new PostadService();
  // user_id = '';
  title = '';
  photo = '';
  description = '';
  API_KEY = 'hyperlink';
  token = String(localStorage.getItem('token'))
  error = '';

  PostAdComponent(PostadService: PostadService){
    this.PostadService = PostadService;
  }

  async Postad(): Promise<void>{
    var result = await fetch(`http://localhost:3000/api/v1/place/adds`,{
      method: 'POST',
      body: JSON.stringify({title: this.title, photo: this.photo,description:this.description}),
      headers: {'Content-Type': 'application/json','api-key': this.API_KEY,'token': this.token},
    });

    var response = await result.json();

    console.log(response);

    if(response.code === '1'){
      console.log("efff",response.data.token);
      // localStorage.setItem('token',response.data.token)
      
      this.router.navigate(['/listing']);
      
    }else if(response.code === '0'){
      this.error = response.message;
      console.log(this.error);
    }
    
  }



 }


