import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-image-expand',
  templateUrl: './image-expand.component.html',
  styleUrls: ['./image-expand.component.css'],
})
export class ImageExpandComponent {
  faHeart = faHeart;
  post: any;
  name = 'Angular';
  imagesUrl: any[] = [];

  // images = [700, 800, 807].map((n) => `https://picsum.photos/id/${n}/900/500`);

  constructor(
    config: NgbCarouselConfig,
    public dialogRef: MatDialogRef<ImageExpandComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // customize default values of carousels used by this component tree
    config.interval = 0;
    config.keyboard = true;
    config.pauseOnHover = true;
    this.post = data;
    this.imagesUrl.push(this.post.imgUrl);
    this.imagesUrl.push('./assets/img/beach.jpg');
    console.log(this.post);
    console.log(this.imagesUrl);
  }

  likePicture() {
    this.post.liked = !this.post.liked;
  }
}
