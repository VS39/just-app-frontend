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
  showGridButtons: boolean = false;

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
          this.postsData = data.Data;
          this.getLimitedItems();
          this.setIsLikedProperty();
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
    let filter = {
      userId: this.loggedInUserId,
    };
    this.postService.like(post._id, filter).subscribe((data: any) => {
      if (data != null) {
        if (data.Success) {
          post.liked = !post.liked;
          this.viewPosts();
        }
      }
    });
  }

  setIsLikedProperty(): void {
    // Iterate through the posts and set the isLiked property based on the logged-in user's liking
    this.postsData.forEach((post: any) => {
      post.likes.isLiked = post.likes.users.some(
        (user: any) => user._id === this.loggedInUserId
      );
    });
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
      height: '95vh',
      maxWidth: '95vw',
      minWidth: '95vw',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Result: ${result}`);
    });
  }

  getUploadTime(uploadedTime: any) {
    return this.commonService.getUploadTime(uploadedTime);
  }

  refreshPage(data: any) {
    if (data) {
      this.viewPosts();
    }
  }
}
