import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-image-expand',
  templateUrl: './image-expand.component.html',
  styleUrls: ['./image-expand.component.css'],
})
export class ImageExpandComponent {
  faHeart = faHeart;
  faArrowRight = faArrowRight;
  faArrowLeft = faArrowLeft;
  postIndex = 0;
  img: any;
  defaultImage: any;
  post: any;
  userData: any;
  imagesUrl: any[] = [];

  constructor( private datePipe: DatePipe,
    public dialogRef: MatDialogRef<ImageExpandComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userData = data.userData;
    this.post = data.userData.image;
    this.defaultImage = data.clickedImage;
    this.imagesUrl = [];
    this.post.forEach((element: any) => {
      this.imagesUrl.push(element.path);
    });

    this.postIndex = this.imagesUrl.indexOf(this.imagesUrl[this.defaultImage]);
    this.img = this.imagesUrl[this.postIndex];
    console.log(this.userData);

  }

  likePicture() {
    this.post.liked = !this.post.liked;
  }

  rightArrow() {
    if (this.postIndex < this.imagesUrl.length - 1) {
      this.postIndex += 1;
      this.img = this.imagesUrl[this.postIndex];
    }
  }

  leftArrow() {
    if (this.postIndex > 0) {
      this.postIndex -= 1;
      this.img = this.imagesUrl[this.postIndex];
    }
  }

  roundArrow(index: number) {
    this.postIndex = index;
    this.img = this.imagesUrl[index];
  }

  close() {
    this.dialogRef.close();
  }

  goToProfile(element: any) {
    // this.router.navigate(['/' + element.username]);
    window.location.href = '/' + element.uploadedByUsername;
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
