//modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule ,Routes} from '@angular/router'
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
  //3rd party modules
  import {FlashMessagesModule} from 'angular2-flash-messages';
//components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import { ValidateFormService } from './services/validate-form.service';
import { AuthServiceService } from './services/auth-service.service';
import { AuthGuardService } from './services/auth-guard.service';

const appRoutes:Routes =[
  {path:"",component:HomeComponent},
  {path:"register",component:RegisterComponent},
  {path:"profile",component:ProfileComponent,canActivate:[AuthGuardService]},
  {path:"login",component:LoginComponent},
  {path:"dashboard",component:DashboardComponent,canActivate:[AuthGuardService]}
] 


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProfileComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot()
  ],
  providers: [ValidateFormService, AuthServiceService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
