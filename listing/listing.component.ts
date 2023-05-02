import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent {
  constructor(private router: Router) {
    
    this.loadInitial()
    this.listAd()
  }

  error="";
  data:any;
  API_KEY="hyperlink";
  token= String(localStorage.getItem('token'));

  async listAd():Promise<void> {
    var result= await fetch('http://localhost:3000/api/v1/place/adlisting?page=1&limit=18', {
      method: 'GET',
      headers: {'Content-Type': 'application/json','api-key':this.API_KEY,'token':this.token},
    })

    var response = await result.json();
    
    if(response.code == '1'){
      this.data=response.data
      console.log(this.data);
    }else if(response.code == '0'){
      this.error = response.message;
      console.log(this.error);
    }
  }
 logout(): void{
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  
  swalWithBootstrapButtons.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem('token');
      this.loadInitial();
      swalWithBootstrapButtons.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelled',
        'Your imaginary file is safe :)',
        'error'
      )
    }
  })
 }

 loadInitial(): void{
  
  var user = localStorage.getItem('token');
  if(!user){
    this.router.navigate(['/login'])
  }
 }

}
