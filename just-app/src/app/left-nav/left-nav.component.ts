import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.css'],
})
export class LeftNavComponent {
  @Output() openRoute: any = new EventEmitter<any>();
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

  constructor(private router:Router){
    console.log(this.router.url);
     this.listData.forEach((list: any) => {
      if (this.router.url == '/'+list.route) {
        list.clicked = true;
      } else {
        list.clicked = false;
      }
    });

  }

  setRoute(element: any) {
    this.listData.forEach((list: any) => {
      if (element.name == list.name) {
        list.clicked = true;
      } else {
        list.clicked = false;
      }
    });
    console.log(this.listData);
    this.openRoute.emit(element.route);
  }
}
