import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AddPostComponent } from '../pop-ups/add-post/add-post.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../authentication/auth.service';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.css'],
})
export class LeftNavComponent implements OnInit {
  @Output() openRoute: any = new EventEmitter<any>();
  loggedInUserId: any;

  listData: any = [
    {
      name: 'Home',
      route: 'home',
      iconName: 'home',
      // clicked: true
    },
    {
      name: 'Search',
      route: 'search',
      iconName: 'search',
      // clicked: false
    },
    {
      name: 'Notifications',
      route: 'notifications',
      iconName: 'notifications',
      // clicked: false
    },
    {
      name: 'Messages',
      route: 'messages',
      iconName: 'chat_bubble_outline',
      // clicked: false
    },
    {
      name: 'Settings',
      route: 'settings',
      iconName: 'settings',
      // clicked: false
    },
  ];

  constructor(
    private router: Router,
    public dialog: MatDialog,
    public authService: AuthService
  ) {
    this.listData.forEach((list: any) => {
      if (this.router.url == '/' + list.route) {
        list.clicked = true;
      } else {
        list.clicked = false;
      }
    });
  }

  ngOnInit() {
    this.loggedInUserId = localStorage.getItem('userId');
  }

  setRoute(element: any) {
    this.listData.forEach((list: any) => {
      if (element.name == list.name) {
        list.clicked = true;
      } else {
        list.clicked = false;
      }
    });
    this.openRoute.emit(element.route);
  }

  addPost() {
    let sendData = {
      id: this.loggedInUserId,
      sentFrom: 'left-Nav',
    };
    const dialogRef = this.dialog.open(AddPostComponent, {
      data: sendData,
      width: '600px',
      // height: '90%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        window.location.reload();
      }
    });
  }

  logOut() {
    this.authService.logOut();
    // this.router.navigate(['/login']);
  }
}
