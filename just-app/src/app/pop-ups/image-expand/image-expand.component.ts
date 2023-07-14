import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, Subject } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { LikesPopupComponent } from '../likes-popup/likes-popup.component';
import { AddCommentPopupComponent } from '../add-comment-popup/add-comment-popup.component';

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
  imagesUrl: any[] = [];
  trimNo =200;
  
  private followSubject = new Subject<any>();
  // Define an observable to be subscribed by the calling component
  data$ = this.followSubject.asObservable();

  // userData!: BehaviorSubject<any>;
  userData: any;
  updateData!: (postDataPrev: any, msg?: any) => void;
  postDataPrev: any;

  constructor(
    public dialog: MatDialog,
    private commonService: CommonService,
    public dialogRef: MatDialogRef<ImageExpandComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.postDataPrev = data.postImage._value;
    this.userData = data.postImage._value.userData;
    this.post = data.postImage._value.userData.image;
    this.defaultImage = data.postImage._value.clickedImage;

    this.updateData = data.updateData;

    this.imagesUrl = [];
    this.post.forEach((element: any) => {
      this.imagesUrl.push(element.path);
    });
    this.postIndex = this.imagesUrl.indexOf(this.imagesUrl[this.defaultImage]);
    this.img = this.imagesUrl[this.postIndex];
  }

  likePicture() {
    // this.sendData('Refresh');
    this.updateData(this.postDataPrev);
  }

  seeLikes() {
    const dialogRef = this.dialog.open(LikesPopupComponent, {
      data: this.data.postImage._value.userData,
      width: '600px',
      // height: '90%',
    });

    // Subscribe to the data observable of the dialog component
    dialogRef.componentInstance.data$.subscribe((data: any) => {
      if (data) {
        this.sendData();
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.sendData();
      }
    });
  }

  addComment() {
    const dialogRef = this.dialog.open(AddCommentPopupComponent, {
      data: this.data.postImage._value.userData,
      width: '600px',
      // height: '90%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateData(this.postDataPrev, 'Refresh');
      }
    });
  }

  followActionUser(data: any) {
    if (data) {
      this.updateData(this.postDataPrev, 'Refresh');
    }
  }

  // Method to emit the data
  sendData() {
    this.followSubject.next('Refresh');
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
    return this.commonService.getUploadTime(uploadedTime);
  }

  formatNumber(number: any) {
    return this.commonService.formatNumber(number);
  }

  showMore(element: any) {
    element.showFullText = true;
  }

  hide(element: any) {
    element.showFullText = false;
  }
}
