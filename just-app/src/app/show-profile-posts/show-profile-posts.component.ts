import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
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

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    console.log(this.userData);
  }

  changeGrid() {
    this.singlePost = !this.singlePost;
  }

  likePicture(post: any) {
    post.liked = !post.liked;
  }

  expandImage(element: any) {
    const dialogRef = this.dialog.open(ProfileImageExpandComponent, {
      data: element.imgUrl,
      width: '1000px',
      // height: '700px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Result: ${result}`);
    });
  }
}
