import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//import { MaterialModule } from '@angular/material.module';
//import {BrowserAnimationsModule} from '@angular/platform browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LeftNavComponent } from './left-nav/left-nav.component';
import { ContentAreaComponent } from './content-area/content-area.component';
import { RightNavComponent } from './right-nav/right-nav.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ImageExpandComponent } from './pop-ups/image-expand/image-expand.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    LeftNavComponent,
    ContentAreaComponent,
    RightNavComponent,
    SignUpComponent,
    ImageExpandComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    FontAwesomeModule,
    MatDialogModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
