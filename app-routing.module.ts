import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { P404Component } from './p404/p404.component';
import { ListingComponent } from './listing/listing.component';
import { PostAdComponent } from './post_ad/post-ad.component';

const routes: Routes = [
  {path:'signup', component: SignupComponent},
  {path:'login', component: LoginComponent},
  {path:'listing',component:ListingComponent},
  {path:'post_ad',component:PostAdComponent},
  {path:'',component:DashboardComponent},
  {path:'**',component:P404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
