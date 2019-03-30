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
import { MatToolbarModule} from '@angular/material/toolbar';
import { AlertBoxComponent } from './shared/alert-box/alert-box.component';
import { UserTypeComponent } from './authentication/user-type/user-type.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AlertBoxComponent,
    LoginRegisterComponent,
    UserTypeComponent
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
    MatToolbarModule
  ],
  providers: [Title],
  bootstrap: [AppComponent],
  entryComponents: [AlertBoxComponent]
})
export class AppModule { }
