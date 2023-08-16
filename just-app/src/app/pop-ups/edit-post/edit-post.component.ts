import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  faImage,
  faChevronCircleDown,
  faChevronCircleUp,
} from '@fortawesome/free-solid-svg-icons';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent {
  fileName = '';
  filesAmount: any;
  deleteImageIds: any;
  uploadImages: any;
  currentTime: any;
  caption: any = '';
  faImage = faImage;
  faChevronCircleDown = faChevronCircleDown;
  faChevronCircleUp = faChevronCircleUp;
  images: any[] = [];
  firstFourImages: any[] = [];
  showAllImages: boolean = false;

  constructor(
    private postService: PostService,
    public dialogRef: MatDialogRef<EditPostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit() {
    this.caption = this.data.caption;
    this.images = this.data.image;
  }

  close() {
    this.dialogRef.close();
  }

  update() {
    let filter = {
      caption: this.caption,
    };
    this.postService
      .updatePost(filter, this.data._id)
      .subscribe((data: any) => {
        if (data != null) {
          if (data.Success) {
            if (this.deleteImageIds && this.deleteImageIds.length > 0) {
              this.deleteImage();
            }

            this.dialogRef.close('Yes');
          }
        }
      });
  }

  getImagesToDelete(element: any) {
    element.deleteImage = !element.deleteImage;

    this.deleteImageIds = this.images
      .filter((image) => image.deleteImage === true)
      .map((image) => image._id);
  }

  deleteImage() {
    // this.deleteImageIds = this.images
    //   .filter((image) => image.deleteImage === true)
    //   .map((image) => image._id);

    let filter = {
      imageId: this.deleteImageIds,
    };

    this.postService
      .deleteImage(this.data._id, filter)
      .subscribe((data: any) => {
        if (data != null) {
          if (data.Success) {
          }
        }
      });
  }

  getStyle(): any {
    const styles: any = {};

    if (this.images.length == 2 || this.firstFourImages.length == 2) {
      styles.height = '245px';
      styles.width = '50%';
    }

    if (this.images.length >= 3 || this.firstFourImages.length >= 3) {
      styles.height = '140px';
      styles.width = '50%';
    }

    return styles;
  }

  getLimitedItems(): any[] {
    if (this.images.length > 4 && this.showAllImages) {
      return this.images;
    }
    if (this.images.length > 4 && !this.showAllImages) {
      return this.images.slice(0, 4);
    } else {
      return this.images;
    }
  }

  showMoreImages() {
    this.showAllImages = !this.showAllImages;
  }
}
