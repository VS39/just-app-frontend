import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { CommonService } from 'src/app/services/common.service';

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

  constructor( 
    private commonService: CommonService,
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
    return this.commonService.getUploadTime(uploadedTime);
  }
}
