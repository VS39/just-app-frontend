import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'just-app';

  constructor(private router: Router,private route:ActivatedRoute) {
    // console.log(this.router.url);
  }

  setRoute(event: any) {
    this.router.navigate([event]);
  }

  showProfile() {
    this.router.navigate(['user']);
  }
}
