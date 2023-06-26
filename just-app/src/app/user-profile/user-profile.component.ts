import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ProfileImageExpandComponent } from '../pop-ups/profile-image-expand/profile-image-expand.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent {
  showTab: any = 'post';

  profilePic = './assets/img/city.jpg';
  backgroundPic = './assets/img/jungle.jpg';

  userData: any[] = [
    {
      name: 'Mr. Bean',
      username: 'mrbean',
      caption: 'I am Bean',
      time: '3h',
      likes: '12,313',
      comments: '102',
      imgUrl: './assets/img/bean.jpg',
    },
    {
      name: 'Dua',
      username: 'dualipa',
      caption: 'hey, Dua here ;)',
      time: '23h',
      likes: '1,012,313',
      comments: '4,127',
      imgUrl: './assets/img/dua.jpg',
    },
    {
      name: 'Camila',
      username: 'cabello.camila',
      caption: 'Hey!',
      time: '13h',
      likes: '800,443',
      comments: '1,509',
      imgUrl: './assets/img/camila.jpeg',
    },
    {
      name: 'Undertaker',
      username: 'rip',
      caption: 'Ride to heaven',
      time: '6h',
      likes: '12,313',
      comments: '889',
      imgUrl: './assets/img/beach.jpg',
    },
    {
      name: 'Ana',
      username: 'yours_ana',
      caption: 'Hi, I am Ana',
      time: '2h',
      likes: '3,442,066',
      comments: '6,984',
      imgUrl: './assets/img/ana.jpeg',
    },
    {
      name: 'Zara',
      username: 'zara',
      caption: 'heyy!!',
      time: '2h',
      likes: '642,330',
      comments: '938',
      imgUrl: './assets/img/zara.jpg',
    },
    {
      name: 'Landscape',
      username: 'land_scape',
      caption: 'PEACE',
      time: '3h',
      likes: '52,220',
      comments: '144',
      imgUrl: './assets/img/landscape.png',
    },
    {
      name: 'Tom Dorreto',
      username: 'fast_x',
      caption: 'Come ride with me',
      time: '1h',
      likes: '101,222',
      comments: '6,663',
      imgUrl: './assets/img/bugatti.jpg',
    },
    {
      name: 'Emily',
      username: 'emilyinparis',
      caption: '',
      time: '1h',
      likes: '1002',
      comments: '25',
      imgUrl: './assets/img/eiffil.jpeg',
    },
    {
      name: 'Moon',
      username: '_moon',
      caption: 'Bright Object',
      time: '1h',
      likes: '20,533',
      comments: '157',
      imgUrl: './assets/img/moon.jpg',
    },
    {
      name: 'Brutus',
      username: 'i_am_doggo',
      caption: ':)',
      time: '1h',
      likes: '8,348',
      comments: '82',
      imgUrl: './assets/img/dog.png',
    },
  ];

  constructor(private location: Location, public dialog: MatDialog) {}
  back() {
    this.location.back();
  }

  onTabClick(tab: any) {
    this.showTab = tab;
  }

  expandImage(element: any) {
    const dialogRef = this.dialog.open(ProfileImageExpandComponent, {
      data: element,
      width: '1000px',
      // height: '700px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Result: ${result}`);
    });
  }
}
