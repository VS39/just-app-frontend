import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//import { MaterialModule } from '@angular/material.module';
//import {BrowserAnimationsModule} from '@angular/platform browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LeftNavComponent } from './left-nav/left-nav.component';
import { ContentAreaComponent } from './content-area/content-area.component';
import { RightNavComponent } from './right-nav/right-nav.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    LeftNavComponent,
    ContentAreaComponent,
    RightNavComponent,
    SignUpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
