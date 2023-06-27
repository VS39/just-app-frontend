import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-content-area',
  templateUrl: './content-area.component.html',
  styleUrls: ['./content-area.component.css'],
})
export class ContentAreaComponent {
  currentUrl:any;
  constructor(private router: Router, private route: ActivatedRoute) {
    
  }

  setRoute(event: any) {
    this.router.navigate([event]);
  }

  showProfile() {
    this.router.navigate(['user']);
  }
}
