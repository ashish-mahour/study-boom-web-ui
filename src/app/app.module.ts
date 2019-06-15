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
import { UrlSerializer } from '@angular/router';
import { GlobalUrlSerializerService } from './shared/global-url-serializer/global-url-serializer.service';
import { FilterSubCategoriesPipe, FilterCategoriesPipe } from './shared/pipes/filter-pipe/filter-pipes.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DashboardMainComponent } from './dashboard/dashboard-main/dashboard-main.component';
import { DashboardScreenComponent } from './dashboard/dashboard-screen/dashboard-screen.component';

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
    DashboardScreenComponent
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
    MatListModule
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
