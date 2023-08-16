import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ContentAreaComponent } from './content-area/content-area.component';
import { AuthGuard } from './authentication/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },

  {
    path: '',
    component: ContentAreaComponent, data: { shouldReuse: true },
    children: [
      { path: 'home', component: HomepageComponent, canActivate: [AuthGuard] },
      {
        path: ':username',
        component: UserProfileComponent,
        canActivate: [AuthGuard],
      },
      { path: 'PageNotFound', component: PageNotFoundComponent },
      { path: '**', component: PageNotFoundComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
