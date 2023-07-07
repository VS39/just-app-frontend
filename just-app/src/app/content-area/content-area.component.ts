import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-content-area',
  templateUrl: './content-area.component.html',
  styleUrls: ['./content-area.component.css'],
})
export class ContentAreaComponent implements OnInit {
  currentUrl: any;
  userId: any;
  userName: any;
  userData: any;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.userName = localStorage.getItem('userName');
    this.userData = {
      userId: this.userId,
      userName: this.userName,
    };
  }

  setRoute(event: any) {
    // this.router.navigate([event]);
    window.location.href = event
  }

  showProfile() {
    // this.router.navigate(['/' + this.userData.userName]);
    window.location.href = '/' + this.userData.userName;
  }
}
