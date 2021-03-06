import { UserTypeComponent } from "./authentication/user-type/user-type.component";
import { LoginRegisterComponent } from "./authentication/login-register/login-register.component";
import { HomeComponent } from "./home/home.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PublisherMoreDetailsComponent } from "./authentication/publisher-more-details/publisher-more-details.component";
import { UserMoreDetailsComponent } from "./authentication/user-more-details/user-more-details.component";
import { DashboardMainComponent } from "./dashboard/dashboard-main/dashboard-main.component";
import { DashboardScreenComponent } from "./dashboard/dashboard-screen/dashboard-screen.component";
import { UserEditDetailsComponent } from "./authentication/edit-users/user-edit-details/user-edit-details.component";
import { AdminEditDetailsComponent } from "./authentication/edit-users/admin-edit-details/admin-edit-details.component";
import { PublisherEditDetailsComponent } from "./authentication/edit-users/publisher-edit-details/publisher-edit-details.component";
import { ManageTestSeriesComponent } from "./admin-components/manage-test-series/manage-test-series.component";
import { ManageUsersComponent } from "./admin-components/manage-users/manage-users.component";
import { AddTestSeriesComponent } from "./publisher-components/add-test-series/add-test-series.component";
import { PerformTestSeriesComponent } from "./user-components/perform-test-series/perform-test-series.component";
import { TestSeriesListingComponent } from "./user-components/test-series-listing/test-series-listing.component";
import { ManageCategoriesComponent } from "./admin-components/manage-categories/manage-categories.component";
import { AuthenticationGuard } from "./guards/authentication/authentication.guard";
import { PublisherRequestsComponent } from './publisher-components/publisher-requests/publisher-requests/publisher-requests.component';
import { UserRequestsComponent } from './user-components/user-requests/user-requests/user-requests.component';

export const childRouterOutlets: string[] = [
  "home-page-router",
  "dashboard-page-router"
];

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/dashboard"
  },
  {
    path: "home",
    component: HomeComponent,
    children: [
      {
        path: "",
        component: LoginRegisterComponent,
        outlet: childRouterOutlets[0]
      },
      {
        path: "usertype",
        component: UserTypeComponent,
        outlet: childRouterOutlets[0]
      },
      {
        path: "publisher-more-details",
        component: PublisherMoreDetailsComponent,
        outlet: childRouterOutlets[0]
      },
      {
        path: "user-more-details",
        component: UserMoreDetailsComponent,
        outlet: childRouterOutlets[0]
      },
      {
        path: "**",
        pathMatch: "full",
        redirectTo: "/home"
      }
    ]
  },
  {
    path: "dashboard",
    component: DashboardMainComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: "",
        component: DashboardScreenComponent,
        outlet: childRouterOutlets[1]
      },
      {
        path: "user-edit-details",
        component: UserEditDetailsComponent,
        outlet: childRouterOutlets[1]
      },
      {
        path: "admin-edit-details",
        component: AdminEditDetailsComponent,
        outlet: childRouterOutlets[1]
      },
      {
        path: "publisher-edit-details",
        component: PublisherEditDetailsComponent,
        outlet: childRouterOutlets[1]
      },
      {
        path: "admin-manage-test-series",
        component: ManageTestSeriesComponent,
        outlet: childRouterOutlets[1]
      },
      {
        path: "admin-manage-users",
        component: ManageUsersComponent,
        outlet: childRouterOutlets[1]
      },
      {
        path: "admin-manage-categories",
        component: ManageCategoriesComponent,
        outlet: childRouterOutlets[1]
      },
      {
        path: "publisher-add-test-series",
        component: AddTestSeriesComponent,
        outlet: childRouterOutlets[1]
      },
      {
        path: "publisher-requests",
        component: PublisherRequestsComponent,
        outlet: childRouterOutlets[1]
      },
      {
        path: "user-perform-test-series",
        component: PerformTestSeriesComponent,
        outlet: childRouterOutlets[1]
      },
      {
        path: "user-test-series-listings",
        component: TestSeriesListingComponent,
        outlet: childRouterOutlets[1]
      },
      {
        path: "user-requests",
        component: UserRequestsComponent,
        outlet: childRouterOutlets[1]
      },
      {
        path: "**",
        pathMatch: "full",
        redirectTo: "/dashboard"
      }
    ]
  },
  {
    path: "**",
    pathMatch: "full",
    redirectTo: "/home"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
