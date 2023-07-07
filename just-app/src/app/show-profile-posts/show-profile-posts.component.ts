import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { ProfileImageExpandComponent } from '../pop-ups/profile-image-expand/profile-image-expand.component';
import { ImageExpandComponent } from '../pop-ups/image-expand/image-expand.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-show-profile-posts',
  templateUrl: './show-profile-posts.component.html',
  styleUrls: ['./show-profile-posts.component.css'],
})
export class ShowProfilePostsComponent implements AfterViewChecked {
  @Input() userPosts: any;
  singlePost: boolean = true;
  faHeart = faHeart;
  faCircleUser = faCircleUser;

  constructor(
    private datePipe: DatePipe,
    public dialog: MatDialog,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // this.img = [...this.userPosts];
    // console.log(this.userData);
    // console.log(this.userData2);
    this.getLimitedItems();
  }

  ngAfterViewChecked() {
    this.userPosts.forEach((element: any) => {
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

  changeGrid() {
    this.singlePost = !this.singlePost;
  }

  likePicture(post: any) {
    post.liked = !post.liked;
  }

  // expandImage(element: any) {
  //   const dialogRef = this.dialog.open(ProfileImageExpandComponent, {
  //     data: element,
  //     width: '1000px',
  //     // height: '700px',
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     // console.log(`Result: ${result}`);
  //   });
  // }

  getStyle(): any {
    const styles: any = {};
    // this.userPosts.forEach((element: any) => {
    //   if (this.singlePost) {
    //     if (element.image.length == 2) {
    //       element.height = 245;
    //       element.width = '50%';
    //     }
    //     if (element.image.length > 2) {
    //       element.height = 149;
    //       element.width = '50%';
    //     }
    //   }
    //   if (!this.singlePost) {
    //     if (element.image.length == 2) {
    //       element.height = 298;
    //       element.width = '50%';
    //     }
    //     if (element.image.length > 2) {
    //       element.height = 149;
    //       element.width = '50%';
    //     }
    //   }

    // if (element.image.length == 2) {
    //   element.setHeight = true;
    //   styles.height = '245px';
    //   styles.width = '50%';
    //   if (!this.singlePost) {
    //     styles.height = '298px';
    //   }
    // }else{
    //   element.setHeight = false;
    // }

    // if (element.image.length >= 3) {
    //   styles.height = '149px';
    //   styles.width = '50%';
    // }

    // console.log(this.userPosts);
    // });

    return styles;
  }

  // getLimitedItems(): any[] {
  //   if (this.images.length > 4) {
  //     return this.images;
  //   } else {
  //     return this.images;
  //   }
  // }
  getLimitedItems() {
    this.userPosts.forEach((element: any) => {
      if (element.image.length > 4) {
        element.image2 = element.image.slice(0, 4);
        // return element.image;
      } else {
        element.image2 = element.image;
        // return element.image;
      }
    });

    console.log(this.userPosts);
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
    const now = new Date();
    let currentDate = this.datePipe.transform(now, 'yyyy-MM-dd');
    let currentTime = this.datePipe.transform(now, 'HH:mm:ss');
    let time: any;
    if (currentDate && currentTime) {
      time = currentTime = currentDate + ' ' + currentTime;
    }

    const currentTimeNow = new Date(time);
    const postUploadedTime = new Date(uploadedTime);
    const timeDifference =
      currentTimeNow.getTime() - postUploadedTime.getTime();

    const durationInSeconds = Math.floor(timeDifference / 1000);
    const durationInMinutes = Math.floor(durationInSeconds / 60);
    const durationInHours = Math.floor(durationInMinutes / 60);
    const durationInDays = Math.floor(durationInHours / 24);
    const durationInWeeks = Math.floor(durationInDays / 7);

    const currentYear = currentTimeNow.getFullYear();
    const currentMonth = currentTimeNow.getMonth();
    const postCreationYear = postUploadedTime.getFullYear();
    const postCreationMonth = postUploadedTime.getMonth();

    const durationInMonths =
      (currentYear - postCreationYear) * 12 +
      (currentMonth - postCreationMonth);

    const durationInYears = Math.floor(durationInMonths / 12);

    let durationString="";

    if (durationInYears > 0) {
      durationString += `${durationInYears} year(s) ago`;
    } else if (durationInMonths > 0) {
      durationString += `${durationInMonths} month(s) ago`;
    } else if (durationInWeeks > 0) {
      durationString += `${durationInWeeks} week(s) ago`;
    } else if (durationInDays > 0) {
      durationString += `${durationInDays} day(s) ago`;
    } else if (durationInHours > 0) {
      durationString += `${durationInHours} hour(s) ago`;
    } else if (durationInMinutes > 0) {
      durationString += `${durationInMinutes} minute(s) ago`;
    } else {
      durationString += `${durationInSeconds} second(s) ago`;
    }
    return durationString;
  }
}
