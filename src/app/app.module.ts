import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './shared/authentication/authentication.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UserService } from './user/user.service';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './shared/shared.module';
import { UtilitiesService } from './shared/utilities/utilities.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    SharedModule
  ],
  providers: [UserService, AuthenticationService, UtilitiesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
