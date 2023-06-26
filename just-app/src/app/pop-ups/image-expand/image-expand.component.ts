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
  post: any;
  imagesUrl: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<ImageExpandComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.post = data;
    this.imagesUrl.push(this.post.imgUrl);
    this.imagesUrl.push('./assets/img/landscape.png');
    this.imagesUrl.push('./assets/img/beach.jpg');
    this.imagesUrl.push('./assets/img/bugatti.jpg');
    this.img = this.imagesUrl[0];
    console.log(this.post);
    console.log(this.imagesUrl);
  }

  likePicture() {
    this.post.liked = !this.post.liked;
  }

  rightArrow() {
    this.postIndex += 1;
    this.img = this.imagesUrl[this.postIndex];
    console.log(this.postIndex);
  }

  leftArrow() {
    this.postIndex -= 1;
    this.img = this.imagesUrl[this.postIndex];
    console.log(this.postIndex);
  }

  roundArrow(index: number) {
    this.img = this.imagesUrl[index];
  }

  close() {
    this.dialogRef.close();
  }
}
