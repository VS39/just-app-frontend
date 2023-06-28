import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { ProfileImageExpandComponent } from '../pop-ups/profile-image-expand/profile-image-expand.component';

@Component({
  selector: 'app-show-profile-posts',
  templateUrl: './show-profile-posts.component.html',
  styleUrls: ['./show-profile-posts.component.css'],
})
export class ShowProfilePostsComponent {
  @Input() userData: any;
  singlePost: boolean = true;
  faHeart = faHeart;
  faCircleUser = faCircleUser;

  userData2: any[] = [
    {
      name: 'Mr. Bean',
      username: 'mrbean',
      caption: 'I am Bean',
      time: '3h',
      likes: '12,313',
      comments: '102',
      imgUrl: [
        './assets/img/bean.jpg',
        // './assets/img/dua.jpg',
        // './assets/img/camila.jpeg',
        // './assets/img/ana.jpeg',
        // './assets/img/ana.jpeg',
      ],
    },
    {
      name: 'Dua',
      username: 'dualipa',
      caption: 'hey, Dua here ;)',
      time: '23h',
      likes: '1,012,313',
      comments: '4,127',
      imgUrl: [
        './assets/img/dua.jpg',
        // './assets/img/dua.jpg',
        // './assets/img/camila.jpeg',
      ],
    },
    {
      name: 'Camila',
      username: 'cabello.camila',
      caption: 'Hey!',
      time: '13h',
      likes: '800,443',
      comments: '1,509',
      imgUrl: ['./assets/img/camila.jpeg',
      //  './assets/img/beach.jpg'
      ],
    },
    {
      name: 'Undertaker',
      username: 'rip',
      caption: 'Ride to heaven',
      time: '6h',
      likes: '12,313',
      comments: '889',
      imgUrl: [
        './assets/img/beach.jpg',
        // './assets/img/bean.jpg',
        // './assets/img/dua.jpg',
        // './assets/img/camila.jpeg',
        // './assets/img/ana.jpeg',
      ],
    },
    {
      name: 'Ana',
      username: 'yours_ana',
      caption: 'Hi, I am Ana',
      time: '2h',
      likes: '3,442,066',
      comments: '6,984',
      imgUrl: ['./assets/img/ana.jpeg'],
    },
    {
      name: 'Zara',
      username: 'zara',
      caption: 'heyy!!',
      time: '2h',
      likes: '642,330',
      comments: '938',
      imgUrl: ['./assets/img/zara.jpg'],
    },
  ];

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    console.log(this.userData);
    console.log(this.userData2);
  }

  changeGrid() {
    this.singlePost = !this.singlePost;
  }

  likePicture(post: any) {
    post.liked = !post.liked;
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

  getStyle(): any {
    const styles: any = {};
    this.userData2.forEach((element: any) => {
      if (element.imgUrl.length == 2) {
        styles.height = '245px';
        styles.width = '50%';
        if (!this.singlePost) {
          styles.height = '298px';
        }
      }

      if (element.imgUrl.length >= 3) {
        styles.height = '149px';
        styles.width = '50%';
      }
    });

    return styles;
  }

  img: any[]=[];
  // getLimitedItems(): any[] {
  //   this.img = [];
  //   this.userData2.forEach((element: any) => {
  //     // if (element.imgUrl.length > 4) {
  //     //   return element.imgUrl.slice(0, 4);
  //     // } else {
  //     //   return element.imgUrl;
  //     // }
  //     this.img.push(element.imgUrl);
  //   });
  //   console.log(this.img)''
  //   if (this.img.length > 4) {
  //     return this.img.slice(0, 4);
  //   } else {
  //     return this.img;
  //   }
  // }
}
