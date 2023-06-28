import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';
import { faChevronCircleUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent {
  fileName = '';
  filesAmount: any;
  faImage = faImage;
  faChevronCircleDown = faChevronCircleDown;
  faChevronCircleUp = faChevronCircleUp;
  images: any[] = [];
  firstFourImages: any[] = [];
  showAllImages: boolean = false;

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<AddPostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close() {
    this.dialogRef.close();
  }

  post() {
    this.dialogRef.close();
  }

  onFileSelected(event: any) {
    console.log(event);
    if (event.target.files && event.target.files[0]) {
      this.filesAmount = event.target.files.length;
      for (let i = 0; i < this.filesAmount; i++) {
        var reader = new FileReader();

        reader.onload = (event: any) => {
          console.log(event.target.result);
          this.images.push(event.target.result);
          this.firstFourImages.push(event.target.result);
        };

        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  onFileClick(event: any) {
    event.target.value = '';
  }

  deleteImage(image: File): void {
    const index = this.images.indexOf(image);
    const index2 = this.firstFourImages.indexOf(image);
    if (index !== -1) {
      this.images.splice(index, 1);
    }
    if (index2 !== -1) {
      this.firstFourImages.splice(index, 1);
    }
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
