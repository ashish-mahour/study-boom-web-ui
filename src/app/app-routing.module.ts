import { UserTypeComponent } from './authentication/user-type/user-type.component';
import { LoginRegisterComponent } from './authentication/login-register/login-register.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublisherMoreDetailsComponent } from './authentication/publisher-more-details/publisher-more-details.component';
import { UserMoreDetailsComponent } from './authentication/user-more-details/user-more-details.component';
import { DashboardMainComponent } from './dashboard/dashboard-main/dashboard-main.component';
import { DashboardScreenComponent } from './dashboard/dashboard-screen/dashboard-screen.component';

export const childRouterOutlets: string[] = [
  'home-page-router',
  'dashboard-page-router'
]

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
        path: '**',
        pathMatch: 'full',
        redirectTo: '/home'
      },
      {
        path: '',
        component: LoginRegisterComponent,
        outlet: childRouterOutlets[0]
      },
      {
        path: 'usertype',
        component: UserTypeComponent,
        outlet: childRouterOutlets[0]
      },
      {
        path: 'publisher-more-details',
        component: PublisherMoreDetailsComponent,
        outlet: childRouterOutlets[0]
      },
      {
        path: 'user-more-details',
        component: UserMoreDetailsComponent,
        outlet: childRouterOutlets[0]
      }
    ]
  },
  {
    path: 'dashboard',
    component: DashboardMainComponent,
    children: [
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: '/dashboard'
      },
      {
        path: '',
        component: DashboardScreenComponent,
        outlet: childRouterOutlets[1]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
