import { UserTypeComponent } from './authentication/user-type/user-type.component';
import { LoginRegisterComponent } from './authentication/login-register/login-register.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublisherMoreDetailsComponent } from './authentication/publisher-more-details/publisher-more-details.component';
import { UserMoreDetailsComponent } from './authentication/user-more-details/user-more-details.component';
import { childRouterOutlets } from './shared/router-outlets';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: LoginRegisterComponent,
        outlet: 'home-page-router'
      },
      {
        path: 'usertype',
        component: UserTypeComponent,
        outlet: 'home-page-router'
      },
      {
        path: 'publisher-more-details',
        component: PublisherMoreDetailsComponent,
        outlet: 'home-page-router'
      },
      {
        path: 'user-more-details',
        component: UserMoreDetailsComponent,
        outlet: 'home-page-router'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
