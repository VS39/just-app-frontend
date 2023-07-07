import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UserService } from '../services/user.service';

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
  profileData: any;

  constructor(private router: Router,
     private route: ActivatedRoute,
     private userService: UserService
     ) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.userName = localStorage.getItem('userName');
    this.userData = {
      userId: this.userId,
      userName: this.userName,
    };

    this.getUserPic();
  }

  setRoute(event: any) {
    // this.router.navigate([event]);
    window.location.href = event;
  }

  showProfile() {
    // this.router.navigate(['/' + this.userData.userName]);
    window.location.href = '/' + this.userData.userName;
  }

  getUserPic() {
    this.userService.getUserPic(this.userName).subscribe((data: any) => {
      if (data != null) {
        if (data.Success) {
          this.profileData = data.Data;
        }
      }
    });
  }
}
