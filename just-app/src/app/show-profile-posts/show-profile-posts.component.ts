import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { ImageExpandComponent } from '../pop-ups/image-expand/image-expand.component';
import { PostService } from '../services/post.service';
import { EditPostComponent } from '../pop-ups/edit-post/edit-post.component';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-show-profile-posts',
  templateUrl: './show-profile-posts.component.html',
  styleUrls: ['./show-profile-posts.component.css'],
})
export class ShowProfilePostsComponent implements AfterViewChecked {
  @Input() userPosts: any;
  @Input() showEditButtons: boolean = false;
  singlePost: boolean = true;
  faHeart = faHeart;
  faCircleUser = faCircleUser;
  @Output() refreshPage: any = new EventEmitter<any>();

  constructor(
    public dialog: MatDialog,
    public postService: PostService,
    public commonService: CommonService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getLimitedItems();
  }

  ngAfterViewChecked() {
    this.getLimitedItems();

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
  
  getLimitedItems() {
    this.userPosts.forEach((element: any) => {
      if (element.image.length > 4) {
        element.image2 = element.image.slice(0, 4);
      } else {
        element.image2 = element.image;
      }
    });
  }

  goToProfile(element: any) {
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

  editPost(element: any) {
    const dialogRef = this.dialog.open(EditPostComponent, {
      data: element,
      width: '600px',
      // height: '90%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.refreshPage.emit('Refresh');
      }
    });
  }

  deletePost(element: any) {
    this.postService.deletePost(element._id).subscribe((data: any) => {
      if (data != null) {
        if (data.Success) {
          this.refreshPage.emit('Refresh');
        }
      }
    });
  }

  getUploadTime(uploadedTime: any) {
    return this.commonService.getUploadTime(uploadedTime);
  }
}
