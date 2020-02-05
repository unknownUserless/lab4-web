import {BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule }   from '@angular/common/http';
import {HeaderComponent} from "./authentication/header.component";
import {PointsComponent} from "./points/points.component";
import {NotfoundComponent} from "./notfound/notfound.component";
import {Routes, RouterModule} from "@angular/router";
import {AuthComponent} from "./authentication/auth.component";
import {FormsModule} from "@angular/forms";
import {ErrorComponent} from "./error/error.component";
import {HttpService} from "./services/http.service";
import {AuthService} from "./services/auth.service";
import {GuardService} from "./services/guard.service";


const appRoutes: Routes = [
  { path: 'main', component: PointsComponent, canActivate: [GuardService]},
  { path: '', component: AuthComponent},
  { path: '**', component: NotfoundComponent}
];

@NgModule({
  declarations: [AppComponent, HeaderComponent, PointsComponent, NotfoundComponent, AuthComponent, ErrorComponent],
  imports: [BrowserModule, HttpClientModule, RouterModule.forRoot(appRoutes), FormsModule],
  bootstrap: [AppComponent],
  providers: [HttpService, AuthService, GuardService]
})
export class AppModule { }