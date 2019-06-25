import { LoginRegisterComponent } from './authentication/login-register/login-register.component';
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeComponent } from './home/home.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AlertBoxComponent } from './shared/alert-box/alert-box.component';
import { UserTypeComponent } from './authentication/user-type/user-type.component';
import { LoadingAnimServiceService } from './shared/loading/loading-anim-service.service';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { PublisherMoreDetailsComponent } from './authentication/publisher-more-details/publisher-more-details.component';
import { UserMoreDetailsComponent } from './authentication/user-more-details/user-more-details.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { UrlSerializer } from '@angular/router';
import { GlobalUrlSerializerService } from './shared/global-url-serializer/global-url-serializer.service';
import { FilterSubCategoriesPipe, FilterCategoriesPipe } from './shared/pipes/filter-pipe/filter-pipes.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DashboardMainComponent } from './dashboard/dashboard-main/dashboard-main.component';
import { DashboardScreenComponent } from './dashboard/dashboard-screen/dashboard-screen.component';
import { PublisherEditDetailsComponent } from './authentication/edit-users/publisher-edit-details/publisher-edit-details.component';
import { UserEditDetailsComponent } from './authentication/edit-users/user-edit-details/user-edit-details.component';
import { AdminEditDetailsComponent } from './authentication/edit-users/admin-edit-details/admin-edit-details.component';
import { CartComponent } from './user-components/cart/cart.component';
import { TestSeriesListingComponent } from './user-components/test-series-listing/test-series-listing.component';
import { PerformTestSeriesComponent } from './user-components/perform-test-series/perform-test-series.component';
import { AddTestSeriesComponent } from './publisher-components/add-test-series/add-test-series.component';
import { UploadTestSeriesComponent } from './publisher-components/upload-test-series/upload-test-series.component';
import { ManageUsersComponent } from './admin-components/manage-users/manage-users.component';
import { ManageTestSeriesComponent } from './admin-components/manage-test-series/manage-test-series.component';
import { ReportsComponent } from './admin-components/reports/reports.component';
import { ManageCategoriesComponent } from './admin-components/manage-categories/manage-categories.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AlertBoxComponent,
    LoginRegisterComponent,
    UserTypeComponent,
    PublisherMoreDetailsComponent,
    UserMoreDetailsComponent,
    FilterCategoriesPipe,
    FilterSubCategoriesPipe,
    DashboardMainComponent,
    DashboardScreenComponent,
    PublisherEditDetailsComponent,
    UserEditDetailsComponent,
    AdminEditDetailsComponent,
    CartComponent,
    TestSeriesListingComponent,
    PerformTestSeriesComponent,
    AddTestSeriesComponent,
    UploadTestSeriesComponent,
    ManageUsersComponent,
    ManageTestSeriesComponent,
    ReportsComponent,
    ManageCategoriesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AppRoutingModule,
    MatTabsModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule
  ],
  providers: [
    Title,
    LoadingAnimServiceService,
    // {
    //   provide: UrlSerializer,
    //   useClass: GlobalUrlSerializerService
    // }
  ],
  bootstrap: [AppComponent],
  entryComponents: [AlertBoxComponent]
})
export class AppModule { }
