import { ChangeDetectorRef, Component } from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { ImageExpandComponent } from '../pop-ups/image-expand/image-expand.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../services/post.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent {
  faHeart = faHeart;
  userName: any;
  postsData: any;
  loggedInUserId: any;
  singlePost: boolean = true;
  postdata: any[] = [
    {
      name: 'Mr. Bean',
      username: 'mrbean',
      caption:
        'Hello kids! The childish Mr Bean uses his unusual wit to fulfil everyday tasks. But more often than not, he ends up creating trouble for himself and those around him.',
      time: '3h',
      imgUrl: './assets/img/bean.jpg',
    },
    {
      name: 'Dua',
      username: 'dualipa',
      caption:
        'Celebrating birthday with friend and family tonight, having dinner with my dinner',
      time: '23h',
      imgUrl: './assets/img/dua.jpg',
    },
    {
      name: 'Camila',
      username: 'cabello.camila',
      caption: 'Hey!',
      time: '13h',
      imgUrl: './assets/img/camila.jpeg',
    },
    {
      name: 'Undertaker',
      username: 'rip',
      caption: 'Ride to heaven',
      time: '6h',
      imgUrl: './assets/img/beach.jpg',
    },
    {
      name: 'Ana',
      username: 'yours_ana',
      caption:
        'Wonderful evening in Tokyo, glad to announce my new movie with UnderTaker "Ride To Hell", only in theatres from 30th June. Go watch and show some love. - Ana ',
      time: '2h',
      imgUrl: './assets/img/ana.jpeg',
    },
    {
      name: 'Zara',
      username: 'zara',
      caption: 'this is my repeat post',
      time: '3h',
      imgUrl: './assets/img/zara.jpg',
    },
    {
      name: 'Landscape',
      username: 'land_scape',
      caption: 'this is landscape',
      time: '3h',
      imgUrl: './assets/img/landscape.png',
    },
    {
      name: 'Tom Dorreto',
      username: 'fast_x',
      caption: 'Come ride with me',
      time: '1h',
      imgUrl: './assets/img/bugatti.jpg',
    },
    {
      name: 'Emily',
      username: 'emilyinparis',
      caption:
        "Paris, France's capital, is a major European city and a global center for art, fashion, gastronomy and culture. Its 19th-century cityscape is crisscrossed by wide boulevards and the River Seine. Beyond such landmarks as the Eiffel Tower and the 12th-century, Gothic Notre-Dame cathedral, the city is known for its cafe culture and designer boutiques along the Rue du Faubourg Saint-Honoré.",
      time: '1h',
      imgUrl: './assets/img/eiffil.jpeg',
    },
    {
      name: 'Moon',
      username: '_moon',
      caption:
        'The Moon is Earths only natural satellite. Its diameter is about one-quarter of Earths, making it the fifth largest satellite in the Solar System and the largest and most massive relative to its parent planet. It is larger than all known dwarf planets in the Solar System.',
      time: '1h',
      imgUrl: './assets/img/moon.jpg',
    },
    {
      name: 'Brutus',
      username: 'i_am_doggo',
      caption: ':)',
      time: '1h',
      imgUrl: './assets/img/dog.png',
    },
  ];

  constructor(
    private cdRef: ChangeDetectorRef,
    private commonService: CommonService,
    public dialog: MatDialog,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.userName = localStorage.getItem('userName');
    this.loggedInUserId = localStorage.getItem('userId');
    this.viewPosts();
  }

  viewPosts() {
    this.postService.viewPosts(this.userName).subscribe((data: any) => {
      if (data != null) {
        if (data.Success) {
          this.postsData = data.Data.userPosts;
          this.getLimitedItems();
        }
      }
    });
  }

  ngAfterViewChecked() {
    if (this.postsData) {
      this.postsData.forEach((element: any) => {
        if (this.singlePost) {
          if (element.image.length == 2) {
            element.height = 245;
            element.width = '50%';
          }
          if (element.image.length > 2) {
            element.height = 149;
            element.width = '50%';
          }
        }
        if (!this.singlePost) {
          if (element.image.length == 2) {
            element.height = 298;
            element.width = '50%';
          }
          if (element.image.length > 2) {
            element.height = 149;
            element.width = '50%';
          }
        }

        this.cdRef.detectChanges();
      });
    }
  }

  changeGrid() {
    this.singlePost = !this.singlePost;
  }

  likePicture(post: any) {
    post.liked = !post.liked;
  }

  getLimitedItems() {
    this.postsData.forEach((element: any) => {
      if (element.image.length > 4) {
        element.image2 = element.image.slice(0, 4);
      } else {
        element.image2 = element.image;
      }
    });
  }

  goToProfile(element: any) {
    // this.router.navigate(['/' + element.username]);
    window.location.href = '/' + element.uploadedByUsername;
  }

  expandImage(element: any, clickedImage: any) {
    let postData = {
      userData: element,
      clickedImage: clickedImage,
    };
    const dialogRef = this.dialog.open(ImageExpandComponent, {
      data: postData,
      width: '1130px',
      // height: '700px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Result: ${result}`);
    });
  }

  getUploadTime(uploadedTime: any) {
    return this.commonService.getUploadTime(uploadedTime);
  }
}
